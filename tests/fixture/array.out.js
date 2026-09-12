var isArray = Array.isArray;
// Array.prototype.fill
;
// Array.prototype.flat and Array.prototype.flatMap
;
// Array.prototype.includes
;
// Array.prototype.indexOf
var nc = function(a1, b) {
    return Array.prototype.indexOf.call(a1, b, void 0);
};
function u(e, t, n) {
    return e.indexOf(t, n);
    for(var r = n || 0; r < e.length; r++)if (e[r] === t) return r;
    return -1;
}
// Array.prototype.lastIndexOf
if ([
    0,
    1
].lastIndexOf(0, -3) != -1) Array.prototype.lastIndexOf = function(t) {
    var n = g && a(this) == "[object String]" ? this.split("") : F(this), r = n.length >>> 0;
    if (!r) return -1;
    var i = r - 1;
    arguments.length > 1 && (i = Math.min(i, H(arguments[1]))), i = i >= 0 ? i : r - Math.abs(i);
    for(; i >= 0; i--)if (i in n && t === n[i]) return i;
    return -1;
};
// Array.prototype.reduceRight
;
