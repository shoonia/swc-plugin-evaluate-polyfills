use crate::keys::*;
use std::matches;
use swc_core::{
    common::SyntaxContext,
    ecma::ast::{BinExpr, BinaryOp, Expr, Ident, Lit, MemberExpr, MemberProp, UnaryExpr, UnaryOp},
};

const FUN: &str = "function";
const OBJ: &str = "object";
const SYM: &str = "symbol";

#[inline(always)]
fn is_global(ident: &Ident, unresolved_ctxt: SyntaxContext) -> bool {
    ident.ctxt == unresolved_ctxt
}

fn as_prototype(obj: &MemberExpr) -> Option<&Ident> {
    if obj.prop.as_ident().is_some_and(|i| i.sym == "prototype") {
        obj.obj.as_ident()
    } else {
        None
    }
}

fn is_undefined(expr: &Expr, unresolved_ctxt: SyntaxContext) -> bool {
    expr.as_ident()
        .is_some_and(|i| i.sym == "undefined" && is_global(i, unresolved_ctxt))
}

pub fn evaluate_member(
    member: &MemberExpr,
    unresolved_ctxt: SyntaxContext,
    browser: bool,
) -> Option<&str> {
    let MemberProp::Ident(prop) = &member.prop else {
        return None;
    };

    match member.obj.as_ref() {
        Expr::Ident(obj) => {
            let o = obj.sym.as_str();
            let p = prop.sym.as_str();

            if is_static_method(o, p, browser) {
                return is_global(obj, unresolved_ctxt).then_some(FUN);
            }

            if is_well_known_symbol(o, p) {
                return is_global(obj, unresolved_ctxt).then_some(SYM);
            }
        }
        Expr::Member(memb) => {
            if let Some(ident) = as_prototype(memb)
                && is_prototype_method(ident.sym.as_str(), prop.sym.as_str())
            {
                return is_global(ident, unresolved_ctxt).then_some(FUN);
            }
        }
        _ => {}
    }

    None
}

fn evaluate_typeof(
    unary: &UnaryExpr,
    unresolved_ctxt: SyntaxContext,
    browser: bool,
) -> Option<&str> {
    if unary.op != UnaryOp::TypeOf {
        return None;
    }

    if let Some(memb) = unary.arg.as_member() {
        return evaluate_member(memb, unresolved_ctxt, browser);
    }

    if let Some(ident) = unary.arg.as_ident() {
        let name = ident.sym.as_str();

        if is_built_in_constructor(name, browser) {
            return is_global(ident, unresolved_ctxt).then_some(FUN);
        }

        if is_built_in_member(name, browser) {
            return is_global(ident, unresolved_ctxt).then_some(OBJ);
        }
    }

    None
}

fn evaluate_bin_expr(
    a: &Expr,
    b: &Expr,
    op: &BinaryOp,
    unresolved_ctxt: SyntaxContext,
    browser: bool,
) -> Option<bool> {
    if let Some(unary) = a.as_unary() {
        if let Some(kind) = evaluate_typeof(unary, unresolved_ctxt, browser) {
            return b.as_lit().and_then(Lit::as_str).map(|str| {
                if str.value == kind {
                    matches!(op, BinaryOp::EqEq | BinaryOp::EqEqEq)
                } else {
                    matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq)
                }
            });
        }

        if unary.op == UnaryOp::Void
            && unary.arg.as_lit().is_some_and(Lit::is_num)
            && let Some(member) = b.as_member()
        {
            return evaluate_member(member, unresolved_ctxt, browser)
                .map(|_| matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq));
        }
    } else if is_undefined(a, unresolved_ctxt)
        && let Some(member) = b.as_member()
    {
        return evaluate_member(member, unresolved_ctxt, browser)
            .map(|_| matches!(op, BinaryOp::NotEq | BinaryOp::NotEqEq));
    }

    None
}

pub fn evaluate_bin(bin: &BinExpr, unresolved_ctxt: SyntaxContext, browser: bool) -> Option<bool> {
    evaluate_bin_expr(&bin.left, &bin.right, &bin.op, unresolved_ctxt, browser)
        .or_else(|| evaluate_bin_expr(&bin.right, &bin.left, &bin.op, unresolved_ctxt, browser))
}

pub fn evaluate_in(bin: &BinExpr, unresolved_ctxt: SyntaxContext, browser: bool) -> Option<bool> {
    if let Some(key) = bin
        .left
        .as_lit()
        .and_then(Lit::as_str)
        .and_then(|str| str.value.as_str())
    {
        if let Some(ident) = bin.right.as_ident() {
            if is_static_method(ident.sym.as_str(), key, browser) {
                return is_global(ident, unresolved_ctxt).then_some(true);
            }
        } else if let Some(memb) = bin.right.as_member()
            && let Some(ident) = as_prototype(memb)
        {
            let name = ident.sym.as_str();

            if is_prototype_method(name, key)
                || is_regexp_prototype_property(name, key)
                || (name == "Symbol" && key == "description")
            {
                return is_global(ident, unresolved_ctxt).then_some(true);
            }
        }
    }

    None
}
