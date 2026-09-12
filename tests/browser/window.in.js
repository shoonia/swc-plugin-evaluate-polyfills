function Q(a) {
  window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a)
}
function R(a) {
  window.removeEventListener ? window.removeEventListener("message", a, !1) : window.detachEvent && window.detachEvent("onmessage", a)
}
var S = function () {
  function a() {
    b = !1
  }
  if (!window.postMessage)
    return !1;
  var b = !0;
  Q(a);
  window.postMessage("", "*");
  R(a);
  return b
}()
