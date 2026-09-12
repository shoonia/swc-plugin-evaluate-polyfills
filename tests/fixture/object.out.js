// 1 - Object.create
var qa = Object.create;
// 2 - Object.create
var g = function(e, t, n, r) {
    void 0 === r && (r = n);
    var o = Object.getOwnPropertyDescriptor(t, n);
    o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = {
        enumerable: !0,
        get: function() {
            return t[n];
        }
    }), Object.defineProperty(e, r, o);
};
// 3 - Object.create
;
// 4 - Object.create
var __createBinding = this && this.__createBinding || function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
};
// Object.defineProperties
var ca = Object.defineProperty;
// 1 - Object.defineProperty
var o = Object.defineProperty;
{
    var d = Object.getOwnPropertyDescriptor(b, c);
    d && Object.defineProperty(a, c, d);
}// Object.fromEntries
;
// Object.getOwnPropertyDescriptor
;
// Object.getOwnPropertyDescriptors
function fe(e) {
    for(var t = 1; t < arguments.length; t++){
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? de(Object(n), !0).forEach(function(t) {
            pe(e, t, n[t]);
        }) : Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
    }
    return e;
}
// 1 - Object.getOwnPropertyNames
;
// 2 - Object.getOwnPropertyNames
var C = function(e) {
    return C = Object.getOwnPropertyNames, C(e);
};
// 1 - Object.getOwnPropertySymbols
function a(t, d) {
    var e, n = Object.keys(t);
    return e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function(d) {
        return Object.getOwnPropertyDescriptor(t, d).enumerable;
    })), n.push.apply(n, e), n;
}
// 2 - Object.getOwnPropertySymbols
var o = this && this.__rest || function(e, t) {
    var n = {};
    for(var r in e)Object.hasOwn(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e) {
        var o = 0;
        for(r = Object.getOwnPropertySymbols(e); o < r.length; o++)t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
    }
    return n;
};
// 1 - Object.getPrototypeOf
;
// 2 - Object.getPrototypeOf
var h = Object.getPrototypeOf;
// 3 - Object.getPrototypeOf
var t = function(e) {
    return Object.getPrototypeOf(e);
};
// 4 - Object.getPrototypeOf
var x = function(e) {
    function t(n) {
        return e.exports = t = Object.getPrototypeOf.bind(), e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
    }
};
// 1 - Object.is
function hr(e, t) {
    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
}
var gr = Object.is;
// 1 -Object.setPrototypeOf
var extendStatics = function(d, b1) {
    extendStatics = Object.setPrototypeOf;
    return extendStatics(d, b1);
};
// 2 - Object.setPrototypeOf
var a = Object.setPrototypeOf;
// 3 - Object.setPrototypeOf
var n = function(t, r) {
    return (n = Object.setPrototypeOf)(t, r);
};
// 4 - Object.setPrototypeOf
function p8(e, t) {
    return p8 = Object.setPrototypeOf.bind(), p8(e, t);
}
// 5 - Object.setPrototypeOf
var ra;
ra = Object.setPrototypeOf;
// 6 - Object.setPrototypeOf
function S(d, t) {
    return (S = Object.setPrototypeOf)(d, t);
}
// 7 - Object.setPrototypeOf
function A(d) {
    return (A = Object.getPrototypeOf)(d);
}
// 8 - Object.setPrototypeOf
function a(e, n, t) {
    var i = t(4), a = t(35), r = t(298);
    e.exports = Object.setPrototypeOf;
}
// Object.values
var u = Object.values;
// 1 - Object.assign
var assign = Object.assign;
// 2 - Object.assign
var __assign = function() {
    __assign = Object.assign;
    return __assign.apply(this, arguments);
};
// 3 - Object.assign
var i = this && this.__assign || function() {
    return i = Object.assign, i.apply(this, arguments);
};
// 4 - Object.assign
var c = function() {
    return (c = Object.assign).apply(this, arguments);
};
// 5 - Object.assign
function a() {
    return a = Object.assign.bind(), a.apply(this, arguments);
}
// 6 - Object.assign
var pa = Object.assign;
// 7 - Object.assign
var __assign = this && this.__assign || Object.assign;
// 8 - Object.assign
;
