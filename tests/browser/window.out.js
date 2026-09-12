function Q(a) {
    window.addEventListener("message", a, !1);
}
function R(a) {
    window.removeEventListener("message", a, !1);
}
var S = function() {
    function a() {
        b = !1;
    }
    ;
    var b = !0;
    Q(a);
    window.postMessage("", "*");
    R(a);
    return b;
}();
