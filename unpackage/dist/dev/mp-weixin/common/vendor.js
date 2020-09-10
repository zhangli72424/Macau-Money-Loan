(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!******************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/store/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 8));

var _state = _interopRequireDefault(__webpack_require__(/*! ./state.js */ 13));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations.js */ 14));
var _getters = _interopRequireDefault(__webpack_require__(/*! ./getters.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  getters: _getters.default });var _default =


store;exports.default = _default;

/***/ }),

/***/ 13:
/*!******************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/store/state.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  // requestUrl: "http://eakcs.blockcoinchipsup.com",
  // requestUrl: "http://116.204.169.72",
  requestUrl: "http://61.111.129.5",
  incode: uni.getStorageSync('code') || { code: 86, name: "中国" },
  lang_type: uni.getStorageSync('lang') || 'chs',
  area: uni.getStorageSync('area') || {},
  loginInfo: uni.getStorageSync('loginInfo') || {},
  login: uni.getStorageSync('login') || {},
  user: uni.getStorageSync('user') || '',
  pass: uni.getStorageSync('pass') || '',
  islogin: '',
  coins: '',
  gesturePassword: uni.getStorageSync('gesturePassword') || '',
  mdpass: uni.getStorageSync('mdpass') || '',
  textArr: {
    chs: ["首页", "资产", "钱包", "我的"],
    en: ["Home", "Allet", "Wallet", "Mine"] },

  bulletin: {},
  weixinzhifu: {},
  isUpline: false,
  plan: '',
  firstTeam: false };var _default =

state;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/store/mutations.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var mutatinos = {
  setArea: function setArea(state, val) {
    state.area = val;
    uni.setStorageSync('area', val);
  },
  setLogin: function setLogin(state, val) {
    state.login = val;
    uni.setStorageSync('login', val);
  },
  setLoginTime: function setLoginTime(state, val) {
    state.loginTime = val;
    uni.setStorageSync('loginTime', val);
  },
  setIncode: function setIncode(state, val) {
    state.incode = val;
    uni.setStorageSync('code', val);
  },
  setLoginInfo: function setLoginInfo(state, val) {
    state.loginInfo = val;
    uni.setStorageSync('loginInfo', val);
  },
  setUser: function setUser(state, val) {
    state.user = val;
    uni.setStorageSync('user', val);
  },
  setLangType: function setLangType(state, val) {
    state.lang_type = val;
    uni.setStorageSync('lang', val);
  },
  setPass: function setPass(state, val) {
    state.pass = val;
    uni.setStorageSync('pass', val);
  },
  setIslogin: function setIslogin(state, val) {
    state.islogin = val;
  },
  setGesturePassword: function setGesturePassword(state, val) {
    state.gesturePassword = val;
    uni.setStorageSync('gesturePassword', val);
  },
  setCoin: function setCoin(state, val) {
    state.coins = val;
  },
  setMdpass: function setMdpass(state, val) {
    state.mdpass = val;
    uni.setStorageSync('mdpass', val);
  },
  setBulletin: function setBulletin(state, val) {
    state.bulletin = val;
  },
  setWeixinZhifu: function setWeixinZhifu(state, val) {
    state.weixinzhifu = val;
  },
  setIsUpline: function setIsUpline(state, val) {
    state.isUpline = val;
  },
  setPlan: function setPlan(state, val) {
    state.plan = val;
  },
  setFirstTeam: function setFirstTeam(state, val) {
    state.firstTeam = val;
  } };var _default =

mutatinos;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!********************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/store/getters.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var getters = {
  getArea: function getArea(state) {
    return state.area;
  },
  getLogin: function getLogin(state) {
    return state.login;
  },
  getLoginTime: function getLoginTime(state) {
    return state.loginTime;
  },
  getRequestUrl: function getRequestUrl(state) {
    return state.requestUrl;
  },
  getLangType: function getLangType(state) {
    return state.lang_type;
  },
  getLang: function getLang(state) {
    return state.lang_type == 'chs' ? 1 : 2;
  },
  getLoginInfo: function getLoginInfo(state) {
    return state.loginInfo;
  },
  getIncode: function getIncode(state) {
    return state.incode;
  },
  getTextArr: function getTextArr(state) {
    return state.textArr;
  },
  getUser: function getUser(state) {
    return state.user;
  },
  getPass: function getPass(state) {
    return state.pass;
  },
  getGesturePassword: function getGesturePassword(state) {
    return state.gesturePassword;
  },
  getCoin: function getCoin(state) {
    return state.coins;
  },
  getMdpass: function getMdpass(state) {
    return state.mdpass;
  },
  getBulletin: function getBulletin(state) {
    return state.bulletin;
  },
  getWeixinzhifu: function getWeixinzhifu(state) {
    return state.weixinzhifu;
  },
  getIsUpline: function getIsUpline(state) {
    return state.isUpline;
  },
  getPlan: function getPlan(state) {
    return state.plan;
  },
  getFirstTeam: function getFirstTeam(state) {
    return state.firstTeam;
  } };var _default =



getters;exports.default = _default;

/***/ }),

