// Reflect.decorate (not exist method)
function ti(t, e, i, n) {
    var s, r = arguments.length, a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
    if ("function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n);
    else for(var o = t.length - 1; o >= 0; o--)(s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
    return r > 3 && a && Object.defineProperty(e, i, a), a;
}
// Reflect.apply
function a(e, n, t) {
    var i = t(91), a = Function.prototype, r = a.apply, o = a.call;
    e.exports = Reflect.apply;
}
// 1 - Reflect.construct
function A() {
    ;
    if (Reflect.construct.sham) return !1;
    return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
    } catch (e) {
        return !1;
    }
}
// 2 - Reflect.construct
var eaa = function() {
    function a() {
        function e() {}
        new e;
        Reflect.construct(e, [], l());
        return new e instanceof e;
    }
    {
        if (a()) return Reflect.construct;
        var c = Reflect.construct;
        return function(e, f, g) {
            e = c(e, f);
            g && Reflect.setPrototypeOf(e, g.prototype);
            return e;
        };
    }
    return function(e, f, g) {
        g === void 0 && (g = e);
        g = baa(g.prototype || Object.prototype);
        return Function.prototype.apply.call(e, g, f) || g;
    };
}();
// Reflect.getPrototypeOf
// Real code example (maybe it has a but, because `typeof Reflect == "object")
var R = Object.getPrototypeOf;
// Reflect.ownKeys
var $ = Reflect.ownKeys;
