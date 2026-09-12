mod setup;
use setup::run_test;

#[test]
fn test_evaluate_in() {
    let cases = [
        (
            r#"let x = "replaceAll" in String.prototype"#, //
            "let x = true",
        ),
        (
            r#"let x = "getOwnPropertySymbols" in Object"#, //
            "let x = true",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
