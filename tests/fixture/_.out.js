// ArrayBuffer.prototype.slice
;
// Date.now
;
// Function.prototype.bind
;
var Ea = function(a, b, c) {
    Ea = -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
    return Ea.apply(null, arguments);
};
// Math.clz32
var ft = Math.clz32, mt = Math.log, pt = Math.LN2;
function bt(e) {
    return 0 === (e >>>= 0) ? 32 : 31 - (mt(e) / pt | 0) | 0;
}
// Promise.prototype.finally
;
// Reflect / typeof Reflect.decorate == "undefined"
function ti(t, e, i, n) {
    var s, r = arguments.length, a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
    if ("function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n);
    else for(var o = t.length - 1; o >= 0; o--)(s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
    return r > 3 && a && Object.defineProperty(e, i, a), a;
}
// Polyfills for String.prototype.trimStart, String.prototype.trimEnd, Symbol.prototype.description, Array.prototype.flat, Array.prototype.flatMap, Promise.prototype.finally, and Object.fromEntries
var H = function() {
    Array.prototype.flat, Promise.prototype.finally, Object.fromEntries;
};
// RegExp.prototype
let x = (e, t, n)=>{
    "use strict";
    var r = n(29745), o = n(26506).supportsDescriptors, i = Object.getOwnPropertyDescriptor;
    e.exports = function() {
        if (o && "gim" === /a/gim.flags) {
            var e = i(RegExp.prototype, "flags");
            if (e && "function" == typeof e.get) {
                var t = "", n = {};
                if (Object.defineProperty(n, "hasIndices", {
                    get: function() {
                        t += "d";
                    }
                }), Object.defineProperty(n, "sticky", {
                    get: function() {
                        t += "y";
                    }
                }), e.get.call(n), "dy" === t) return e.get;
            }
        }
        return r;
    };
};
