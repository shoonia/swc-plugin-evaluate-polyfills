mod evaluate;
mod keys;
mod matches_pattern;
pub mod transform_visitor;

use crate::transform_visitor::TransformVisitor;
use serde::Deserialize;
use swc_core::{
    common::SyntaxContext,
    ecma::{ast::Program, visit::visit_mut_pass},
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

#[derive(Debug, Default, Deserialize)]
pub struct PluginOptions {
    #[serde(default)]
    pub browser: bool,
}

#[plugin_transform]
pub fn process_transform(program: Program, data: TransformPluginProgramMetadata) -> Program {
    let options: PluginOptions = data
        .get_transform_plugin_config()
        .and_then(|config| serde_json::from_str(&config).ok())
        .unwrap_or_default();

    program.apply(visit_mut_pass(&mut TransformVisitor {
        unresolved_ctxt: SyntaxContext::empty().apply_mark(data.unresolved_mark),
        browser: options.browser,
    }))
}
