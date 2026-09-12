mod setup;
use setup::run_test;

#[test]
fn logical_operators_chain() {
    let cases = [
        (
            "var __assign = a || b || Object.assign || function () {};",
            "var __assign = a || b || Object.assign;",
        ),
        (
            "var __assign = a && b || Object.assign || function () {};",
            "var __assign = a && b || Object.assign;",
        ),
        (
            "var __assign = this && this.__assign || that && that.__assign || Object.assign || function () {};",
            "var __assign = this && this.__assign || that && that.__assign || Object.assign;",
        ),
        (
            "var __assign = a && Object.assign || function () {};",
            "var __assign = a && Object.assign || function() {};",
        ),
        (
            "var __assign = (a ?? Object.assign) || function () {};",
            "var __assign = a ?? Object.assign;",
        ),
        (
            "var __assign = a || Object.assign || Object.assign || function () {};",
            "var __assign = a || Object.assign;",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
