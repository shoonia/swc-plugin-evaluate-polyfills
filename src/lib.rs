mod evaluate;
mod keys;
mod matches_pattern;
pub mod transform_visitor;

use crate::transform_visitor::TransformVisitor;
use serde::Deserialize;
use swc_core::{
    ecma::{ast::Program, visit::visit_mut_pass},
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

#[derive(Debug, Default, Deserialize)]
pub struct PluginOptions {
    #[serde(default)]
    pub browser: bool,
}

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let options: PluginOptions = metadata
        .get_transform_plugin_config()
        .and_then(|config_json| serde_json::from_str(&config_json).ok())
        .unwrap_or_default();

    program.apply(visit_mut_pass(&mut TransformVisitor {
        unresolved_mark: metadata.unresolved_mark,
        browser: options.browser,
    }))
}
