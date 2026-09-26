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

!function () {
  "use strict";
  var o = !("undefined" == typeof window || !window.document || !window.document.createElement)
    , i = {
      canUseDOM: o,
      canUseWorkers: "undefined" != typeof Worker,
      canUseEventListeners: o && !(!window.addEventListener && !window.attachEvent),
      canUseViewport: o && !!window.screen
    };
  void 0 === (r = function () {
    return i
  }
    .call(t, n, t, e)) || (e.exports = r)
}()
