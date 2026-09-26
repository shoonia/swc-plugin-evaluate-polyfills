mod setup;
use setup::run_test;

#[test]
fn removes_empty_statements_from_function_body() {
    run_test(
        "const f = function() { ; return !0; };",
        "const f = function() { return !0; };",
    );
}

#[test]
fn removes_statements_emptied_by_transform() {
    run_test(
        "const f = function() { if (!Date.now) fallback(); return !0; };",
        "const f = function() { return !0; };",
    );
}

#[test]
fn removes_empty_statements_from_blocks_and_arrows() {
    run_test(
        "const f = () => { ; { ; work(); ; } ; };",
        "const f = () => { { work(); } };",
    );
}

#[test]
fn preserves_required_empty_loop_body() {
    run_test(
        "const f = function() { ; while (pending()) ; };",
        "const f = function() { while (pending()) ; };",
    );
}
