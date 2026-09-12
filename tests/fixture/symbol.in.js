// Symbol.asyncIterator

if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");

// 1 - Symbol.iterator

function a(t) {
  var n = "function" == typeof Symbol && t[Symbol.iterator],
    r = 0;
  return n ? n.call(t) : {
    next: function () {
      return t && r >= t.length && (t = void 0), {
        value: t && t[r++],
        done: !t
      }
    }
  }
}

// 1 - Symbol.iterator

var ma = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) return b.call(a);
  if ("number" == typeof a.length) return {
    next: ba(a)
  };
  throw Error(String(a) + " is not an iterable or ArrayLike");
}

// 1 - Symbol.toStringTag

"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
  value: "Module"
}), Object.defineProperty(e, "__esModule", {
  value: !0
})

// 2 - Symbol.toStringTag

var r = n(6073);
e.exports = function () {
  return r() && !!Symbol.toStringTag
}

//

function i(e) {
  "@babel/helpers - typeof";
  return i = typeof Symbol == "function" && typeof (typeof Symbol == "function" ? Symbol.iterator : "@@iterator") == "symbol" ? function (e) {
    return typeof e
  } : function (e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== (typeof Symbol == "function" ? Symbol.prototype : "@@prototype") ? "symbol" : typeof e
  },
    i(e)
}

//

function y(e, t) {
  var n = e == null ? null : typeof Symbol != "undefined" && e[typeof Symbol == "function" ? Symbol.iterator : "@@iterator"] || e["@@iterator"];
  if (n != null) {
    var r, o, a, i, l = [], s = !0, u = !1;
    try {
      if (a = (n = n.call(e)).next,
        t === 0) {
        if (Object(n) !== n)
          return;
        s = !1
      } else
        for (; !(s = (r = a.call(n)).done) && (l.push(r.value),
          l.length !== t); s = !0);
    } catch (e) {
      u = !0,
        o = e
    } finally {
      try {
        if (!s && n.return != null && (i = n.return(),
          Object(i) !== i))
          return
      } finally {
        if (u)
          throw o
      }
    }
    return l
  }
}

//

function I(e, t) {
  if (i(e) != "object" || !e)
    return e;
  var n = e[typeof Symbol == "function" ? Symbol.toPrimitive : "@@toPrimitive"];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (i(r) != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
