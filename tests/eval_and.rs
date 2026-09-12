mod setup;
use setup::run_test;

#[test]
fn second_and() {
    let cases = [
        (
            r#"let x = null != e && "function" == typeof Object.getOwnPropertySymbols"#,
            "let x = null != e;",
        ),
        (
            r#"let x = null != e && "function" != typeof Object.getOwnPropertySymbols"#,
            "let x = false;",
        ),
        (
            "let x = null != e && !Object.getOwnPropertySymbols", //
            "let x = false;",
        ),
        (
            "let x = null != e && Object.getOwnPropertySymbols",
            "let x = null != e && Object.getOwnPropertySymbols",
        ),
        (
            "let x = null != e && WeakMap", //
            "let x = null != e && WeakMap",
        ),
        (
            r#"let x = null != e && "getOwnPropertySymbols" in Object"#,
            "let x = null != e",
        ),
        (
            r#"let x = null != e && "replaceAll" in String.prototype"#,
            "let x = null != e",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
