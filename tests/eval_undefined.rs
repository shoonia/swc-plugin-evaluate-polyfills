mod setup;
use setup::run_test;

#[test]
fn test_true_list() {
    let cases = [
        "let x = undefined != Object.assign",
        "let x = undefined !== Object.assign",
        "let x = void 0 !== Object.assign",
        "let x = void 0 != Object.assign",
        "let x = Object.assign != undefined",
        "let x = Object.assign !== undefined",
        "let x = Object.assign != void 0",
        "let x = Object.assign !== void 0",
    ];

    for input in cases.iter() {
        run_test(input, "let x = true");
    }
}

#[test]
fn test_false_list() {
    let cases = [
        "let x = undefined == Object.assign",
        "let x = undefined === Object.assign",
        "let x = void 0 == Object.assign",
        "let x = void 0 === Object.assign",
        "let x = Object.assign == undefined",
        "let x = Object.assign === undefined",
        "let x = Object.assign == void 0",
        "let x = Object.assign === void 0",
    ];

    for input in cases.iter() {
        run_test(input, "let x = false");
    }
}
