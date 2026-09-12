// 1 - Object.create

var qa = "function" == typeof Object.create ? Object.create : function (a) {
  var b = function () { };
  b.prototype = a;
  return new b
}

// 2 - Object.create

var g = Object.create ? function (e, t, n, r) {
  void 0 === r && (r = n);
  var o = Object.getOwnPropertyDescriptor(t, n);
  o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {
    enumerable: !0,
    get: function () {
      return t[n]
    }
  }),
    Object.defineProperty(e, r, o)
} : function (e, t, n, r) {
  void 0 === r && (r = n),
    e[r] = t[n]
};

// 3 - Object.create

if (!Object.create) {
  var b;
  Object.prototype.__proto__ === null ? b = function () {
    return {
      __proto__: null
    }
  } : b = function () {
    var e = {};
    for (var t in e) e[t] = null;
    return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
  },
    Object.create = function (t, n) {
      var r;
      if (t === null) r = b();
      else {
        if (typeof t != "object") throw new TypeError("typeof prototype[" + typeof t + "] != 'object'");
        var i = function () { };
        i.prototype = t,
          r = new i,
          r.__proto__ = t
      }
      return n !== void 0 && Object.defineProperties(r, n), r
    }
}

// 4 - Object.create

var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));


// Object.defineProperties

var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
  if (a == Array.prototype || a == Object.prototype)
    return a;
  a[b] = c.value;
  return a
}

// 1 - Object.defineProperty

var o = Object.defineProperty || function (t, n, e) { t[n] = e.value };

// 2 - Object.defineProperty

if (Object.defineProperties) {
  var d = Object.getOwnPropertyDescriptor(b, c);
  d && Object.defineProperty(a, c, d)
} else a[c] = b[c];

// Object.fromEntries

Object.fromEntries || (Object.fromEntries = function (e) {
  return Array.from(e).reduce((function (e, t) {
    return e[t[0]] = t[1],
      e
  }
  ), {})
})

// Object.getOwnPropertyDescriptor

if (!Object.getOwnPropertyDescriptor) {
  var y = "Object.getOwnPropertyDescriptor called on a non-object: ";
  Object.getOwnPropertyDescriptor = function (t, n) {
    if (typeof t != "object" && typeof t != "function" || t === null)
      throw new TypeError(y + t);
    if (!f(t, n))
      return;
    var r, i, s;
    r = {
      enumerable: !0,
      configurable: !0
    };
    if (d) {
      var u = t.__proto__;
      t.__proto__ = o;
      var i = h(t, n)
        , s = p(t, n);
      t.__proto__ = u;
      if (i || s)
        return i && (r.get = i), s && (r.set = s), r;
    }
    return r.value = t[n], r;
  }
}

// Object.getOwnPropertyDescriptors

function fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? de(Object(n), !0).forEach((function (t) {
      pe(e, t, n[t])
    }
    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : de(Object(n)).forEach((function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
    }
    ))
  }
  return e
}

// 1 - Object.getOwnPropertyNames

Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (t) {
  return Object.keys(t)
});

// 2 - Object.getOwnPropertyNames

var C = function (e) {
  return C = Object.getOwnPropertyNames || function (e) {
    var t = [];
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
    return t
  },
    C(e)
};

// 1 - Object.getOwnPropertySymbols

function a(t, d) {
  var e, n = Object.keys(t);
  return Object.getOwnPropertySymbols && (e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function (d) {
    return Object.getOwnPropertyDescriptor(t, d).enumerable
  })), n.push.apply(n, e)), n
}

// 2 - Object.getOwnPropertySymbols

var o = this && this.__rest || function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var o = 0;
    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  }
  return n;
};

// 1 - Object.getPrototypeOf

Object.getPrototypeOf || (Object.getPrototypeOf = function (t) {
  return t.__proto__ || (t.constructor ? t.constructor.prototype : o)
});

// 2 - Object.getPrototypeOf

var h = Object.getPrototypeOf || function (e) {
  return e.__proto__
}

// 3 - Object.getPrototypeOf