/***/ 16:
/*!*****************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/lang/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vueI18n = _interopRequireDefault(__webpack_require__(/*! vue-i18n */ 17));
var _en = _interopRequireDefault(__webpack_require__(/*! ./lang/en.js */ 18));
var _zhCH = _interopRequireDefault(__webpack_require__(/*! ./lang/zhCH.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vueI18n.default);

var i18n = new _vueI18n.default({
  locale: uni.getStorageSync('lang') || 'chs',
  messages: {
    'en': _en.default,
    'chs': _zhCH.default } });var _default =



i18n;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!***************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/vue-i18n.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-i18n v8.10.0 
 * (c) 2019 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(this, function () {'use strict';

  /*  */

  /**
          * constants
          */

  var numberFormatKeys = [
  'style',
  'currency',
  'currencyDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'localeMatcher',
  'formatMatcher'];


  /**
                     * utilities
                     */

  function warn(msg, err) {
    if (typeof console !== 'undefined') {
      console.warn('[vue-i18n] ' + msg);
      /* istanbul ignore if */
      if (err) {
        console.warn(err.stack);
      }
    }
  }

  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  var toString = Object.prototype.toString;
  var OBJECT_STRING = '[object Object]';
  function isPlainObject(obj) {
    return toString.call(obj) === OBJECT_STRING;
  }

  function isNull(val) {
    return val === null || val === undefined;
  }

  function parseArgs() {
    var args = [],len = arguments.length;
    while (len--) {args[len] = arguments[len];}

    var locale = null;
    var params = null;
    if (args.length === 1) {
      if (isObject(args[0]) || Array.isArray(args[0])) {
        params = args[0];
      } else if (typeof args[0] === 'string') {
        locale = args[0];
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        locale = args[0];
      }
      /* istanbul ignore if */
      if (isObject(args[1]) || Array.isArray(args[1])) {
        params = args[1];
      }
    }

    return { locale: locale, params: params };
  }

  function looseClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function remove(arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  function merge(target) {
    var arguments$1 = arguments;

    var output = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments$1[i];
      if (source !== undefined && source !== null) {
        var key = void 0;
        for (key in source) {
          if (hasOwn(source, key)) {
            if (isObject(source[key])) {
              output[key] = merge(output[key], source[key]);
            } else {
              output[key] = source[key];
            }
          }
        }
      }
    }
    return output;
  }

  function looseEqual(a, b) {
    if (a === b) {return true;}
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key]);
          });
        } else {
          /* istanbul ignore next */
          return false;
        }
      } catch (e) {
        /* istanbul ignore next */
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }

  /*  */

  function extend(Vue) {
    if (!Vue.prototype.hasOwnProperty('$i18n')) {
      // $FlowFixMe
      Object.defineProperty(Vue.prototype, '$i18n', {
        get: function get() {return this._i18n;} });

    }

    Vue.prototype.$t = function (key) {
      var values = [],len = arguments.length - 1;
      while (len-- > 0) {values[len] = arguments[len + 1];}

      var i18n = this.$i18n;
      return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this].concat(values));
    };

    Vue.prototype.$tc = function (key, choice) {
      var values = [],len = arguments.length - 2;
      while (len-- > 0) {values[len] = arguments[len + 2];}

      var i18n = this.$i18n;
      return i18n._tc.apply(i18n, [key, i18n.locale, i18n._getMessages(), this, choice].concat(values));
    };

    Vue.prototype.$te = function (key, locale) {
      var i18n = this.$i18n;
      return i18n._te(key, i18n.locale, i18n._getMessages(), locale);
    };

    Vue.prototype.$d = function (value) {
      var ref;

      var args = [],len = arguments.length - 1;
      while (len-- > 0) {args[len] = arguments[len + 1];}
      return (ref = this.$i18n).d.apply(ref, [value].concat(args));
    };

    Vue.prototype.$n = function (value) {
      var ref;

      var args = [],len = arguments.length - 1;
      while (len-- > 0) {args[len] = arguments[len + 1];}
      return (ref = this.$i18n).n.apply(ref, [value].concat(args));
    };
  }

  /*  */

  var mixin = {
    beforeCreate: function beforeCreate() {
      var options = this.$options;
      options.i18n = options.i18n || (options.__i18n ? {} : null);

      if (options.i18n) {
        if (options.i18n instanceof VueI18n) {
          // init locale messages via custom blocks
          if (options.__i18n) {
            try {
              var localeMessages = {};
              options.__i18n.forEach(function (resource) {
                localeMessages = merge(localeMessages, JSON.parse(resource));
              });
              Object.keys(localeMessages).forEach(function (locale) {
                options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
              });
            } catch (e) {
              {
                warn("Cannot parse locale messages via custom blocks.", e);
              }
            }
          }
          this._i18n = options.i18n;
          this._i18nWatcher = this._i18n.watchI18nData();
          this._i18n.subscribeDataChanging(this);
          this._subscribing = true;
        } else if (isPlainObject(options.i18n)) {
          // component local i18n
          if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
            options.i18n.root = this.$root;
            options.i18n.formatter = this.$root.$i18n.formatter;
            options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale;
            options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn;
            options.i18n.silentFallbackWarn = this.$root.$i18n.silentFallbackWarn;
            options.i18n.pluralizationRules = this.$root.$i18n.pluralizationRules;
            options.i18n.preserveDirectiveContent = this.$root.$i18n.preserveDirectiveContent;
          }

          // init locale messages via custom blocks
          if (options.__i18n) {
            try {
              var localeMessages$1 = {};
              options.__i18n.forEach(function (resource) {
                localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
              });
              options.i18n.messages = localeMessages$1;
            } catch (e) {
              {
                warn("Cannot parse locale messages via custom blocks.", e);
              }
            }
          }

          this._i18n = new VueI18n(options.i18n);
          this._i18nWatcher = this._i18n.watchI18nData();
          this._i18n.subscribeDataChanging(this);
          this._subscribing = true;

          if (options.i18n.sync === undefined || !!options.i18n.sync) {
            this._localeWatcher = this.$i18n.watchLocale();
          }
        } else {
          {
            warn("Cannot be interpreted 'i18n' option.");
          }
        }
      } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
        // root i18n
        this._i18n = this.$root.$i18n;
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
        // parent i18n
        this._i18n = options.parent.$i18n;
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      }
    },

    beforeDestroy: function beforeDestroy() {
      if (!this._i18n) {return;}

      var self = this;
      this.$nextTick(function () {
        if (self._subscribing) {
          self._i18n.unsubscribeDataChanging(self);
          delete self._subscribing;
        }

        if (self._i18nWatcher) {
          self._i18nWatcher();
          self._i18n.destroyVM();
          delete self._i18nWatcher;
        }

        if (self._localeWatcher) {
          self._localeWatcher();
          delete self._localeWatcher;
        }

        self._i18n = null;
      });
    } };


  /*  */

  var interpolationComponent = {
    name: 'i18n',
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'span' },

      path: {
        type: String,
        required: true },

      locale: {
        type: String },

      places: {
        type: [Array, Object] } },


    render: function render(h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var parent = ref.parent;

      var i18n = parent.$i18n;

      children = (children || []).filter(function (child) {
        return child.tag || (child.text = child.text.trim());
      });

      if (!i18n) {
        {
          warn('Cannot find VueI18n instance!');
        }
        return children;
      }

      var path = props.path;
      var locale = props.locale;

      var params = {};
      var places = props.places || {};

      var hasPlaces = Array.isArray(places) ?
      places.length > 0 :
      Object.keys(places).length > 0;

      var everyPlace = children.every(function (child) {
        if (child.data && child.data.attrs) {
          var place = child.data.attrs.place;
          return typeof place !== 'undefined' && place !== '';
        }
      });

      if (hasPlaces && children.length > 0 && !everyPlace) {
        warn('If places prop is set, all child elements must have place prop set.');
      }

      if (Array.isArray(places)) {
        places.forEach(function (el, i) {
          params[i] = el;
        });
      } else {
        Object.keys(places).forEach(function (key) {
          params[key] = places[key];
        });
      }

      children.forEach(function (child, i) {
        var key = everyPlace ?
        "" + child.data.attrs.place :
        "" + i;
        params[key] = child;
      });

      return h(props.tag, data, i18n.i(path, locale, params));
    } };


  /*  */

  var numberComponent = {
    name: 'i18n-n',
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'span' },

      value: {
        type: Number,
        required: true },

      format: {
        type: [String, Object] },

      locale: {
        type: String } },


    render: function render(h, ref) {
      var props = ref.props;
      var parent = ref.parent;
      var data = ref.data;

      var i18n = parent.$i18n;

      if (!i18n) {
        {
          warn('Cannot find VueI18n instance!');
        }
        return null;
      }

      var key = null;
      var options = null;

      if (typeof props.format === 'string') {
        key = props.format;
      } else if (isObject(props.format)) {
        if (props.format.key) {
          key = props.format.key;
        }

        // Filter out number format options only
        options = Object.keys(props.format).reduce(function (acc, prop) {
          var obj;

          if (numberFormatKeys.includes(prop)) {
            return Object.assign({}, acc, (obj = {}, obj[prop] = props.format[prop], obj));
          }
          return acc;
        }, null);
      }

      var locale = props.locale || i18n.locale;
      var parts = i18n._ntp(props.value, locale, key, options);

      var values = parts.map(function (part, index) {
        var obj;

        var slot = data.scopedSlots && data.scopedSlots[part.type];
        return slot ? slot((obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj)) : part.value;
      });

      return h(props.tag, {
        attrs: data.attrs,
        'class': data['class'],
        staticClass: data.staticClass },
      values);
    } };


  /*  */

  function bind(el, binding, vnode) {
    if (!assert(el, vnode)) {return;}

    t(el, binding, vnode);
  }

  function update(el, binding, vnode, oldVNode) {
    if (!assert(el, vnode)) {return;}

    var i18n = vnode.context.$i18n;
    if (localeEqual(el, vnode) &&
    looseEqual(binding.value, binding.oldValue) &&
    looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale))) {return;}

    t(el, binding, vnode);
  }

  function unbind(el, binding, vnode, oldVNode) {
    var vm = vnode.context;
    if (!vm) {
      warn('Vue instance does not exists in VNode context');
      return;
    }

    var i18n = vnode.context.$i18n || {};
    if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
      el.textContent = '';
    }
    el._vt = undefined;
    delete el['_vt'];
    el._locale = undefined;
    delete el['_locale'];
    el._localeMessage = undefined;
    delete el['_localeMessage'];
  }

  function assert(el, vnode) {
    var vm = vnode.context;
    if (!vm) {
      warn('Vue instance does not exists in VNode context');
      return false;
    }

    if (!vm.$i18n) {
      warn('VueI18n instance does not exists in Vue instance');
      return false;
    }

    return true;
  }

  function localeEqual(el, vnode) {
    var vm = vnode.context;
    return el._locale === vm.$i18n.locale;
  }

  function t(el, binding, vnode) {
    var ref$1, ref$2;

    var value = binding.value;

    var ref = parseValue(value);
    var path = ref.path;
    var locale = ref.locale;
    var args = ref.args;
    var choice = ref.choice;
    if (!path && !locale && !args) {
      warn('value type not supported');
      return;
    }

    if (!path) {
      warn('`path` is required in v-t directive');
      return;
    }

    var vm = vnode.context;
    if (choice) {
      el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [path, choice].concat(makeParams(locale, args)));
    } else {
      el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [path].concat(makeParams(locale, args)));
    }
    el._locale = vm.$i18n.locale;
    el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
  }

  function parseValue(value) {
    var path;
    var locale;
    var args;
    var choice;

    if (typeof value === 'string') {
      path = value;
    } else if (isPlainObject(value)) {
      path = value.path;
      locale = value.locale;
      args = value.args;
      choice = value.choice;
    }

    return { path: path, locale: locale, args: args, choice: choice };
  }

  function makeParams(locale, args) {
    var params = [];

    locale && params.push(locale);
    if (args && (Array.isArray(args) || isPlainObject(args))) {
      params.push(args);
    }

    return params;
  }

  var Vue;

  function install(_Vue) {
    /* istanbul ignore if */
    if (install.installed && _Vue === Vue) {
      warn('already installed.');
      return;
    }
    install.installed = true;

    Vue = _Vue;

    var version = Vue.version && Number(Vue.version.split('.')[0]) || -1;
    /* istanbul ignore if */
    if (version < 2) {
      warn("vue-i18n (" + install.version + ") need to use Vue 2.0 or later (Vue: " + Vue.version + ").");
      return;
    }

    extend(Vue);
    Vue.mixin(mixin);
    Vue.directive('t', { bind: bind, update: update, unbind: unbind });
    Vue.component(interpolationComponent.name, interpolationComponent);
    Vue.component(numberComponent.name, numberComponent);

    // use simple mergeStrategies to prevent i18n instance lose '__proto__'
    var strats = Vue.config.optionMergeStrategies;
    strats.i18n = function (parentVal, childVal) {
      return childVal === undefined ?
      parentVal :
      childVal;
    };
  }

  /*  */

  var BaseFormatter = function BaseFormatter() {
    this._caches = Object.create(null);
  };

  BaseFormatter.prototype.interpolate = function interpolate(message, values) {
    if (!values) {
      return [message];
    }
    var tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  };



  var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

  function parse(format) {
    var tokens = [];
    var position = 0;

    var text = '';
    while (position < format.length) {
      var _char = format[position++];
      if (_char === '{') {
        if (text) {
          tokens.push({ type: 'text', value: text });
        }

        text = '';
        var sub = '';
        _char = format[position++];
        while (_char !== undefined && _char !== '}') {
          sub += _char;
          _char = format[position++];
        }
        var isClosed = _char === '}';

        var type = RE_TOKEN_LIST_VALUE.test(sub) ?
        'list' :
        isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
        'named' :
        'unknown';
        tokens.push({ value: sub, type: type });
      } else if (_char === '%') {
        // when found rails i18n syntax, skip text capture
        if (format[position] !== '{') {
          text += _char;
        }
      } else {
        text += _char;
      }
    }

    text && tokens.push({ type: 'text', value: text });

    return tokens;
  }

  function compile(tokens, values) {
    var compiled = [];
    var index = 0;

    var mode = Array.isArray(values) ?
    'list' :
    isObject(values) ?
    'named' :
    'unknown';
    if (mode === 'unknown') {return compiled;}

    while (index < tokens.length) {
      var token = tokens[index];
      switch (token.type) {
        case 'text':
          compiled.push(token.value);
          break;
        case 'list':
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case 'named':
          if (mode === 'named') {
            compiled.push(values[token.value]);
          } else {
            {
              warn("Type of token '" + token.type + "' and format of value '" + mode + "' don't match!");
            }
          }
          break;
        case 'unknown':
          {
            warn("Detect 'unknown' type of token!");
          }
          break;}

      index++;
    }

    return compiled;
  }

  /*  */

  /**
          *  Path parser
          *  - Inspired:
          *    Vue.js Path parser
          */

  // actions
  var APPEND = 0;
  var PUSH = 1;
  var INC_SUB_PATH_DEPTH = 2;
  var PUSH_SUB_PATH = 3;

  // states
  var BEFORE_PATH = 0;
  var IN_PATH = 1;
  var BEFORE_IDENT = 2;
  var IN_IDENT = 3;
  var IN_SUB_PATH = 4;
  var IN_SINGLE_QUOTE = 5;
  var IN_DOUBLE_QUOTE = 6;
  var AFTER_PATH = 7;
  var ERROR = 8;

  var pathStateMachine = [];

  pathStateMachine[BEFORE_PATH] = {
    'ws': [BEFORE_PATH],
    'ident': [IN_IDENT, APPEND],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH] };


  pathStateMachine[IN_PATH] = {
    'ws': [IN_PATH],
    '.': [BEFORE_IDENT],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH] };


  pathStateMachine[BEFORE_IDENT] = {
    'ws': [BEFORE_IDENT],
    'ident': [IN_IDENT, APPEND],
    '0': [IN_IDENT, APPEND],
    'number': [IN_IDENT, APPEND] };


  pathStateMachine[IN_IDENT] = {
    'ident': [IN_IDENT, APPEND],
    '0': [IN_IDENT, APPEND],
    'number': [IN_IDENT, APPEND],
    'ws': [IN_PATH, PUSH],
    '.': [BEFORE_IDENT, PUSH],
    '[': [IN_SUB_PATH, PUSH],
    'eof': [AFTER_PATH, PUSH] };


  pathStateMachine[IN_SUB_PATH] = {
    "'": [IN_SINGLE_QUOTE, APPEND],
    '"': [IN_DOUBLE_QUOTE, APPEND],
    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
    ']': [IN_PATH, PUSH_SUB_PATH],
    'eof': ERROR,
    'else': [IN_SUB_PATH, APPEND] };


  pathStateMachine[IN_SINGLE_QUOTE] = {
    "'": [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_SINGLE_QUOTE, APPEND] };


  pathStateMachine[IN_DOUBLE_QUOTE] = {
    '"': [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_DOUBLE_QUOTE, APPEND] };


  /**
                                          * Check if an expression is a literal value.
                                          */

  var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }

  /**
     * Strip quotes from a string
     */

  function stripQuotes(str) {
    var a = str.charCodeAt(0);
    var b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ?
    str.slice(1, -1) :
    str;
  }

  /**
     * Determine the type of a character in a keypath.
     */

  function getPathCharType(ch) {
    if (ch === undefined || ch === null) {return 'eof';}

    var code = ch.charCodeAt(0);

    switch (code) {
      case 0x5B: // [
      case 0x5D: // ]
      case 0x2E: // .
      case 0x22: // "
      case 0x27: // '
        return ch;

      case 0x5F: // _
      case 0x24: // $
      case 0x2D: // -
        return 'ident';

      case 0x09: // Tab
      case 0x0A: // Newline
      case 0x0D: // Return
      case 0xA0: // No-break space
      case 0xFEFF: // Byte Order Mark
      case 0x2028: // Line Separator
      case 0x2029: // Paragraph Separator
        return 'ws';}


    return 'ident';
  }

  /**
     * Format a subPath, return its plain form if it is
     * a literal string or number. Otherwise prepend the
     * dynamic indicator (*).
     */

  function formatSubPath(path) {
    var trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(path)) {return false;}

    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
  }

  /**
     * Parse a string path into an array of segments
     */

  function parse$1(path) {
    var keys = [];
    var index = -1;
    var mode = BEFORE_PATH;
    var subPathDepth = 0;
    var c;
    var key;
    var newChar;
    var type;
    var transition;
    var action;
    var typeMap;
    var actions = [];

    actions[PUSH] = function () {
      if (key !== undefined) {
        keys.push(key);
        key = undefined;
      }
    };

    actions[APPEND] = function () {
      if (key === undefined) {
        key = newChar;
      } else {
        key += newChar;
      }
    };

    actions[INC_SUB_PATH_DEPTH] = function () {
      actions[APPEND]();
      subPathDepth++;
    };

    actions[PUSH_SUB_PATH] = function () {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = IN_SUB_PATH;
        actions[APPEND]();
      } else {
        subPathDepth = 0;
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[PUSH]();
        }
      }
    };

    function maybeUnescapeQuote() {
      var nextChar = path[index + 1];
      if (mode === IN_SINGLE_QUOTE && nextChar === "'" ||
      mode === IN_DOUBLE_QUOTE && nextChar === '"') {
        index++;
        newChar = '\\' + nextChar;
        actions[APPEND]();
        return true;
      }
    }

    while (mode !== null) {
      index++;
      c = path[index];

      if (c === '\\' && maybeUnescapeQuote()) {
        continue;
      }

      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap['else'] || ERROR;

      if (transition === ERROR) {
        return; // parse error
      }

      mode = transition[0];
      action = actions[transition[1]];
      if (action) {
        newChar = transition[2];
        newChar = newChar === undefined ?
        c :
        newChar;
        if (action() === false) {
          return;
        }
      }

      if (mode === AFTER_PATH) {
        return keys;
      }
    }
  }





  var I18nPath = function I18nPath() {
    this._cache = Object.create(null);
  };

  /**
      * External parse that check for a cache hit first
      */
  I18nPath.prototype.parsePath = function parsePath(path) {
    var hit = this._cache[path];
    if (!hit) {
      hit = parse$1(path);
      if (hit) {
        this._cache[path] = hit;
      }
    }
    return hit || [];
  };

  /**
      * Get path value from path string
      */
  I18nPath.prototype.getPathValue = function getPathValue(obj, path) {
    if (!isObject(obj)) {return null;}

    var paths = this.parsePath(path);
    if (paths.length === 0) {
      return null;
    } else {
      var length = paths.length;
      var last = obj;
      var i = 0;
      while (i < length) {
        var value = last[paths[i]];
        if (value === undefined) {
          return null;
        }
        last = value;
        i++;
      }

      return last;
    }
  };

  /*  */



  var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
  var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
  var bracketsMatcher = /[()]/g;
  var formatters = {
    'upper': function upper(str) {return str.toLocaleUpperCase();},
    'lower': function lower(str) {return str.toLocaleLowerCase();} };


  var defaultFormatter = new BaseFormatter();

  var VueI18n = function VueI18n(options) {
    var this$1 = this;
    if (options === void 0) options = {};

    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #290
    /* istanbul ignore if */
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
    }

    var locale = options.locale || 'en-US';
    var fallbackLocale = options.fallbackLocale || 'en-US';
    var messages = options.messages || {};
    var dateTimeFormats = options.dateTimeFormats || {};
    var numberFormats = options.numberFormats || {};

    this._vm = null;
    this._formatter = options.formatter || defaultFormatter;
    this._missing = options.missing || null;
    this._root = options.root || null;
    this._sync = options.sync === undefined ? true : !!options.sync;
    this._fallbackRoot = options.fallbackRoot === undefined ?
    true :
    !!options.fallbackRoot;
    this._silentTranslationWarn = options.silentTranslationWarn === undefined ?
    false :
    !!options.silentTranslationWarn;
    this._silentFallbackWarn = options.silentFallbackWarn === undefined ?
    false :
    !!options.silentFallbackWarn;
    this._dateTimeFormatters = {};
    this._numberFormatters = {};
    this._path = new I18nPath();
    this._dataListeners = [];
    this._preserveDirectiveContent = options.preserveDirectiveContent === undefined ?
    false :
    !!options.preserveDirectiveContent;
    this.pluralizationRules = options.pluralizationRules || {};

    this._exist = function (message, key) {
      if (!message || !key) {return false;}
      if (!isNull(this$1._path.getPathValue(message, key))) {return true;}
      // fallback for flat key
      if (message[key]) {return true;}
      return false;
    };

    this._initVM({
      locale: locale,
      fallbackLocale: fallbackLocale,
      messages: messages,
      dateTimeFormats: dateTimeFormats,
      numberFormats: numberFormats });

  };

  var prototypeAccessors = { vm: { configurable: true }, messages: { configurable: true }, dateTimeFormats: { configurable: true }, numberFormats: { configurable: true }, availableLocales: { configurable: true }, locale: { configurable: true }, fallbackLocale: { configurable: true }, missing: { configurable: true }, formatter: { configurable: true }, silentTranslationWarn: { configurable: true }, silentFallbackWarn: { configurable: true }, preserveDirectiveContent: { configurable: true } };

  VueI18n.prototype._initVM = function _initVM(data) {
    var silent = Vue.config.silent;
    Vue.config.silent = true;
    this._vm = new Vue({ data: data });
    Vue.config.silent = silent;
  };

  VueI18n.prototype.destroyVM = function destroyVM() {
    this._vm.$destroy();
  };

  VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging(vm) {
    this._dataListeners.push(vm);
  };

  VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging(vm) {
    remove(this._dataListeners, vm);
  };

  VueI18n.prototype.watchI18nData = function watchI18nData() {
    var self = this;
    return this._vm.$watch('$data', function () {
      var i = self._dataListeners.length;
      while (i--) {
        Vue.nextTick(function () {
          self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
        });
      }
    }, { deep: true });
  };

  VueI18n.prototype.watchLocale = function watchLocale() {
    /* istanbul ignore if */
    if (!this._sync || !this._root) {return null;}
    var target = this._vm;
    return this._root.$i18n.vm.$watch('locale', function (val) {
      target.$set(target, 'locale', val);
      target.$forceUpdate();
    }, { immediate: true });
  };

  prototypeAccessors.vm.get = function () {return this._vm;};

  prototypeAccessors.messages.get = function () {return looseClone(this._getMessages());};
  prototypeAccessors.dateTimeFormats.get = function () {return looseClone(this._getDateTimeFormats());};
  prototypeAccessors.numberFormats.get = function () {return looseClone(this._getNumberFormats());};
  prototypeAccessors.availableLocales.get = function () {return Object.keys(this.messages).sort();};

  prototypeAccessors.locale.get = function () {return this._vm.locale;};
  prototypeAccessors.locale.set = function (locale) {
    this._vm.$set(this._vm, 'locale', locale);
  };

  prototypeAccessors.fallbackLocale.get = function () {return this._vm.fallbackLocale;};
  prototypeAccessors.fallbackLocale.set = function (locale) {
    this._vm.$set(this._vm, 'fallbackLocale', locale);
  };

  prototypeAccessors.missing.get = function () {return this._missing;};
  prototypeAccessors.missing.set = function (handler) {this._missing = handler;};

  prototypeAccessors.formatter.get = function () {return this._formatter;};
  prototypeAccessors.formatter.set = function (formatter) {this._formatter = formatter;};

  prototypeAccessors.silentTranslationWarn.get = function () {return this._silentTranslationWarn;};
  prototypeAccessors.silentTranslationWarn.set = function (silent) {this._silentTranslationWarn = silent;};

  prototypeAccessors.silentFallbackWarn.get = function () {return this._silentFallbackWarn;};
  prototypeAccessors.silentFallbackWarn.set = function (silent) {this._silentFallbackWarn = silent;};

  prototypeAccessors.preserveDirectiveContent.get = function () {return this._preserveDirectiveContent;};
  prototypeAccessors.preserveDirectiveContent.set = function (preserve) {this._preserveDirectiveContent = preserve;};

  VueI18n.prototype._getMessages = function _getMessages() {return this._vm.messages;};
  VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats() {return this._vm.dateTimeFormats;};
  VueI18n.prototype._getNumberFormats = function _getNumberFormats() {return this._vm.numberFormats;};

  VueI18n.prototype._warnDefault = function _warnDefault(locale, key, result, vm, values) {
    if (!isNull(result)) {return result;}
    if (this._missing) {
      var missingRet = this._missing.apply(null, [locale, key, vm, values]);
      if (typeof missingRet === 'string') {
        return missingRet;
      }
    } else {
      if (!this._silentTranslationWarn) {
        warn(
        "Cannot translate the value of keypath '" + key + "'. " +
        'Use the value of keypath as default.');

      }
    }
    return key;
  };

  VueI18n.prototype._isFallbackRoot = function _isFallbackRoot(val) {
    return !val && !isNull(this._root) && this._fallbackRoot;
  };

  VueI18n.prototype._isSilentFallback = function _isSilentFallback(locale) {
    return this._silentFallbackWarn && (this._isFallbackRoot() || locale !== this.fallbackLocale);
  };

  VueI18n.prototype._interpolate = function _interpolate(
  locale,
  message,
  key,
  host,
  interpolateMode,
  values,
  visitedLinkStack)
  {
    if (!message) {return null;}

    var pathRet = this._path.getPathValue(message, key);
    if (Array.isArray(pathRet) || isPlainObject(pathRet)) {return pathRet;}

    var ret;
    if (isNull(pathRet)) {
      /* istanbul ignore else */
      if (isPlainObject(message)) {
        ret = message[key];
        if (typeof ret !== 'string') {
          if (!this._silentTranslationWarn && !this._isSilentFallback(locale)) {
            warn("Value of key '" + key + "' is not a string!");
          }
          return null;
        }
      } else {
        return null;
      }
    } else {
      /* istanbul ignore else */
      if (typeof pathRet === 'string') {
        ret = pathRet;
      } else {
        if (!this._silentTranslationWarn && !this._isSilentFallback(locale)) {
          warn("Value of key '" + key + "' is not a string!");
        }
        return null;
      }
    }

    // Check for the existence of links within the translated string
    if (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0) {
      ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
    }

    return this._render(ret, interpolateMode, values, key);
  };

  VueI18n.prototype._link = function _link(
  locale,
  message,
  str,
  host,
  interpolateMode,
  values,
  visitedLinkStack)
  {
    var ret = str;

    // Match all the links within the local
    // We are going to replace each of
    // them with its translation
    var matches = ret.match(linkKeyMatcher);
    for (var idx in matches) {
      // ie compatible: filter custom array
      // prototype method
      if (!matches.hasOwnProperty(idx)) {
        continue;
      }
      var link = matches[idx];
      var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
      var linkPrefix = linkKeyPrefixMatches[0];
      var formatterName = linkKeyPrefixMatches[1];

      // Remove the leading @:, @.case: and the brackets
      var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

      if (visitedLinkStack.includes(linkPlaceholder)) {
        {
          warn("Circular reference found. \"" + link + "\" is already visited in the chain of " + visitedLinkStack.reverse().join(' <- '));
        }
        return ret;
      }
      visitedLinkStack.push(linkPlaceholder);

      // Translate the link
      var translated = this._interpolate(
      locale, message, linkPlaceholder, host,
      interpolateMode === 'raw' ? 'string' : interpolateMode,
      interpolateMode === 'raw' ? undefined : values,
      visitedLinkStack);


      if (this._isFallbackRoot(translated)) {
        if (!this._silentTranslationWarn) {
          warn("Fall back to translate the link placeholder '" + linkPlaceholder + "' with root locale.");
        }
        /* istanbul ignore if */
        if (!this._root) {throw Error('unexpected error');}
        var root = this._root.$i18n;
        translated = root._translate(
        root._getMessages(), root.locale, root.fallbackLocale,
        linkPlaceholder, host, interpolateMode, values);

      }
      translated = this._warnDefault(
      locale, linkPlaceholder, translated, host,
      Array.isArray(values) ? values : [values]);

      if (formatters.hasOwnProperty(formatterName)) {
        translated = formatters[formatterName](translated);
      }

      visitedLinkStack.pop();

      // Replace the link with the translated
      ret = !translated ? ret : ret.replace(link, translated);
    }

    return ret;
  };

  VueI18n.prototype._render = function _render(message, interpolateMode, values, path) {
    var ret = this._formatter.interpolate(message, values, path);

    // If the custom formatter refuses to work - apply the default one
    if (!ret) {
      ret = defaultFormatter.interpolate(message, values, path);
    }

    // if interpolateMode is **not** 'string' ('row'),
    // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
    return interpolateMode === 'string' ? ret.join('') : ret;
  };

  VueI18n.prototype._translate = function _translate(
  messages,
  locale,
  fallback,
  key,
  host,
  interpolateMode,
  args)
  {
    var res =
    this._interpolate(locale, messages[locale], key, host, interpolateMode, args, [key]);
    if (!isNull(res)) {return res;}

    res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args, [key]);
    if (!isNull(res)) {
      if (!this._silentTranslationWarn && !this._silentFallbackWarn) {
        warn("Fall back to translate the keypath '" + key + "' with '" + fallback + "' locale.");
      }
      return res;
    } else {
      return null;
    }
  };

  VueI18n.prototype._t = function _t(key, _locale, messages, host) {
    var ref;

    var values = [],len = arguments.length - 4;
    while (len-- > 0) {values[len] = arguments[len + 4];}
    if (!key) {return '';}

    var parsedArgs = parseArgs.apply(void 0, values);
    var locale = parsedArgs.locale || _locale;

    var ret = this._translate(
    messages, locale, this.fallbackLocale, key,
    host, 'string', parsedArgs.params);

    if (this._isFallbackRoot(ret)) {
      if (!this._silentTranslationWarn && !this._silentFallbackWarn) {
        warn("Fall back to translate the keypath '" + key + "' with root locale.");
      }
      /* istanbul ignore if */
      if (!this._root) {throw Error('unexpected error');}
      return (ref = this._root).$t.apply(ref, [key].concat(values));
    } else {
      return this._warnDefault(locale, key, ret, host, values);
    }
  };

  VueI18n.prototype.t = function t(key) {
    var ref;

    var values = [],len = arguments.length - 1;
    while (len-- > 0) {values[len] = arguments[len + 1];}
    return (ref = this)._t.apply(ref, [key, this.locale, this._getMessages(), null].concat(values));
  };

  VueI18n.prototype._i = function _i(key, locale, messages, host, values) {
    var ret =
    this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
    if (this._isFallbackRoot(ret)) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to interpolate the keypath '" + key + "' with root locale.");
      }
      if (!this._root) {throw Error('unexpected error');}
      return this._root.$i18n.i(key, locale, values);
    } else {
      return this._warnDefault(locale, key, ret, host, [values]);
    }
  };

  VueI18n.prototype.i = function i(key, locale, values) {
    /* istanbul ignore if */
    if (!key) {return '';}

    if (typeof locale !== 'string') {
      locale = this.locale;
    }

    return this._i(key, locale, this._getMessages(), null, values);
  };

  VueI18n.prototype._tc = function _tc(
  key,
  _locale,
  messages,
  host,
  choice)
  {
    var ref;

    var values = [],len = arguments.length - 5;
    while (len-- > 0) {values[len] = arguments[len + 5];}
    if (!key) {return '';}
    if (choice === undefined) {
      choice = 1;
    }

    var predefined = { 'count': choice, 'n': choice };
    var parsedArgs = parseArgs.apply(void 0, values);
    parsedArgs.params = Object.assign(predefined, parsedArgs.params);
    values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
    return this.fetchChoice((ref = this)._t.apply(ref, [key, _locale, messages, host].concat(values)), choice);
  };

  VueI18n.prototype.fetchChoice = function fetchChoice(message, choice) {
    /* istanbul ignore if */
    if (!message && typeof message !== 'string') {return null;}
    var choices = message.split('|');

    choice = this.getChoiceIndex(choice, choices.length);
    if (!choices[choice]) {return message;}
    return choices[choice].trim();
  };

  /**
      * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
      * @param choicesLength {number} an overall amount of available choices
      * @returns a final choice index
     */
  VueI18n.prototype.getChoiceIndex = function getChoiceIndex(choice, choicesLength) {
    // Default (old) getChoiceIndex implementation - english-compatible
    var defaultImpl = function defaultImpl(_choice, _choicesLength) {
      _choice = Math.abs(_choice);

      if (_choicesLength === 2) {
        return _choice ?
        _choice > 1 ?
        1 :
        0 :
        1;
      }

      return _choice ? Math.min(_choice, 2) : 0;
    };

    if (this.locale in this.pluralizationRules) {
      return this.pluralizationRules[this.locale].apply(this, [choice, choicesLength]);
    } else {
      return defaultImpl(choice, choicesLength);
    }
  };

  VueI18n.prototype.tc = function tc(key, choice) {
    var ref;

    var values = [],len = arguments.length - 2;
    while (len-- > 0) {values[len] = arguments[len + 2];}
    return (ref = this)._tc.apply(ref, [key, this.locale, this._getMessages(), null, choice].concat(values));
  };

  VueI18n.prototype._te = function _te(key, locale, messages) {
    var args = [],len = arguments.length - 3;
    while (len-- > 0) {args[len] = arguments[len + 3];}

    var _locale = parseArgs.apply(void 0, args).locale || locale;
    return this._exist(messages[_locale], key);
  };

  VueI18n.prototype.te = function te(key, locale) {
    return this._te(key, this.locale, this._getMessages(), locale);
  };

  VueI18n.prototype.getLocaleMessage = function getLocaleMessage(locale) {
    return looseClone(this._vm.messages[locale] || {});
  };

  VueI18n.prototype.setLocaleMessage = function setLocaleMessage(locale, message) {
    this._vm.$set(this._vm.messages, locale, message);
  };

  VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage(locale, message) {
    this._vm.$set(this._vm.messages, locale, merge(this._vm.messages[locale] || {}, message));
  };

  VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat(locale) {
    return looseClone(this._vm.dateTimeFormats[locale] || {});
  };

  VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat(locale, format) {
    this._vm.$set(this._vm.dateTimeFormats, locale, format);
  };

  VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat(locale, format) {
    this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
  };

  VueI18n.prototype._localizeDateTime = function _localizeDateTime(
  value,
  locale,
  fallback,
  dateTimeFormats,
  key)
  {
    var _locale = locale;
    var formats = dateTimeFormats[_locale];

    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to '" + fallback + "' datetime formats from '" + locale + " datetime formats.");
      }
      _locale = fallback;
      formats = dateTimeFormats[_locale];
    }

    if (isNull(formats) || isNull(formats[key])) {
      return null;
    } else {
      var format = formats[key];
      var id = _locale + "__" + key;
      var formatter = this._dateTimeFormatters[id];
      if (!formatter) {
        formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
      }
      return formatter.format(value);
    }
  };

  VueI18n.prototype._d = function _d(value, locale, key) {
    /* istanbul ignore if */
    if (!VueI18n.availabilities.dateTimeFormat) {
      warn('Cannot format a Date value due to not supported Intl.DateTimeFormat.');
      return '';
    }

    if (!key) {
      return new Intl.DateTimeFormat(locale).format(value);
    }

    var ret =
    this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
    if (this._isFallbackRoot(ret)) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to datetime localization of root: key '" + key + "' .");
      }
      /* istanbul ignore if */
      if (!this._root) {throw Error('unexpected error');}
      return this._root.$i18n.d(value, key, locale);
    } else {
      return ret || '';
    }
  };

  VueI18n.prototype.d = function d(value) {
    var args = [],len = arguments.length - 1;
    while (len-- > 0) {args[len] = arguments[len + 1];}

    var locale = this.locale;
    var key = null;

    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        key = args[0];
      } else if (isObject(args[0])) {
        if (args[0].locale) {
          locale = args[0].locale;
        }
        if (args[0].key) {
          key = args[0].key;
        }
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        key = args[0];
      }
      if (typeof args[1] === 'string') {
        locale = args[1];
      }
    }

    return this._d(value, locale, key);
  };

  VueI18n.prototype.getNumberFormat = function getNumberFormat(locale) {
    return looseClone(this._vm.numberFormats[locale] || {});
  };

  VueI18n.prototype.setNumberFormat = function setNumberFormat(locale, format) {
    this._vm.$set(this._vm.numberFormats, locale, format);
  };

  VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat(locale, format) {
    this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
  };

  VueI18n.prototype._getNumberFormatter = function _getNumberFormatter(
  value,
  locale,
  fallback,
  numberFormats,
  key,
  options)
  {
    var _locale = locale;
    var formats = numberFormats[_locale];

    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to '" + fallback + "' number formats from '" + locale + " number formats.");
      }
      _locale = fallback;
      formats = numberFormats[_locale];
    }

    if (isNull(formats) || isNull(formats[key])) {
      return null;
    } else {
      var format = formats[key];

      var formatter;
      if (options) {
        // If options specified - create one time number formatter
        formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
      } else {
        var id = _locale + "__" + key;
        formatter = this._numberFormatters[id];
        if (!formatter) {
          formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
        }
      }
      return formatter;
    }
  };

  VueI18n.prototype._n = function _n(value, locale, key, options) {
    /* istanbul ignore if */
    if (!VueI18n.availabilities.numberFormat) {
      {
        warn('Cannot format a Number value due to not supported Intl.NumberFormat.');
      }
      return '';
    }

    if (!key) {
      var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
      return nf.format(value);
    }

    var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
    var ret = formatter && formatter.format(value);
    if (this._isFallbackRoot(ret)) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to number localization of root: key '" + key + "' .");
      }
      /* istanbul ignore if */
      if (!this._root) {throw Error('unexpected error');}
      return this._root.$i18n.n(value, Object.assign({}, { key: key, locale: locale }, options));
    } else {
      return ret || '';
    }
  };

  VueI18n.prototype.n = function n(value) {
    var args = [],len = arguments.length - 1;
    while (len-- > 0) {args[len] = arguments[len + 1];}

    var locale = this.locale;
    var key = null;
    var options = null;

    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        key = args[0];
      } else if (isObject(args[0])) {
        if (args[0].locale) {
          locale = args[0].locale;
        }
        if (args[0].key) {
          key = args[0].key;
        }

        // Filter out number format options only
        options = Object.keys(args[0]).reduce(function (acc, key) {
          var obj;

          if (numberFormatKeys.includes(key)) {
            return Object.assign({}, acc, (obj = {}, obj[key] = args[0][key], obj));
          }
          return acc;
        }, null);
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        key = args[0];
      }
      if (typeof args[1] === 'string') {
        locale = args[1];
      }
    }

    return this._n(value, locale, key, options);
  };

  VueI18n.prototype._ntp = function _ntp(value, locale, key, options) {
    /* istanbul ignore if */
    if (!VueI18n.availabilities.numberFormat) {
      {
        warn('Cannot format to parts a Number value due to not supported Intl.NumberFormat.');
      }
      return [];
    }

    if (!key) {
      var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
      return nf.formatToParts(value);
    }

    var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
    var ret = formatter && formatter.formatToParts(value);
    if (this._isFallbackRoot(ret)) {
      if (!this._silentTranslationWarn) {
        warn("Fall back to format number to parts of root: key '" + key + "' .");
      }
      /* istanbul ignore if */
      if (!this._root) {throw Error('unexpected error');}
      return this._root.$i18n._ntp(value, locale, key, options);
    } else {
      return ret || [];
    }
  };

  Object.defineProperties(VueI18n.prototype, prototypeAccessors);

  var availabilities;
  // $FlowFixMe
  Object.defineProperty(VueI18n, 'availabilities', {
    get: function get() {
      if (!availabilities) {
        var intlDefined = typeof Intl !== 'undefined';
        availabilities = {
          dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
          numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined' };

      }

      return availabilities;
    } });


  VueI18n.install = install;
  VueI18n.version = '8.10.0';

  return VueI18n;

});

