use crate::keys::*;
use std::matches;
use swc_core::{
    common::Mark,
    ecma::ast::{BinExpr, BinaryOp, Expr, Ident, Lit, MemberExpr, MemberProp, UnaryExpr, UnaryOp},
};

const FUN: &str = "function";
const OBJ: &str = "object";
const SYM: &str = "symbol";

#[inline]
fn is_global(ident: &Ident, unresolved: Mark) -> bool {
    ident.ctxt.outer() == unresolved
}

fn as_prototype(obj: &MemberExpr) -> Option<&Ident> {
    if obj.prop.as_ident().is_some_and(|i| i.sym == "prototype") {
        obj.obj.as_ident()
    } else {
        None
    }
}

fn is_undefined(expr: &Expr, unresolved: Mark) -> bool {
    expr.as_ident()
        .is_some_and(|i| i.sym == "undefined" && is_global(i, unresolved))
}

pub fn evaluate_member(member: &MemberExpr, unresolved: Mark, browser: bool) -> Option<&str> {
    let MemberProp::Ident(prop) = &member.prop else {
        return None;
    };

    match member.obj.as_ref() {
        Expr::Ident(obj) => {
            let o = obj.sym.as_ref();
            let p = prop.sym.as_ref();

            if is_static_method(o, p, browser) {
                return is_global(obj, unresolved).then_some(FUN);
            }

            if is_well_known_symbol(o, p) {
                return is_global(obj, unresolved).then_some(SYM);
            }
        }
        Expr::Member(memb) => {
            if let Some(ident) = as_prototype(memb) {
                if is_prototype_method(ident.sym.as_ref(), prop.sym.as_ref()) {
                    return is_global(ident, unresolved).then_some(FUN);
                }
            }
        }
        _ => {}
    }

    None
}

fn evaluate_typeof(unary: &UnaryExpr, unresolved: Mark, browser: bool) -> Option<&str> {
    if unary.op != UnaryOp::TypeOf {
        return None;
    }

    if let Some(memb) = unary.arg.as_member() {
        return evaluate_member(memb, unresolved, browser);
    }

    if let Some(ident) = unary.arg.as_ident() {
        let name = ident.sym.as_ref();

        if is_built_in_constructor(name, browser) {
            return is_global(ident, unresolved).then_some(FUN);
        }

        if is_built_in_member(name, browser) {
            return is_global(ident, unresolved).then_some(OBJ);
        }
    }

    None
}

fn evaluate_bin(
    a: &Expr,
    b: &Expr,
    op: &BinaryOp,
    unresolved: Mark,
    browser: bool,
) -> Option<bool> {
    if let Some(unary) = a.as_unary() {
        if let Some(kind) = evaluate_typeof(unary, unresolved, browser) {
            return b.as_lit().and_then(Lit::as_str).map(|str| {
                if str.value == kind {
                    matches!(op, BinaryOp::EqEq | BinaryOp::EqEqEq)
                } else {
                    matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq)
                }
            });
        }

        if unary.op == UnaryOp::Void && unary.arg.as_lit().is_some_and(Lit::is_num) {
            if let Some(member) = b.as_member() {
                return evaluate_member(member, unresolved, browser)
                    .map(|_| matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq));
            }
        }
    } else if is_undefined(a, unresolved) {
        if let Some(member) = b.as_member() {
            return evaluate_member(member, unresolved, browser)
                .map(|_| matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq));
        }
    }

    None
}

pub fn evaluate(bin: &BinExpr, unresolved: Mark, browser: bool) -> Option<bool> {
    match &bin.op {
        BinaryOp::In => {
            if let Some(key) = bin
                .left
                .as_lit()
                .and_then(Lit::as_str)
                .and_then(|str| str.value.as_str())
            {
                if let Some(ident) = bin.right.as_ident() {
                    if is_static_method(ident.sym.as_ref(), key, browser) {
                        return is_global(ident, unresolved).then_some(true);
                    }
                } else if let Some(memb) = bin.right.as_member() {
                    if let Some(ident) = as_prototype(memb) {
                        let name = ident.sym.as_ref();

                        if is_prototype_method(name, key)
                            || (name == "RegExp" && is_regexp_prototype_property(key))
                            || (name == "Symbol" && key == "description")
                        {
                            return is_global(ident, unresolved).then_some(true);
                        }
                    }
                }
            }
        }
        _ => {
            return evaluate_bin(&bin.left, &bin.right, &bin.op, unresolved, browser)
                .or_else(|| evaluate_bin(&bin.right, &bin.left, &bin.op, unresolved, browser))
        }
    }

    None
}
