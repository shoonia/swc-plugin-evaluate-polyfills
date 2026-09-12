mod setup;
use setup::{syntax, visitor};

use std::path::PathBuf;
use swc_core::ecma::transforms::testing::{test_fixture, FixtureTestConfig};

fn fixture(input: PathBuf, browser: bool) {
    let input_name = input.file_name().unwrap().to_str().unwrap();
    let output_name = input_name.strip_suffix(".in.js").unwrap().to_owned() + ".out.js";
    let output = input.with_file_name(output_name);

    test_fixture(
        syntax(),
        &|_| visitor(browser),
        &input,
        &output,
        FixtureTestConfig {
            allow_error: true,
            module: Some(true),
            ..Default::default()
        },
    );
}

#[testing::fixture("tests/fixture/**/*.in.js")]
fn transformer_fixture(input: PathBuf) {
    fixture(input, false);
}

#[testing::fixture("tests/browser/**/*.in.js")]
fn transformer_fixture_browser(input: PathBuf) {
    fixture(input, true);
}