/***/ }),

/***/ 18:
/*!*******************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/lang/lang/en.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  message: (_message = {
    // 国家地区
    state: "Country / Region",
    email: 'Email',
    p_EmailAddressOfTheAccountToBeBound: 'please input your email',
    // 注册
    welcome_to: "Login with account password",
    enter_username: "Enter username",
    enter_phone: "Enter email",
    re_enter_phone: "Enter email again",
    Mailboxes_are_inconsistent: "Mailboxes are inconsistent",
    enter_vcode: "Enter verification code",
    enter_login_pass: "Enter your password",
    enter_login_pass_again: "Enter your login password again",
    enter_invitation: "Enter the invitation code",
    register: "Register",
    go_login: "Already have an account? Now login",

    // 验证码
    get_vcode: "Get",
    resend_vcode: "Resend",

    // 登录
    chs: "Chs",
    en: "En",
    forget: "Forget password",
    login: "Login",
    go_register: "No account? Now register",
    enter_account: "Please input Username",
    hello_welcome: "Hello, welcome",

    // 忘记密码
    enter_new_pass: "Enter new password",
    enter_new_pass_again: "Enter new password again",
    confirm: "Confirm",
    retrieve_password: "Retrieve password",
    phone_num: "Phone number",

    // 设置登录密码
    inconsistent_login_password: "Inconsistent login password",
    Inconsistent_payment_password: "Inconsistent payment password",

    // 我的
    recommended_number: "Recommend",
    activation_token: "Activation Token",
    remaining_time: "Remaining Time",
    task_order: "Token task order",
    news_center: "Message Center",
    polite: "Everyone is polite",
    my_exchange: "My exchange",
    help_center: "Help center",
    service: "Customer Service",
    setting: "Setting",

    // 设置
    select_lang: "Language selection",
    chs_chs: "Chinese",
    en_en: "English",
    protocol: "Service agreement",
    current_version: "Current_version",
    exit_login: "SIGN OUT",
    modify_login: "Modify the login password",
    modify_pwd: "Modify transaction password",

    // 消息
    message: "Message",

    // 账户
    account: "Account",
    running_water_details: "Details",
    cur_balance: "Balance",
    seal: "Freeze",
    one_buy_coin: "Buy",
    sell_coin: "Sell",
    order: "Order",

    // 添加银行卡
    add_bank_card: "Add card",
    bank_username: "Cardholder",
    bank_account: "Card account",
    bank_name: "Card name",
    branch_name: "Branch name",
    remark_info: "Remark info",
    submit: "Submit",

    // 银行卡
    bank_card: "Bankcard",
    debit_card: "Debit Card",

    // 我的佣金
    commission: "Commission",
    inquire: "Inquire",

    // 买币
    input_coin: "Enter number",
    purchase_limit: "Purchase limit",
    select_bankcard: "Select bank card",
    select_bankcard1: "Select currency",
    pay: "Pay",
    password: "Password",
    quantity: "Quantity",
    description: "Description",
    exchange_tip1: "1.The transaction fee is 82%",
    exchange_tip2: "2. Payment must be made with a bank card of your choice, payments other than this card will result in payment failure",
    exchange_tip3: "3. The system will automatically replenish the last two digits for you, and you must pay in full according to the generated amount when paying",
    exchange_tip4: "4. It is strictly forbidden to fill in any remark information when transferring money, the account with remark information will cause the order to fail",
    get: "Obtain",
    sxf: "Handling fee",

    //team
    teamUsers: 'My push',
    yeji: 'Performance',

    //首页
    index: 'Index',
    OfficialWebsite: 'Website',
    BuyHashrate: 'Buy hashrate',
    game: 'HashMall',
    FruitDebitCard: 'Fruit Debit Card',
    nodata: 'No data',
    orders: "Orders",
    processing: "Processing",
    account_not_activated: "Your account is not activated and cannot take orders",
    now_activated: "Activate now",
    low_now_activated: "Cannot accept orders below 1000DC",
    low_now_activated1: "Cannot accept orders below ",
    low_now_activated2: "DC",
    today_orders: "Order today",
    Flowing_today: "Flowing today",
    wan: " ten thousand",
    today_Profit: "Profit today",
    bullentin: "Announcement",
    all: "All",
    start_order: "Start order",
    collection: "Management",
    history_order: "History order",
    Invitation_prize: "Invitation prize",

    //bili
    bili: 'Bill',
    TotalDegree: 'Total degree',
    sPower: 'Computing Power Returns',
    gPower: 'Management income',
    cPower: 'Mining Pool Revenue',
    zPower: 'Direct income',

    //coin
    paymentAddress: 'Payment address',
    pPaymentAddress: 'Please enter the payment address',
    withdrawalAmount: 'Withdrawal amount',
    pWithdrawalAmount: 'Please enter the amount of withdrawal',
    yanzhengma: 'Verification',
    paypwd: 'Payment password',
    p_paypwd: 'Please enter payment password',
    WithdrawalFee: 'Withdrawal fee',
    miniAmount: 'Minimum withdrawal amount',
    remarks: 'Remarks (optional)',
    comfirma: 'Confirm purchase',

    //exchange
    f_exchange: 'Flash',
    rate: 'Exchange rate',
    AvailableBalance: 'Available Balance',
    NumberOfTransfers: 'Number of transfers',
    ReceivedQuantity: 'Received Quantity',
    ActualAmount: 'Actual amount',
    QuickRedemption: 'QuickRedemption',
    RecentlyRedeemed: 'Recently redeemed',
    exchanges: 'Exchange',
    exchange_success: 'Successful exchange',
    p_enter_flashes_number: 'Please enter the number of flashes',

    // buy-power
    power: 'Hashing power',
    DoubleInvestment: 'Re-investment',
    ExchangeComputingPower: 'Exchange',
    computingPower: 'computing power value',
    Required: 'Required',
    myPower: 'My hash power',
    date: 'Date',
    expectedProfits: 'Expected benefits',
    hashRatio: 'Hashing power ratio',
    EarnedRevenue: 'Profit Earned',
    lowRisk: 'Low risk',
    StableGrowth: 'Stable Growth',
    MyHashratePlan: 'My hashrate plan',

    //recharge
    recharge: 'recharge',
    address: 'address',
    copy_address: 'copy address',
    rechareTips: 'Recharge instructions',
    rechareTips01: 'Ethereum is the underlying platform in all blockchains that has been synchronized with the concept of sharding. To understand why the Ethereum developer community wants to implement sharding, the focus is to understand what sharding is and why this solution is so attractive. force',
    rechareTips02: 'According to statistics from ETH Gas Station, adding a transaction to the Ethereum blockchain takes approximately 1.78 minutes, a new block is generated every 32 seconds, and an average of 15-20 transactions are processed per second. This ecosystem creates an environment that benefits miners rather than users. If users want to prioritize their transactions, they must raise their gas prices.',
    rechareTips03: 'Because low throughput, high latency, and high prices limit the performance of the Ethereum network, currently Ethereum is not suitable for deploying services and applications that require strong scalability',
    addAddress: 'Add address',
    save: 'save',
    p_remarks: 'Please enter a description',
    PleaseEnterAValidAddress: 'Please enter a valid address',
    addressList: 'Address list',
    add: 'Add',
    remark: 'remark',
    mores: 'Pull up to load more',
    delete: 'delete',
    areYouCurrentAddress: 'Are you sure you want to delete the current address?',
    withdrawal: 'withdrawal',
    withdrawalSuccess: 'Recharge successful',
    success: 'success',
    underReview: 'under review',
    turnDown: 'turn down',
    hxAddress: 'Hash address',
    Amount: 'Amount',
    fromAddress: 'Transfer address',
    RechargeRecord: 'Recharge record',
    WithdrawalRecords: 'Withdrawal records',
    wall: 'wallet',
    TotalAssets: 'Total assets',
    TotalRevenue: 'Total revenue',
    DayIncome: 'Day income',
    ThisRoundOfInvestment: 'MaximumHashrate',
    RevenueThisRound: 'ComputingPowerOfTheDay',
    time: 'time',

    //mine
    BaseNode: 'Base Node',
    Token: 'Token',
    MyTeam: 'My department',
    News: 'News',
    NodeManagement: 'Node Management',
    download: 'Recommended Download APP',
    jumpNow: 'Jump Now',
    jump: 'jump',

    // 保存图片
    save_img_success: "Save the picture successfully",
    save_img_fail: "Failed to save image",
    success_copy: "Successful copy",
    share_copy_goto: "The content has been copied to the clipboard and can be pasted into other apps for viewing.",

    // 邀请
    invite_code: "Invitation code",
    long_press_save: "Long press to save",

    // 成员详情
    member_detail: "Member details",
    up_UID: "Enter the previous UID",
    today_team_water: "Today's team flow",
    Immediate_registration_today: "Immediate registration today",
    Personal_flow_today: "Personal flow today",
    Team_Register_Today: "Team Register Today",

    // 团队成员
    team_member: "Team member",
    activated: "Activated",
    modify: "Modify",

    // 团队业绩
    my_performance: "My performance",
    Performance_report: "Performance report",

    // 团队
    team_flow: "Team flow",
    team_num: "Team size / activation",
    team_add: "Team addition / activation",

    // 支付
    weixin_code: "WeChat Universal Code",
    zhifu_code: "Alipay universal code",
    account_: "Account",
    nickname: "Nickname",

    //划转
    Transfer: 'transfer',
    transfer_history: 'transfer_history',
    transfer_user_name: 'transfer user name',
    transfer_username: 'transfer username',
    Please_enter_the_number_of_strokes: 'Please enter the number of strokes',
    Historical_commission: 'Historical commission',
    Personal_commission: 'Personal commission',
    Team_commission: 'Team commission',
    Team_reward: 'Team reward',
    Refund: 'Refund',
    completed: 'completed',
    income: 'income',
    system_notification: 'system notification',
    transaction: 'transaction',
    Get_quantity: 'Get quantity',
    Balance: 'Balance',
    historical_order: 'historical order',
    Contact_Customer_Service: 'Contact Customer Service',
    Full_details: 'Full details',
    Consume: 'Consume',
    order_number: 'order number',
    Rush_order_hall: 'Rush order hall',
    Total_flow: 'Total flow',
    stop_order: 'stop order',
    Wallet_management: 'Wallet management',
    index_tip_01: 'You are activated, please take your order now !!!',
    online: 'online',
    Offline: 'Offline',
    index_tip_02: "Order status is not open, please click to start order",
    order_information: 'order information',
    copy: 'copy',
    Number_of_coin_sold: 'Number of coin sold',
    start_time: 'Starting time',
    rush_order_time: 'rush order time',
    pay_time: 'pay time',
    success_time: 'Complete time',
    pay_infomation: 'Payment Information',
    username: 'Name',
    Affiliated_Bank: 'Affiliated Bank',
    Subsidiary: 'Subsidiary',
    card_number: 'card number',
    Receivables: 'Receivables',
    wechat_number: 'WeChat account',
    wechat_username: 'WeChat name',
    alipay_number: 'Alipay account',
    alipay_username: 'Alipay name',
    Unsuccessful_orders: 'Unsuccessful orders',
    confirm_collection: 'confirm',
    Buyer_has_not_paid: 'Buyer has not paid',
    buyer_has_paid: 'buyer has paid',
    order_completed: 'order completed',
    Invalid_payment: 'Invalid payment',
    Unconfirmed_failure: 'Unconfirmed failure',
    register_an_account: 'register an account',
    Select_payment_code: 'Select payment code',
    bank_payment_code: 'Bank card payment receipt code',
    No_bank_card_payment_code: 'No bank card payment code',
    WeChat_payment_receipt_code: 'WeChat payment receipt code',
    No_wechat_payment_receipt_code: 'No Alipay payment receipt code',
    No_Alipay_payment_receipt_code: 'No Alipay payment receipt code',
    alipay_payment_receipt_code: 'Alipay receipt code',
    confirm_use: 'Confirm use',
    No_bank_card_payment_code_selected: 'No bank card payment code selected',
    No_wechat_payment_code_selected: 'No WeChat payment code selected',
    No_alipay_payment_code_selected: 'No Alipay payment code selected',
    password_setting: 'password setting',
    _usernam_: 'username',
    team_total_flow: 'Total team flow',
    record: 'recording',
    Bank_cartoon_code: 'Bank cartoon code',
    pppp1: 'respected user:',
    pppp2: 'Thank you for choosing STD service. This service is owned and operated by STD.',
    pppp3: 'The "STD Service Agreement" (hereinafter referred to as the "Agreement") is signed bySTD and you (hereinafter referred to as the "User"), and this agreement has the contractual legal effect between you and the Company. In this agreement:',
    pppp4: '1. "I" and "we" refer to the company, and "our" shall be interpreted accordingly;',
    pppp5: '2: "You" refers to the user and "your" should be interpreted accordingly. You and us are individually called "Party" and collectively called "Party".',
    pppp6: 'We hereby remind you that you are using ourSTD mobile application (hereinafter referred to as "STD" or "this software",STD can be downloaded and installed through a fixed download link. Please read this agreement and the related documents mentioned later in this article carefully. The agreement, especially the clauses in the form of "exemption and limitation of liability" in bold, ensure that you fully understand the terms of this agreement and consider the risks on your own.',
    pppp7: 'I. Confirmation and acceptance of this agreement',
    pppp8: '1You understand that this agreement and related agreements apply to the decentralized and centralized services independently developed and owned by the company onSTD andSTD.',
    pppp9: '2 By downloading theSTD software and registering as our user, it is deemed that you have fully read and accepted all the terms of this agreement, this agreement takes effect immediately and is binding on both parties. If you do not agree with the terms of this agreement, you should immediately stop usingSTD. If you have downloadedSTD, delete it now.',
    pppp10: '3When visiting or usingSTD you agree:',
    pppp11: '1 Subject to the latest version of this agreement (no change or modification);',
    pppp12: '2 In your applicable jurisdiction, you have reached the legal age to useSTD and can assume binding legal or monetary obligations arising from the use ofSTD;',
    pppp13: '3 You are not an excluded person (as defined in this agreement).',
    pppp14: '4. This agreement can be updated by us at any time. Once the revised agreement is published onSTD, it will automatically take effect immediately without further notice. After the company announces the revised agreement terms, if you do not accept the revised terms, please stop usingSTD immediately. Your continued use ofSTD will be deemed to accept the revised agreement.',
    pppp15: 'Definition',
    pppp16: '1.STD: refers to financial products developed by the company based on the blockchain, includingSTD wallet, cloud wallet, asset statistics, video courses, asset trading, investment, etc.',
    pppp17: '2. User: Refers to users who must cooperate with the company to fulfill their personal information disclosure obligations in accordance with the laws, regulations and policies of relevant countries and other countries.',
    pppp18: '3 Excluded persons:',
    pppp19: '1 A person other than a natural person who has the legal and conscious ability to enter into this agreement;',
    pppp20: '2 Restricted, unauthorized or ineligible use of the Services (as defined in this Agreement) in any form or manner (in whole or in part) as a result of this Agreement, laws, regulatory requirements or the provisions of the jurisdiction applicable to the User use',
    pppp21: '4STD wallet: The private key is stored in the user\'s mobile phone, which is 100% owned by the user.',
    pppp22: '5 Cloud wallet: The private key is stored in the cloud and stored in the encrypted hardware device.',
    pppp23: '6 mnemonic words: in line with the blockchain BP39 industry standard, composed of 12 (or 15/18/21/24) ordered words generated by a random algorithm. It is an easy-to-record expression of the private key, which is convenient for users to back up and keep.',
    pppp24: '7Creating or importing a wallet: means the process of creating or importing a wallet usingSTD after you accept this agreement.',
    pppp25: '8Wallet password: Refers to the password you decide during the creation of theSTD wallet. This password will be used to encrypt and protect your private key.',
    pppp26: '9 Digital Token: Refers to the types of digital tokens currently supported bySTD, including but not limited to BTC, ETH, USDT, etc.',
    pppp27: '10. Freezing: The borrower deposits digital currency on theSTD platform as a transaction guarantee. When the transaction is completed, the digital currency will be dealt with by the counterparty.',
    pppp28: '11 message: means the user can receive messages or notifications sent by the company.',
    pppp29: '12 Personal information: refers to various information recorded electronically or otherwise that can identify the user\'s personal identity alone or in combination with other information, including but not limited to the name of a natural person, date of birth, ID number, personal biometric information, address, Phone number, bank card number, email address, wallet address, mobile device information, operation records, transaction records, etc., but does not include the user\'s wallet password, private key, mnemonic.',
    pppp30: '13 Video course: refers to the audio and video and text files produced bySTD and provided to users for learning and viewing, including but not limited to video files and graphic file text files.',
    pppp31: '14 Encrypted chat: refers to the instant chat tool developed bySTD based on elliptic curve encryption technology for users to use.',
    pppp32: '15 Ordinary chat: refers to the instant chat tool developed bySTD for users.',
    pppp33: '16T2T: refers to the functional block of digital currency exchange developed bySTD and provided to users. At the same time, it must comply with the "STD Anti-Money Laundering and Anti-Terrorist Financing User Guide" and "Transaction Security Agreement".',
    pppp34: '17OTC: Refers to the functional block developed bySTD and provided for users to purchase digital currency. At the same time, it is necessary to abide by the "STD Anti-Money Laundering and Anti-Terrorist Financing User Guide" and the "Transaction Security Agreement".',
    pppp35: 'License',
    pppp36: 'Subject to your compliance with this agreement,STD grants you limited rights to useSTD and related services. This right of use is granted to you personally, with restrictions, is non-exclusive, non-transferable,STD has the right to revoke this authorization, and you must comply with all the terms of this agreement. Your license does not represent your ownership ofSTD or related services. When you violate any of the terms of this agreement,STD has the right to suspend, change, interrupt, restrict, or even terminate the services provided to you. When you change, interrupt or terminate the service relationship betweenSTD. You still have the right to export your wallet information within a reasonable time.',
    pppp37: 'Fourth, service content',
    pppp38: '1 Create and restore wallets. You can use the "Create Wallet" and "Restore Wallet" provided bySTD to create and restore wallets. For digital tokens supported bySTD, you can useSTD to generate new wallets or import other wallets of related blockchain systems. A compatible wallet generated by the tool.',
    pppp39: '2Transfer and receive money. You can useSTD\'s transfer and collection functions to manage digital tokens, that is, use private keys for electronic signatures and modify the books of the relevant blockchain. Transfer means that the payer uses the recipient\'s blockchain address to perform the transfer operation. The "transfer" behavior involves a valid record of the transaction in the distributed ledger of the relevant blockchain system (rather than the actual delivery onSTD Or transfer digital tokens).',
    pppp40: '3 transaction records. We will copy all or part of your transaction records through the blockchain system. But users should take the latest transaction records of the blockchain as the standard.',
    pppp41: '4. Cloud wallet. You can openSTD cloud wallet. After opening this service, it will be deemed that you will entrust some digital tokens toSTD for management.',
    pppp42: '5 asset statistics. You can use the asset statistics service to help you calculate the cost profit and loss of multiple channels after opening theSTD wallet and cloud wallet in the binding exchange.',
    pppp43: '6 T2T. You can exchange digital currency with otherSTD users through the T2T function.',
    pppp44: '7 OTC. You can make digital currency transactions with otherSTD users through the OTC function.',
    pppp45: '8 encrypted chat. You can use the encrypted chat function for instant communication with otherSTD users.',
    pppp46: '9 ordinary chat. You can chat with otherSTD users instantly through the chat function.',
    pppp47: '10 video tutorials. You can watch videos, text files, including but not limited to video files, graphic files, text files, provided bySTD for users to learn and communicate.',
    pppp48: '11For all the above services,STD is entitled to charge a certain service fee. Specific fees refer to the rates published bySTD.',
    pppp49: 'V. Risk Tips',
    pppp50: 'You understand and understand that because the laws and regulations in the digital token field have not yet been perfected, digital tokens in this field may have major risks such as unrealization, technical instability, etc. You also know that the price of digital tokens fluctuates much more than other financial assets. We caution you that you should choose to hold or dispose of any digital token in a reasonable manner based on your financial situation and risk appetite. You also understand that the market viewing function provided bySTD is only a search result that captures the digital token exchange rate information of some exchanges, and is not meant to be the latest market or the best quote. For your use ofSTD, you will bear all the consequences of operating onSTD. In addition to this reminder, your use ofSTD means that you have read and accepted the relevant Risk disclosure statement.',
    pppp51: 'Six, your rights and obligations',
    pppp52: '1Create or import wallet: You have the right to create and / or import a wallet throughSTD on your mobile device, the right to set the wallet password and other information, and the right to use your own wallet through theSTD app Transactions such as transfers and receipts are performed on the blockchain.',
    pppp53: '2 User authentication: According to the requirements of relevant laws and regulations, when using specific services provided bySTD, specific users should complete the relevant identity verification promptly according toSTD\'s prompts, and require you to submit including but not limited to your name, ID number, Personal information such as mobile phone numbers and bank card numbers. Otherwise, the specific user will not be able to use the service, and you will be responsible for the losses caused by the delay of the specific user.',
    pppp54: '3 Collection and transfer: You know that the daily transfer limit and number of transactions that you can use in theSTD service may be due to the country / region where you use the transfer service, regulatory requirements, transfer purpose,STD risk control , Authentication, etc. You understand the "non-sale" attribute based on blockchain operations. When you use theSTD transfer function, you should bear the consequences caused by your operation mistakes (including but not limited to your wrong transfer address, your own The problem of selecting the transfer node server).',
    pppp55: '4 Legal compliance: You know that whenSTD is operating or using smart contracts onSTD for transactions, you should follow the requirements of relevant laws and regulations and national policies.',
    pppp56: '5 The company may develop different software versions for different terminal devices, and you should choose to download the appropriate version for installation according to actual needs. If you obtain the software or an installer with the same name as the software from a third party without legal authorization, the company cannot guarantee that the software can be used normally or its security, so you will bear the loss',
    pppp57: '6 After the new version of this software is released, the old software may not be available. The company does not guarantee the security, continued availability and corresponding customer service of older software. Users are requested to check and download the latest version at any time.',
    pppp58: 'Changes, interruptions and termination of services',
    pppp59: '1. You understand and agree that the company may, at its discretion, temporarily provide some service functions, or suspend some service functions or open new service functions in the future. When we change the service, as long as you still useSTD, you still agree to this agreement or the amended terms of this agreement.',
    pppp60: '2 In order to avoid as far as possible any misoperation ofSTD or any security risk of digital tokens, you should avoid usingSTD without the basic knowledge of blockchain. For users who do not have the basic knowledge of the blockchain, the company has the right to refuse to provide some or all of the service functions.',
    pppp61: '3 You understand that the company will suspend the service (or terminate the service completely when the following situations occur):',
    pppp62: '1. Interruption ofSTD\'s operations due to technical reasons such as equipment, blockchain system maintenance, upgrades, failures and communication interruptions;',
    pppp63: '2. Due to force majeure factors such as typhoons, earthquakes, tsunamis, floods, power outages, war or terrorist attacks, computer viruses, Trojans, hacking attacks, system instability and other reasons, the company cannot provide services or the company believes it will continue to provide services There will be greater risks;',
    pppp64: '3 Major adverse changes in applicable laws or policies;',
    pppp65: '4. There are other situations that the company cannot control or reasonably foresee.',
    pppp66: '4 The company may unilaterally suspend or terminate the user\'s use of some or all ofSTD\'s functions when the user has the following conditions:',
    pppp67: '1.The user died;',
    pppp68: '2 misappropriation of other people\'s wallet information or mobile devices;',
    pppp69: '3 Fill in false personal information inSTD;',
    pppp70: '4 Reject the forced update operation ofSTD;',
    pppp71: '5 UseSTD for illegal or criminal activities;',
    pppp72: '6 prevent other users from usingSTD normally;',
    pppp73: '7.Falsely claiming the company\'s staff or management personnel;',
    pppp74: '8 attacks, hacks, alters or in any other way threatens the normal operation of our computer systems;',
    pppp75: '9 UseSTD to promote spam ads;',
    pppp76: '10 spread rumors, damage the goodwill of the company andSTD;',
    pppp77: '11 Illegal acts, other violations of this agreement, and situations where the company reasonably believes that functions should be suspended.',
    pppp78: '12 If the company changes, interrupts or terminates the service, you have the right to export your wallet and other information within a reasonable time.',
    pppp79: 'Your statement and guarantee',
    pppp80: '1. You shall abide by the laws and regulations of the country or region where you live, and shall not useSTD for any illegal purpose or useSTD in any illegal way.',
    pppp81: '2 You must not useSTD to engage in any illegal or criminal behavior, including but not limited to:',
    pppp82: '1. Endanger the national security of the country or region where you live, leak state secrets, subvert state power, and undermine national unity;',
    pppp83: '2 Engage in any illegal crimes, including but not limited to money laundering, illegal fundraising, etc .;',
    pppp84: '3 By using any automated program, software, engine, web crawler, web analysis tool, data mining tool, or similar tool, etc., to access our services, collect or process the content provided by our company, interfere with or attempt to interfere with any user;',
    pppp85: '4. Provide gambling information or induce others to participate in gambling in any way;',
    pppp86: '5 Invade othersSTD wallet to steal digital tokens;',
    pppp87: '6 conduct transactions that are inconsistent with the transaction content declared by the counterparty, or untrue transactions;',
    pppp88: '7. Engage in any behavior that infringes or may infringeSTD service system and data;',
    pppp89: '8 Other acts that the Company has reason to consider inappropriate.',
    pppp90: '3 You understand and agree that if you violate the relevant laws (including but not limited to customs and / or tax regulations) or the provisions of this agreement, the company will suffer any losses, be subject to any third party claims or any administrative management Departmental penalties, you should compensate our company, including reasonable attorney fees.',
    pppp91: '4 You promise to pay the company\'s service fees (if any) on time, otherwise the company has the right to suspend the services provided to you.',
    pppp92: 'Nine, privacy policy',
    pppp93: 'Any data or information you provide to us is also subject to our privacy policy "STD Privacy Policy", which is also part of this agreement.',
    pppp94: 'X. Exemptions and Limitations of Liability',
    pppp95: '1. The company is only responsible for the obligations set out in this agreement.',
    pppp96: '2. You understand and agree that, to the maximum extent permitted by law, the company can only provideSTD services in accordance with existing technology levels and conditions. The company is not responsible forSTD\'s failure to provide services due to any of the following reasons:',
    pppp97: '1.STD system shutdown maintenance or upgrade;',
    pppp98: '2. Due to force majeure such as typhoons, earthquakes, floods, lightning or terrorist attacks;',
    pppp99: '3 Your mobile device\'s software and hardware, communication lines, and power supply lines have failed;',
    pppp100: '4 You have used our services improperly or not authorized by our company;',
    pppp101: '5 due to computer virus, Trojan horse, malicious program attack, network congestion, system instability, system or equipment failure, communication failure, power failure, bank or government behavior, etc .;',
    pppp102: '6 Any other reason not caused by our company.',
    pppp103: '3 The company is not responsible for any of the following situations:',
    pppp104: '1 The user\'s digital token is lost because you lost your mobile device, deleted and not backed upSTD, deleted and not backed up the wallet, forgotten and not backed up the wallet password, mnemonics',
    pppp105: '2.Because you disclosed your wallet password, mnemonic, or borrowed, transferred or authorized others to use your mobile device orSTD wallet, or did not download theSTD app through our official channels or used it in other insecure ways Loss of your digital tokens caused by theSTD app;',
    pppp106: '3. Your digital token is lost due to misoperation because you do not understand the knowledge of blockchain technology;',
    pppp107: '4. Due to the system lag and the instability of the blockchain system, the company\'s copy of the user\'s transaction records on the blockchain is biased.',
    pppp108: '4 You understand that the Company may provide services to you and your counterparty at the same time or have related or other interests, and you agree to clarify any actual or potential benefits of such actions that may exist in the Company Conflict cannot be used to claim that the company has legal flaws in providing the service, nor does it increase the company\'s responsibility or duty of care.',
    pppp109: '5 You understand that in accordance with the requirements of applicable laws and regulations, we may change our user access standards from time to time, limiting the scope and methods of providing services to specific users, etc.',
    pppp110: 'Eleven other provisions',
    pppp111: '1Intellectual Property StatementSTD is an application developed and owned by our company. The intellectual property of any content displayed inSTD (including this agreement, announcement, article, video, audio, picture, file, information, material, trademark or logo) is owned by the company or third party rights holders. Users may use theSTD app and its contents only for the purpose of holding and managing digital tokens. Without the prior written consent of the company or third party rights holders, no one may use, modify, reverse compile, copy, publicly disseminate, change, distribute, distribute or publicly release the above-mentioned applications and contents without prior written consent. This agreement should not be construed as granting you any intellectual property rights, including the right to use any information, pictures, user interfaces, logos, trademarks, trade names, web domain names, or copyrights related to us or the service for any purpose.',
    pppp112: '2 Terminal Security Responsibility',
    pppp113: '2.1 You understand and agree that this software, like most Internet software, may be affected by a variety of factors, including but not limited to user reasons, network service quality, social environment, etc .; it may also be affected by various security issues, including But it is not limited to other people\'s illegal use of user data for harassment in reality; other software downloaded or installed by users or other websites visited may contain viruses, Trojan horses or other malicious programs, threatening the security of your terminal device information and data, and then affecting Normal use of this software. Therefore, you should strengthen the awareness of information security and personal information protection, and pay attention to password protection to avoid loss.',
    pppp114: '2.2 You must not create, publish, use, or spread malicious programs used to steal account numbers and other people\'s personal information and property.',
    pppp115: '2.3 Maintaining software security and normal use is a joint responsibility ofSTD and you.STD will reasonably and prudently take necessary technical measures to protect your terminal device information and data in accordance with industry standards, but you acknowledge and agree thatSTD cannot provide this. Full guarantee.',
    pppp116: '3 Application of law and dispute resolution:',
    pppp117: '1 This agreement is governed by the laws of the relevant country and should be interpreted accordingly.',
    pppp118: '2 For any disputes (including any questions about their existence, validity and termination) caused by or related to this agreement, the two parties should first seek a settlement. If the dispute is still not resolved within 30 days after the settlement process begins, the parties shall submit the dispute to the relevant National International Arbitration Center ("SIAC") and adopt the arbitration rules then in effect The rule is deemed to be incorporated into this article by reference), and finally settled in the relevant country by arbitration. The arbitral tribunal is composed of an arbitrator appointed by the chairman of the SIAC. The language of arbitration shall be English. Each party irrevocably accepts the non-exclusive jurisdiction of the courts of the relevant country to support and assist in the arbitral proceedings conducted in accordance with the foregoing in this paragraph, including Give temporary relief if necessary.',
    pppp119: '3 For convenience, this agreement can be translated into other languages, but the English version of this agreement is the main text. If there is any inconsistency between the English version and the English version of this agreement and the appendix, the English version shall prevail.',
    pppp120: 'This agreement applies from February 14, 2020.',
    pppp121: 'Matters not covered in this agreement, you need to abide by the company\'s updated announcements and related rules from time to time.',


    quotes: 'quotes',
    network_computing_power: 'network power',
    pool_data: 'pool data',
    pool_power: 'pool power',
    daily_earnings: 'Daily earnings',
    Current_difficulty: 'Current difficulty',
    Modify_nickname_avatar: 'Modify nickname / avatar',
    p_enter_nikename: 'Please enter a nickname',
    // application
    Hashing_power: 'Hashing power',
    Holding_power: 'Holding power',
    Total_computing_power: 'Total computing power',
    Purchase: 'Purchase',
    Restricted_purchase: 'Restricted purchase',
    Price: 'Price',
    Actual_price_paid: 'Actual price paid',
    Purchase_quantity: 'Purchase quantity',
    computing_power_tip01: 'Using hashrate vouchers (1 hashrate voucher consumed per T)',
    use: 'use',
    piece: 'piece',
    Account_Balance: 'Account Balance',
    computing_power_tip02: 'piece Shuli voucher',
    cancel: 'cancel',
    computing_power_tip03: 'piece Hash card',
    computing_power_tip04: 'Purchase quantity cannot be 0',
    Billing_record: 'Billing record',
    Hashrate_record: 'Hashrate record',
    Revenue_record: 'Revenue record',
    Miner_details: 'Miner details',
    Miner: 'Miner',
    my_miner: 'my miner',
    buy_miner: 'Buy miner',
    model: 'model',
    Minable_currencies: 'Minable currencies',
    Daily_output_value_electricity: 'value / electricity',
    Daily_net_income: 'income',
    payment_method: 'payment',
    Unit_power_consumption: 'one consumption',
    Computing_power: 'power',
    Power_consumption: 'consumption',
    Current_address: 'address',
    All_currencies: 'currencies',
    Mining_income: 'Mining income',
    Mining_machine_parameters: 'Mining machine parameters',
    Product_number: 'Product number',
    Coins_day_value: 'Coins / day value',
    Current_currency_price_daily_electricity_fee: 'Currency Price / Electricity',
    manufacturer: 'manufacturer',
    release_time: 'release time',
    release_times: 'Time to participate',
    Mining_machine_computing_power: 'Computing power',
    Mining_machine_power_consumption: 'Power consumption',
    Supported_algorithms: 'Supported algorithms',
    Hosting_mine: 'Hosting mine',
    Average_monthly_electricity_bill: 'Electricity bill' }, _defineProperty(_message, "payment_method",
  'payment'), _defineProperty(_message, "Actual_price_paid",
  'Actual price paid'), _defineProperty(_message, "my_miner_tip01",
  '24 hour profit of mining machine'), _defineProperty(_message, "Cumulative_number_of_miners",
  'Cumulative miner'), _defineProperty(_message, "List_of_miners",
  'List'), _defineProperty(_message, "buy",
  'buy'), _defineProperty(_message, "In_operation",
  'run'), _defineProperty(_message, "Downtime",
  'Downtime'), _defineProperty(_message, "Acquisition_cost",
  'cost'), _defineProperty(_message, "end_time",
  'End Time'), _defineProperty(_message, "Renewed_electricity_bill",
  'Renew'), _defineProperty(_message, "total_power",
  'Revenue in the last 24 hours'), _defineProperty(_message, "Order_record",
  'Order record'), _defineProperty(_message, "Order_number",
  'Order number'), _defineProperty(_message, "Purchase_cost",
  'cost'), _defineProperty(_message, "start_date",
  'start date'), _defineProperty(_message, "End_date",
  'End date'), _defineProperty(_message, "in_development",
  'development'), _defineProperty(_message, "returns",
  'return'), _defineProperty(_message, "Hash_card",
  'Hash card'), _defineProperty(_message, "Unused",
  'Unused'), _defineProperty(_message, "Used",
  'Used'), _defineProperty(_message, "Received",
  'Received'), _defineProperty(_message, "Transferred",
  'Transferred'), _defineProperty(_message, "To_transfer",
  'To transfer'), _defineProperty(_message, "To_use",
  'To use'), _defineProperty(_message, "Counterparty_username",
  'Username'), _defineProperty(_message, "Please_enter_their_username",
  'Please nter their username'), _defineProperty(_message, "Verification_succeeded",
  'succeeded'), _defineProperty(_message, "Amount_transferred",
  'Amount transferred'), _defineProperty(_message, "Please_enter_the_number_of_transfers",
  'Please enter the number of transfers'), _defineProperty(_message, "Current_remaining_hashrate_card",
  'Current remaining hashrate card'), _defineProperty(_message, "sendCard_tip",
  'Please verify the account information carefully, the hashrate card will be transferred to the other party\'s account in real time and cannot be refunded!'), _defineProperty(_message, "Transfer_now",
  'Transfer'), _defineProperty(_message, "sendCard_tip00",
  'The other user name does not meet the transfer conditions'), _defineProperty(_message, "my_share_address",
  'Share link'), _defineProperty(_message, "Download_poster",
  'Download'), _defineProperty(_message, "Scan_code_registration",
  'Scan code registration'), _defineProperty(_message, "My_invitation",
  'Invitation'), _defineProperty(_message, "Send_invitation_to_friends",
  'Send invitation to friends'), _defineProperty(_message, "Friends_complete_registration",
  'Friends complete registration'), _defineProperty(_message, "Get_lucky_timestamp",
  'Get lucky timestamp'), _defineProperty(_message, "Promotional_rewards",
  'Promotional rewards'), _defineProperty(_message, "Promotion_number",
  'Promotion number'), _defineProperty(_message, "Rewarded_lucky_timestamp",
  'Rewarded lucky timestamp'), _defineProperty(_message, "invite_tip01",
  'Successful promotion of 1 reward'), _defineProperty(_message, "Timestamp",
  'Timestamp'), _defineProperty(_message, "Promotion_details",
  'Promotion details'), _defineProperty(_message, "grade",
  'grade'), _defineProperty(_message, "Invite_now",
  'Invite'), _defineProperty(_message, "Limit",
  'Limit'), _defineProperty(_message, "price",
  'price'), _defineProperty(_message, "Buy_by_quantity",
  'Buy by quantity'), _defineProperty(_message, "Please_enter_quantity",
  'Please enter quantity'), _defineProperty(_message, "Payable",
  'Payable'), _defineProperty(_message, "immediately",
  'immediately'), _defineProperty(_message, "Sell",
  'Sell'), _defineProperty(_message, "buy",
  "buy"), _defineProperty(_message, "buy_adn_sell_tip0",
  'The number is large enough, please re-enter'), _defineProperty(_message, "buy_adn_sell_tip1",
  'Your quantity is not enough, please re-enter the quantity'), _defineProperty(_message, "Order_Details",
  'Details'), _defineProperty(_message, "filter",
  'filter'), _defineProperty(_message, "transaction",
  'transaction'), _defineProperty(_message, "Cancelled_order",
  'Cancelled'), _defineProperty(_message, "Pay",
  'Pay'), _defineProperty(_message, "Sell_orders",
  'Sell'), _defineProperty(_message, "Pays",
  'Pay'), _defineProperty(_message, "Sell_orderss",
  'Sell'), _defineProperty(_message, "total",
  'total'), _defineProperty(_message, "prompt",
  'prompt'), _defineProperty(_message, "prompt01",
  'Are you sure of cancellation?'), _defineProperty(_message, "Cancelled",
  'Cancelled'), _defineProperty(_message, "order_status",
  'Status'), _defineProperty(_message, "Release_Type",
  'Type'), _defineProperty(_message, "Release_number",
  'Number'), _defineProperty(_message, "Release_time",
  'Time'), _defineProperty(_message, "Already_bought",
  'Bought'), _defineProperty(_message, "The_remaining_amount",
  'Remaining'), _defineProperty(_message, "Transaction_Details",
  'Details'), _defineProperty(_message, "Closing_time",
  'Closing time'), _defineProperty(_message, "total_amount",
  'total'), _defineProperty(_message, "Coin_trading",
  'Coin trading'), _defineProperty(_message, "Hash_card_transaction",
  'Hash card'), _defineProperty(_message, "Miner_trading",
  'Miner'), _defineProperty(_message, "Participation_Details",
  'Participation'), _defineProperty(_message, "me_buy",
  'Buy'), _defineProperty(_message, "my_sell",
  'Sell'), _defineProperty(_message, "My_release",
  'Rrelease'), _defineProperty(_message, "Please_enter_unit_price",
  'Please enter unit price'), _defineProperty(_message, "Unit_price_range",
  'Unit price range'), _defineProperty(_message, "Single_Low",
  'Single Low'), _defineProperty(_message, "Please_fill_in_the_minimum_single_transaction_amount",
  'Please fill in the minimum number of transactions'), _defineProperty(_message, "Post_now",
  'Post'), _defineProperty(_message, "Post_purchase",
  'Post purchase'), _defineProperty(_message, "market_sell_tip0",
  'Exceeded the current quantity, please reset the quantity sold'), _defineProperty(_message, "market_sell_tip1",
  'Exceeded the maximum number'), _defineProperty(_message, "market_sell_tip2",
  'The price you set is lower than the lowest market price, please reset the price'), _defineProperty(_message, "market_sell_tip3",
  'The price you set is lower than the highest market price, please reset the price'), _defineProperty(_message, "market_sell_tip4",
  'The number of orders you set is higher than the number of purchases. Please reset the number of orders'), _defineProperty(_message, "market_sell_tip5",
  'The number of orders you set is higher than the number of orders sold, please reset the number of orders'), _defineProperty(_message, "membership_card",

  'membership'), _defineProperty(_message, "No_membership_card",
  'No membership card'), _defineProperty(_message, "Current_total_revenue",
  'Revenue'), _defineProperty(_message, "You_are_currently",
  'currently'), _defineProperty(_message, "Upgrade_membership_card",
  'Upgrade'), _defineProperty(_message, "Boost_for_more_revenue",
  'Boost for more revenue'), _defineProperty(_message, "Promote_now",
  'Promote'), _defineProperty(_message, "upgrade",
  'upgrade'), _defineProperty(_message, "value",
  'value'), _defineProperty(_message, "Consumption_of_computing_power",
  'Consumption of computing power'), _defineProperty(_message, "Place_an_order",
  'Place an order'), _defineProperty(_message, "member_tip0",
  'Cannot purchase a membership card below the current level'), _defineProperty(_message, "member_tip1",
  'The current level cannot be repurchased'), _defineProperty(_message, "member_tip2",
  'Cannot buy beyond'), _defineProperty(_message, "user_level",
  'level'), _defineProperty(_message, "inactivated",
  'inactivated'), _defineProperty(_message, "membership_level",
  'membership'), _defineProperty(_message, "Contribution",
  'Contribution'), _defineProperty(_message, "Cloud_miner",
  'Cloud miner'), _defineProperty(_message, "invite_friends",
  'invite'), _defineProperty(_message, "Asset_list",
  'Asset'), _defineProperty(_message, "Deposit",
  'Deposit'), _defineProperty(_message, "Flash_payment",
  'Flash_payment'), _defineProperty(_message, "address_list_tip",
  'Whether to delete the address?'), _defineProperty(_message, "Amount_paid",
  'Amount'), _defineProperty(_message, "Please_enter_the_amount_of_flash_payment",
  'Please enter the amount of flash payment'), _defineProperty(_message, "pay_immediately",
  'pay immediately'), _defineProperty(_message, "false_tip0",
  'The number of flashes exceeds what you have, please modify'), _defineProperty(_message, "Flash_payment_record",
  'Flash'), _defineProperty(_message, "recarge_tip0",
  'Please do not recharge anything other than the above address'), _defineProperty(_message, "recarge_tip1",
  'Assets, otherwise assets will not be recovered. After you recharge to the above address, you need confirmation from the entire network node. Do not recharge any non-currency assets like the above address, otherwise the assets will not be recovered. After you recharge to the above address, you need confirmation from the entire network node. Do not recharge any non-currency assets like the above address, otherwise the assets will not be recovered. After you recharge to the above address, you need confirmation from the entire network node. Do not recharge any non-currency assets like the above address, otherwise the assets will not be recovered. After you recharge to the above address, you need the confirmation of the entire network node'), _defineProperty(_message, "no_login",
  'Not logged'), _defineProperty(_message, "Purchase_History",
  'Purchase'), _defineProperty(_message, "Electricity_bill",
  'Electricity'), _defineProperty(_message, "Revenue_record",
  'Revenue'), _defineProperty(_message, "pay_pwd_requier",
  "re-enter"), _defineProperty(_message, "pay_pwd_tip0",
  'Incorrect digital password'), _defineProperty(_message, "pay_pwd_tip1",
  'Payment failed, insufficient account balance'), _defineProperty(_message, "team",
  'Team'), _defineProperty(_message, "Invest",
  'Invest'), _defineProperty(_message, "release",
  'Release'), _defineProperty(_message, "Handling_fee_ratio",
  'fee ratio'), _defineProperty(_message, "participants",
  'participants'), _defineProperty(_message, "get",
  'Get'), _defineProperty(_message, "Bind_mailbox_modification",
  'Bind mailbox modification'), _defineProperty(_message, "Current_account",
  'Old mailbox'), _defineProperty(_message, "New_account",
  'New mailbox'), _defineProperty(_message, "_check_in",
  'check'), _defineProperty(_message, "Current_mailbox",
  'Current mailbox'), _defineProperty(_message, "p_enter_check_in",
  'Please verify if the user exists first'), _defineProperty(_message, "Frozen_quantity",
  'Mining pool'), _defineProperty(_message, "mine_tip_msg",
  'The current user is not activated, please go to activate immediately'), _defineProperty(_message, "Language_type",
  {
    update: "Update prompt",
    update_tip: "The STD has been released in a new version. Are you updating?",
    isJumping: "Jumping...",
    soon_update: "Please update the latest version as soon as possible...",
    fail: "Fail" }), _defineProperty(_message, "Income_limit",

  'Income limit'), _defineProperty(_message, "My_assets",
  'My assets'), _defineProperty(_message, "Please_enter_a_number_and_letter_combinatio_username",
  'Please enter a number and letter combinatio username'), _defineProperty(_message, "Team_performance",
  'Team performance'), _defineProperty(_message, "p_enter_zh",
  'Please enter a positive integer'), _defineProperty(_message, "no_paypwd_mes",
  'No payment password has been set yet, please go to the setting immediately'), _defineProperty(_message, "Contact_email",
  'Contact email'), _defineProperty(_message, "Copy_customer_service_email",
  'Copy customer service email'), _defineProperty(_message, "Performance",
  'Performance'), _defineProperty(_message, "Community_performance",
  'Total'), _defineProperty(_message, "my_code",
  'My invitation code'), _defineProperty(_message, "Node_contribution",
  'Node'), _defineProperty(_message, "Buy_by_quantity01",
  'Sell by quantity'), _defineProperty(_message, "Total_performance",
  'Total performance'), _defineProperty(_message, "Regional_contribution",
  'Regional contribution'), _defineProperty(_message, "Community_contribution",
  'Community contribution'), _defineProperty(_message, "touzi_e",
  'Investment'), _defineProperty(_message, "enter_invitation",
  "Please enter the invitation code"), _defineProperty(_message, "flas_history",
  'Flash record'), _defineProperty(_message, "transfer__out__num",
  "Number of transfers"), _defineProperty(_message, "receive__num",
  "Quantity received"), _message) };exports.default = _default;

/***/ }),

