mod setup;
use setup::run_test;

#[test]
fn object_prototype_hasownproperty_call() {
    let cases = [
        (
            r#"
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            console.log("Has own property");
        }
        "#,
            r#"
        if (Object.hasOwn(obj, key)) {
            console.log("Has own property");
        }
        "#,
        ),
        (
            r#"Object.prototype.hasOwnProperty.call(e, s)"#,
            r#"Object.hasOwn(e, s)"#,
        ),
        (
            r#"Object.prototype.hasOwnProperty.call(e, "key")"#,
            r#"Object.hasOwn(e, "key")"#,
        ),
        (
            "Object.prototype.hasOwnProperty.call(Object(e), s)",
            "Object.hasOwn(Object(e), s)",
        ),
        (
            "obj.hasOwnProperty(a);", //
            "obj.hasOwnProperty(a);",
        ),
    ];

    for (input, output) in cases {
        run_test(input, output);
    }
}
