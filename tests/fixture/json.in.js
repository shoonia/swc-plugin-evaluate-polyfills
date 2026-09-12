// JSON.stringify

typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
  var r;
  gap = "",
    indent = "";
  if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
  else
    typeof n == "string" && (indent = n);
  rep = t;
  if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
    "": e
  });
  throw new Error("JSON.stringify")
});

// JSON.parse

typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
  function walk(e, t) {
    var n, r, i = e[t];
    if (i && typeof i == "object")
      for (n in i)
        Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n),
          r !== undefined ? i[n] = r : delete i[n]);
    return reviver.call(e, t, i)
  }
  var j;
  text = String(text),
    cx.lastIndex = 0,
    cx.test(text) && (text = text.replace(cx, function (e) {
      return "\\\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
    }));
  if (/^[\\],:{}\\s]*$/.test(text.replace(/\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
    return j = eval("(" + text + ")"),
      typeof reviver == "function" ? walk({
        "": j
      }, "") : j;
  throw new SyntaxError("JSON.parse")
});
