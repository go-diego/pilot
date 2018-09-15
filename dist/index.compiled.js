/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _service = _interopRequireDefault(__webpack_require__(/*! ./service.js */ "./service.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./site.scss */ "./site.scss");

var service = new _service.default();

var suggestion = function suggestion(thumbnail, title, description) {
  var template = "\n    <div class=\"box\">\n        <article class=\"media\">\n            <figure class=\"media-left\">\n                <p class=\"image is-128x128\">\n                    <img src=\"".concat(thumbnail.url, "\">\n                </p>\n            </figure>\n            <div class=\"media-content\">\n                <div class=\"content\">\n                <p>\n                    <strong>").concat(title, "</strong>\n                    <br>\n                    ").concat(description, "\n                </p>\n            </div>\n        </article>\n    </div>");
  return template;
};

document.addEventListener("DOMContentLoaded", function (event) {
  var suggestionsContainer = document.querySelector("#suggestions");
  var searchBar = document.querySelector("#search-bar");
  var orderByViewsBtn = document.querySelector("#order-by-views");
  var orderByRatingsBtn = document.querySelector("#order-by-ratings");
  var suggestionsList = [];
  var order;
  orderByViewsBtn.addEventListener("click", function (event) {
    orderByViewsBtn.classList.toggle("is-warning");

    if (orderByRatingsBtn.classList.contains("is-warning")) {
      orderByRatingsBtn.classList.remove("is-warning");
      order = "viewCount";
      getSuggestions(searchBar.value, order);
    } else {
      getSuggestions(searchBar.value);
    }
  });
  orderByRatingsBtn.addEventListener("click", function (event) {
    orderByRatingsBtn.classList.toggle("is-warning");

    if (orderByViewsBtn.classList.contains("is-warning")) {
      orderByViewsBtn.classList.remove("is-warning");
      order = "rating";
      getSuggestions(searchBar.value, order);
    } else {
      getSuggestions(searchBar.value);
    }
  });
  searchBar.addEventListener("keyup", function (event) {
    if (searchBar.value == "") {
      orderByRatingsBtn.setAttribute("disabled", true);
      orderByViewsBtn.setAttribute("disabled", true);
      orderByRatingsBtn.classList.remove("is-warning");
      orderByViewsBtn.classList.remove("is-warning");
      suggestionsList = [];
      renderSuggestion(suggestionsList);
    } else {
      orderByRatingsBtn.removeAttribute("disabled");
      orderByViewsBtn.removeAttribute("disabled");
      getSuggestions(event.target.value, order);
    }
  });

  var getSuggestions = function getSuggestions(q, order) {
    return service.getSuggestions(q, order).then(function (response) {
      for (var i = 0; i < response.items.length; i++) {
        var snippet = response.items[i].snippet;
        suggestionsList.push(suggestion(snippet.thumbnails.high, snippet.title, snippet.description));
      }

      renderSuggestion(suggestionsList);
      suggestionsList = [];
    });
  };

  var renderSuggestion = function renderSuggestion(list) {
    var content = list.join("");
    suggestionsContainer.innerHTML = content;
  };
});

/***/ }),

/***/ "./service.js":
/*!********************!*\
  !*** ./service.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Service = function Service() {
  var _this = this;

  _classCallCheck(this, Service);

  _defineProperty(this, "getSuggestions", function (q) {
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "relevance";
    var url = new URL(_this.origin);

    var params = _objectSpread({}, _this.baseParams, {
      q: q,
      order: order
    });

    console.log("PARAMS", params);
    Object.keys(params).forEach(function (key) {
      return url.searchParams.append(key, params[key]);
    });
    return fetch(url, params).then(function (response) {
      return response.json();
    });
  });

  this.apiKey = "AIzaSyC6k7arDgNRPIlqtbyZZIhOKW5hfW3PTZ4";
  this.origin = "https://www.googleapis.com/youtube/v3/search";
  this.baseParams = {
    part: "snippet",
    //order: "viewCount",
    type: "video",
    videoDefinition: "high",
    key: this.apiKey,
    maxResults: 10
  };
};

exports.default = Service;

/***/ }),

/***/ "./site.scss":
/*!*******************!*\
  !*** ./site.scss ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=index.compiled.js.map