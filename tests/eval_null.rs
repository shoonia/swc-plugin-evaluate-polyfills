mod setup;
use setup::run_test;

#[test]
fn test_true_list() {
    let cases = [
        "let x = null != Object.create",
        "let x = null !== Object.create",
        "let x = Object.create != null",
        "let x = Object.create !== null",
    ];

    for input in cases.iter() {
        run_test(input, "let x = true");
    }
}

#[test]
fn test_false_list() {
    let cases = [
        "let x = null == Object.create",
        "let x = null === Object.create",
        "let x = Object.create == null",
        "let x = Object.create === null",
    ];

    for input in cases.iter() {
        run_test(input, "let x = false");
    }
}
