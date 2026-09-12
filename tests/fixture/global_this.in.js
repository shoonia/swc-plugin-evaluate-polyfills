// 1

function ba(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math)
      return c
  }
  throw Error("Cannot find global object");
}
var ca = ba(this);

// 2

function Xo() {
  return "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : "undefined" != typeof self ? self : Yo
}

// 3

var K3 = function () {
  return "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : void 0 !== n.g ? n.g : "undefined" != typeof WorkerGlobalScope ? WorkerGlobalScope : G3
}