/***/ 19:
/*!*********************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/lang/lang/zhCH.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  message: (_message = {
    // 国家地区
    state: "国家地区",
    email: '邮箱',
    p_EmailAddressOfTheAccountToBeBound: '请输入邮箱',
    // 注册
    welcome_to: "使用帐号密码登录",
    enter_username: "请输入用户名 ",
    enter_phone: "请输入手机号",
    re_enter_phone: "请再次输入手机号",
    Mailboxes_are_inconsistent: "手机号不一致",
    enter_vcode: "请输入验证码",
    enter_login_pass: "请输入登录密码",
    enter_login_pass_again: "请再次输入登录密码",
    register: "注册",
    go_login: "已有账号? 去登录",

    // 验证码
    get_vcode: "获取验证码",
    resend_vcode: "重发验证码",

    // 登录
    chs: "中",
    en: "英",
    forget: "忘记密码",
    login: "登录",
    go_register: "没有账号? 去注册",
    enter_account: "请输入账号",
    hello_welcome: "你好, 欢迎",

    // 忘记密码
    enter_new_pass: "请输入新密码",
    enter_new_pass_again: "请再次输入新密码",
    confirm: "确定",
    retrieve_password: "找回密码",
    phone_num: "手机号",

    // 设置登录密码
    inconsistent_login_password: "登录密码不一致",
    Inconsistent_payment_password: "支付密码不一致",

    // 我的
    recommended_number: "推荐人数",
    activation_token: "激活令牌数",
    remaining_time: "剩余天数",
    task_order: "令牌任务订单",
    news_center: "消息中心",
    polite: "人人有礼",
    my_exchange: "我的交易所",
    help_center: "帮助中心",
    service: "客服中心",
    setting: "设置",

    // 设置
    select_lang: "语言选择",
    chs_chs: "中文",
    en_en: "英文",
    protocol: "服务协议",
    current_version: "当前版本",
    exit_login: "退出登录",
    modify_login: "修改登录密码",
    modify_pwd: "修改交易密码",

    // 消息
    message: "消息",

    // 账户
    account: "账户",
    running_water_details: "流水明细",
    cur_balance: "当前余额",
    seal: "冻结",
    one_buy_coin: "闪购",
    sell_coin: "卖币",
    order: "订单",

    // 添加银行卡
    add_bank_card: "添加银行卡",
    bank_username: "持卡人姓名",
    bank_account: "银行卡账号",
    bank_name: "银行名称",
    branch_name: "支行名称",
    remark_info: "备注信息",
    submit: "提交",

    // 银行卡
    bank_card: "银行卡",
    debit_card: "储蓄卡",

    // 我的佣金
    commission: "我的佣金",
    inquire: "查询",

    // 买币
    input_coin: "输入数量",
    purchase_limit: "单笔买币限额",
    select_bankcard: "选择银行卡",
    select_bankcard1: "选择币种",
    pay: "支付",
    password: "密码",
    quantity: "数量",
    description: "说明",
    exchange_tip1: "1.买币手续费为82%",
    exchange_tip2: "2.必须使用您选择的银行卡付款, 非此卡付款将导致付款失败",
    exchange_tip3: "3.系统将会为您自动补充小数点后两位, 付款的时候必须根据生成金额足额支付",
    exchange_tip4: "4.转账时严禁填写任何备注信息, 带备注信息的账号将导致订单失败",
    get: "获取",
    sxf: "手续费",

    //team
    teamUsers: '我的直推',
    yeji: 'STD理财算力',

    //首页
    index: '首页',
    OfficialWebsite: '官网',
    BuyHashrate: '购买算力',
    game: '算力商城',
    FruitDebitCard: '果实借记卡',
    nodata: '暂无数据',
    orders: "接单",
    processing: "进行中",
    account_not_activated: "您的账号未激活，无法接单",
    now_activated: "立刻激活",
    low_now_activated: "低于1000DC时将无法接单",
    low_now_activated1: "低于",
    low_now_activated2: "时将无法接单",
    today_orders: "今日接单",
    Flowing_today: "今日流水",
    wan: "万",
    today_Profit: "今日盈利",
    bullentin: "公告",
    all: "全部",
    start_order: "开始接单",
    collection: "收款管理",
    history_order: "历史抢单",
    Invitation_prize: "邀请有奖",

    //bili
    bili: '账单',
    TotalDegree: '总额度',
    sPower: '算力收益',
    gPower: '管理收益',
    cPower: '矿池收益',
    zPower: '直推收益',

    //coin
    paymentAddress: '收款地址',
    pPaymentAddress: '请输入收款地址',
    withdrawalAmount: '提币数量',
    pWithdrawalAmount: '请输入提币数量',
    yanzhengma: '验证码',
    paypwd: '支付密码',
    p_paypwd: '请输入支付密码',
    WithdrawalFee: '提币手续费',
    miniAmount: '最低提币额',
    remarks: '备注(选填)',
    comfirma: '确认购买',

    //exchange
    f_exchange: '闪兑',
    rate: '汇率',
    AvailableBalance: '可用余额',
    NumberOfTransfers: '转出数量',
    ReceivedQuantity: '收到数量',
    ActualAmount: '实到金额',
    QuickRedemption: '快速兑换',
    RecentlyRedeemed: '最近兑换',
    exchanges: '兑换',
    exchange_success: '兑换成功',
    p_enter_flashes_number: '请输入闪兑数量',

    // buy-power
    power: '算力',
    DoubleInvestment: '复投算力',
    ExchangeComputingPower: '兑换算力',
    computingPower: '算力值',
    Required: '所需',
    myPower: '我的算力',
    date: '日期',
    expectedProfits: '预期收益',
    hashRatio: '算力收益比',
    EarnedRevenue: '已获得收益',
    lowRisk: '低风险',
    StableGrowth: '稳定性增长型',
    MyHashratePlan: '我的算力计划',

    //recharge
    recharge: '充值',
    address: '地址',
    copy_address: '复制地址',
    rechareTips: '充值说明',
    rechareTips01: '以太坊是所有区块链中一直与分片概念同步的底层平台，想要理解为什么以太坊开发者社区想要实现分片，重点是要理解分片是什么，以及这个解决方案为何如此有吸引力',
    rechareTips02: '根据ETH Gas Station的统计，向以太坊区块链中添加一项交易大约需要1.78分钟，每32秒生成一个新的区块，平均每秒处理15-20个交易。这个生态系统创造了一个有利于矿工而非用户的环境，如果用户想要优先处理他们的交易，就必须要提高他们的gas价格',
    rechareTips03: '由于低吞吐量、高延迟和高价格限制了以太坊网络性能，因此，目前以太坊上不太适合部署需要强可扩展性的服务和应用程序',
    addAddress: '添加地址',
    save: '保存',
    p_remarks: '请输入描述',
    PleaseEnterAValidAddress: '请输入有效地址',
    addressList: '地址列表',
    add: '添加',
    remark: '备注',
    mores: '上拉加载更多',
    delete: '删除',
    areYouCurrentAddress: '您确定要删除当前地址吗?',
    withdrawal: '提币',
    withdrawalSuccess: '充值成功',
    success: '成功',
    underReview: '审核中',
    turnDown: '驳回',
    hxAddress: '哈希地址',
    Amount: '金额',
    fromAddress: '转出地址',
    RechargeRecord: '充值记录',
    WithdrawalRecords: '提币记录',
    wall: '钱包',
    TotalAssets: '总资产',
    TotalRevenue: '总收益',
    DayIncome: '当日收益',
    ThisRoundOfInvestment: '最大算力值',
    RevenueThisRound: '当日算力收益',
    time: '时间',

    //mine
    BaseNode: '基础节点',
    Token: '令牌',
    MyTeam: '我的部门',
    News: '消息',
    NodeManagement: '节点管理',
    download: '推荐下载APP',
    jumpNow: '立即跳转',
    jump: '跳过',

    // 保存图片
    save_img_success: "保存图片成功",
    save_img_fail: "保存图片失败",
    success_copy: "复制成功",
    share_copy_goto: "内容已复制到粘贴板，可前往其他应用粘贴查看。",

    // 邀请
    invite_code: "邀请码",
    long_press_save: "长按二维码识别或保存",

    // 成员详情
    member_detail: "成员详情",
    up_UID: "请输入上家UID",
    today_team_water: "今日团队流水",
    Immediate_registration_today: "直属今日注册",
    Personal_flow_today: "今日个人流水",
    Team_Register_Today: "团队今日注册",

    // 团队成员
    team_member: "团队成员",
    activated: "已激活",
    modify: "修改",

    // 团队业绩
    my_performance: "我的业绩",
    Performance_report: "业绩报表",

    // 团队
    team_flow: "团队流水",
    team_num: "团队人数/激活",
    team_add: "团队新增/激活",

    // 支付
    weixin_code: "微信通用码",
    zhifu_code: "支付宝通用码",
    account_: "账号",
    nickname: "昵称",



    //划转
    Transfer: '划转',
    transfer_history: '划转记录',
    transfer_user_name: '转出用户名',
    transfer_username: '转入用户名',
    Please_enter_the_number_of_strokes: '请输入划转数量',
    Historical_commission: '历史佣金',
    Personal_commission: '个人佣金',
    Team_commission: '团队佣金',
    Team_reward: '团队奖励',
    Refund: '失效退款',
    completed: '已完成',
    income: '收益',
    system_notification: '系统公告',
    transaction: '交易',
    Get_quantity: '获取数量',
    Balance: '余额',
    historical_order: '历史订单',
    Contact_Customer_Service: '联系客服',
    Full_details: '全部明细',
    Consume: '消耗',
    order_number: '订单号',
    Rush_order_hall: '抢单大厅',
    Total_flow: '总流水',
    stop_order: '停止接单',
    Wallet_management: '钱包管理',
    index_tip_01: '你已激活, 请立即接单!!!',
    online: '上线',
    Offline: '下线',
    index_tip_02: "未开启接单状态, 请点击开始接单",
    order_information: '订单信息',
    copy: '复制',
    Number_of_coin_sold: '卖币数量',
    start_time: '开始时间',
    rush_order_time: '抢单时间',
    pay_time: '付款时间',
    success_time: '完成时间',
    pay_infomation: '支付信息',
    username: '姓名',
    Affiliated_Bank: '所属银行',
    Subsidiary: '所属支行',
    card_number: '银行卡号',
    Receivables: '应收款',
    wechat_number: '微信账号',
    wechat_username: '微信名称',
    alipay_number: '支付宝账号',
    alipay_username: '支付宝名称',
    Unsuccessful_orders: '未抢单',
    confirm_collection: '确认收款',
    Buyer_has_not_paid: '买家未付款',
    buyer_has_paid: '买家已付款',
    order_completed: '订单已完成',
    Invalid_payment: '未付款失效',
    Unconfirmed_failure: '未确认失效',
    register_an_account: '注册账号',
    Select_payment_code: '选择收款码',
    bank_payment_code: '银行卡支付收款码',
    No_bank_card_payment_code: '暂无银行卡收款码',
    WeChat_payment_receipt_code: '微信支付收款码',
    No_wechat_payment_receipt_code: '暂无支付宝支付收款码',
    No_Alipay_payment_receipt_code: '暂无支付宝支付收款码',
    alipay_payment_receipt_code: '支付宝收款码',
    confirm_use: '确认使用',
    No_bank_card_payment_code_selected: '未选择银行卡收款码',
    No_wechat_payment_code_selected: '未选择微信收款码',
    No_alipay_payment_code_selected: '未选择支付宝收款码',
    password_setting: '密码设置',
    _usernam_: '用户名',
    team_total_flow: '团队总流水',
    record: '记录',
    Bank_cartoon_code: '银行卡通用码',
    pppp1: '尊敬的用户:',
    pppp2: '感谢您选择圣宝龙数字理财服务。本服务由圣宝龙数字理财持有和运营。',
    pppp3: '《圣宝龙数字理财服务协议》(以下简称“本协议”)由圣宝龙数字理财和您(以下简称“用户”)签订，本协议在您与本公司之间具有合同上的法律效力。在本协议中：',
    pppp4: '1.“我″和“我们“指代本公司,“我们的"应据此解释',
    pppp5: '2:“您”指代用户,“您的"应据此解释。您和我们单独称为“一方”,合称为“双方”。',
    pppp6: '我们在此特别提醒您在使用我们的圣宝龙数字理财移动应用(以下简称"圣宝龙数字理财"或“本软件”,圣宝龙数字理财可以通过固定下载链接进行下载安装。请认真阅读本协议及后文提及的相关协议，尤其是本协议中“免责及责任限制”等以加粗形式体现的条款,确保您充分理解本协议中各条款,并自主考虑风险。',
    pppp7: '一、关于本协议的确认与接纳',
    pppp8: '1、您理解本协议及有关协议适用于圣宝龙数字理财及圣宝龙数字理财上本公司所自主开发和拥有的的去中心化和中心化服务',
    pppp9: '2、您下载圣宝龙数字理财软件,注册成为我们的用户,即视为您已经充分阅读并接受本协议全部条款,本协议立即生效,对双方具有约束力。如果您不同意本协议条款,您应立即停止使用圣宝龙数字理财。如果您已经下载了圣宝龙数字理财,请立即删除',
    pppp10: '3、在访问或使用圣宝龙数字理财时您同意：',
    pppp11: '1.接受本协议最新版本的约束(不变更亦不修改);',
    pppp12: '2.在您所适用的司法管辖区域内,您已达到使用圣宝龙数字理财的法定年龄,并可承担因使用圣宝龙数字理财而产生的有约束力法律或金钱义务；',
    pppp13: '3.您不属于被排除人士(如本协议所定义)。',
    pppp14: '4.本协议可由我们随时更新,经修改的协议一经在圣宝龙数字理财上公布,立即自动生效,不再另行通知。在本公司公布修改协议条款后,如果您不接受修改后的条款,请立即停止使用圣宝龙数字理财,您继续使用圣宝龙数字理财将被视为接受修改后的协议。',
    pppp15: '二、定义',
    pppp16: '1.圣宝龙数字理财:指由本公司基于区块链开发的金融产品，包含圣宝龙数字理财钱包、云端钱包、资产统计、视频课程、资产交易、投资等。',
    pppp17: '2.用户:指按照相关国家和其他国家的法律法规及政策规定必须要配合本公司履行个人信息披露义务的​​用户。',
    pppp18: '3被排除人士:',
    pppp19: '1除了自然人以外的、具备订立本协议的法律和意识能力的人士',
    pppp20: '2因本协议、法律、监管要求或适用于该用户的司法管辖区的规定而被以任何形式或方式(全部或部分)禁止限制、无授权或无资格使用服务(如本协议所定义)的用',
    pppp21: '4 圣宝龙数字理财钱包:私钥存放在用户手机里,100%由用户掌握。',
    pppp22: '5云钱包:私钥存放在云端,保存在加密硬件设备中',
    pppp23: '6助记词:符合区块链BP39行业标准,由随机算法生成的12(或15/18/21/24)个有序单词组成。是私钥的易记录表现形式,方便用户备份保管',
    pppp24: '7创建或导入钱包:指在您接受本协议后,使用圣宝龙数字理财创建或导入钱包的过程。',
    pppp25: '8钱包密码:指您在创建圣宝龙数字理财钱包过程中,由您决定的密码,该密码将被用于加密和保护您的私钥。',
    pppp26: '9数字代币:指圣宝龙数字理财目前支持的数字代币种类,包括但不限于BTC、ETH、USDT等。',
    pppp27: '10.冻结:指借款人将数字货币托管于圣宝龙数字理财平台,作为交易保障,当交易完毕后,数字货币予以对应的交易方。',
    pppp28: '11消息:指用户可以接收本公司发出的信息或通知的邮件',
    pppp29: '12个人信息:指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户个人身份的各种信息,包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码、银行卡号、邮件地址、钱包地址、移动设备信息、操作记录、交易记录等,但不包括用户的钱包密码、私钥、助记词。',
    pppp30: '13视频课程:指由圣宝龙数字理财制作提供给用户学习、观看的影音、文字文件,包括但不限于视频文件、图形文件文字文件。',
    pppp31: '14加密聊天:指由圣宝龙数字理财提供的基于椭圆曲线加密技术开发的,供用户使用的即时聊天工具。',
    pppp32: '15普通聊天:指由圣宝龙数字理财开发完成,供用户使用的即时聊天工具。',
    pppp33: '16T2T:指由圣宝龙数字理财开发完成,供给用户使用的数字货币交换的功能板块,同时需遵守《圣宝龙数字理财反洗钱和反恐怖融资用户指引》、《交易安全协议》的规定。',
    pppp34: '17OTC:指由圣宝龙数字理财开发完成,供给用户使用的数字货币购买的功能板块。同时需遵守《圣宝龙数字理财反洗钱和反恐怖融资用户指引》、《交易安全协议》的规定。',
    pppp35: '三、使用许可',
    pppp36: '在您遵守本协议的前提下,圣宝龙数字理财授予你有限的权利来使用圣宝龙数字理财及相关服务。这项使用权是授予你个人的,是有限制条件的,是非专有的、不可转让的,圣宝龙数字理财有权撤销这项授权,且您必须遵守本协议的所有条款。您的使用许可不代表您对圣宝龙数字理财或相关服务有所有权,当您违反本协议的任何条款时,圣宝龙数字理财有权暂停、变更、中断、限制、甚至终止对您提供服务。当您对圣宝龙数字理财之间的服务关系变更、中断、终止时。您仍有权合理时间内导出您钱包的信息。',
    pppp37: '四、服务内容',
    pppp38: '1创建和恢复钱包。您可以使用圣宝龙数字理财提供的"创建钱包”、“恢复钱包”进行钱包的创建和恢复,对圣宝龙数字理财支持的数字代币,您可以使用圣宝龙数字理财生成新钱包或导入相关区块链系统的其它钱包工俱生成的兼容钱包',
    pppp39: '2转账、收款。您可以使用圣宝龙数字理财的转账、收款功能进行数字代币的管理,即运用私钥进行电子签名,对相关区块链的账本进行修改。转账是指付款方利用收款方的区块链地址进行转账操作,该“转账“行为涉及在相关区块链系统的分布式账本中对该交易的有效记录(而非在圣宝龙数字理财上实际交付或转让数字代币)',
    pppp40: '3交易记录。我们将通过区块链系统拷贝您全部或部分的交易记录。但用户应以区块链的最新交易记录为准。',
    pppp41: '4.云钱包。您可以开通圣宝龙数字理财云钱包,开通此服务后,将视为你将为有的数字代币委托给圣宝龙数字理财管理。',
    pppp42: '5资产统计。您可以通过资产统计服务,在绑定交易所开启圣宝龙数字理财钱包、云钱包后帮你统计多渠道的成本盈亏',
    pppp43: '6 T2T。您可以通过T2T功能与圣宝龙数字理财其他用户进行数字货币的兑换',
    pppp44: '7 OTC。您可以通过OTC功能与圣宝龙数字理财其他用户进行数字货币的交易',
    pppp45: '8加密聊天。您可以通过加密聊天功能与圣宝龙数字理财其他用户进行信息加密的即时交流。',
    pppp46: '9普通聊天。您可以通过聊天功能与圣宝龙数字理财其他用户进行即时交流。',
    pppp47: '10视频教程。您可以观看圣宝龙数字理财制作提供给用户学习交流的影音、文字文件,包括但不限于视频文件、图形文件、文字文件。',
    pppp48: '11对于上述所有服务,圣宝龙数字理财有权收取一定的服务费用。具体费用参照圣宝龙数字理财公布的费率',
    pppp49: '五、风险提示',
    pppp50: '您了解并知悉,由于数字代币领域的法律法规政策尚未健全,该领域的数字代币可能会产生无法兑现、技术不稳定等重大风险。您也了解数字代币的价格波动幅度远高于其他金融资产。我们谨慎提醒您应当根据自身财务状况和风险偏好,以合理的方式选择持有或处置任何一种数字代币。您也了解圣宝龙数字理财提供的行情查看功能仅系抓取部分交易所的数字代币汇率信息的搜索结果,并不表示为最新行情或最佳报价。对于您使用圣宝龙数字理财,在圣宝龙数字理财上进行操作导致的一切后果都将由您自己承担。除本提示之外,您对圣宝龙数字理财的使用表示您已阅读并接受相关的风险披露( Risk disclosure statement)。',
    pppp51: '六、您的权利义务',
    pppp52: '1创建或导入钱包:您有权在您的移动设备上通过圣宝龙数字理财创建和/或导入钱包,有权设定钱包的钱包密码等信息,并有权通过圣宝龙数字理财应用程序,使用自己的钱包在区块链上进行转账和收款等交易',
    pppp53: '2用户认证:按照有关法律法规的要求,特定用户在使用圣宝龙数字理财提供的有关服务时,应当按照圣宝龙数字理财的提示及时完成相关身份验证,要求您提交包括但不限于您的姓名、身份证号码、手机号码、银行卡号信息等个人信息。否则该特定用户将无法使用有关服务,因特定用户拖延造成的损失由您自行承担',
    pppp54: '3收款、转账:您知悉对于圣宝龙数字理财服务中您可使用的日计转账限额和笔数,可能因为您使用该转账服务时所处的国家/地区、监管要求、转账目的、圣宝龙数字理财风险控制、身份验证等事由而不同。您理解基于区块链操作的“不可撒销”属性,当您使用圣宝龙数字理财转账功能时,您应当自行承担因您操作失误而导致的后果(包括但不限于因您输错转账地址、您自身选择转账节点服务器的问题)。',
    pppp55: '4合法合规:您知悉在圣宝龙数字理财进行操作时或利用圣宝龙数字理财上的智能合约进行交易时,您应当遵循有关法律法规、国家政策的要求',
    pppp56: '5本公司可能为不同的终端设备开发不同的软件版本,您应当根据实际需要选择下载合适的版本进行安装。如果您从未经合法授权的第三方获取本软件或与本软件名称相同的安装程序,本公司将无法保证该软件能否正常使用,也无法保证其安全性,因此造成的损失由您自行承担',
    pppp57: '本软件新版本发布后,旧版软件可能无法使用。本公司不保证旧版软件的安全性、继续可用性及提供相应的客户服务。请用户随时核对并下载最新版本',
    pppp58: '七、服务的变更、中断、终止',
    pppp59: '1.您了解并同意本公司可以自行决定暂时提供部分服务功能,或于将来暂停部分服务功能或开通新的服务功能。当我们改变服务时,只要您仍然使用圣宝龙数字理财,表示您仍然同意本协议或者本协议修正后的条款。',
    pppp60: '2.为了尽可能避免任何对圣宝龙数字理财的误操作或数字代币的任何安全风险,您应避免在不具备区块链基础知识的前提下使用圣宝龙数字理财。对不具备区块链基础知识的用户,本公司有权拒绝提供部分或全部的服务功能',
    pppp61: '3您理解存在如下情形时,本公司将暂停提供服务(或在发生如下情形时彻底终止服务):',
    pppp62: '1.因设备、区块链系统维修、升级、故障和通信中断等技术原因而中断圣宝龙数字理财的运营',
    pppp63: '2.因台风、地震、海啸、洪水、停电、战争或恐怖袭击等不可抗力因素,电脑病毒、木马、黑客攻击、系统不稳政府行为等原因,造成本公司不能提供服务或本公司认为继续提供服务会有较大风险的',
    pppp64: '3适用法律或政策发生重大不利变化的',
    pppp65: '4.发生本公司无法控制或合理预见的其他情形',
    pppp66: '4当用户出现如下情况时,本公司可单方面中止或终止用户使用圣宝龙数字理财的部分或全部功能',
    pppp67: '1.用戶死亡;',
    pppp68: '2盗用他人的钱包信息或移动设备',
    pppp69: '3在圣宝龙数字理财填写虚假个人信息',
    pppp70: '4拒绝圣宝龙数字理财的强制更新操作',
    pppp71: '5将圣宝龙数字理财用于违法或犯罪活动',
    pppp72: '6妨碍其他用户正常使用圣宝龙数字理财',
    pppp73: '7.伪称本公司的工作人员或管理人员',
    pppp74: '8攻击、侵入、更改或以任何其他方式威胁本公司计算机系统的正常运作',
    pppp75: '9利用圣宝龙数字理财宣传垃圾广告',
    pppp76: '10散布谣言,损害本公司和圣宝龙数字理财商誉',
    pppp77: '11违法行为,其他违反本协议的行为,及本公司合理认为应当暂停功能的情形',
    pppp78: '12如果本公司变更、中断、终止服务时,您有权在合理时间内导出您钱包等信息',
    pppp79: '八、您的陈述与保证',
    pppp80: '1.您应遵守您所居住的国家或地区的法律法规,不得将圣宝龙数字理财用于任何非法目的,也不得以任何非法方式使用圣宝龙数字理财',
    pppp81: '2您不得利用圣宝龙数字理财从事任何违法或犯罪的行为,包括但不限于',
    pppp82: '1.危害您所居住的国家或地区的国家安全、泄漏国家秘密、颠覆国家政权、破坏国家统一',
    pppp83: '2从事任何违法犯罪行为,包括但不限于洗钱、非法集资等',
    pppp84: '3通过使用任何自动化程序、软件、引擎、网络爬虫、网页分析工具、数据挖掘工具或类似工具等,接入本公司服务、收集或处理本公司所提供的内容,干预或试图干预任何用户',
    pppp85: '4.提供赌博资讯或以任何方式引诱他人参与赌博',
    pppp86: '5侵入他人圣宝龙数字理财钱包盗取数字代币',
    pppp87: '6进行与交易对方宣称的交易内容不符的交易,或不真实的交易',
    pppp88: '7.从事任何侵害或可能侵害圣宝龙数字理财服务系统、数据的行为',
    pppp89: '8其他本公司有正当理由认为不适当的行为',
    pppp90: '3您理解并同意,如因您违反有关法律(包括但不限于海关及/或税务方面的监管规定)或者本协议之规定,使本公司遭受任何损失、受到任何第三方的索赔或任何行政管部门的处罚,您应对本公司进行赔偿,包括合理的律师费用',
    pppp91: '4您承诺按时缴纳本公司的服务费用(如有),否则本公司有权暂停对您提供的服务',
    pppp92: '九、隐私政策',
    pppp93: '您提供给我们的任何数据或信息亦受我们隐私政策"《圣宝龙数字理财隐私政策》"的约束,该隐私政策亦是本协议的一部分',
    pppp94: '十、免责及责任限制',
    pppp95: '1.本公司仅对本协议中所列明的义务承担责任',
    pppp96: '2.您理解和同意,在法律所允许的最大范围内,本公司只能按照现有的技术水平和条件提供圣宝龙数字理财服务。因下列任何原因导致圣宝龙数字理财无法正常提供服务,本公司不承担责任：',
    pppp97: '1.圣宝龙数字理财系统停机维护或升级',
    pppp98: '2.因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因',
    pppp99: '3；您的移动设备软硬件和通信线路、供电线路出现故障的',
    pppp100: '4您操作不当或未通过本公司授权或认可的方式使用本公司服务的',
    pppp101: '5因电脑病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行或政府行为等原因',
    pppp102: '6非因本公司的原因而引起的任何其它原因',
    pppp103: '3本公司对以下任何情形均不承担责任',
    pppp104: '1因您遗失移动设备、删除且未备份圣宝龙数字理财、删除且未备份钱包、遗忘且未备份钱包密码、助记词、而导致该用户的数字代币丢失',
    pppp105: '2.因您自行泄露钱包密码、助记词,或借用、转让或授权他人使用自己的移动设备或圣宝龙数字理财钱包,或未通过本公司官方渠道下载圣宝龙数字理财应用程序或以其他不安全的方式使用圣宝龙数字理财应用程序导致的您的数字代币丢失',
    pppp106: '3.因您不理解区块链技术的知识而进行误操作导致的您的数字代币丢失',
    pppp107: '4.因系统滞后、区块链系统不稳定等原因导致本公司拷贝用户在区块链上的交易记录发生偏差',
    pppp108: '4您知悉本公司可能同时为您及您的交易对手方提供服务或与之有关联关系或其他利益相关的关系,您同意对本公司可能存在的该等行为予以明确豁兔任何实际或潜在的利益冲突,并不​​得以此来主张本公司在提供服务时存在法律上的瑕疵,也不因此而加重本公司的责任或注意义务',
    pppp109: '5您理解根据适用法律法规的要求,我们可能不时更改我们的用户准入标准,限定向特定用户等提供服务的范围和方式等',
    pppp110: '十一、其他条款',
    pppp111: '1知识产权声明圣宝龙数字理财系本公司开发并拥有知识产的应程序。 圣宝龙数字理财中显示的任何内容(包括本协议、公告、文章、视频、音频、图片、档案、资讯、资料、商标或标识)的知识产权归本公司或第三方权利人所有。用户仅可为持有和管理数字代币之目的使用圣宝龙数字理财应用程序及其中的内容。未经本公司或第三方权利人的事先书面同意,任何人不得擅自使用、修改、反向编译、复制、公开传播、改变、散布、发行或公开发表上述应用程序及内容。本协议不应被视为授予您任何知识产权,包括出于任​​何目的使用与我们或服务相关的任何信息、图片、用户界面、标识、商标、商业名称、网络域名或版权的权利',
    pppp112: '2终端安全责任',
    pppp113: '2.1您理解并同意,本软件同大多数互联网软件一样,可能会受多种因素影响,包括但不限于用户原因、网络服务质量、社会环境等;也可能会受各种安全问题的侵扰,包括但不限于他人非法利用用户资料,进行现实中的骚扰;用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序,威胁您的终端设备信息和数据安全,继而影响本软件的正常使用等。因此,您应加强信息安全及个人信息的保护意识,注意密码保护,以免遭受损失',
    pppp114: '2.2您不得制作、发布、使用、传播用于窃取帐号及他人个人信息、财产的恶意程序。',
    pppp115: '2.3维护软件安全与正常使用是圣宝龙数字理财和您的共同责任,圣宝龙数字理财将按照行业标准合理审慎地采取必要技术措施保护您的终端设备信息和数据安全,但是您承认和同意圣宝龙数字理财并不能就此提供完全保证',
    pppp116: '3:法律适用和争议解决',
    pppp117: '1本协议适用相关国家法律,并应据此解释',
    pppp118: '2因本协议引起的或与之相关的任何争议(包括任何有关其存在、有效性、终止的问题),双方应首先寻求和解。如果该争议在该和解程序开始后的30天内仍未解决,双方应将该争议提交至相关国家国际仲裁中心(简称”SIAC"),并通过遵循相关国家国际仲裁中心届时有效的仲裁规则(该规则被视为通过引用并入本条款),最终以仲裁的方式在相关国家予以解决。仲裁庭由一名仲裁员组成,由SIAC主席任命。仲裁语言为英语。每一方不可撤销地接受相关国家法院之非专属管辖权,以支持和协助根据本段前述内容进行的仲裁程序,包括在该程序的结果作出之前给予临时救济(如必要)',
    pppp119: '3为方便起见,本协议可以翻译为其他语言,但本协议英文版系主要文本。本协议及附件的其他语言译本如与英文版有不一致之处以英文版为准。',
    pppp120: '本协议自2020年2月14日适用',
    pppp121: '本协议未尽事宜,您需遵守本公司不时更新的公告及相关规则',

    quotes: '行情',
    network_computing_power: '全网算力',
    pool_data: '矿池数据',
    pool_power: '矿池算力',
    daily_earnings: '每日收益',
    Current_difficulty: '当前难度',
    Modify_nickname_avatar: '修改昵称/头像',
    p_enter_nikename: '请输入昵称',

    // application
    Hashing_power: '算力挖矿',
    Holding_power: '持有算力',
    Total_computing_power: '总算力',
    Purchase: '起购',
    Restricted_purchase: '限购',
    Price: '售价',
    Actual_price_paid: '实际支付价格',
    Purchase_quantity: '购买数量',
    computing_power_tip01: '使用算力代金券（每T消耗算力代金券 1张）',
    use: '使用',
    piece: '张',
    Account_Balance: '账户余额',
    computing_power_tip02: '张算力代金券',
    cancel: '取消',
    computing_power_tip03: '张算力卡',
    computing_power_tip04: '购买数量不能为0',
    Billing_record: '账单记录',
    Hashrate_record: '算力记录',
    Revenue_record: '收益记录',
    Miner_details: '矿机详情',
    Miner: '矿机',
    my_miner: '我的矿机',
    buy_miner: '购买矿机',
    model: '型号',
    Minable_currencies: '可挖币种',
    Daily_output_value_electricity: '日产值/电费',
    Daily_net_income: '日净收益',
    payment_method: '付款方式',
    Unit_power_consumption: '单位功耗',
    Computing_power: '算力',
    Power_consumption: '功耗',
    Current_address: '当前地址',
    All_currencies: '全部币种',
    Mining_income: '挖矿收益',
    Mining_machine_parameters: '矿机参数',
    Product_number: '产品型号',
    Coins_day_value: '日产币数/日产值',
    Current_currency_price_daily_electricity_fee: '当前币价(STD)/日电费(STD)',
    manufacturer: '生产厂商',
    release_time: '发布时间',
    release_times: '参与时间',
    Mining_machine_computing_power: '矿机算力',
    Mining_machine_power_consumption: '矿机功耗',
    Supported_algorithms: '支持算法',
    Hosting_mine: '托管矿场',
    Average_monthly_electricity_bill: '月平均耗电费' }, _defineProperty(_message, "payment_method",
  '付款方式'), _defineProperty(_message, "Actual_price_paid",
  '实际支付价格'), _defineProperty(_message, "my_miner_tip01",
  '矿机24小时收益'), _defineProperty(_message, "Cumulative_number_of_miners",
  '累计矿机数'), _defineProperty(_message, "List_of_miners",
  '矿机列表'), _defineProperty(_message, "buy",
  '买入'), _defineProperty(_message, "In_operation",
  '运行中'), _defineProperty(_message, "Downtime",
  '停机中'), _defineProperty(_message, "Acquisition_cost",
  '购置成本'), _defineProperty(_message, "end_time",
  '结束时间'), _defineProperty(_message, "Renewed_electricity_bill",
  '续交电费'), _defineProperty(_message, "total_power",
  '过去24小时收益'), _defineProperty(_message, "Order_record",
  '订单记录'), _defineProperty(_message, "Order_number",
  '订单编号'), _defineProperty(_message, "Purchase_cost",
  '购买成本'), _defineProperty(_message, "start_date",
  '开始日期'), _defineProperty(_message, "End_date",
  '结束日期'), _defineProperty(_message, "in_development",
  '正在开发中'), _defineProperty(_message, "returns",
  '返回'), _defineProperty(_message, "Hash_card",
  '算力卡'), _defineProperty(_message, "Unused",
  '未使用'), _defineProperty(_message, "Used",
  '已使用'), _defineProperty(_message, "Received",
  '已接收'), _defineProperty(_message, "Transferred",
  '已转让'), _defineProperty(_message, "To_transfer",
  '去转让'), _defineProperty(_message, "To_use",
  '去使用'), _defineProperty(_message, "Counterparty_username",
  '对方用户名'), _defineProperty(_message, "Please_enter_their_username",
  '请输入对方用户名'), _defineProperty(_message, "Verification_succeeded",
  '验证成功'), _defineProperty(_message, "Amount_transferred",
  '转让数量'), _defineProperty(_message, "Please_enter_the_number_of_transfers",
  '请输入转让张数'), _defineProperty(_message, "Current_remaining_hashrate_card",
  '当前剩余算力卡'), _defineProperty(_message, "sendCard_tip",
  '请认真核实账户信息,算力卡将实时转入对方账户，无法退还！'), _defineProperty(_message, "Transfer_now",
  '立即转让'), _defineProperty(_message, "sendCard_tip00",
  '对方用户名不符合转让条件'), _defineProperty(_message, "my_share_address",
  '我的分享链接'), _defineProperty(_message, "Download_poster",
  '下载海报'), _defineProperty(_message, "Scan_code_registration",
  '扫码注册'), _defineProperty(_message, "My_invitation",
  '我的邀请'), _defineProperty(_message, "Send_invitation_to_friends",
  '发送邀请给好友'), _defineProperty(_message, "Friends_complete_registration",
  '好友完成注册'), _defineProperty(_message, "Get_lucky_timestamp",
  '获得幸运时间戳'), _defineProperty(_message, "Promotional_rewards",
  '推广奖励'), _defineProperty(_message, "Promotion_number",
  '推广人数'), _defineProperty(_message, "Rewarded_lucky_timestamp",
  '已奖励幸运时间戳'), _defineProperty(_message, "invite_tip01",
  '成功推广1人奖励'), _defineProperty(_message, "Timestamp",
  '时间戳'), _defineProperty(_message, "Promotion_details",
  '推广明细'), _defineProperty(_message, "grade",
  '等级'), _defineProperty(_message, "Invite_now",
  '立即邀请'), _defineProperty(_message, "Limit",
  '限额'), _defineProperty(_message, "price",
  '单价'), _defineProperty(_message, "Buy_by_quantity",
  '按数量购买'), _defineProperty(_message, "Please_enter_quantity",
  '请输入数量'), _defineProperty(_message, "Payable",
  '需支付'), _defineProperty(_message, "immediately",
  '立即'), _defineProperty(_message, "Sell",
  '卖出'), _defineProperty(_message, "buy",
  "购买"), _defineProperty(_message, "buy_adn_sell_tip0",
  '数量过大，请重新输入数量'), _defineProperty(_message, "buy_adn_sell_tip1",
  '你的数量不够用，请重新输入数量'), _defineProperty(_message, "Order_Details",
  '订单明细'), _defineProperty(_message, "filter",
  '筛选'), _defineProperty(_message, "transaction",
  '交易中'), _defineProperty(_message, "Cancelled_order",
  '已撤单'), _defineProperty(_message, "Pay",
  '买单'), _defineProperty(_message, "Sell_orders",
  '卖单'), _defineProperty(_message, "Pays",
  '买'), _defineProperty(_message, "Sell_orderss",
  '卖'), _defineProperty(_message, "total",
  '总数'), _defineProperty(_message, "prompt",
  '提示'), _defineProperty(_message, "prompt01",
  '确定撤单吗?'), _defineProperty(_message, "Cancelled",
  '撤单'), _defineProperty(_message, "order_status",
  '订单状态'), _defineProperty(_message, "Release_Type",
  '发布类型'), _defineProperty(_message, "Release_number",
  '发布编号'), _defineProperty(_message, "Release_time",
  '发布时间'), _defineProperty(_message, "Already_bought",
  '已经买入'), _defineProperty(_message, "The_remaining_amount",
  '剩余数量'), _defineProperty(_message, "Transaction_Details",
  '交易详情'), _defineProperty(_message, "Closing_time",
  '成交时间'), _defineProperty(_message, "total_amount",
  '总金额'), _defineProperty(_message, "Coin_trading",
  '币币交易'), _defineProperty(_message, "Hash_card_transaction",
  '算力卡交易'), _defineProperty(_message, "Miner_trading",
  '矿机交易'), _defineProperty(_message, "Participation_Details",
  '参与明细'), _defineProperty(_message, "me_buy",
  '我要买'), _defineProperty(_message, "my_sell",
  '我要卖'), _defineProperty(_message, "My_release",
  '我的发布'), _defineProperty(_message, "Please_enter_unit_price",
  '请输入单价'), _defineProperty(_message, "Unit_price_range",
  '单价范围'), _defineProperty(_message, "Single_Low",
  '单次最低'), _defineProperty(_message, "Please_fill_in_the_minimum_single_transaction_amount",
  '请填写单次最低交易数量'), _defineProperty(_message, "Post_now",
  '立即发布'), _defineProperty(_message, "Post_purchase",
  '发布购买'), _defineProperty(_message, "market_sell_tip0",
  '超出当前拥有的数量，请重新设置卖出数量'), _defineProperty(_message, "market_sell_tip1",
  '超出最大数量'), _defineProperty(_message, "market_sell_tip2",
  '你设置的价格低于最低市场价格，请重新设置价格'), _defineProperty(_message, "market_sell_tip3",
  '你设置的价格低于最高市场价格，请重新设置价格'), _defineProperty(_message, "market_sell_tip4",
  '你设置的单次数量高于购买数量，请重新设置单次数量'), _defineProperty(_message, "market_sell_tip5",
  '你设置的单次数量高于卖出数量，请重新设置单次数量'), _defineProperty(_message, "membership_card",

  '会员卡'), _defineProperty(_message, "No_membership_card",
  '无会员卡'), _defineProperty(_message, "Current_total_revenue",
  '当前总收益'), _defineProperty(_message, "You_are_currently",
  '您当前是'), _defineProperty(_message, "Upgrade_membership_card",
  '提升会员卡'), _defineProperty(_message, "Boost_for_more_revenue",
  '提升获取更多收益'), _defineProperty(_message, "Promote_now",
  '立即提升'), _defineProperty(_message, "upgrade",
  '升级'), _defineProperty(_message, "value",
  '价格'), _defineProperty(_message, "Consumption_of_computing_power",
  '购买算力消耗'), _defineProperty(_message, "Place_an_order",
  '下单'), _defineProperty(_message, "member_tip0",
  '不能购买低于当前等级的会员卡'), _defineProperty(_message, "member_tip1",
  '当前等级不能复购'), _defineProperty(_message, "member_tip2",
  '不能越级购买'), _defineProperty(_message, "user_level",
  '用户等级'), _defineProperty(_message, "inactivated",
  '未激活'), _defineProperty(_message, "membership_level",
  '会员等级'), _defineProperty(_message, "Contribution",
  '贡献值'), _defineProperty(_message, "Cloud_miner",
  '云矿机'), _defineProperty(_message, "invite_friends",
  '邀请好友'), _defineProperty(_message, "Asset_list",
  '资产列表'), _defineProperty(_message, "Deposit",
  '充币'), _defineProperty(_message, "Flash_payment",
  '闪付'), _defineProperty(_message, "address_list_tip",
  '是否刪除该地址?'), _defineProperty(_message, "Amount_paid",
  '闪付金额'), _defineProperty(_message, "Please_enter_the_amount_of_flash_payment",
  '请输入闪付金额'), _defineProperty(_message, "pay_immediately",
  '立即支付'), _defineProperty(_message, "false_tip0",
  '闪兑数量超出你所拥有的数量，请修改'), _defineProperty(_message, "Flash_payment_record",
  '闪付记录'), _defineProperty(_message, "recarge_tip0",
  '请勿像上述地址充值任何非'), _defineProperty(_message, "recarge_tip1",
  '资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点的确认。请勿像上述地址充值任何非币种资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点的确认。请勿像上述地址充值任何非币种资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点的确认。请勿像上述地址充值任何非币种资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点的确认'), _defineProperty(_message, "no_login",
  '未登录'), _defineProperty(_message, "Purchase_History",
  '购买记录'), _defineProperty(_message, "Electricity_bill",
  '电费记录'), _defineProperty(_message, "Revenue_record",
  '收益记录'), _defineProperty(_message, "pay_pwd_requier",
  "重新输入"), _defineProperty(_message, "pay_pwd_tip0",
  '数字密码有误'), _defineProperty(_message, "pay_pwd_tip1",
  '支付失败，账户余额不足'), _defineProperty(_message, "team",
  '团队'), _defineProperty(_message, "Invest",
  '投入'), _defineProperty(_message, "release",
  '发布'), _defineProperty(_message, "Handling_fee_ratio",
  '手续费比例'), _defineProperty(_message, "participants",
  '参与方'), _defineProperty(_message, "get",
  '得到'), _defineProperty(_message, "Bind_mailbox_modification",
  '绑定邮箱修改'), _defineProperty(_message, "Current_account",
  '旧邮箱'), _defineProperty(_message, "New_account",
  '新邮箱'), _defineProperty(_message, "_check_in",
  '验证'), _defineProperty(_message, "Current_mailbox",
  '当前邮箱'), _defineProperty(_message, "p_enter_check_in",
  '请先验证用户是否存在'), _defineProperty(_message, "Frozen_quantity",
  '矿池数量'), _defineProperty(_message, "mine_tip_msg",
  '当前用户暂未激活，请立即前往激活'), _defineProperty(_message, "Language_type",
  {
    update: "更新提示",
    update_tip: "圣宝龙数字理财 已上架新版本, 您是否更新？",
    isJumping: "正在跳转...",
    soon_update: "请尽快更新最新版本...",
    fail: "失败" }), _defineProperty(_message, "Income_limit",

  '收益限制'), _defineProperty(_message, "My_assets",
  '我的资产'), _defineProperty(_message, "Please_enter_a_number_and_letter_combinatio_username",
  '请输入数字字母组合用户名'), _defineProperty(_message, "Team_performance",
  '团队业绩'), _defineProperty(_message, "p_enter_zh",
  '请输入正整数'), _defineProperty(_message, "no_paypwd_mes",
  '暂未设置支付密码,请立即前往设置'), _defineProperty(_message, "Contact_email",
  '联系邮箱'), _defineProperty(_message, "Copy_customer_service_email",
  '复制客服邮箱'), _defineProperty(_message, "Performance",
  "业绩"), _defineProperty(_message, "Community_performance",
  '总业绩'), _defineProperty(_message, "my_code",
  '我的邀请码'), _defineProperty(_message, "Node_contribution",
  '节点贡献'), _defineProperty(_message, "Buy_by_quantity01",
  '按数量卖出'), _defineProperty(_message, "Total_performance",
  '总业绩'), _defineProperty(_message, "Regional_contribution",
  '大区贡献'), _defineProperty(_message, "Community_contribution",
  '小区贡献'), _defineProperty(_message, "touzi_e",
  '投资额'), _defineProperty(_message, "enter_invitation",
  "请输入邀请码"), _defineProperty(_message, "flas_history",
  '闪兑记录'), _defineProperty(_message, "transfer__out__num",
  "转出数量"), _defineProperty(_message, "receive__num",
  "收到数量"), _message) };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 304:
/*!******************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/wallet-02.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 305:
/*!******************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/wallet-03.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 306:
/*!******************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/wallet-04.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAMKklEQVR4Xu2dbYwVVxnH/2cuLBQEtG2gBQR2gZgQW1ulofYFgVooCGrVAlu1iVrfjX7y3RTbar/4pbXiRpPGWK1WIrHQigTRbUqJy4KVxoZSi7sLSgypLW14X/bex8zszu7c2Zl7nnPmnLl7xrnJZjd7Xp5znt/5P+eZM3PvFShfhfaAKPTsysmhBFzwRVACLgEX3AMFn16p4BJwwT1Q8OmVCi4BF9wDBZ9eqeAScME9UPDplQouARfcAwWfXqngEvDY8QB1tV4ND18FcBUEWpRHVgNAkVbh3/5v/8cvD1/1ZWcAdILoAbG873Vlu01s4ISCqXPeREwWuwHcqOyrEJ7fMOnv8H+S30QCEBigcXigsqJnk/I4mtRgzAOmFxa14Oy5PgBXsn1kEmoCeGrBTyorez7HHk8TK459wN3ztgLiQ1IfWYY6rP6h0C0uoVViZe8u6biaXGFMA6bOZeMw+eh5AJVEP+UJNa7kFhzx1vUsbDI/qfmmAA7C7ukLV0EMzAG8camjFHQtIL5ZV95MqNHES4DETNqQOnaiflRrL+PmY4eFqEvfpFBMVsgNMBEEDrStRo0+A4FbAUxKVWW0wB/hWIEay7rFLAK82CyiWfpg0UkATwLUIW7q6zIJj9NXLoBp/9xrQd6PAVzPghqtFA2N0UxYJftl1o3vs6kLa2h8Yjb5mfXgazTYkVmMlD0FiC+Km3uOceCYqGMdMHW3fhrAwwAmjBpwI6eElasRBTNBBZc0zLqqUIfnMA4QVzSYQHrR6/CwQdyYT4JmFTB1t30eIF+5SauZt0AHADAg5wI1OuKpgJiaQJGn5H4Q7hDv6d3Oc4J+LWuAqat1JTzsCDJgjlLTFoHf9sLQKVNMlblDDcdYAcSMyP7LgxqndAZVWiyW9x3WxydvaQUwdS2YCq92CESz5ENgqNtX8LlByE2DGoV7OQHpub/KnrwPS3tvsJll2wG8b94mQHyXBZer7ipA5wXQn6zmxD03mpTF/2YNLlLJ99QkQEyhtKtybqJVb1lQu1ja97jqcLj1jQMODicmHT0OYHrqILhQQyjx8O3fFPBVHb6il1Fxo43KVLzkKzbJW3rhOboY9ohlvUu5Q1GtZx5wd9stIPJvDIx+ccFy6pmoowsnaeHFFyF//lUM9M8Q7z3+qio8Tn0bgO8F0T116uKMhANM5ljb5boLIq3d8P+pXSy3E6bNA97XusW/BOAwDepwwMrq2Cw3DTVpzkLcJ5bZuQVpHnBXq3+HxT+KTH/JgOQBXjYGHbA6bQbnulms6P0SWxQKFW0A3gPgplFjkDk0mjBlWRwyO/oQ1Bcs2xZ1iBV9X1Dgxq5qH7DM4Ry1yvrIUs6GEPOpTrvUNq4BpgQFx9ecDEpW8DoAZDZ1+mS1oQ5xiysK/ktrcoiWOS+PEM1ydkL0k2bBWdu4DlimVpvlpqE2Wqi6C0G4CFgGjaPoPOHIxqMLLykdivflFOC9rXsgGuzBMvC6UHUB6ShSp03DeVGHuNWVPTgJcBaoNsDpALLaxkXAMqh5g9O1pxNRlMO5a4CTDjo4WbJsUZh0tmngWcZG1CFWuRSi44BtgDMNyGoIjmRaSb5wEvBYgtpMeKyF6JKCn81w0BEuipl3AbM+CUycwz5zzb1i7SLwxgHgH/cBp15KNs/Yi/3HxQnoqKzqceQsOgmwyv40+26g9Vu589I22P8a0LUa6H9lsAsm1GF7FDTpqNzmGmAVqFHvXvcMMHG2tr+b0vDID4DejoYq9pVa94r4xy3AezRDdDjhd/8VGP+WpnDSNnrsZ8BL9480r4MXAZuy6N0GrKrkhd8HrmzX9nXuDakKHNgAnHwuEnXlUKPhnIRLIdpXcKPbhTLglcnAos3ApdYeNDS3BqpngcP3A8d/g0YhOC00Dx8NOAX4mYQQLYOa5HJ/H54wCxAJT5jLLsGS+mMkP6OaNbJTPQecOgzyfw+TSlk7kvkHIXqNK0lWFLAO2Ga3YSyEOrUaGK97gNNCtAFnSNXCvFSRhc24nSwhWHb5RISOylqXFBwFbBKqJXiNQjNLrQzVN7ThJOCMk2YpzOTiUby0kakycTdOu0xyCvDThpIsS/DSDxvSDyIyLTbGPII92JkQHQU8xlVsbV9V3ErcAtypcZKV80LItK8qwmsYyof6CgCvcyXJigPOGd5YDMGy62v3AOucZKkuBNbeZmlfNaxitwD/WSHJYkCSrf6k6+KxFoJlGXVwFu1MiA4BW4LHCsF52DaoYvcAJ4Vol0KwyQXCWAhBiP6AK0mWr+AQsK6jJi8A3vpR4JK5gDd+ULQ6NxhSzv5T/61iY+As6OR+oO8xoOp/XmrspTB39wDXUt7ZwFHxtHcAix8HvNEfjKfKK5f6r+4DdX0c8O8LK0CNjs0twLtjSRYHanS2S54Apl6dCxtTRujg14B/bdVWcbAHOxOifcBZLpNWPA+Mm2LK9/n00/so6IV7R2wpLmq3AP9R7zIpvLQRi38FXLokHzCGrNDBrwPHfpveG+eG/+2uJFkhYMZ+lHgWPPXtEIt/Dox/syH3W+7mRCeo+7ODe3BsY+Umc8Ee7AzgXSln0Sq341ouA2asgZjI/x4O45m2LKOuXQSdPAiceHokxWcs6iTo7gJWgRrOXHH/4jxozr6E0QSkmz2H7YInOj7sSojeOfIGcGu343RA5NVGds2eMA6nANd2ttW/w9+UIhs5TtWGBgTpFiAL6Q3K3QOc9v5gkyoy2ZcucEPtgj3YlRAdKJj7/mCTynMBeMqCcBNwHvDGCtQsSvZzcD/J+ogjSVbtDwkKzmv/1AGeBY6uvZjNQMFOAh6rKrYFVdZvoxDtDOAdigrWUbfpNjIwGTJkafY9eEzikILjgPNQcRZAumE2K/TImIObDU4pOI/3JjUDqsymZrlbgJ+KHXTohNPLrodo/QQwZQEgkr9ZNvEgX6aq1NN/jYKB08B/94NefAi4IPnWd8m43ASsE/r8NjPXQLzrhynfYaMBwnaT00dBf1oHDJwZbYmz4MIPYVnvymWSr2CVj/SPOUEs3wW8ab5tLEb7p799B+j59WCfTKjRAQRJlpOANVQsbnsOGD/NKADrnR15FHQw8kRHmsEUf7gF+MkUBctW99DkxeIfATNXW2di0gDtvRv4T2dylwxFuw1YVcUTp0MseQSYtsgkAzt9+U9xvLgZdOih+v4ZUIcb+Huwf1S50ZU9OFRwlutfP3O+fAkwaTYghr5DXXWhqCBVARL2e/EU8NrzwJl/j1ji9hOr5xbg7dmSrDouModlgS7rW7alhAPl9CPpy13AugBstOMC4QDj1OHaC+8mOROit2VLsrQOMGQOz1quAIt9qRSZqFsK3jZ/J0CroklE6naYxfFZ2qoAk9lR6St28TvSlB6ubOz9skrawK1r/KvtqtvbHhOEO7M+aWhFyTnuqyrjFyTuEe3/jHyaKRefvJ5xwPRE67cJ4nujTOvuqxwoMpXJyjk2UtQnd7H8dEsQ3SHaexu8NYJlJbGSBcDzbyDQXuleJHN61nIuNJkdAyFYgqcmPO8Ksf7I0CeK68NMamke8CZ4dE1bD4C5KmFKuiBMAms+1Khrdnsbexp/33IG5sYBBxx+1/YVAh5kJVoccDIgsnKODYshuBEfQVgr2nt+n4Fhw6Z2AO9YMIHO1/4OYGGqdRmUrOWqoVVmLz4R1frJjtjlbewZueKwQNkK4EAwW9uuI4FnAbQYUzJXiVznc+upLhYeqFfEgPdO8bEjkbNOXkOVWtYAD4XqdiL8AoTGj2XIHC0r54LXBcWxr+J14A1BtVWivW+fWjP12lYBDyn5fQT8EkD9G35lTpOVq8Li9qfar7rPXxa12vvFnX2H1Zuqt7AOOIC8pW0OVfAgCB+UPovDAcGpo6pqnfpq/h4g4BFvQu0b4vY+yUNcah03TOLMdSXvibbMu6bmVT4lQGsBzGPvzarO5y4A+2r1LRwiYLvnVX8q1h/tlXvJbI1cFJw0ZNr2tik4d342PDEdXvhhWAk1Y5+MYHb6lnqr0QUIcQL9Z46Lu04kPI1nyW5Ct00DnN8U/78tlYALzr8EXAIuuAcKPr1SwSXggnug4NMrFVwCLrgHCj69UsEl4IJ7oODTKxVcAi64Bwo+vVLBJeCCe6Dg0ysVXAIuuAcKPr3/AZijB+J/9BXxAAAAAElFTkSuQmCC"

/***/ }),

