mod setup;
use setup::run_test;

#[test]
fn global_identifier() {
    let cases = [
        (
            r#"
      function hello(Object) {
          if (Object.assign) {
            console.log(1);
          }
        }
        if (Object.assign) {
          console.log(2);
        }
      "#,
            r#"
      function hello(Object) {
        if (Object.assign) {
          console.log(1);
        }
      }
      {
        console.log(2);
      }
      "#,
        ),
        (
            r#"
      import { Promise } from 'core-js';
        function hello() {
          if (Promise.all) {
            console.log(1);
          }
          if (Proxy.revocable) {
            console.log(2);
          }
        }
        if (Promise.all) {
          console.log(3);
        }
        if (Proxy.revocable) {
          console.log(4);
        }
      "#,
            r#"
      import { Promise } from 'core-js';
        function hello() {
          if (Promise.all) {
            console.log(1);
          }
          {
            console.log(2);
          }
        }
        if (Promise.all) {
          console.log(3);
        }
        {
          console.log(4);
        }
      "#,
        ),
        (
            r#"
          function test(undefined) {
              console.log(undefined == Object.assign)
          }
          test(Object.assign)
          "#,
            r#"
          function test(undefined) {
              console.log(undefined == Object.assign)
          }
          test(Object.assign)
          "#,
        ),
    ];

    for (input, expected) in cases {
        run_test(input, expected);
    }
}
