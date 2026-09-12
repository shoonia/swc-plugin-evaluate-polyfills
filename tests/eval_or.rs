mod setup;
use setup::run_test;

#[test]
fn second_or() {
    let cases = [
        (
            r#"let x = null != e || "function" == typeof Object.getOwnPropertySymbols"#,
            "let x = true",
        ),
        (
            r#"let x = null != e || "function" != typeof Object.getOwnPropertySymbols"#,
            "let x = null != e",
        ),
        (
            "let x = null != e || !Object.getOwnPropertySymbols", //
            "let x = null != e",
        ),
        (
            "let x = null != e || Object.getOwnPropertySymbols",
            "let x = null != e || Object.getOwnPropertySymbols",
        ),
        (
            "let x = null != e || WeakMap", //
            "let x = null != e || WeakMap",
        ),
        (
            r#"let x = null != e || "getOwnPropertySymbols" in Object"#, //
            "let x = true",
        ),
        (
            r#"let x = null != e || "replaceAll" in String.prototype"#, //
            "let x = true",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
