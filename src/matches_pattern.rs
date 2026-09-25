use swc_core::{common::SyntaxContext, ecma::ast::Expr};

pub const OBJ_HAS_OWN_PROPERTY_CALL: &[&str] = &["Object", "prototype", "hasOwnProperty", "call"];

pub fn matches_pattern(expr: &Expr, parts: &[&str], ctxt: SyntaxContext) -> bool {
    let mut node = expr;

    for part in parts[1..].iter().rev() {
        let Some(member) = node.as_member() else {
            return false;
        };

        if member.prop.as_ident().is_none_or(|i| i.sym != *part) {
            return false;
        }

        node = &member.obj;
    }

    node.as_ident()
        .is_some_and(|i| i.sym == parts[0] && i.ctxt == ctxt)
}
