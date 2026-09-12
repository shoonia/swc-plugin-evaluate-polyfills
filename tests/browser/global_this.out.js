// 1
function ba(a) {
    a = [
        globalThis,
        a,
        window,
        "object" == typeof self && self,
        "object" == typeof global && global
    ];
    for(var b = 0; b < a.length; ++b){
        var c = a[b];
        if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);
// 2
function Xo() {
    return globalThis;
}
// 3
var K3 = function() {
    return window;
};
