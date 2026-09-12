// ArrayBuffer.prototype.slice

"undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {
  function e(t, e) {
    return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
  }
  ArrayBuffer.prototype.slice = function (n, r) {
    var i, o, s, u, a = this.byteLength, c = e(n, a), l = a;
    return r !== t && (l = e(r, a)),
      c > l ? new ArrayBuffer(0) : (i = l - c,
        o = new ArrayBuffer(i),
        s = new Uint8Array(o),
        u = new Uint8Array(this, c, i),
        s.set(u),
        o)
  }
}();

// Date.now

Date.now || (Date.now = function () {
  return (new Date).getTime()
});

// Function.prototype.bind

Function.prototype.bind || (Function.prototype.bind = function (t) {
  var n = this;
  if (typeof n != "function")
    throw new TypeError("Function.prototype.bind called on incompatible " + n);
  var i = u.call(arguments, 1)
    , s = function () {
      if (this instanceof s) {
        var e = n.apply(this, i.concat(u.call(arguments)));
        return Object(e) === e ? e : this
      }
      return n.apply(t, i.concat(u.call(arguments)))
    };
  return n.prototype && (r.prototype = n.prototype,
    s.prototype = new r,
    r.prototype = null),
    s
});

var Ea = function (a, b, c) {
  Ea = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
  return Ea.apply(null, arguments)
}

// Math.clz32

var ft = Math.clz32 ? Math.clz32 : bt,
  mt = Math.log,
  pt = Math.LN2;
function bt(e) {
  return 0 === (e >>>= 0) ? 32 : 31 - (mt(e) / pt | 0) | 0
}

// Promise.prototype.finally

Promise.prototype.finally || (Promise.prototype.finally = function(e) {
    if ("function" != typeof e)
        return this.then(e, e);
    var t = this.constructor || Promise;
    return this.then((function(n) {
        return t.resolve(e()).then((function() {
            return n
        }
        ))
    }), (function(n) {
        return t.resolve(e()).then((function() {
            throw n
        }))
    }))
})

// Reflect / typeof Reflect.decorate == "undefined"

function ti(t, e, i, n) {
  var s,
    r = arguments.length,
    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n);else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
  return r > 3 && a && Object.defineProperty(e, i, a), a
}

// Polyfills for String.prototype.trimStart, String.prototype.trimEnd, Symbol.prototype.description, Array.prototype.flat, Array.prototype.flatMap, Promise.prototype.finally, and Object.fromEntries

var H = function () {
  "trimStart" in String.prototype || (String.prototype.trimStart = String.prototype.trimLeft),
    "trimEnd" in String.prototype || (String.prototype.trimEnd = String.prototype.trimRight),
    "description" in Symbol.prototype || Object.defineProperty(Symbol.prototype, "description", {
      configurable: !0,
      get: function () {
        var e = /\\((.*)\\)/.exec(this.toString());
        return e ? e[1] : void 0
      }
    }),
    Array.prototype.flat || (Array.prototype.flat = function (e, t) {
      return t = this.concat.apply([], this),
        e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
    },
      Array.prototype.flatMap = function (e, t) {
        return this.map(e, t).flat()
      }),
    Promise.prototype.finally || (Promise.prototype.finally = function (e) {
      if ("function" != typeof e)
        return this.then(e, e);
      var t = this.constructor || Promise;
      return this.then((function (n) {
        return t.resolve(e()).then((function () {
          return n
        }
        ))
      }
      ), (function (n) {
        return t.resolve(e()).then((function () {
          throw n
        }
        ))
      }
      ))
    }),
    Object.fromEntries || (Object.fromEntries = function (e) {
      return Array.from(e).reduce((function (e, t) {
        return e[t[0]] = t[1],
          e
      }
      ), {})
    })
}

// RegExp.prototype

let x = (e, t, n) => {
  "use strict";
  var r = n(29745)
    , o = n(26506).supportsDescriptors
    , i = Object.getOwnPropertyDescriptor;
  e.exports = function () {
    if (o && "gim" === /a/gim.flags) {
      var e = i(RegExp.prototype, "flags");
      if (e && "function" == typeof e.get && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
        var t = ""
          , n = {};
        if (Object.defineProperty(n, "hasIndices", {
          get: function () {
            t += "d"
          }
        }),
          Object.defineProperty(n, "sticky", {
            get: function () {
              t += "y"
            }
          }),
          e.get.call(n),
          "dy" === t)
          return e.get
      }
    }
    return r
  }
}
