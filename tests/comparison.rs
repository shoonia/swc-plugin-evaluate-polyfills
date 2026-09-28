mod setup;
use setup::run_test_browser;

#[test]
fn comparison() {
    let cases = [
        "let x = 'u' > typeof document",
        "let x = 'u' > typeof Element",
        "let x = 'u' > typeof window.document",
        "let x = 'u' > typeof window.Element",
        "let x = typeof document < 'u'",
        "let x = typeof Element < 'u'",
        "let x = typeof window.Element < 'u'",
        "let x = typeof Symbol.iterator < 'u'",
    ];

    for input in cases.iter() {
        run_test_browser(input, "let x = true");
    }
}

#[test]
fn no_comparison() {
    let cases = [
        "let x = 'u' < typeof document",
        "let x = 'u' < typeof Element",
        "let x = 'u' < typeof window.document",
        "let x = 'u' < typeof window.Element",
        "let x = typeof document > 'u'",
        "let x = typeof Element > 'u'",
        "let x = typeof window.Element > 'u'",
        "let x = typeof Symbol.iterator > 'u'",
    ];

    for input in cases.iter() {
        run_test_browser(input, *input);
    }
}
