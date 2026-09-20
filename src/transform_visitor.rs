use crate::{evaluate::*, matches_pattern::*};
use std::matches;
use swc_core::{
    common::{Mark, Spanned, util::take::Take},
    ecma::{
        ast::{
            BinaryOp, Bool, CallExpr, Callee, EmptyStmt, Expr, Lit, MemberExpr, MemberProp, Stmt,
            UnaryOp,
        },
        visit::{VisitMut, VisitMutWith},
    },
};

#[inline]
fn as_bool_value(expr: &Expr) -> Option<bool> {
    expr.as_lit().and_then(Lit::as_bool).map(|i| i.value)
}

#[inline(always)]
fn replace_to_bool(expr: &Expr, value: bool) -> Bool {
    Bool {
        value,
        span: expr.span(),
    }
}

pub struct TransformVisitor {
    pub unresolved_mark: Mark,
    pub browser: bool,
}

impl TransformVisitor {
    fn checker(&self, expr: &Expr) -> Option<bool> {
        match expr {
            Expr::Member(member) => {
                evaluate_member(member, self.unresolved_mark, self.browser).map(|_| true)
            }
            Expr::Bin(bin) => {
                if matches!(bin.op, BinaryOp::LogicalOr | BinaryOp::NullishCoalescing) {
                    self.checker(&bin.left).or_else(|| self.checker(&bin.right))
                } else {
                    None
                }
            }
            _ => as_bool_value(expr),
        }
    }
}

impl VisitMut for TransformVisitor {
    fn visit_mut_stmt(&mut self, stmt: &mut Stmt) {
        stmt.visit_mut_children_with(self);

        match stmt {
            Stmt::Expr(value) => {
                if self.checker(&value.expr).is_some() {
                    *stmt = EmptyStmt { span: value.span }.into()
                }
            }
            Stmt::If(if_stmt) => {
                if let Some(value) = self.checker(&if_stmt.test) {
                    *stmt = *if value {
                        if_stmt.cons.take()
                    } else if let Some(ref mut alt) = if_stmt.alt {
                        alt.take()
                    } else {
                        EmptyStmt { span: if_stmt.span }.into()
                    }
                }
            }
            _ => {}
        }
    }

    fn visit_mut_expr(&mut self, expr: &mut Expr) {
        expr.visit_mut_children_with(self);

        match expr {
            Expr::Bin(bin) => match &bin.op {
                BinaryOp::In => {
                    if let Some(value) = evaluate_in(bin, self.unresolved_mark, self.browser) {
                        *expr = replace_to_bool(expr, value).into();
                    }
                }
                BinaryOp::EqEq | BinaryOp::EqEqEq | BinaryOp::NotEq | BinaryOp::NotEqEq => {
                    if let Some(value) = evaluate_bin(bin, self.unresolved_mark, self.browser) {
                        *expr = replace_to_bool(expr, value).into();
                    }
                }
                BinaryOp::LogicalOr | BinaryOp::NullishCoalescing => {
                    if let Some(value) = self.checker(&bin.left) {
                        *expr = *if value {
                            bin.left.take()
                        } else {
                            bin.right.take()
                        };
                    } else if let Some(value) = as_bool_value(&bin.right) {
                        *expr = *if value {
                            replace_to_bool(expr, value).into()
                        } else {
                            bin.left.take()
                        }
                    }
                }
                BinaryOp::LogicalAnd => {
                    if let Some(value) = self.checker(&bin.left) {
                        *expr = *if value {
                            bin.right.take()
                        } else {
                            bin.left.take()
                        };
                    } else if let Some(value) = as_bool_value(&bin.right) {
                        *expr = *if value {
                            bin.left.take()
                        } else {
                            replace_to_bool(expr, value).into()
                        };
                    }
                }
                _ => {}
            },
            Expr::Cond(cond) => {
                if let Some(value) = self.checker(&cond.test) {
                    *expr = *if value {
                        cond.cons.take()
                    } else {
                        cond.alt.take()
                    }
                }
            }
            Expr::Unary(unary) => {
                if unary.op != UnaryOp::Bang {
                    return;
                }

                if let Some(value) = self.checker(&unary.arg) {
                    *expr = replace_to_bool(expr, !value).into();
                }
            }
            Expr::Paren(paren) => {
                if let Some(value) = self.checker(&paren.expr) {
                    *expr = *if value {
                        paren.expr.take()
                    } else {
                        replace_to_bool(expr, value).into()
                    };
                }
            }
            _ => {}
        }
    }

    fn visit_mut_call_expr(&mut self, call: &mut CallExpr) {
        call.visit_mut_children_with(self);

        if call.args.len() != 2 {
            return;
        }

        if let Some(expr) = call.callee.as_expr()
            && matches_pattern(expr, OBJ_HAS_OWN_PROPERTY_CALL)
        {
            call.callee = Callee::Expr(
                MemberExpr {
                    span: expr.span(),
                    obj: Expr::Ident("Object".into()).into(),
                    prop: MemberProp::Ident("hasOwn".into()),
                }
                .into(),
            )
        }
    }
}
