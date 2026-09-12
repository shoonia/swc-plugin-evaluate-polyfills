# swc-plugin-evaluate-polyfills

An SWC plugin that statically evaluates inline polyfill checks at build time.

Many libraries include inline polyfills or fallback implementations to support older browsers. When targeting modern environments, these runtime checks add unnecessary bundle weight. This plugin evaluates those conditions at compile time and strips the redundant fallback logic, allowing bundlers and minifiers to effectively dead-code-eliminate (DCE) the unused code.

**Input**

```javascript
// A common polyfill pattern bundled in older libraries
var assign = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
```

**Output**

```javascript
// Stripped down to native API usage
var assign = Object.assign;
```

## Installation

```sh
npm install swc-plugin-evaluate-polyfills
```

## Usage

```json
{
  "jsc": {
    "experimental": {
      "plugins": [
        ["swc-plugin-evaluate-polyfills", {}]
      ]
    }
  }
}
```

Enable `browser: true` to additionally treat `window` as defined:

```json
["swc-plugin-evaluate-polyfills", { "browser": true }]
```

## What it does

The plugin statically resolves common polyfill patterns:

- **`||` fallback stripping** — `API || function() {}` → `API`
- **`undefined` / `void 0` comparisons** — `Object.assign == undefined` → `false`
- **`typeof` checks** — `"function" == typeof Object.assign` → `true`
- **`in` operator** — `"replaceAll" in String.prototype` → `true`
- **`!` / `!!` checks** — `!Date.now` → `false`
- **`if` dead-code elimination** — removes unreachable branches
- **`&&` / `||` short-circuit** — folds known boolean operands
- **`Object.prototype.hasOwnProperty.call`** → `Object.hasOwn`
- **`globalThis` detection** — collapses global-object detection chains
- **Scope awareness** — never folds shadowed identifiers

## License
[MIT](./LICENSE)