var t = Object.getPrototypeOf ? function (e) {
  return Object.getPrototypeOf(e)
}
  : function (e) {
    return e.__proto__
  }

// 4 - Object.getPrototypeOf

var x = function (e) {
  function t(n) {
    return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e)
    }
      ,
      e.exports.__esModule = !0,
      e.exports.default = e.exports,
      t(n)
  }
}

// 1 - Object.is

function hr(e, t) {
  return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
}
var gr = "function" == typeof Object.is ? Object.is : hr;

// 1 -Object.setPrototypeOf

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

// 2 - Object.setPrototypeOf

var a = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function (t, n) {
  return t.__proto__ = n, t
} : function (t, n) {
  for (var r in n) t.hasOwnProperty(r) || (t[r] = n[r]);
  return t
});

// 3 - Object.setPrototypeOf

var n = function (t, r) {
  return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, n) {
    t.__proto__ = n
  } || function (t, n) {
    for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r])
  })(t, r)
};

// 4 - Object.setPrototypeOf

function p8(e, t) {
  return p8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    return e.__proto__ = t, e
  }, p8(e, t)
}

// 5 - Object.setPrototypeOf

var ra;
if ("function" == typeof Object.setPrototypeOf)
  ra = Object.setPrototypeOf;
else {
  var sa;
  a: {
    var ta = {
      a: !0
    },
      ua = {};
    try {
      ua.__proto__ = ta;
      sa = ua.a;
      break a;
    } catch (a) { }
    sa = !1;
  }
  ra = sa
    ? function (a, b) {
      a.__proto__ = b;
      if (a.__proto__ !== b)
        throw new TypeError(a + " is not extensible");
      return a;
    }
    : null;
}

// 6 - Object.setPrototypeOf

function S(d, t) {
  return (S = Object.setPrototypeOf || function (d, t) {
    return d.__proto__ = t, d
  })(d, t)
}

// 7 - Object.setPrototypeOf

function A(d) {
  return (A = Object.setPrototypeOf ? Object.getPrototypeOf : function (d) {
    return d.__proto__ || Object.getPrototypeOf(d)
  })(d)
}

// 8 - Object.setPrototypeOf

function a(e, n, t) {
  var i = t(4),
    a = t(35),
    r = t(298);
  e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
    var e, n = !1, t = {};
    try {
      (e = i(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(t, []),
        n = t instanceof Array
    } catch (o) { }
    return function (t, i) {
      return a(t), r(i), n ? e(t, i) : t.__proto__ = i, t
    }
  }() : void 0)
}

// Object.values

var u = Object.values || function (e) {
  return Object.keys(e).map((function (t) {
    return e[t]
  }))
}


// 1 - Object.assign

var assign = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];

    for (var r in n) {
      if (Object.prototype.hasOwnProperty.call(n, r)) {
        e[r] = n[r]
      }
    }
  }
  return e;
};

// 2 - Object.assign

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  }
  return __assign.apply(this, arguments);
};

// 3 - Object.assign

var i = this && this.__assign || function () {
  return i = Object.assign || function (e) {
    for (var t, n = 1, r = arguments.length; n < r; n++)
      for (var o in t = arguments[n])
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e;
  },
    i.apply(this, arguments);
};

// 4 - Object.assign

var c = function () {
  return (c = Object.assign || function (t) {
    for (var n, r = 1, e = arguments.length; r < e; r++)
      for (var i in n = arguments[r])
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    return t
  }).apply(this, arguments)
};

// 5 - Object.assign

function a() {
  return a = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
    }
    return e
  }, a.apply(this, arguments)
}

// 6 - Object.assign

var pa = "function" == typeof Object.assign ? Object.assign : function (a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
  }
  return a
}

// 7 - Object.assign

var __assign = (this && this.__assign) || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
};

// 8 - Object.assign

"function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
  value: function (e, t) {
    if (null == e)
      throw new TypeError("Cannot convert undefined or null to object");
    for (var o = Object(e), n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      if (null != r)
        for (var i in r)
          Object.prototype.hasOwnProperty.call(r, i) && (o[i] = r[i])
    }
    return o
  },
  writable: !0,
  configurable: !0
});
