// Number.isFinite

exports.isFinite = Number.isFinite || function (value) {
  return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
};

// Number.isInteger

var isFinite = require("is-finite");
module.exports = Number.isInteger || function (val) {
  return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
};

// Number.isNaN

Number.isNaN = Number.isNaN || function (a) {
  return "number" == typeof a && a !== a;
};
