(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.cstorage = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   * JQuery storage extends default storage API to resolve cross-browser issues
   * @author       Sachin Singh
   * @dependencies jQuery 1.11+
   * @date         26/05/2018
   */
  var messages = {
    params: 'Insufficient parameters'
  };
  var _hasOwn = Object.prototype.hasOwnProperty;
  /**
   * Safety method for console logging
   * @param  {...any} args console arguments
   */

  function _log() {
    if (typeof console !== "undefined") {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }
  }
  /**
   * Safety method for console logging
   * @param  {...any} args console arguments
   */


  function _err() {
    if (typeof console !== "undefined") {
      var _console2;

      (_console2 = console).error.apply(_console2, arguments);
    }
  }
  /**
   * Check if passed value is a pure object
   * @param {*} key Any type of value which needs to be checked if it's an object
   */


  function _isObject(value) {
    return !Array.isArray(value) && value !== null && _typeof(value) === 'object';
  }
  /**
   * Sets user cookie
   * @param {string} key name of cookie
   * @param {string} value cookie value
   * @param {string} exp cookie expiry
   * @param {string} path url path
   * @param {string} domain supported domain
   */


  function setCookie() {
    if (arguments.length > 1) {
      var _arguments = Array.prototype.slice.call(arguments),
          key = _arguments[0],
          _arguments$ = _arguments[1],
          value = _arguments$ === void 0 ? '' : _arguments$,
          exp = _arguments[2],
          _arguments$2 = _arguments[3],
          path = _arguments$2 === void 0 ? '/' : _arguments$2,
          _arguments$3 = _arguments[4],
          domain = _arguments$3 === void 0 ? window.location.hostname : _arguments$3;

      var updateValue = value;

      if (value !== null && _typeof(value) === 'object') {
        updateValue = JSON.stringify(value);
      }

      var dt = new Date(); // If expiry is specified, then set the correct expiry date

      if (typeof exp === 'number') {
        // If exp is Infinity value then set a future date of year 2037 which is the estimated date of singularity
        if (exp === Infinity) {
          dt = new Date('Thu, 31 Dec 2037 00:00:00 GMT');
        } else {
          // Else reset the time to specified expiry date
          dt.setTime(dt.getTime() + exp * 24 * 60 * 60 * 1000);
        }
      } // Set expiry parameter


      var expires = exp ? "; expires=".concat(dt.toUTCString()) : ''; // Set cookie path parameter

      var cookiePath = "; path=".concat(path.trim());
      var cookieDomain = ''; // IE does not allow localhost domains

      if (['localhost', '127.0.0.1', null].indexOf(domain) === -1) {
        cookieDomain = "; domain=".concat(domain.trim());
      } // Mark the cookie as secure if created in secure context


      var secureCookieFlag = '';

      if (window.location.protocol === 'https:') {
        secureCookieFlag = '; secure';
      } // Set the cookie value


      document.cookie = "".concat(key, "=").concat(updateValue).concat(expires).concat(cookieDomain).concat(cookiePath).concat(secureCookieFlag);
    } else if (this.config && this.config.debug) {
      console.log(messages.params);
    }
  }
  /**
   * Gets cookie value
   * @param {string} key name of cookie
   */


  function getCookie() {
    if (arguments.length > 0) {
      var _arguments2 = Array.prototype.slice.call(arguments),
          key = _arguments2[0]; // Decode the cookie value if it is stored in encoded form


      var cookieString = decodeURIComponent(document.cookie);
      var allCookies = null; // Split the cookie string to get individual values

      allCookies = cookieString.split(';');

      if (allCookies.length) {
        // Check if any one key value pair matches the key
        // If yes then return its corresponding value
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = allCookies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;
            c = c.trim(); // Trim the key value pair to remove extra spaces

            if (c.indexOf("".concat(key, "=")) > -1) {
              // Return the value substring
              return c.substring("".concat(key, "=").length, c.length).trim();
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    return '';
  }
  /**
   * Removes a cookie
   * @param {string} key name of cookie
   * @param {string} path url path
   * @param {string} domain supported domain
   */


  function removeCookie() {
    if (arguments.length > 0) {
      var _arguments3 = Array.prototype.slice.call(arguments),
          key = _arguments3[0],
          _arguments3$ = _arguments3[1],
          path = _arguments3$ === void 0 ? '/' : _arguments3$,
          _arguments3$2 = _arguments3[2],
          domain = _arguments3$2 === void 0 ? window.location.hostname : _arguments3$2;

      var cookieDomain = '';
      var deletedCookieString = ''; // IE does not allow localhost domains
      // Hence check if passed domain is not localhost or null

      if (['localhost', '127.0.0.1', null].indexOf(domain) === -1) {
        cookieDomain = "; domain=".concat(domain.trim());
      }

      deletedCookieString = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC").concat(cookieDomain, "; path=").concat(path);
      document.cookie = deletedCookieString; // Check updated value to get deletion status

      return !getCookie(key).length;
    }

    return false;
  }
  /**
   * Resets existing cookie with new expiry
   * @param {string} key name of cookie
   * @param {string} value cookie value
   * @param {string} exp cookie expiry
   * @param {string} path url path
   * @param {string} domain supported domain
   */


  function resetCookie(key, value, exp, path, domain) {
    // Remove the existing cookie
    removeCookie(key, path, domain); // Set a new cookie with same name

    setCookie(key, value, exp, path, domain);
  }

  var store = {
    config: {
      // To enable or disable console logging
      debug: false
    },
    available: function available() {
      try {
        // If localStorage object is missing or setItem does not function properly on localStorage (e.g. Safari incognito)
        // This methos will throw an error which will tell us if storage API is usable
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        if (this.config.debug) {
          _log("Storage API is not supported in this environment");
        }

        return false;
      }
    },
    set: function set() {
      if (arguments.length > 1) {
        var _arguments4 = Array.prototype.slice.call(arguments),
            key = _arguments4[0],
            value = _arguments4[1],
            _arguments4$ = _arguments4[2],
            isSession = _arguments4$ === void 0 ? false : _arguments4$;

        var savedValue = value; // Check if value is stringifiable
        // All values are stores are string in storages

        if (value !== null && _typeof(value) === 'object') {
          savedValue = JSON.stringify(value);
        } // If storage is available, set the value in local or session storage based on flag


        if (this.available()) {
          try {
            window[isSession ? 'sessionStorage' : 'localStorage'].setItem(key, savedValue);
          } catch (e) {
            if (this.config.debug) {
              _err(e);
            }
          }
        } else {
          // Else set the value in cookie
          setCookie(key, savedValue, isSession ? Infinity : undefined);
        }
      } else {
        if (this.config.debug) {
          _log(messages.params);
        }
      }
    },
    remove: function remove() {
      if (arguments.length > 0) {
        var _arguments5 = Array.prototype.slice.call(arguments),
            key = _arguments5[0];

        if (this.available()) {
          try {
            // Try to remove the value from both the storages
            window.localStorage.removeItem(key);
            window.sessionStorage.removeItem(key); // Try to remove from cookie as well and return the combined result

            return !window.localStorage.key(key) || !window.sessionStorage.key(key) || removeCookie(key);
          } catch (e) {
            if (this.config.debug) {
              _err(e);
            }
          }
        }

        return removeCookie(key);
      } else {
        if (this.config.debug) {
          _log(messages.params);
        }
      }
    },
    getAll: function getAll() {
      var _this = this;

      if (arguments.length > 0) {
        var _arguments6 = Array.prototype.slice.call(arguments),
            key = _arguments6[0],
            _arguments6$ = _arguments6[1],
            isSession = _arguments6$ === void 0 ? false : _arguments6$;

        var returnValue = [];

        if (this.available()) {
          try {
            // Specify where to search for value
            // session storage is default as it will be searched regardless of flag
            var searchIn = ['sessionStorage'];

            if (!isSession) {
              // If session flag is not set expand the search to local storage
              searchIn.push('localStorage');
            } // Search for value in all specified storages and combine the results


            searchIn.forEach(function (type) {
              if (_hasOwn.call(window[type], key)) {
                returnValue.push({
                  value: window[type].getItem(key),
                  storage: type
                });
              }
            });
          } catch (e) {
            if (this.config.debug) {
              _err(e);
            }
          }
        } // Complete the search by looking up the key in cookie


        var cookieValue = getCookie(key);

        if (cookieValue) {
          returnValue.push({
            value: cookieValue,
            storage: 'cookie'
          });
        } // Return the combined results
        // Make sure that parsable data is parsed before the actual results are send


        return returnValue.map(function (data) {
          try {
            data.value = JSON.parse(data.value);
          } catch (e) {
            if (_this.config.debug) {
              _log(e);
            }
          }

          return data;
        });
      }

      return [];
    },
    get: function get() {
      if (arguments.length > 0) {
        var _arguments7 = Array.prototype.slice.call(arguments),
            key = _arguments7[0],
            _arguments7$ = _arguments7[1],
            isSession = _arguments7$ === void 0 ? false : _arguments7$;

        var valueList = this.getAll(key, isSession); // If not value is returned then return undefined

        if (valueList.length === 0) {
          return;
        } // If only one value is returned it means that value was present in only one of the storages
        // Or the browser supported only one type of storage (probably the cookie store)


        if (valueList.length === 1) {
          return valueList[0].value;
        } // Else the browser does have value stored either is session or local storage which will get preference over cookie
        // If stored in all three stores, fetch value based on isSession flag


        if (valueList.length === 3) {
          return valueList.filter(function (valueOb) {
            return valueOb.storage === (isSession ? 'sessionStorage' : 'localStorage');
          })[0].value;
        } // If only two stores are returned, value can be in any two combination of stores:
        // 1. [localStorage, cookie]
        // 2. [sessionStorage, cookie]
        // Get the combination of stores to determine from where the value needs to be fetched


        var storageTypes = valueList.map(function (valueOb) {
          return valueOb.storage;
        }); // If session flag is true check if value was stored in session storage
        // If not then return the cookie value

        if (isSession) {
          if (storageTypes.indexOf('sessionStorage') > -1) {
            return valueList.filter(function (valueOb) {
              return valueOb.storage === 'sessionStorage';
            })[0].value;
          }

          return valueList.filter(function (valueOb) {
            return valueOb.storage === 'cookie';
          })[0].value;
        } // If session flag is false, cookie value doesn't matter
        // Check for session or local storage and return the value


        return valueList.filter(function (valueOb) {
          return ['sessionStorage', 'localStorage'].indexOf(valueOb.storage) > -1;
        })[0].value;
      } else {
        if (this.config.debug) {
          _log(messages.params);
        }
      }
    },
    update: function update() {
      // This method has been revamped to treat different values differently and allow
      // more control over how we want to update the value with least amount of code
      // required to be written.
      // For example if value is a JSON object, you can use a callback and return an object
      // With the only key which requires updation. Rest the method will take care how
      // the value is updated
      // :::::Disclaimer:::::
      // This method is not ideal for updating cookies as it will modify the expiry value
      // Use it only if you don't care about cookie expiry date
      // Also, this method always runs an update even if nothing is changed. Therefore
      // Use it only if you really want to update something
      if (arguments.length === 2) {
        var self = this; // Make sure that both arguments are passed

        var _arguments8 = Array.prototype.slice.call(arguments),
            key = _arguments8[0],
            callback = _arguments8[1]; // Get all the values


        var values = this.getAll(key); // Get the updated value

        var updatedValue = null;

        if (typeof callback === 'function') {
          // It means that the second parameter was passed as a function which can work in number
          // of ways. It may or may not return a value.
          // It it returns a value, then directly use that value as an update
          // Else assume that the data value was modified directly in the stored object
          updatedValue = callback.apply(void 0, _toConsumableArray(values)); // All values are passed a separate parameters
        } else if (_typeof(callback) !== undefined) {
          // It means that the updated value was directly passed to the method
          try {
            updatedValue = JSON.parse(callback);
          } catch (e) {
            if (this.config.debug) {
              _err(e);
            }

            updatedValue = callback;
          }
        } // Check if we have a valid updated value


        if (updatedValue !== undefined) {
          // Check if update value is an object and target key also has an object value
          // In this scenario we need to update the object instead of replacing it
          values.forEach(function (valueOb) {
            var value = valueOb.value;

            if (_isObject(value) && _isObject(updatedValue)) {
              valueOb.value = _objectSpread({}, value, updatedValue);
            } else {
              valueOb.value = updatedValue;
            }
          });
        } // Write back all the values to their destinations


        values.forEach(function (_ref) {
          var value = _ref.value,
              store = _ref.storage;

          if (['sessionStorage', 'localStorage'].indexOf(store) > -1) {
            self.set(key, value, store === 'sessionStorage');
          }

          if (store === 'cookie') {
            setCookie(key, value);
          }
        });
      } else {
        if (this.config.debug) {
          _log(messages.params);
        }
      }
    }
  };

  var cstorage = _objectSpread({}, store, {
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie,
    resetCookie: resetCookie
  }); // Export store as ES6 default export

  return cstorage;

})));
//# sourceMappingURL=cstorage.js.map
