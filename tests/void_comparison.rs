mod setup;
use setup::run_test;

#[test]
fn void_test() {
    let cases = [
        (
            "let t = Math.abs == void 0 ? true : false;",
            "let t = false;",
        ),
        (
            "let t = Math.abs != void 0 ? true : false;",
            "let t = true;",
        ),
        (
            "let t = void 0 == Math.abs ? true : false;",
            "let t = false;",
        ),
        (
            "let t = void 0 != Math.abs ? true : false;",
            "let t = true;",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test(input, expected);
    }
}
