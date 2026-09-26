mod setup;
use setup::{run_test, run_test_browser};

#[test]
fn test_evaluate_typeof() {
    let cases = [
        (
            r#"let x = "function" == typeof Object.getOwnPropertySymbols"#,
            "let x = true",
        ),
        (
            r#"let x = "function" != typeof Object.getOwnPropertySymbols"#,
            "let x = false",
        ),
        (
            r#"let x = "undefined" == typeof Object.getOwnPropertySymbols"#,
            "let x = false",
        ),
        (
            r#"let x = "undefined" != typeof Object.getOwnPropertySymbols"#,
            "let x = true",
        ),
        (
            r#"let x = "function" === typeof Object.getOwnPropertySymbols"#,
            "let x = true",
        ),
        (
            r#"let x = "function" !== typeof Object.getOwnPropertySymbols"#,
            "let x = false",
        ),
        (
            r#"let x = "undefined" === typeof Object.getOwnPropertySymbols"#,
            "let x = false",
        ),
        (
            r#"let x = "undefined" !== typeof Object.getOwnPropertySymbols"#,
            "let x = true",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols == "function""#,
            "let x = true",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols != "function""#,
            "let x = false",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols == "undefined""#,
            "let x = false",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols != "undefined""#,
            "let x = true",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols === "function""#,
            "let x = true",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols !== "function""#,
            "let x = false",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols === "undefined""#,
            "let x = false",
        ),
        (
            r#"let x = typeof Object.getOwnPropertySymbols !== "undefined""#,
            "let x = true",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}

#[test]
fn test_evaluate_typeof_browser() {
    let cases = [
        (
            r#"let x = "object" == typeof window"#, //
            "let x = true",
        ),
        (
            r#"let x = "object" != typeof window"#, //
            "let x = false",
        ),
        (
            r#"let x = "object" == typeof window.screen"#,
            "let x = true",
        ),
        (
            r#"let x = "object" != typeof window.screen"#,
            "let x = false",
        ),
        (
            r#"let x = typeof window.navigator === "undefined""#,
            "let x = false",
        ),
        (
            r#"let x = typeof window.navigator !== "undefined""#,
            "let x = true",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test_browser(input, expected);
    }
}
