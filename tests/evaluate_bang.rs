mod setup;
use setup::run_test;

#[test]
fn test_evaluate_bang() {
    let cases = [
        (
            "let x = !String.prototype.replaceAll", //
            "let x = false",
        ),
        (
            "let x = !!String.prototype.replaceAll", //
            "let x = true",
        ),
        (
            "let x = !Symbol.iterator", //
            "let x = false",
        ),
        (
            "let x = !!Symbol.iterator", //
            "let x = true",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