/***/ 307:
/*!******************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/wallet-05.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 316:
/*!***************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/invite.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 317:
/*!*************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/team.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 318:
/*!*************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/mine.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 319:
/*!*************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/time.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 320:
/*!***************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/static/image/avatar.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/image/avatar.png";

/***/ }),

/***/ 331:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 332);

/***/ }),

/***/ 332:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 333);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 333:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 334:
/*!**************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/common/js/img-tools.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 36:
/*!*********************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/common/js/util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.fetch = fetch;exports.get_chs_length = get_chs_length;exports.pageback = pageback;exports.pageto = pageto;exports.showToast = showToast;exports.diff_txt = diff_txt;exports._updataTabBar = _updataTabBar;exports.redirectologin = redirectologin;exports.forceUpdate = forceUpdate;exports.updownLine = updownLine;var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 37));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 12));
var _index2 = _interopRequireDefault(__webpack_require__(/*! @/lang/index.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var baseUrl = _index.default.state.requestUrl;

function fetch(url, data, method) {
  return (0, _http.default)({
    url: url,
    data: data,
    method: method });

}

function get_chs_length(str) {
  var count = 0;
  var regEx = /[\u4e00-\u9fa5]/;
  var m = regEx.exec(str);
  while (!!m) {
    mmm(str, m);
    count++;
  }

  function mmm(string) {
    str = string.slice(m['index'] + 1);
    m = regEx.exec(str);
  }
  return count;
}

function pageback() {
  uni.navigateBack({
    delta: 1 });

}

function pageto(str, params) {
  if (!!params) {
    uni.switchTab({
      url: str
      // success(e) {
      // 	console.log(e)
      // },
      // fail(err) {
      // 	console.log(err)
      // }
    });
  } else {
    uni.navigateTo({
      url: str });

  }
}

function showToast() {var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "none";
  if (!title) {
    console.log("showToast title is wrong");
    return;
  }
  uni.showToast({
    title: title,
    duration: duration,
    mask: mask,
    icon: icon });

}

function diff_txt(time, lang) {
  var chs = {
    lang1: '今天',
    lang2: '昨天',
    lang3: '前天' };

  var en = {
    lang1: 'Today ',
    lang2: 'Yesterday ',
    lang3: 'The day before yesterday ' };

  var _lang = lang == "en" ? en : chs;
  if (!time) return {};
  var time1 = new Date(time).getDate();
  var time2 = new Date().getDate();
  if (new Date().getFullYear() == new Date(time).getFullYear() && new Date().getMonth() == new Date(time).getMonth()) {
    if (time1 == time2) {
      return _lang.lang1 + time.slice(11);
    } else if (time2 - time1 == 1) {
      return _lang.lang2 + time.slice(11);
    } else if (time2 - time1 == 2) {
      return _lang.lang3 + time.slice(11);
    } else {
      return time;
    }
  }
  return time;
}

function _updataTabBar(arr, lang) {
  arr[lang].map(function (item, ind) {
    uni.setTabBarItem({
      index: ind,
      text: arr[lang][ind] });

  });
}

function redirectologin() {
  uni.redirectTo({
    url: "/pages/login/login" });

}

function forceUpdate(lang) {
  if (!lang) {
    redirectologin();
    return;
  }
  var target = _index2.default.messages[lang].message.Language_type;














































































}


function updownLine(type) {
  return fetch('/api/user/lineStatus', { type: type }, "post");
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!*********************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/common/js/http.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = http;var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var baseUrl = _index.default.state.requestUrl;

// 定义常用的变量
var config = {
  baseUrl: baseUrl,
  method: "get" };


// 接受拦截器函数
http.interceptor = {
  response: null,
  request: null };


function http(options) {

  var reg = /^\/\w{1,16}\/\w{1,16}\/\w{1,16}$/;
  if (!options.url || !reg.test(options.url)) {
    throw new Error("请求接口格式错误");
  }

  options.baseUrl = options.baseUrl || config.baseUrl;
  options.url = options.baseUrl + options.url;
  options.data = options.data || {};
  options.method = options.method || config.method;

  return new Promise(function (resolve, reject) {
    var _config = null;

    options.complete = function (response) {
      var statusCode = response.statusCode;

      if (http.interceptor.response) {
        var newResponse = http.interceptor.response(response);
        if (newResponse) {response = newResponse;}
      }

      if (statusCode == 200) {
        resolve(response);
      } else {reject(response);}
    };


    _config = Object.assign({}, options);

    if (http.interceptor.request) {
      _config = http.interceptor.request(_config);
    }

    uni.request(_config);
  });
}

http.interceptor.response = function (response) {
  if (response.data.code == 2 || response.data.code == '3') {
    if (response.data.code == '3') {
      uni.redirectTo({
        url: '/pages/login/login?type=3' });

      uni.showToast({
        title: response.data.msg });

      return;
    }
    uni.redirectTo({
      url: '/pages/login/login?type=2' });

    return {};
  }
  return response;
};

http.interceptor.request = function (request) {
  var loginInfo = _index.default.state.loginInfo;
  var lang_type = _index.default.state.lang_type == "chs" ? 1 : 2;
  var config = {
    data: _objectSpread({
      id: loginInfo.id ? loginInfo.id : '',
      token: loginInfo.token ? loginInfo.token : '',
      lang_type: lang_type },
    request.data) };


  return Object.assign({}, request, config);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 478:
/*!*******************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/components/qrcode/qrcode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var QRCode = {};
(function () {
  /**
               * 获取单个字符的utf8编码
               * unicode BMP平面约65535个字符
               * @param {num} code
               * return {array}
               */
  function unicodeFormat8(code) {
    // 1 byte
    var c0, c1, c2;
    if (code < 128) {
      return [code];
      // 2 bytes
    } else if (code < 2048) {
      c0 = 192 + (code >> 6);
      c1 = 128 + (code & 63);
      return [c0, c1];
      // 3 bytes
    } else {
      c0 = 224 + (code >> 12);
      c1 = 128 + (code >> 6 & 63);
      c2 = 128 + (code & 63);
      return [c0, c1, c2];
    }
  }
  /**
     * 获取字符串的utf8编码字节串
     * @param {string} string
     * @return {array}
     */
  function getUTF8Bytes(string) {
    var utf8codes = [];
    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      var utf8 = unicodeFormat8(code);
      for (var j = 0; j < utf8.length; j++) {
        utf8codes.push(utf8[j]);
      }
    }
    return utf8codes;
  }
  /**
     * 二维码算法实现
     * @param {string} data              要编码的信息字符串
     * @param {num} errorCorrectLevel 纠错等级
     */
  function QRCodeAlg(data, errorCorrectLevel) {
    this.typeNumber = -1; //版本
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null; //二维矩阵，存放最终结果
    this.moduleCount = 0; //矩阵大小
    this.dataCache = null; //数据缓存
    this.rsBlocks = null; //版本数据信息
    this.totalDataCount = -1; //可使用的数据量
    this.data = data;
    this.utf8bytes = getUTF8Bytes(data);
    this.make();
  }
  QRCodeAlg.prototype = {
    constructor: QRCodeAlg,
    /**
                             * 获取二维码矩阵大小
                             * @return {num} 矩阵大小
                             */
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    /**
        * 编码
        */
    make: function make() {
      this.getRightType();
      this.dataCache = this.createData();
      this.createQrcode();
    },
    /**
        * 设置二位矩阵功能图形
        * @param  {bool} test 表示是否在寻找最好掩膜阶段
        * @param  {num} maskPattern 掩膜的版本
        */
    makeImpl: function makeImpl(maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(true, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(true);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    /**
        * 设置二维码的位置探测图形
        * @param  {num} row 探测图形的中心横坐标
        * @param  {num} col 探测图形的中心纵坐标
        */
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    /**
        * 创建二维码
        * @return {[type]} [description]
        */
    createQrcode: function createQrcode() {
      var minLostPoint = 0;
      var pattern = 0;
      var bestModules = null;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
          bestModules = this.modules;
        }
      }
      this.modules = bestModules;
      this.setupTypeInfo(false, pattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(false);
      }
    },
    /**
        * 设置定位图形
        * @return {[type]} [description]
        */
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
        if (this.modules[6][r] != null) {
          continue;
        }
        this.modules[6][r] = r % 2 == 0;
      }
    },
    /**
        * 设置矫正图形
        * @return {[type]} [description]
        */
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    /**
        * 设置版本信息（7以上版本才有）
        * @param  {bool} test 是否处于判断最佳掩膜阶段
        * @return {[type]}      [description]
        */
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    /**
        * 设置格式信息（纠错等级和掩膜版本）
        * @param  {bool} test
        * @param  {num} maskPattern 掩膜版本
        * @return {}
        */
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      // vertical
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
        // horizontal
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;
    },
    /**
        * 数据编码
        * @return {[type]} [description]
        */
    createData: function createData() {
      var buffer = new QRBitBuffer();
      var lengthBits = this.typeNumber > 9 ? 16 : 8;
      buffer.put(4, 4); //添加模式
      buffer.put(this.utf8bytes.length, lengthBits);
      for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
        buffer.put(this.utf8bytes[i], 8);
      }
      if (buffer.length + 4 <= this.totalDataCount * 8) {
        buffer.put(0, 4);
      }
      // padding
      while (buffer.length % 8 != 0) {
        buffer.putBit(false);
      }
      // padding
      while (true) {
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD0, 8);
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD1, 8);
      }
      return this.createBytes(buffer);
    },
    /**
        * 纠错码编码
        * @param  {buffer} buffer 数据编码
        * @return {[type]}
        */
    createBytes: function createBytes(buffer) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var length = this.rsBlock.length / 3;
      var rsBlocks = new Array();
      for (var i = 0; i < length; i++) {
        var count = this.rsBlock[i * 3 + 0];
        var totalCount = this.rsBlock[i * 3 + 1];
        var dataCount = this.rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          rsBlocks.push([dataCount, totalCount]);
        }
      }
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r][0];
        var ecCount = rsBlocks[r][1] - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var data = new Array(this.totalDataCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;

    },
    /**
        * 布置模块，构建最终信息
        * @param  {} data
        * @param  {} maskPattern
        * @return {}
        */
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };

  /**
          * 填充字段
          */
  QRCodeAlg.PAD0 = 0xEC;
  QRCodeAlg.PAD1 = 0x11;
  //---------------------------------------------------------------------
  // 纠错等级对应的编码
  //---------------------------------------------------------------------
  var QRErrorCorrectLevel = [1, 0, 3, 2];
  //---------------------------------------------------------------------
  // 掩膜版本
  //---------------------------------------------------------------------
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };

  //---------------------------------------------------------------------
  // 工具类
  //---------------------------------------------------------------------
  var QRUtil = {
    /*
                 每个版本矫正图形的位置
                  */
    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],

    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    /*
                                                             BCH编码格式信息
                                                              */
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    /*
       BCH编码版本信息
        */
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    /*
       获取BCH位信息
        */
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    /*
       获取版本对应的矫正图形位置
        */
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    /*
       掩膜算法
        */
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },
    /*
       获取RS的纠错多项式
        */
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    /*
       获取评价
        */
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;
      for (var row = 0; row < moduleCount; row++) {
        var sameCount = 0;
        var head = qrCode.modules[row][0];
        for (var col = 0; col < moduleCount; col++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (col < moduleCount - 6) {
            if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
              if (col < moduleCount - 10) {
                if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                  lostPoint += 40;
                }
              } else if (col > 3) {
                if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 2 评价
          if (row < moduleCount - 1 && col < moduleCount - 1) {
            var count = 0;
            if (current) count++;
            if (qrCode.modules[row + 1][col]) count++;
            if (qrCode.modules[row][col + 1]) count++;
            if (qrCode.modules[row + 1][col + 1]) count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
          //level 4 评价
          if (current) {
            darkCount++;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var head = qrCode.modules[0][col];
        for (var row = 0; row < moduleCount; row++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (row < moduleCount - 6) {
            if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
              if (row < moduleCount - 10) {
                if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                  lostPoint += 40;
                }
              } else if (row > 3) {
                if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
        }
      }
      // LEVEL4
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };


  //---------------------------------------------------------------------
  // QRMath使用的数学工具
  //---------------------------------------------------------------------
  var QRMath = {
    /*
                 将n转化为a^m
                  */
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    /*
       将a^m转化为n
        */
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256) };


  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }
  //---------------------------------------------------------------------
  // QRPolynomial 多项式
  //---------------------------------------------------------------------
  /**
   * 多项式类
   * @param {Array} num   系数
   * @param {num} shift a^shift
   */
  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    /**
        * 多项式乘法
        * @param  {QRPolynomial} e 被乘多项式
        * @return {[type]}   [description]
        */
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    /**
        * 多项式模运算
        * @param  {QRPolynomial} e 模多项式
        * @return {}
        */
    mod: function mod(e) {
      var tl = this.getLength(),
      el = e.getLength();
      if (tl - el < 0) {
        return this;
      }
      var num = new Array(tl);
      for (var i = 0; i < tl; i++) {
        num[i] = this.get(i);
      }
      while (num.length >= el) {
        var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        while (num[0] == 0) {
          num.shift();
        }
      }
      return new QRPolynomial(num, 0);
    } };


  //---------------------------------------------------------------------
  // RS_BLOCK_TABLE
  //---------------------------------------------------------------------
  /*
  二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
   */
  var RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  /**
                              * 根据数据获取对应版本
                              * @return {[type]} [description]
                              */
  QRCodeAlg.prototype.getRightType = function () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var totalDataCount = 0;
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }
      var lengthBytes = typeNumber > 9 ? 2 : 1;
      if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------
  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit(num >>> length - i - 1 & 1);
      }
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    } };




  // xzedit
  var qrcodeAlgObjCache = [];
  /**
                               * 二维码构造函数，主要用于绘制
                               * @param  {参数列表} opt 传递参数
                               * @return {}
                               */
  QRCode = function QRCode(opt) {
    //设置默认参数
    this.options = {
      text: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      pdground: '#000000',
      image: '',
      imageSize: 30,
      canvasId: '_myQrCodeCanvas',
      context: opt.context };

    if (typeof opt === 'string') {// 只编码ASCII字符串
      opt = {
        text: opt };

    }
    if (opt) {
      for (var i in opt) {
        this.options[i] = opt[i];
      }
    }
    //使用QRCodeAlg创建二维码结构
    var qrCodeAlg = null;
    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }
    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg });

    }
    /**
       * 计算矩阵点的前景色
       * @param {Obj} config
       * @param {Number} config.row 点x坐标
       * @param {Number} config.col 点y坐标
       * @param {Number} config.count 矩阵大小
       * @param {Number} config.options 组件的options
       * @return {String}
       */
    var getForeGround = function getForeGround(config) {
      var options = config.options;
      if (options.pdground && (
      config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
      config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
      config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
      {
        return options.pdground;
      }
      return options.foreground;
    };
    // 创建canvas
    var createCanvas = function createCanvas(options) {
      uni.showLoading({
        title: "二维码生成中",
        mask: true });

      var ctx = uni.createCanvasContext(options.canvasId, options.context);
      var count = qrCodeAlg.getModuleCount();
      var ratioSize = options.size;
      var ratioImgSize = options.imageSize;
      //计算每个点的长宽
      var tileW = (ratioSize / count).toPrecision(4);
      var tileH = (ratioSize / count).toPrecision(4);
      //绘制
      for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          var foreground = getForeGround({
            row: row,
            col: col,
            count: count,
            options: options });

          ctx.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        }
      }
      if (options.image) {




        // 画圆角矩形
        var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
          ctxi.setLineWidth(lineWidth);
          ctxi.setFillStyle(options.background);
          ctxi.setStrokeStyle(options.background);
          ctxi.beginPath(); // draw top and top right corner 
          ctxi.moveTo(x + r, y);
          ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
          ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
          ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
          ctxi.arcTo(x, y, x + r, y, r);
          ctxi.closePath();
          if (fill) {
            ctxi.fill();
          }
          if (stroke) {
            ctxi.stroke();
          }
        };var x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
      }
      ctx.draw(false, function () {
        // 保存到临时区域
        setTimeout(function () {
          uni.canvasToTempFilePath({
            width: options.width,
            height: options.height,
            destWidth: options.width,
            destHeight: options.height,
            canvasId: options.canvasId,
            quality: Number(1),
            success: function success(res) {
              if (options.cbResult) {
                // 由于官方还没有统一此接口的输出字段，所以先判定下  支付宝为 res.apFilePath
                if (!empty(res.tempFilePath)) {
                  options.cbResult(res.tempFilePath);
                } else if (!empty(res.apFilePath)) {
                  options.cbResult(res.apFilePath);
                } else {
                  options.cbResult(res.tempFilePath);
                }
              }
            },
            fail: function fail(res) {
              if (options.cbResult) {
                options.cbResult(res);
              }
            },
            complete: function complete() {
              uni.hideLoading();
            } },
          options.context);
        }, options.text.length + 100);
      });
    };
    createCanvas(this.options);
    // 空判定
    var empty = function empty(v) {
      var tp = typeof v,
      rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    };
  };
  QRCode.prototype.clear = function (fn) {
    var ctx = uni.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, function () {
      if (fn) {
        fn();
      }
    });
  };
})();var _default =

QRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 93:
/*!**************************************************!*\
  !*** G:/WWW/uni-app/澳门钱贷/common/js/validator.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                     * validate
                                                                                                     * validator
                                                                                                     */var _default =
{
  // name: key
  // 邮箱
  email: function email(v) {
    if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      return false;
    }
    return true;
  },
  // 手机号
  mobile: function mobile(v) {
    if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
      return false;
    }
    return true;
  },
  // name: key
  // 正整数
  posPattern: function posPattern(v) {
    if (!v.match(/^\d+$/)) {
      return false;
    }
    return true;
  },
  // 用户名
  username: function username() {

  },
  // 登录密码
  // 6-16位的字母或者数字组合  单一数字或者字母都可以   但是下划线和.是不可以的
  passLogin: function passLogin(v) {
    if (!v.match(/^[0-9a-zA-Z]{6,16}$/)) {
      return false;
    }
    return true;
  },
  // 交易密码
  passPwd: function passPwd(v) {
    if (!v.match(/^\d{6}$/)) {
      return false;
    }
    return true;
  },

  // 手机验证码验证
  yzm: function yzm(v) {
    if (!v.match(/^\d{6}$/)) {
      return false;
    }
    return true;
  },
  //图形验证码验证
  yzmimg: function yzmimg(v) {
    if (!v.match(/^[0-9a-zA-Z]{4}$/)) {
      return false;
    }
    return true;
  },
  //邀请码验证
  yqm: function yqm(v) {
    if (!v.match(/^[0-9]{1,}$/)) {
      return false;
    }
    return true;
  },
  //用户名正则，4到16位（字母，数字，下划线，减号）
  chsVc: function chsVc(v) {
    if (!v.match(/^[a-zA-Z0-9_-]{4,16}$/)) {
      return false;
    }
    return true;
  },
  //中文验证
  chsVchs: function chsVchs(v) {
    if (!v.match(/[\u4E00-\u9FA5]/)) {
      return false;
    }
    return true;
  },
  symbol: function symbol(v) {
    if (v.match(/\/|\~|\!|\#|\\$|\%|\^|\&|\*|\(|\)|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\/|\;|\\' | \`|\-|\=|\\\|\|/ig)) {
      return false;
    }
    return true;
  } };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map