mod setup;
use setup::run_test_browser;

#[test]
fn window_test() {
    let cases = [
        (
            "let t = window.Symbol ? true : false;", // General
            "let t = true;",
        ),
        (
            "let t = window.postMessage ? true : false;", // Browser-specific
            "let t = true;",
        ),
    ];

    for (input, expected) in cases.iter() {
        run_test_browser(input, expected);
    }
}
