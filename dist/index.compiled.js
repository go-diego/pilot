"use strict";

var _service = _interopRequireDefault(require("./service.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check that document loads
var service = new _service.default();
service.getApiKey().then(function (response) {
  return console.log("YOU APIKEY IS ".concat(response));
});
