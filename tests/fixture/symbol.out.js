// Symbol.asyncIterator
;
// 1 - Symbol.iterator
function a(t) {
    var n1 = t[Symbol.iterator], r = 0;
    return n1 ? n1.call(t) : {
        next: function() {
            return t && r >= t.length && (t = void 0), {
                value: t && t[r++],
                done: !t
            };
        }
    };
}
// 1 - Symbol.iterator
var ma = function(a) {
    var b = a[Symbol.iterator];
    if (b) return b.call(a);
    if ("number" == typeof a.length) return {
        next: ba(a)
    };
    throw Error(String(a) + " is not an iterable or ArrayLike");
};
// 1 - Symbol.toStringTag
Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
}), Object.defineProperty(e, "__esModule", {
    value: !0
});
// 2 - Symbol.toStringTag
var r = n(6073);
e.exports = function() {
    return r();
};
//
function i(e1) {
    "@babel/helpers - typeof";
    return i = function(e1) {
        return typeof e1;
    }, i(e1);
}
//
function y(e1, t) {
    var n1 = e1 == null ? null : e1[Symbol.iterator] || e1["@@iterator"];
    if (n1 != null) {
        var r, o, a, i, l = [], s = !0, u = !1;
        try {
            if (a = (n1 = n1.call(e1)).next, t === 0) {
                if (Object(n1) !== n1) return;
                s = !1;
            } else for(; !(s = (r = a.call(n1)).done) && (l.push(r.value), l.length !== t); s = !0);
        } catch (e1) {
            u = !0, o = e1;
        } finally{
            try {
                if (!s && n1.return != null && (i = n1.return(), Object(i) !== i)) return;
            } finally{
                if (u) throw o;
            }
        }
        return l;
    }
}
//
function I(e1, t) {
    if (i(e1) != "object" || !e1) return e1;
    var n1 = e1[Symbol.toPrimitive];
    if (n1 !== void 0) {
        var r = n1.call(e1, t || "default");
        if (i(r) != "object") return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e1);
}
