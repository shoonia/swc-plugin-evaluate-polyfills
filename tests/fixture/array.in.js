var isArray = Array.isArray || function (e) {
  return "[object Array]" === Object.prototype.toString.call(e);
}

// Array.prototype.fill

Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
  value: function (e) {
    if (null == this)
      throw new TypeError("this is null or not defined");
    for (var t = Object(this), o = t.length >>> 0, n = arguments[1] >> 0, r = n < 0 ? Math.max(o + n, 0) : Math.min(n, o), n = arguments[2], n = void 0 === n ? o : n >> 0, i = n < 0 ? Math.max(o + n, 0) : Math.min(n, o); r < i;)
      t[r] = e,
        r++;
    return t
  }
});

// Array.prototype.flat and Array.prototype.flatMap

Array.prototype.flat || (Array.prototype.flat = function (e, t) {
  return t = this.concat.apply([], this),
    e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
},
  Array.prototype.flatMap = function (e, t) {
    return this.map(e, t).flat()
  })

// Array.prototype.includes

Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
  value: function (e) {
    for (var t = [], o = 1; o < arguments.length; o++)
      t[o - 1] = arguments[o];
    if (null == this)
      throw new TypeError("Array.prototype.includes called on null or undefined");
    var n = Object(this)
      , r = parseInt(n.length, 10) || 0;
    if (0 !== r) {
      var i, s, a = t[1] || 0;
      for (0 <= a ? i = a : (i = r + a) < 0 && (i = 0); i < r;) {
        if (e === (s = n[i]) || e != e && s != s)
          return !0;
        i++
      }
    }
    return !1
  },
  writable: !0,
  configurable: !0
});

// Array.prototype.indexOf

var nc = Array.prototype.indexOf ? function (a, b) {
  return Array.prototype.indexOf.call(a, b, void 0)
} : function (a, b) {
  if ("string" === typeof a)
    return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
  for (var c = 0; c < a.length; c++)
    if (c in a && a[c] === b)
      return c;
  return -1
};

function u(e, t, n) {
  if (Array.prototype.indexOf) return e.indexOf(t, n);
  for (var r = n || 0; r < e.length; r++) if (e[r] === t) return r;
  return -1
}

// Array.prototype.lastIndexOf

if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1)
  Array.prototype.lastIndexOf = function (t) {
    var n = g && a(this) == "[object String]" ? this.split("") : F(this),
      r = n.length >>> 0;
    if (!r) return -1;
    var i = r - 1;
    arguments.length > 1 && (i = Math.min(i, H(arguments[1]))),
      i = i >= 0 ? i : r - Math.abs(i);
    for (; i >= 0; i--)  if (i in n && t === n[i]) return i;
    return -1
  };

// Array.prototype.reduceRight

Array.prototype.reduceRight || (Array.prototype.reduceRight = function (t) {
  var n = F(this)
    , r = g && a(this) == "[object String]" ? this.split("") : n
    , i = r.length >>> 0;
  if (a(t) != "[object Function]")
    throw new TypeError(t + " is not a function");
  if (!i && arguments.length == 1) throw new TypeError("reduceRight of empty array with no initial value");
  var s, o = i - 1;
  if (arguments.length >= 2) s = arguments[1];
  else
    do {
      if (o in r) {
        s = r[o--];
        break
      }
      if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
    } while (!0);
  do
    o in this && (s = t.call(void 0, s, r[o], o, n));
  while (o--);
  return s
});
