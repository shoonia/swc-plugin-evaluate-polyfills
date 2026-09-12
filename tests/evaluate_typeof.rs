mod setup;
use setup::run_test;

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
