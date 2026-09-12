use swc_core::{
    common::Mark,
    ecma::{
        ast::Pass,
        parser::{EsSyntax, Syntax},
        transforms::{base::resolver, testing::test_transform},
        visit::{visit_mut_pass, VisitMut},
    },
};
use swc_plugin_evaluate_polyfills::transform_visitor::TransformVisitor;

pub fn syntax() -> Syntax {
    Syntax::Es(EsSyntax {
        jsx: true,
        ..Default::default()
    })
}

pub fn visitor(browser: bool) -> impl VisitMut + Pass {
    let unresolved_mark = Mark::new();
    (
        resolver(unresolved_mark, Mark::new(), false),
        visit_mut_pass(TransformVisitor {
            unresolved_mark,
            browser,
        }),
    )
}

#[allow(dead_code)]
pub fn run_test(input: &str, expected: &str) {
    test_transform(syntax(), Some(true), |_| visitor(false), input, expected);
}

#[allow(dead_code)]
pub fn run_test_browser(input: &str, expected: &str) {
    test_transform(syntax(), Some(true), |_| visitor(true), input, expected);
}
