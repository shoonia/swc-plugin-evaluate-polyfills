// String.prototype.startsWith

String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
  return t = t || 0, this.indexOf(e, t) === t
})

// String.prototype.endsWith

String.prototype.endsWith || Object.defineProperty(String.prototype, "endsWith", {
  value: function (e, t) {
    return (void 0 === t || t > this.length) && (t = this.length),
      this.substring(t - e.length, t) === e
  },
  writable: !0,
  configurable: !0
})

// String.prototype.includes

String.prototype.includes || Object.defineProperty(String.prototype, "includes", {
  value: function (e, t) {
    return !((t = "number" != typeof t ? 0 : t) + e.length > this.length) && -1 !== this.indexOf(e, t)
  },
  writable: !0,
  configurable: !0
})

// String.prototype.padStart

String.prototype.padStart || (String.prototype.padStart = function (e, t) {
  return e >>= 0,
    t = String(void 0 !== t ? t : " "),
    this.length >= e ? String(this) : ((e -= this.length) > t.length && (t += t.repeat(e / t.length)),
      t.slice(0, e) + String(this))
})

// String.prototype.trim

var _ = "	\\n\\x0b\\f\\r \\u00a0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\u2028\\u2029\\ufeff";
if (!String.prototype.trim || _.trim()) {
  _ = "[" + _ + "]";
  var D = new RegExp("^" + _ + _ + "*")
    , P = new RegExp(_ + _ + "*$");
  String.prototype.trim = function () {
    return String(this).replace(D, "").replace(P, "")
  }
}
