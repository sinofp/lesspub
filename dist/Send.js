"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/rescript/lib/js/caml_option.js
var require_caml_option = __commonJS({
  "node_modules/rescript/lib/js/caml_option.js"(exports2) {
    "use strict";
    function isNested(x) {
      return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
    }
    function some(x) {
      if (x === void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: 0
        };
      } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
        };
      } else {
        return x;
      }
    }
    function nullable_to_opt(x) {
      if (x == null) {
        return;
      } else {
        return some(x);
      }
    }
    function undefined_to_opt(x) {
      if (x === void 0) {
        return;
      } else {
        return some(x);
      }
    }
    function null_to_opt(x) {
      if (x === null) {
        return;
      } else {
        return some(x);
      }
    }
    function valFromOption(x) {
      if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
        return x;
      }
      var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
      if (depth === 0) {
        return;
      } else {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
        };
      }
    }
    function option_get(x) {
      if (x === void 0) {
        return;
      } else {
        return valFromOption(x);
      }
    }
    function option_unwrap(x) {
      if (x !== void 0) {
        return x.VAL;
      } else {
        return x;
      }
    }
    exports2.nullable_to_opt = nullable_to_opt;
    exports2.undefined_to_opt = undefined_to_opt;
    exports2.null_to_opt = null_to_opt;
    exports2.valFromOption = valFromOption;
    exports2.some = some;
    exports2.isNested = isNested;
    exports2.option_get = option_get;
    exports2.option_unwrap = option_unwrap;
  }
});

// node_modules/rescript/lib/js/js_dict.js
var require_js_dict = __commonJS({
  "node_modules/rescript/lib/js/js_dict.js"(exports2) {
    "use strict";
    var Caml_option = require_caml_option();
    function get(dict, k) {
      if (k in dict) {
        return Caml_option.some(dict[k]);
      }
    }
    var unsafeDeleteKey = function(dict, key) {
      delete dict[key];
    };
    function entries(dict) {
      var keys = Object.keys(dict);
      var l = keys.length;
      var values2 = new Array(l);
      for (var i = 0; i < l; ++i) {
        var key = keys[i];
        values2[i] = [
          key,
          dict[key]
        ];
      }
      return values2;
    }
    function values(dict) {
      var keys = Object.keys(dict);
      var l = keys.length;
      var values$1 = new Array(l);
      for (var i = 0; i < l; ++i) {
        values$1[i] = dict[keys[i]];
      }
      return values$1;
    }
    function fromList(entries2) {
      var dict = {};
      var _param = entries2;
      while (true) {
        var param = _param;
        if (!param) {
          return dict;
        }
        var match = param.hd;
        dict[match[0]] = match[1];
        _param = param.tl;
        continue;
      }
      ;
    }
    function fromArray(entries2) {
      var dict = {};
      var l = entries2.length;
      for (var i = 0; i < l; ++i) {
        var match = entries2[i];
        dict[match[0]] = match[1];
      }
      return dict;
    }
    function map(f, source) {
      var target = {};
      var keys = Object.keys(source);
      var l = keys.length;
      for (var i = 0; i < l; ++i) {
        var key = keys[i];
        target[key] = f(source[key]);
      }
      return target;
    }
    exports2.get = get;
    exports2.unsafeDeleteKey = unsafeDeleteKey;
    exports2.entries = entries;
    exports2.values = values;
    exports2.fromList = fromList;
    exports2.fromArray = fromArray;
    exports2.map = map;
  }
});

// node_modules/rescript/lib/js/caml_array.js
var require_caml_array = __commonJS({
  "node_modules/rescript/lib/js/caml_array.js"(exports2) {
    "use strict";
    function sub(x, offset, len2) {
      var result = new Array(len2);
      var j = 0;
      var i = offset;
      while (j < len2) {
        result[j] = x[i];
        j = j + 1 | 0;
        i = i + 1 | 0;
      }
      ;
      return result;
    }
    function len(_acc, _l) {
      while (true) {
        var l = _l;
        var acc = _acc;
        if (!l) {
          return acc;
        }
        _l = l.tl;
        _acc = l.hd.length + acc | 0;
        continue;
      }
      ;
    }
    function fill(arr, _i, _l) {
      while (true) {
        var l = _l;
        var i = _i;
        if (!l) {
          return;
        }
        var x = l.hd;
        var l$1 = x.length;
        var k = i;
        var j = 0;
        while (j < l$1) {
          arr[k] = x[j];
          k = k + 1 | 0;
          j = j + 1 | 0;
        }
        ;
        _l = l.tl;
        _i = k;
        continue;
      }
      ;
    }
    function concat(l) {
      var v = len(0, l);
      var result = new Array(v);
      fill(result, 0, l);
      return result;
    }
    function set(xs, index, newval) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      xs[index] = newval;
    }
    function get(xs, index) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return xs[index];
    }
    function make(len2, init) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = init;
      }
      return b;
    }
    function make_float(len2) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = 0;
      }
      return b;
    }
    function blit(a1, i1, a2, i2, len2) {
      if (i2 <= i1) {
        for (var j = 0; j < len2; ++j) {
          a2[j + i2 | 0] = a1[j + i1 | 0];
        }
        return;
      }
      for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
      }
    }
    function dup(prim) {
      return prim.slice(0);
    }
    exports2.dup = dup;
    exports2.sub = sub;
    exports2.concat = concat;
    exports2.make = make;
    exports2.make_float = make_float;
    exports2.blit = blit;
    exports2.get = get;
    exports2.set = set;
  }
});

// node_modules/rescript/lib/js/curry.js
var require_curry = __commonJS({
  "node_modules/rescript/lib/js/curry.js"(exports2) {
    "use strict";
    var Caml_array = require_caml_array();
    function app(_f, _args) {
      while (true) {
        var args = _args;
        var f = _f;
        var init_arity = f.length;
        var arity = init_arity === 0 ? 1 : init_arity;
        var len = args.length;
        var d = arity - len | 0;
        if (d === 0) {
          return f.apply(null, args);
        }
        if (d >= 0) {
          return /* @__PURE__ */ function(f2, args2) {
            return function(x) {
              return app(f2, args2.concat([x]));
            };
          }(f, args);
        }
        _args = Caml_array.sub(args, arity, -d | 0);
        _f = f.apply(null, Caml_array.sub(args, 0, arity));
        continue;
      }
      ;
    }
    function _1(o, a0) {
      var arity = o.length;
      if (arity === 1) {
        return o(a0);
      } else {
        switch (arity) {
          case 1:
            return o(a0);
          case 2:
            return function(param) {
              return o(a0, param);
            };
          case 3:
            return function(param, param$1) {
              return o(a0, param, param$1);
            };
          case 4:
            return function(param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
          case 5:
            return function(param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
          case 6:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
          default:
            return app(o, [a0]);
        }
      }
    }
    function __1(o) {
      var arity = o.length;
      if (arity === 1) {
        return o;
      } else {
        return function(a0) {
          return _1(o, a0);
        };
      }
    }
    function _2(o, a0, a1) {
      var arity = o.length;
      if (arity === 2) {
        return o(a0, a1);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [a1]);
          case 2:
            return o(a0, a1);
          case 3:
            return function(param) {
              return o(a0, a1, param);
            };
          case 4:
            return function(param, param$1) {
              return o(a0, a1, param, param$1);
            };
          case 5:
            return function(param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
          case 6:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
          default:
            return app(o, [
              a0,
              a1
            ]);
        }
      }
    }
    function __2(o) {
      var arity = o.length;
      if (arity === 2) {
        return o;
      } else {
        return function(a0, a1) {
          return _2(o, a0, a1);
        };
      }
    }
    function _3(o, a0, a1, a2) {
      var arity = o.length;
      if (arity === 3) {
        return o(a0, a1, a2);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2
            ]);
          case 2:
            return app(o(a0, a1), [a2]);
          case 3:
            return o(a0, a1, a2);
          case 4:
            return function(param) {
              return o(a0, a1, a2, param);
            };
          case 5:
            return function(param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
          case 6:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
          case 7:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2
            ]);
        }
      }
    }
    function __3(o) {
      var arity = o.length;
      if (arity === 3) {
        return o;
      } else {
        return function(a0, a1, a2) {
          return _3(o, a0, a1, a2);
        };
      }
    }
    function _4(o, a0, a1, a2, a3) {
      var arity = o.length;
      if (arity === 4) {
        return o(a0, a1, a2, a3);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3
            ]);
          case 3:
            return app(o(a0, a1, a2), [a3]);
          case 4:
            return o(a0, a1, a2, a3);
          case 5:
            return function(param) {
              return o(a0, a1, a2, a3, param);
            };
          case 6:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
          case 7:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3
            ]);
        }
      }
    }
    function __4(o) {
      var arity = o.length;
      if (arity === 4) {
        return o;
      } else {
        return function(a0, a1, a2, a3) {
          return _4(o, a0, a1, a2, a3);
        };
      }
    }
    function _5(o, a0, a1, a2, a3, a4) {
      var arity = o.length;
      if (arity === 5) {
        return o(a0, a1, a2, a3, a4);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [a4]);
          case 5:
            return o(a0, a1, a2, a3, a4);
          case 6:
            return function(param) {
              return o(a0, a1, a2, a3, a4, param);
            };
          case 7:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4
            ]);
        }
      }
    }
    function __5(o) {
      var arity = o.length;
      if (arity === 5) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4) {
          return _5(o, a0, a1, a2, a3, a4);
        };
      }
    }
    function _6(o, a0, a1, a2, a3, a4, a5) {
      var arity = o.length;
      if (arity === 6) {
        return o(a0, a1, a2, a3, a4, a5);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [a5]);
          case 6:
            return o(a0, a1, a2, a3, a4, a5);
          case 7:
            return function(param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
        }
      }
    }
    function __6(o) {
      var arity = o.length;
      if (arity === 6) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5) {
          return _6(o, a0, a1, a2, a3, a4, a5);
        };
      }
    }
    function _7(o, a0, a1, a2, a3, a4, a5, a6) {
      var arity = o.length;
      if (arity === 7) {
        return o(a0, a1, a2, a3, a4, a5, a6);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
          case 7:
            return o(a0, a1, a2, a3, a4, a5, a6);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
        }
      }
    }
    function __7(o) {
      var arity = o.length;
      if (arity === 7) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return _7(o, a0, a1, a2, a3, a4, a5, a6);
        };
      }
    }
    function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
      var arity = o.length;
      if (arity === 8) {
        return o(a0, a1, a2, a3, a4, a5, a6, a7);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6,
              a7
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6,
              a7
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [
              a6,
              a7
            ]);
          case 7:
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
        }
      }
    }
    function __8(o) {
      var arity = o.length;
      if (arity === 8) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
        };
      }
    }
    exports2.app = app;
    exports2._1 = _1;
    exports2.__1 = __1;
    exports2._2 = _2;
    exports2.__2 = __2;
    exports2._3 = _3;
    exports2.__3 = __3;
    exports2._4 = _4;
    exports2.__4 = __4;
    exports2._5 = _5;
    exports2.__5 = __5;
    exports2._6 = _6;
    exports2.__6 = __6;
    exports2._7 = _7;
    exports2.__7 = __7;
    exports2._8 = _8;
    exports2.__8 = __8;
  }
});

// node_modules/rescript/lib/js/caml_splice_call.js
var require_caml_splice_call = __commonJS({
  "node_modules/rescript/lib/js/caml_splice_call.js"(exports2) {
    "use strict";
    var spliceApply = function(fn, args) {
      var i, argLen;
      argLen = args.length;
      var applied = [];
      for (i = 0; i < argLen - 1; ++i) {
        applied.push(args[i]);
      }
      var lastOne = args[argLen - 1];
      for (i = 0; i < lastOne.length; ++i) {
        applied.push(lastOne[i]);
      }
      return fn.apply(null, applied);
    };
    var spliceNewApply = function(ctor, args) {
      var i, argLen;
      argLen = args.length;
      var applied = [null];
      for (i = 0; i < argLen - 1; ++i) {
        applied.push(args[i]);
      }
      var lastOne = args[argLen - 1];
      for (i = 0; i < lastOne.length; ++i) {
        applied.push(lastOne[i]);
      }
      var C = Function.prototype.bind.apply(ctor, applied);
      return new C();
    };
    var spliceObjApply = function(obj, name, args) {
      var i, argLen;
      argLen = args.length;
      var applied = [];
      for (i = 0; i < argLen - 1; ++i) {
        applied.push(args[i]);
      }
      var lastOne = args[argLen - 1];
      for (i = 0; i < lastOne.length; ++i) {
        applied.push(lastOne[i]);
      }
      return obj[name].apply(obj, applied);
    };
    exports2.spliceApply = spliceApply;
    exports2.spliceNewApply = spliceNewApply;
    exports2.spliceObjApply = spliceObjApply;
  }
});

// node_modules/rescript/lib/js/js_string.js
var require_js_string = __commonJS({
  "node_modules/rescript/lib/js/js_string.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    var Caml_splice_call = require_caml_splice_call();
    function charAt(arg1, obj) {
      return obj.charAt(arg1);
    }
    function charCodeAt(arg1, obj) {
      return obj.charCodeAt(arg1);
    }
    function codePointAt(arg1, obj) {
      return obj.codePointAt(arg1);
    }
    function concat(arg1, obj) {
      return obj.concat(arg1);
    }
    function concatMany(arg1, obj) {
      return Caml_splice_call.spliceObjApply(obj, "concat", [arg1]);
    }
    function endsWith(arg1, obj) {
      return obj.endsWith(arg1);
    }
    function endsWithFrom(arg1, arg2, obj) {
      return obj.endsWith(arg1, arg2);
    }
    function includes(arg1, obj) {
      return obj.includes(arg1);
    }
    function includesFrom(arg1, arg2, obj) {
      return obj.includes(arg1, arg2);
    }
    function indexOf(arg1, obj) {
      return obj.indexOf(arg1);
    }
    function indexOfFrom(arg1, arg2, obj) {
      return obj.indexOf(arg1, arg2);
    }
    function lastIndexOf(arg1, obj) {
      return obj.lastIndexOf(arg1);
    }
    function lastIndexOfFrom(arg1, arg2, obj) {
      return obj.lastIndexOf(arg1, arg2);
    }
    function localeCompare(arg1, obj) {
      return obj.localeCompare(arg1);
    }
    function match_(arg1, obj) {
      return Caml_option.null_to_opt(obj.match(arg1));
    }
    function normalizeByForm(arg1, obj) {
      return obj.normalize(arg1);
    }
    function repeat(arg1, obj) {
      return obj.repeat(arg1);
    }
    function replace(arg1, arg2, obj) {
      return obj.replace(arg1, arg2);
    }
    function replaceByRe(arg1, arg2, obj) {
      return obj.replace(arg1, arg2);
    }
    function unsafeReplaceBy0(arg1, arg2, obj) {
      return obj.replace(arg1, Curry.__3(arg2));
    }
    function unsafeReplaceBy1(arg1, arg2, obj) {
      return obj.replace(arg1, Curry.__4(arg2));
    }
    function unsafeReplaceBy2(arg1, arg2, obj) {
      return obj.replace(arg1, Curry.__5(arg2));
    }
    function unsafeReplaceBy3(arg1, arg2, obj) {
      return obj.replace(arg1, Curry.__6(arg2));
    }
    function search(arg1, obj) {
      return obj.search(arg1);
    }
    function slice(from, to_, obj) {
      return obj.slice(from, to_);
    }
    function sliceToEnd(from, obj) {
      return obj.slice(from);
    }
    function split(arg1, obj) {
      return obj.split(arg1);
    }
    function splitAtMost(arg1, limit, obj) {
      return obj.split(arg1, limit);
    }
    function splitByRe(arg1, obj) {
      return obj.split(arg1);
    }
    function splitByReAtMost(arg1, limit, obj) {
      return obj.split(arg1, limit);
    }
    function startsWith(arg1, obj) {
      return obj.startsWith(arg1);
    }
    function startsWithFrom(arg1, arg2, obj) {
      return obj.startsWith(arg1, arg2);
    }
    function substr(from, obj) {
      return obj.substr(from);
    }
    function substrAtMost(from, length, obj) {
      return obj.substr(from, length);
    }
    function substring(from, to_, obj) {
      return obj.substring(from, to_);
    }
    function substringToEnd(from, obj) {
      return obj.substring(from);
    }
    function anchor(arg1, obj) {
      return obj.anchor(arg1);
    }
    function link(arg1, obj) {
      return obj.link(arg1);
    }
    exports2.charAt = charAt;
    exports2.charCodeAt = charCodeAt;
    exports2.codePointAt = codePointAt;
    exports2.concat = concat;
    exports2.concatMany = concatMany;
    exports2.endsWith = endsWith;
    exports2.endsWithFrom = endsWithFrom;
    exports2.includes = includes;
    exports2.includesFrom = includesFrom;
    exports2.indexOf = indexOf;
    exports2.indexOfFrom = indexOfFrom;
    exports2.lastIndexOf = lastIndexOf;
    exports2.lastIndexOfFrom = lastIndexOfFrom;
    exports2.localeCompare = localeCompare;
    exports2.match_ = match_;
    exports2.normalizeByForm = normalizeByForm;
    exports2.repeat = repeat;
    exports2.replace = replace;
    exports2.replaceByRe = replaceByRe;
    exports2.unsafeReplaceBy0 = unsafeReplaceBy0;
    exports2.unsafeReplaceBy1 = unsafeReplaceBy1;
    exports2.unsafeReplaceBy2 = unsafeReplaceBy2;
    exports2.unsafeReplaceBy3 = unsafeReplaceBy3;
    exports2.search = search;
    exports2.slice = slice;
    exports2.sliceToEnd = sliceToEnd;
    exports2.split = split;
    exports2.splitAtMost = splitAtMost;
    exports2.splitByRe = splitByRe;
    exports2.splitByReAtMost = splitByReAtMost;
    exports2.startsWith = startsWith;
    exports2.startsWithFrom = startsWithFrom;
    exports2.substr = substr;
    exports2.substrAtMost = substrAtMost;
    exports2.substring = substring;
    exports2.substringToEnd = substringToEnd;
    exports2.anchor = anchor;
    exports2.link = link;
  }
});

// node_modules/rescript/lib/js/belt_Option.js
var require_belt_Option = __commonJS({
  "node_modules/rescript/lib/js/belt_Option.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    function keepU(opt, p) {
      if (opt !== void 0 && p(Caml_option.valFromOption(opt))) {
        return opt;
      }
    }
    function keep(opt, p) {
      return keepU(opt, Curry.__1(p));
    }
    function forEachU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function forEach(opt, f) {
      forEachU(opt, Curry.__1(f));
    }
    function getExn(x) {
      if (x !== void 0) {
        return Caml_option.valFromOption(x);
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefaultU(opt, $$default, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      } else {
        return $$default;
      }
    }
    function mapWithDefault(opt, $$default, f) {
      return mapWithDefaultU(opt, $$default, Curry.__1(f));
    }
    function mapU(opt, f) {
      if (opt !== void 0) {
        return Caml_option.some(f(Caml_option.valFromOption(opt)));
      }
    }
    function map(opt, f) {
      return mapU(opt, Curry.__1(f));
    }
    function flatMapU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function flatMap(opt, f) {
      return flatMapU(opt, Curry.__1(f));
    }
    function getWithDefault(opt, $$default) {
      if (opt !== void 0) {
        return Caml_option.valFromOption(opt);
      } else {
        return $$default;
      }
    }
    function orElse(opt, other) {
      if (opt !== void 0) {
        return opt;
      } else {
        return other;
      }
    }
    function isSome(param) {
      return param !== void 0;
    }
    function isNone(x) {
      return x === void 0;
    }
    function eqU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return false;
        }
      } else {
        return b === void 0;
      }
    }
    function eq(a, b, f) {
      return eqU(a, b, Curry.__2(f));
    }
    function cmpU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return 1;
        }
      } else if (b !== void 0) {
        return -1;
      } else {
        return 0;
      }
    }
    function cmp(a, b, f) {
      return cmpU(a, b, Curry.__2(f));
    }
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.getExn = getExn;
    exports2.mapWithDefaultU = mapWithDefaultU;
    exports2.mapWithDefault = mapWithDefault;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.flatMapU = flatMapU;
    exports2.flatMap = flatMap;
    exports2.getWithDefault = getWithDefault;
    exports2.orElse = orElse;
    exports2.isSome = isSome;
    exports2.isNone = isNone;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
  }
});

// ../../../actor.json
var require_actor = __commonJS({
  "../../../actor.json"(exports2, module2) {
    module2.exports = {
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1"
      ],
      id: "https://emptystack.top/actor",
      type: "Person",
      followers: "https://emptystack.top/followers",
      preferredUsername: "actor",
      name: "\u7A7A\u6808\u9876",
      summary: "\u4F7F\u7528<a href='https://github.com/sinofp/lesspub'>LessPub</a>\u6865\u63A5<a href='https://emptystack.top'>\u535A\u5BA2</a>\u4E0E\u8054\u90A6\u5B87\u5B99\u7684ActivityPub Actor\u3002<br>\u672C\u5B9E\u4F8B\u652F\u6301\u5173\u6CE8\u3001\u70B9\u8D5E\u4E0E\u516C\u5F00\u8BC4\u8BBA\u3002<br>\u6682\u4E0D\u652F\u6301\u79C1\u4FE1\u3002",
      discoverable: true,
      published: "0001-01-01T00:00:00Z",
      inbox: "https://emptystack.top/inbox",
      outbox: "https://emptystack.top/outbox",
      publicKey: {
        id: "https://emptystack.top/actor#main-key",
        owner: "https://emptystack.top/actor",
        publicKeyPem: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhHaMCnm9NBxWBTk9raxM\nyy2UBtiuotK9V08hNMLbNh35vXNDSDZ+lHAIYvQC52FY6hVUa+zZcRZbrunMWpVM\nLuWbkYxiblppiopjkoexYx8vfwa8Szt9S2xaAStp74i2I8pfZcP9O33rJQS1wSY4\nHPpDXLwlOQPXkMYcTmDvngGyPafe0crnWREz1COEi/2g/0akuwz0AQJaYkN4XaXY\nKgOlBYQhfCQMsGiENT3A/j3PZwLkuOaWbWWqrDNl8LqO1DMHKtD6ZI4SCgHLO4F7\nPi30+W/sejMtxDy/eloip+xxcaSCv1wfpX/HdltSzF1hHYOC2LrDs9AyZIPqhxyN\njQIDAQAB\n-----END PUBLIC KEY-----"
      },
      icon: {
        type: "Image",
        mediaType: "image/jpeg",
        url: "https://dsm01pap002files.storage.live.com/y4mII8hiSAkpPzUggb-MC2yHdex4JbN76PRotpzDP5GRTiJnitjgVPfOu4Tkd5Nj5kHeZIVhoqu5puBIkF5L01LT3IQRUev8TLmRrwnxvdrU3KzCiqh3yyj65SsKsWQumA3g1kRj0-KoiSxABn6hfBRvRyy555OXN5wdqdWRAHhbxY?width=400&height=400&cropmode=none"
      },
      image: {
        type: "Image",
        mediaType: "image/jpeg",
        url: "https://dsm01pap002files.storage.live.com/y4mYlVhKHEMH_MPRQSxtpb0XHz5kchjEUtp0n94VxrZc1Avt_fuVxBLsmw9FDzP8VasSW4CajV3XqlESQMP74uDHVAXvmuZsKKmzovAf_NVZVrs9I9njCo4EiBSg84AbMUgEYPU2K6y8euK-2h7nwbLYWW8jaxB-pMpGl4kmH10shs?width=1500&height=500&cropmode=none"
      }
    };
  }
});

// src/Config.js
var require_Config = __commonJS({
  "src/Config.js"(exports2) {
    "use strict";
    var Js_dict = require_js_dict();
    var Js_string = require_js_string();
    var Belt_Option = require_belt_Option();
    var ActorJson = require_actor();
    var baseURL = Belt_Option.getExn(Js_dict.get(process.env, "AP_BASE_URL"));
    var privateKey = Belt_Option.getExn(Js_dict.get(process.env, "AP_PRIVATE_KEY")).replace(/\\n/g, "\n");
    var ghToken = Belt_Option.getExn(Js_dict.get(process.env, "AP_GH_TOKEN"));
    var ghBaseURL = Belt_Option.getExn(Js_dict.get(process.env, "AP_GH_BASE_URL"));
    var extraInboxes = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(process.env, "AP_EXTRA_INBOXES"), function(param) {
      return Js_string.split(",", param);
    }), []);
    var actor = baseURL + "/actor";
    var keyId = actor + "#main-key";
    var actorJSON = ActorJson;
    exports2.baseURL = baseURL;
    exports2.privateKey = privateKey;
    exports2.ghToken = ghToken;
    exports2.ghBaseURL = ghBaseURL;
    exports2.extraInboxes = extraInboxes;
    exports2.actor = actor;
    exports2.keyId = keyId;
    exports2.actorJSON = actorJSON;
  }
});

// node_modules/rescript/lib/js/js_exn.js
var require_js_exn = __commonJS({
  "node_modules/rescript/lib/js/js_exn.js"(exports2) {
    "use strict";
    function raiseError(str) {
      throw new Error(str);
    }
    function raiseEvalError(str) {
      throw new EvalError(str);
    }
    function raiseRangeError(str) {
      throw new RangeError(str);
    }
    function raiseReferenceError(str) {
      throw new ReferenceError(str);
    }
    function raiseSyntaxError(str) {
      throw new SyntaxError(str);
    }
    function raiseTypeError(str) {
      throw new TypeError(str);
    }
    function raiseUriError(str) {
      throw new URIError(str);
    }
    var $$Error$1 = "JsError";
    exports2.$$Error = $$Error$1;
    exports2.raiseError = raiseError;
    exports2.raiseEvalError = raiseEvalError;
    exports2.raiseRangeError = raiseRangeError;
    exports2.raiseReferenceError = raiseReferenceError;
    exports2.raiseSyntaxError = raiseSyntaxError;
    exports2.raiseTypeError = raiseTypeError;
    exports2.raiseUriError = raiseUriError;
  }
});

// node_modules/rescript/lib/js/js_json.js
var require_js_json = __commonJS({
  "node_modules/rescript/lib/js/js_json.js"(exports2) {
    "use strict";
    var Caml_option = require_caml_option();
    function classify(x) {
      var ty = typeof x;
      if (ty === "string") {
        return {
          TAG: (
            /* JSONString */
            0
          ),
          _0: x
        };
      } else if (ty === "number") {
        return {
          TAG: (
            /* JSONNumber */
            1
          ),
          _0: x
        };
      } else if (ty === "boolean") {
        if (x === true) {
          return (
            /* JSONTrue */
            1
          );
        } else {
          return (
            /* JSONFalse */
            0
          );
        }
      } else if (x === null) {
        return (
          /* JSONNull */
          2
        );
      } else if (Array.isArray(x)) {
        return {
          TAG: (
            /* JSONArray */
            3
          ),
          _0: x
        };
      } else {
        return {
          TAG: (
            /* JSONObject */
            2
          ),
          _0: x
        };
      }
    }
    function test(x, v) {
      switch (v) {
        case /* String */
        0:
          return typeof x === "string";
        case /* Number */
        1:
          return typeof x === "number";
        case /* Object */
        2:
          if (x !== null && typeof x === "object") {
            return !Array.isArray(x);
          } else {
            return false;
          }
        case /* Array */
        3:
          return Array.isArray(x);
        case /* Boolean */
        4:
          return typeof x === "boolean";
        case /* Null */
        5:
          return x === null;
      }
    }
    function decodeString(json) {
      if (typeof json === "string") {
        return json;
      }
    }
    function decodeNumber(json) {
      if (typeof json === "number") {
        return json;
      }
    }
    function decodeObject(json) {
      if (typeof json === "object" && !Array.isArray(json) && json !== null) {
        return Caml_option.some(json);
      }
    }
    function decodeArray(json) {
      if (Array.isArray(json)) {
        return json;
      }
    }
    function decodeBoolean(json) {
      if (typeof json === "boolean") {
        return json;
      }
    }
    function decodeNull(json) {
      if (json === null) {
        return null;
      }
    }
    var patch = function(json) {
      var x = [json];
      var q = [{ kind: 0, i: 0, parent: x }];
      while (q.length !== 0) {
        var cur = q[q.length - 1];
        if (cur.kind === 0) {
          cur.val = cur.parent[cur.i];
          if (++cur.i === cur.parent.length) {
            q.pop();
          }
        } else {
          q.pop();
        }
        var task = cur.val;
        if (typeof task === "object") {
          if (Array.isArray(task) && task.length !== 0) {
            q.push({ kind: 0, i: 0, parent: task, val: void 0 });
          } else {
            for (var k in task) {
              if (k === "RE_PRIVATE_NONE") {
                if (cur.kind === 0) {
                  cur.parent[cur.i - 1] = void 0;
                } else {
                  cur.parent[cur.i] = void 0;
                }
                continue;
              }
              q.push({ kind: 1, i: k, parent: task, val: task[k] });
            }
          }
        }
      }
      return x[0];
    };
    function serializeExn(x) {
      return function(obj) {
        var output = JSON.stringify(obj, function(_, value) {
          if (value === void 0) {
            return { RE_PRIVATE_NONE: true };
          }
          return value;
        });
        if (output === void 0) {
          throw new TypeError("output is undefined");
        }
        return output;
      }(x);
    }
    function deserializeUnsafe(s) {
      return patch(JSON.parse(s));
    }
    exports2.classify = classify;
    exports2.test = test;
    exports2.decodeString = decodeString;
    exports2.decodeNumber = decodeNumber;
    exports2.decodeObject = decodeObject;
    exports2.decodeArray = decodeArray;
    exports2.decodeBoolean = decodeBoolean;
    exports2.decodeNull = decodeNull;
    exports2.deserializeUnsafe = deserializeUnsafe;
    exports2.serializeExn = serializeExn;
  }
});

// node_modules/rescript/lib/js/js_array.js
var require_js_array = __commonJS({
  "node_modules/rescript/lib/js/js_array.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    var Caml_splice_call = require_caml_splice_call();
    function copyWithin(to_, obj) {
      return obj.copyWithin(to_);
    }
    function copyWithinFrom(to_, from, obj) {
      return obj.copyWithin(to_, from);
    }
    function copyWithinFromRange(to_, start, end_, obj) {
      return obj.copyWithin(to_, start, end_);
    }
    function fillInPlace(arg1, obj) {
      return obj.fill(arg1);
    }
    function fillFromInPlace(arg1, from, obj) {
      return obj.fill(arg1, from);
    }
    function fillRangeInPlace(arg1, start, end_, obj) {
      return obj.fill(arg1, start, end_);
    }
    function push(arg1, obj) {
      return obj.push(arg1);
    }
    function pushMany(arg1, obj) {
      return Caml_splice_call.spliceObjApply(obj, "push", [arg1]);
    }
    function sortInPlaceWith(arg1, obj) {
      return obj.sort(Curry.__2(arg1));
    }
    function spliceInPlace(pos, remove, add, obj) {
      return Caml_splice_call.spliceObjApply(obj, "splice", [
        pos,
        remove,
        add
      ]);
    }
    function removeFromInPlace(pos, obj) {
      return obj.splice(pos);
    }
    function removeCountInPlace(pos, count, obj) {
      return obj.splice(pos, count);
    }
    function unshift(arg1, obj) {
      return obj.unshift(arg1);
    }
    function unshiftMany(arg1, obj) {
      return Caml_splice_call.spliceObjApply(obj, "unshift", [arg1]);
    }
    function concat(arg1, obj) {
      return obj.concat(arg1);
    }
    function concatMany(arg1, obj) {
      return Caml_splice_call.spliceObjApply(obj, "concat", [arg1]);
    }
    function includes(arg1, obj) {
      return obj.includes(arg1);
    }
    function indexOf(arg1, obj) {
      return obj.indexOf(arg1);
    }
    function indexOfFrom(arg1, from, obj) {
      return obj.indexOf(arg1, from);
    }
    function joinWith(arg1, obj) {
      return obj.join(arg1);
    }
    function lastIndexOf(arg1, obj) {
      return obj.lastIndexOf(arg1);
    }
    function lastIndexOfFrom(arg1, from, obj) {
      return obj.lastIndexOf(arg1, from);
    }
    function slice(start, end_, obj) {
      return obj.slice(start, end_);
    }
    function sliceFrom(arg1, obj) {
      return obj.slice(arg1);
    }
    function every(arg1, obj) {
      return obj.every(Curry.__1(arg1));
    }
    function everyi(arg1, obj) {
      return obj.every(Curry.__2(arg1));
    }
    function filter(arg1, obj) {
      return obj.filter(Curry.__1(arg1));
    }
    function filteri(arg1, obj) {
      return obj.filter(Curry.__2(arg1));
    }
    function find(arg1, obj) {
      return Caml_option.undefined_to_opt(obj.find(Curry.__1(arg1)));
    }
    function findi(arg1, obj) {
      return Caml_option.undefined_to_opt(obj.find(Curry.__2(arg1)));
    }
    function findIndex(arg1, obj) {
      return obj.findIndex(Curry.__1(arg1));
    }
    function findIndexi(arg1, obj) {
      return obj.findIndex(Curry.__2(arg1));
    }
    function forEach(arg1, obj) {
      obj.forEach(Curry.__1(arg1));
    }
    function forEachi(arg1, obj) {
      obj.forEach(Curry.__2(arg1));
    }
    function map(arg1, obj) {
      return obj.map(Curry.__1(arg1));
    }
    function mapi(arg1, obj) {
      return obj.map(Curry.__2(arg1));
    }
    function reduce(arg1, arg2, obj) {
      return obj.reduce(Curry.__2(arg1), arg2);
    }
    function reducei(arg1, arg2, obj) {
      return obj.reduce(Curry.__3(arg1), arg2);
    }
    function reduceRight(arg1, arg2, obj) {
      return obj.reduceRight(Curry.__2(arg1), arg2);
    }
    function reduceRighti(arg1, arg2, obj) {
      return obj.reduceRight(Curry.__3(arg1), arg2);
    }
    function some(arg1, obj) {
      return obj.some(Curry.__1(arg1));
    }
    function somei(arg1, obj) {
      return obj.some(Curry.__2(arg1));
    }
    exports2.copyWithin = copyWithin;
    exports2.copyWithinFrom = copyWithinFrom;
    exports2.copyWithinFromRange = copyWithinFromRange;
    exports2.fillInPlace = fillInPlace;
    exports2.fillFromInPlace = fillFromInPlace;
    exports2.fillRangeInPlace = fillRangeInPlace;
    exports2.push = push;
    exports2.pushMany = pushMany;
    exports2.sortInPlaceWith = sortInPlaceWith;
    exports2.spliceInPlace = spliceInPlace;
    exports2.removeFromInPlace = removeFromInPlace;
    exports2.removeCountInPlace = removeCountInPlace;
    exports2.unshift = unshift;
    exports2.unshiftMany = unshiftMany;
    exports2.concat = concat;
    exports2.concatMany = concatMany;
    exports2.includes = includes;
    exports2.indexOf = indexOf;
    exports2.indexOfFrom = indexOfFrom;
    exports2.joinWith = joinWith;
    exports2.lastIndexOf = lastIndexOf;
    exports2.lastIndexOfFrom = lastIndexOfFrom;
    exports2.slice = slice;
    exports2.sliceFrom = sliceFrom;
    exports2.every = every;
    exports2.everyi = everyi;
    exports2.filter = filter;
    exports2.filteri = filteri;
    exports2.find = find;
    exports2.findi = findi;
    exports2.findIndex = findIndex;
    exports2.findIndexi = findIndexi;
    exports2.forEach = forEach;
    exports2.forEachi = forEachi;
    exports2.map = map;
    exports2.mapi = mapi;
    exports2.reduce = reduce;
    exports2.reducei = reducei;
    exports2.reduceRight = reduceRight;
    exports2.reduceRighti = reduceRighti;
    exports2.some = some;
    exports2.somei = somei;
  }
});

// node_modules/rescript/lib/js/js_types.js
var require_js_types = __commonJS({
  "node_modules/rescript/lib/js/js_types.js"(exports2) {
    "use strict";
    function classify(x) {
      var ty = typeof x;
      if (ty === "undefined") {
        return (
          /* JSUndefined */
          3
        );
      } else if (x === null) {
        return (
          /* JSNull */
          2
        );
      } else if (ty === "number") {
        return {
          TAG: (
            /* JSNumber */
            0
          ),
          _0: x
        };
      } else if (ty === "bigint") {
        return {
          TAG: (
            /* JSBigInt */
            5
          ),
          _0: x
        };
      } else if (ty === "string") {
        return {
          TAG: (
            /* JSString */
            1
          ),
          _0: x
        };
      } else if (ty === "boolean") {
        if (x === true) {
          return (
            /* JSTrue */
            1
          );
        } else {
          return (
            /* JSFalse */
            0
          );
        }
      } else if (ty === "symbol") {
        return {
          TAG: (
            /* JSSymbol */
            4
          ),
          _0: x
        };
      } else if (ty === "function") {
        return {
          TAG: (
            /* JSFunction */
            2
          ),
          _0: x
        };
      } else {
        return {
          TAG: (
            /* JSObject */
            3
          ),
          _0: x
        };
      }
    }
    function test(x, v) {
      switch (v) {
        case /* Undefined */
        0:
          return typeof x === "undefined";
        case /* Null */
        1:
          return x === null;
        case /* Boolean */
        2:
          return typeof x === "boolean";
        case /* Number */
        3:
          return typeof x === "number";
        case /* String */
        4:
          return typeof x === "string";
        case /* Function */
        5:
          return typeof x === "function";
        case /* Object */
        6:
          return typeof x === "object";
        case /* Symbol */
        7:
          return typeof x === "symbol";
        case /* BigInt */
        8:
          return typeof x === "bigint";
      }
    }
    exports2.test = test;
    exports2.classify = classify;
  }
});

// node_modules/rescript/lib/js/caml_sys.js
var require_caml_sys = __commonJS({
  "node_modules/rescript/lib/js/caml_sys.js"(exports2) {
    "use strict";
    function sys_getenv(s) {
      if (typeof process === "undefined" || process.env === void 0) {
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      var x = process.env[s];
      if (x !== void 0) {
        return x;
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    var os_type = function(_) {
      if (typeof process !== "undefined" && process.platform === "win32") {
        return "Win32";
      } else {
        return "Unix";
      }
    };
    function sys_time(param) {
      if (typeof process === "undefined" || process.uptime === void 0) {
        return -1;
      } else {
        return process.uptime();
      }
    }
    var sys_getcwd = function(param) {
      if (typeof process === "undefined" || process.cwd === void 0) {
        return "/";
      }
      return process.cwd();
    };
    function sys_get_argv(param) {
      if (typeof process === "undefined") {
        return [
          "",
          [""]
        ];
      }
      var argv = process.argv;
      if (argv == null) {
        return [
          "",
          [""]
        ];
      } else {
        return [
          argv[0],
          argv
        ];
      }
    }
    function sys_exit(exit_code) {
      if (typeof process !== "undefined") {
        return process.exit(exit_code);
      }
    }
    function sys_is_directory(_s) {
      throw {
        RE_EXN_ID: "Failure",
        _1: "sys_is_directory not implemented",
        Error: new Error()
      };
    }
    function sys_file_exists(_s) {
      throw {
        RE_EXN_ID: "Failure",
        _1: "sys_file_exists not implemented",
        Error: new Error()
      };
    }
    exports2.sys_getenv = sys_getenv;
    exports2.sys_time = sys_time;
    exports2.os_type = os_type;
    exports2.sys_getcwd = sys_getcwd;
    exports2.sys_get_argv = sys_get_argv;
    exports2.sys_exit = sys_exit;
    exports2.sys_is_directory = sys_is_directory;
    exports2.sys_file_exists = sys_file_exists;
  }
});

// node_modules/rescript/lib/js/caml.js
var require_caml = __commonJS({
  "node_modules/rescript/lib/js/caml.js"(exports2) {
    "use strict";
    function int_compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function bool_compare(x, y) {
      if (x) {
        if (y) {
          return 0;
        } else {
          return 1;
        }
      } else if (y) {
        return -1;
      } else {
        return 0;
      }
    }
    function float_compare(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else if (x > y || x === x) {
        return 1;
      } else if (y === y) {
        return -1;
      } else {
        return 0;
      }
    }
    function string_compare(s1, s2) {
      if (s1 === s2) {
        return 0;
      } else if (s1 < s2) {
        return -1;
      } else {
        return 1;
      }
    }
    function bool_min(x, y) {
      if (x) {
        return y;
      } else {
        return x;
      }
    }
    function int_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function float_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function string_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function bool_max(x, y) {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    function int_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function float_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function string_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function i64_eq(x, y) {
      if (x[1] === y[1]) {
        return x[0] === y[0];
      } else {
        return false;
      }
    }
    function i64_ge(param, param$1) {
      var other_hi = param$1[0];
      var hi = param[0];
      if (hi > other_hi) {
        return true;
      } else if (hi < other_hi) {
        return false;
      } else {
        return param[1] >= param$1[1];
      }
    }
    function i64_neq(x, y) {
      return !i64_eq(x, y);
    }
    function i64_lt(x, y) {
      return !i64_ge(x, y);
    }
    function i64_gt(x, y) {
      if (x[0] > y[0]) {
        return true;
      } else if (x[0] < y[0]) {
        return false;
      } else {
        return x[1] > y[1];
      }
    }
    function i64_le(x, y) {
      return !i64_gt(x, y);
    }
    function i64_min(x, y) {
      if (i64_ge(x, y)) {
        return y;
      } else {
        return x;
      }
    }
    function i64_max(x, y) {
      if (i64_gt(x, y)) {
        return x;
      } else {
        return y;
      }
    }
    exports2.int_compare = int_compare;
    exports2.bool_compare = bool_compare;
    exports2.float_compare = float_compare;
    exports2.string_compare = string_compare;
    exports2.bool_min = bool_min;
    exports2.int_min = int_min;
    exports2.float_min = float_min;
    exports2.string_min = string_min;
    exports2.bool_max = bool_max;
    exports2.int_max = int_max;
    exports2.float_max = float_max;
    exports2.string_max = string_max;
    exports2.i64_eq = i64_eq;
    exports2.i64_neq = i64_neq;
    exports2.i64_lt = i64_lt;
    exports2.i64_gt = i64_gt;
    exports2.i64_le = i64_le;
    exports2.i64_ge = i64_ge;
    exports2.i64_min = i64_min;
    exports2.i64_max = i64_max;
  }
});

// node_modules/rescript/lib/js/caml_int64.js
var require_caml_int64 = __commonJS({
  "node_modules/rescript/lib/js/caml_int64.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    function mk(lo, hi) {
      return [
        hi,
        lo >>> 0
      ];
    }
    var min_int = [
      -2147483648,
      0
    ];
    var max_int = [
      2147483647,
      4294967295
    ];
    var one = [
      0,
      1
    ];
    var zero = [
      0,
      0
    ];
    var neg_one = [
      -1,
      4294967295
    ];
    function neg_signed(x) {
      return (x & -2147483648) !== 0;
    }
    function non_neg_signed(x) {
      return (x & -2147483648) === 0;
    }
    function succ(param) {
      var x_lo = param[1];
      var x_hi = param[0];
      var lo = x_lo + 1 | 0;
      return [
        x_hi + (lo === 0 ? 1 : 0) | 0,
        lo >>> 0
      ];
    }
    function neg(param) {
      var other_lo = (param[1] ^ -1) + 1 | 0;
      return [
        (param[0] ^ -1) + (other_lo === 0 ? 1 : 0) | 0,
        other_lo >>> 0
      ];
    }
    function add_aux(param, y_lo, y_hi) {
      var x_lo = param[1];
      var lo = x_lo + y_lo | 0;
      var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
      return [
        param[0] + y_hi + overflow | 0,
        lo >>> 0
      ];
    }
    function add(self, param) {
      return add_aux(self, param[1], param[0]);
    }
    function equal(x, y) {
      if (x[1] === y[1]) {
        return x[0] === y[0];
      } else {
        return false;
      }
    }
    function equal_null(x, y) {
      if (y !== null) {
        return Caml.i64_eq(x, y);
      } else {
        return false;
      }
    }
    function equal_undefined(x, y) {
      if (y !== void 0) {
        return Caml.i64_eq(x, y);
      } else {
        return false;
      }
    }
    function equal_nullable(x, y) {
      if (y == null) {
        return false;
      } else {
        return Caml.i64_eq(x, y);
      }
    }
    function sub_aux(x, lo, hi) {
      var y_lo = (lo ^ -1) + 1 >>> 0;
      var y_hi = (hi ^ -1) + (y_lo === 0 ? 1 : 0) | 0;
      return add_aux(x, y_lo, y_hi);
    }
    function sub(self, param) {
      return sub_aux(self, param[1], param[0]);
    }
    function lsl_(x, numBits) {
      if (numBits === 0) {
        return x;
      }
      var lo = x[1];
      if (numBits >= 32) {
        return [
          lo << (numBits - 32 | 0),
          0
        ];
      } else {
        return [
          lo >>> (32 - numBits | 0) | x[0] << numBits,
          lo << numBits >>> 0
        ];
      }
    }
    function lsr_(x, numBits) {
      if (numBits === 0) {
        return x;
      }
      var hi = x[0];
      var offset = numBits - 32 | 0;
      if (offset === 0) {
        return [
          0,
          hi >>> 0
        ];
      } else if (offset > 0) {
        return [
          0,
          hi >>> offset
        ];
      } else {
        return [
          hi >>> numBits,
          (hi << (-offset | 0) | x[1] >>> numBits) >>> 0
        ];
      }
    }
    function asr_(x, numBits) {
      if (numBits === 0) {
        return x;
      }
      var hi = x[0];
      if (numBits < 32) {
        return [
          hi >> numBits,
          (hi << (32 - numBits | 0) | x[1] >>> numBits) >>> 0
        ];
      } else {
        return [
          hi >= 0 ? 0 : -1,
          hi >> (numBits - 32 | 0) >>> 0
        ];
      }
    }
    function is_zero(param) {
      if (param[0] !== 0) {
        return false;
      } else {
        return param[1] === 0;
      }
    }
    function mul(_this, _other) {
      while (true) {
        var other = _other;
        var $$this = _this;
        var lo;
        var this_hi = $$this[0];
        var exit = 0;
        var exit$1 = 0;
        var exit$2 = 0;
        if (this_hi !== 0) {
          exit$2 = 4;
        } else {
          if ($$this[1] === 0) {
            return zero;
          }
          exit$2 = 4;
        }
        if (exit$2 === 4) {
          if (other[0] !== 0) {
            exit$1 = 3;
          } else {
            if (other[1] === 0) {
              return zero;
            }
            exit$1 = 3;
          }
        }
        if (exit$1 === 3) {
          if (this_hi !== -2147483648 || $$this[1] !== 0) {
            exit = 2;
          } else {
            lo = other[1];
          }
        }
        if (exit === 2) {
          var other_hi = other[0];
          var lo$1 = $$this[1];
          var exit$3 = 0;
          if (other_hi !== -2147483648 || other[1] !== 0) {
            exit$3 = 3;
          } else {
            lo = lo$1;
          }
          if (exit$3 === 3) {
            var other_lo = other[1];
            if (this_hi < 0) {
              if (other_hi >= 0) {
                return neg(mul(neg($$this), other));
              }
              _other = neg(other);
              _this = neg($$this);
              continue;
            }
            if (other_hi < 0) {
              return neg(mul($$this, neg(other)));
            }
            var a48 = this_hi >>> 16;
            var a32 = this_hi & 65535;
            var a16 = lo$1 >>> 16;
            var a00 = lo$1 & 65535;
            var b48 = other_hi >>> 16;
            var b32 = other_hi & 65535;
            var b16 = other_lo >>> 16;
            var b00 = other_lo & 65535;
            var c48 = 0;
            var c32 = 0;
            var c16 = 0;
            var c00 = a00 * b00;
            c16 = (c00 >>> 16) + a16 * b00;
            c32 = c16 >>> 16;
            c16 = (c16 & 65535) + a00 * b16;
            c32 = c32 + (c16 >>> 16) + a32 * b00;
            c48 = c32 >>> 16;
            c32 = (c32 & 65535) + a16 * b16;
            c48 = c48 + (c32 >>> 16);
            c32 = (c32 & 65535) + a00 * b32;
            c48 = c48 + (c32 >>> 16);
            c32 = c32 & 65535;
            c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
            return [
              c32 | c48 << 16,
              (c00 & 65535 | (c16 & 65535) << 16) >>> 0
            ];
          }
        }
        if ((lo & 1) === 0) {
          return zero;
        } else {
          return min_int;
        }
      }
      ;
    }
    function xor(param, param$1) {
      return [
        param[0] ^ param$1[0],
        (param[1] ^ param$1[1]) >>> 0
      ];
    }
    function or_(param, param$1) {
      return [
        param[0] | param$1[0],
        (param[1] | param$1[1]) >>> 0
      ];
    }
    function and_(param, param$1) {
      return [
        param[0] & param$1[0],
        (param[1] & param$1[1]) >>> 0
      ];
    }
    function to_float(param) {
      return param[0] * 4294967296 + param[1];
    }
    function of_float(x) {
      if (isNaN(x) || !isFinite(x)) {
        return zero;
      }
      if (x <= -9223372036854776e3) {
        return min_int;
      }
      if (x + 1 >= 9223372036854776e3) {
        return max_int;
      }
      if (x < 0) {
        return neg(of_float(-x));
      }
      var hi = x / 4294967296 | 0;
      var lo = x % 4294967296 | 0;
      return [
        hi,
        lo >>> 0
      ];
    }
    function isSafeInteger(param) {
      var hi = param[0];
      var top11Bits = hi >> 21;
      if (top11Bits === 0) {
        return true;
      } else if (top11Bits === -1) {
        return !(param[1] === 0 && hi === -2097152);
      } else {
        return false;
      }
    }
    function to_string(self) {
      if (isSafeInteger(self)) {
        return String(to_float(self));
      }
      if (self[0] < 0) {
        if (Caml.i64_eq(self, min_int)) {
          return "-9223372036854775808";
        } else {
          return "-" + to_string(neg(self));
        }
      }
      var approx_div1 = of_float(Math.floor(to_float(self) / 10));
      var lo = approx_div1[1];
      var hi = approx_div1[0];
      var match = sub_aux(sub_aux(self, lo << 3, lo >>> 29 | hi << 3), lo << 1, lo >>> 31 | hi << 1);
      var rem_lo = match[1];
      var rem_hi = match[0];
      if (rem_lo === 0 && rem_hi === 0) {
        return to_string(approx_div1) + "0";
      }
      if (rem_hi < 0) {
        var rem_lo$1 = (rem_lo ^ -1) + 1 >>> 0;
        var delta = Math.ceil(rem_lo$1 / 10);
        var remainder = 10 * delta - rem_lo$1;
        return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
      }
      var delta$1 = Math.floor(rem_lo / 10);
      var remainder$1 = rem_lo - 10 * delta$1;
      return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
    }
    function div(_self, _other) {
      while (true) {
        var other = _other;
        var self = _self;
        var self_hi = self[0];
        var exit = 0;
        var exit$1 = 0;
        if (other[0] !== 0 || other[1] !== 0) {
          exit$1 = 2;
        } else {
          throw {
            RE_EXN_ID: "Division_by_zero",
            Error: new Error()
          };
        }
        if (exit$1 === 2) {
          if (self_hi !== -2147483648) {
            if (self_hi !== 0) {
              exit = 1;
            } else {
              if (self[1] === 0) {
                return zero;
              }
              exit = 1;
            }
          } else if (self[1] !== 0) {
            exit = 1;
          } else {
            if (Caml.i64_eq(other, one) || Caml.i64_eq(other, neg_one)) {
              return self;
            }
            if (Caml.i64_eq(other, min_int)) {
              return one;
            }
            var half_this = asr_(self, 1);
            var approx = lsl_(div(half_this, other), 1);
            var exit$2 = 0;
            if (approx[0] !== 0) {
              exit$2 = 3;
            } else {
              if (approx[1] === 0) {
                if (other[0] < 0) {
                  return one;
                } else {
                  return neg(one);
                }
              }
              exit$2 = 3;
            }
            if (exit$2 === 3) {
              var rem = sub(self, mul(other, approx));
              return add(approx, div(rem, other));
            }
          }
        }
        if (exit === 1) {
          var other_hi = other[0];
          var exit$3 = 0;
          if (other_hi !== -2147483648) {
            exit$3 = 2;
          } else {
            if (other[1] === 0) {
              return zero;
            }
            exit$3 = 2;
          }
          if (exit$3 === 2) {
            if (self_hi < 0) {
              if (other_hi >= 0) {
                return neg(div(neg(self), other));
              }
              _other = neg(other);
              _self = neg(self);
              continue;
            }
            if (other_hi < 0) {
              return neg(div(self, neg(other)));
            }
            var res = zero;
            var rem$1 = self;
            while (Caml.i64_ge(rem$1, other)) {
              var b = Math.floor(to_float(rem$1) / to_float(other));
              var approx$1 = 1 > b ? 1 : b;
              var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
              var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
              var approxRes = of_float(approx$1);
              var approxRem = mul(approxRes, other);
              while (approxRem[0] < 0 || Caml.i64_gt(approxRem, rem$1)) {
                approx$1 = approx$1 - delta;
                approxRes = of_float(approx$1);
                approxRem = mul(approxRes, other);
              }
              ;
              if (is_zero(approxRes)) {
                approxRes = one;
              }
              res = add(res, approxRes);
              rem$1 = sub(rem$1, approxRem);
            }
            ;
            return res;
          }
        }
      }
      ;
    }
    function mod_(self, other) {
      return sub(self, mul(div(self, other), other));
    }
    function div_mod(self, other) {
      var quotient = div(self, other);
      return [
        quotient,
        sub(self, mul(quotient, other))
      ];
    }
    function compare(self, other) {
      var y = other[0];
      var x = self[0];
      var v = x < y ? -1 : x === y ? 0 : 1;
      if (v !== 0) {
        return v;
      }
      var y$1 = other[1];
      var x$1 = self[1];
      if (x$1 < y$1) {
        return -1;
      } else if (x$1 === y$1) {
        return 0;
      } else {
        return 1;
      }
    }
    function of_int32(lo) {
      return [
        lo < 0 ? -1 : 0,
        lo >>> 0
      ];
    }
    function to_int32(x) {
      return x[1] | 0;
    }
    function to_hex(x) {
      var x_lo = x[1];
      var x_hi = x[0];
      var aux = function(v) {
        return (v >>> 0).toString(16);
      };
      if (x_hi === 0 && x_lo === 0) {
        return "0";
      }
      if (x_lo === 0) {
        return aux(x_hi) + "00000000";
      }
      if (x_hi === 0) {
        return aux(x_lo);
      }
      var lo = aux(x_lo);
      var pad = 8 - lo.length | 0;
      if (pad <= 0) {
        return aux(x_hi) + lo;
      } else {
        return aux(x_hi) + ("0".repeat(pad) + lo);
      }
    }
    function discard_sign(x) {
      return [
        2147483647 & x[0],
        x[1]
      ];
    }
    function float_of_bits(x) {
      return function(lo, hi) {
        return new Float64Array(new Int32Array([lo, hi]).buffer)[0];
      }(x[1], x[0]);
    }
    function bits_of_float(x) {
      var match = function(x2) {
        return new Int32Array(new Float64Array([x2]).buffer);
      }(x);
      return [
        match[1],
        match[0] >>> 0
      ];
    }
    exports2.mk = mk;
    exports2.succ = succ;
    exports2.min_int = min_int;
    exports2.max_int = max_int;
    exports2.one = one;
    exports2.zero = zero;
    exports2.neg_one = neg_one;
    exports2.of_int32 = of_int32;
    exports2.to_int32 = to_int32;
    exports2.add = add;
    exports2.neg = neg;
    exports2.sub = sub;
    exports2.lsl_ = lsl_;
    exports2.lsr_ = lsr_;
    exports2.asr_ = asr_;
    exports2.is_zero = is_zero;
    exports2.mul = mul;
    exports2.xor = xor;
    exports2.or_ = or_;
    exports2.and_ = and_;
    exports2.equal = equal;
    exports2.equal_null = equal_null;
    exports2.equal_undefined = equal_undefined;
    exports2.equal_nullable = equal_nullable;
    exports2.to_float = to_float;
    exports2.of_float = of_float;
    exports2.div = div;
    exports2.mod_ = mod_;
    exports2.compare = compare;
    exports2.float_of_bits = float_of_bits;
    exports2.bits_of_float = bits_of_float;
    exports2.div_mod = div_mod;
    exports2.to_hex = to_hex;
    exports2.discard_sign = discard_sign;
    exports2.to_string = to_string;
  }
});

// node_modules/rescript/lib/js/caml_format.js
var require_caml_format = __commonJS({
  "node_modules/rescript/lib/js/caml_format.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Caml_int64 = require_caml_int64();
    function parse_digit(c) {
      if (c >= 65) {
        if (c >= 97) {
          if (c >= 123) {
            return -1;
          } else {
            return c - 87 | 0;
          }
        } else if (c >= 91) {
          return -1;
        } else {
          return c - 55 | 0;
        }
      } else if (c > 57 || c < 48) {
        return -1;
      } else {
        return c - /* '0' */
        48 | 0;
      }
    }
    function int_of_string_base(param) {
      switch (param) {
        case /* Oct */
        0:
          return 8;
        case /* Hex */
        1:
          return 16;
        case /* Dec */
        2:
          return 10;
        case /* Bin */
        3:
          return 2;
      }
    }
    function parse_sign_and_base(s) {
      var sign = 1;
      var base = (
        /* Dec */
        2
      );
      var i = 0;
      var match = s.codePointAt(i);
      switch (match) {
        case 43:
          i = i + 1 | 0;
          break;
        case 44:
          break;
        case 45:
          sign = -1;
          i = i + 1 | 0;
          break;
        default:
      }
      if (s.codePointAt(i) === /* '0' */
      48) {
        var match$1 = s.codePointAt(i + 1 | 0);
        if (match$1 >= 89) {
          if (match$1 >= 111) {
            if (match$1 < 121) {
              switch (match$1) {
                case 111:
                  base = /* Oct */
                  0;
                  i = i + 2 | 0;
                  break;
                case 117:
                  i = i + 2 | 0;
                  break;
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 118:
                case 119:
                  break;
                case 120:
                  base = /* Hex */
                  1;
                  i = i + 2 | 0;
                  break;
              }
            }
          } else if (match$1 === 98) {
            base = /* Bin */
            3;
            i = i + 2 | 0;
          }
        } else if (match$1 !== 66) {
          if (match$1 >= 79) {
            switch (match$1) {
              case 79:
                base = /* Oct */
                0;
                i = i + 2 | 0;
                break;
              case 85:
                i = i + 2 | 0;
                break;
              case 80:
              case 81:
              case 82:
              case 83:
              case 84:
              case 86:
              case 87:
                break;
              case 88:
                base = /* Hex */
                1;
                i = i + 2 | 0;
                break;
            }
          }
        } else {
          base = /* Bin */
          3;
          i = i + 2 | 0;
        }
      }
      return [
        i,
        sign,
        base
      ];
    }
    function int_of_string(s) {
      var match = parse_sign_and_base(s);
      var i = match[0];
      var base = int_of_string_base(match[2]);
      var threshold = 4294967295;
      var len = s.length;
      var c = i < len ? s.codePointAt(i) : (
        /* '\000' */
        0
      );
      var d = parse_digit(c);
      if (d < 0 || d >= base) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
      }
      var aux = function(_acc, _k) {
        while (true) {
          var k = _k;
          var acc = _acc;
          if (k === len) {
            return acc;
          }
          var a = s.codePointAt(k);
          if (a === /* '_' */
          95) {
            _k = k + 1 | 0;
            continue;
          }
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
          }
          var acc$1 = base * acc + v;
          if (acc$1 > threshold) {
            throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
          }
          _k = k + 1 | 0;
          _acc = acc$1;
          continue;
        }
        ;
      };
      var res = match[1] * aux(d, i + 1 | 0);
      var or_res = res | 0;
      if (base === 10 && res !== or_res) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
      }
      return or_res;
    }
    function int64_of_string(s) {
      var match = parse_sign_and_base(s);
      var hbase = match[2];
      var i = match[0];
      var base = Caml_int64.of_int32(int_of_string_base(hbase));
      var sign = Caml_int64.of_int32(match[1]);
      var threshold;
      switch (hbase) {
        case /* Oct */
        0:
          threshold = [
            536870911,
            4294967295
          ];
          break;
        case /* Hex */
        1:
          threshold = [
            268435455,
            4294967295
          ];
          break;
        case /* Dec */
        2:
          threshold = [
            429496729,
            2576980377
          ];
          break;
        case /* Bin */
        3:
          threshold = Caml_int64.max_int;
          break;
      }
      var len = s.length;
      var c = i < len ? s.codePointAt(i) : (
        /* '\000' */
        0
      );
      var d = Caml_int64.of_int32(parse_digit(c));
      if (Caml.i64_lt(d, Caml_int64.zero) || Caml.i64_ge(d, base)) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
      }
      var aux = function(_acc, _k) {
        while (true) {
          var k = _k;
          var acc = _acc;
          if (k === len) {
            return acc;
          }
          var a = s.codePointAt(k);
          if (a === /* '_' */
          95) {
            _k = k + 1 | 0;
            continue;
          }
          var v = Caml_int64.of_int32(parse_digit(a));
          if (Caml.i64_lt(v, Caml_int64.zero) || Caml.i64_ge(v, base) || Caml.i64_gt(acc, threshold)) {
            throw {
              RE_EXN_ID: "Failure",
              _1: "int64_of_string",
              Error: new Error()
            };
          }
          var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
          _k = k + 1 | 0;
          _acc = acc$1;
          continue;
        }
        ;
      };
      var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
      var or_res = Caml_int64.or_(res, Caml_int64.zero);
      if (Caml.i64_eq(base, [
        0,
        10
      ]) && Caml.i64_neq(res, or_res)) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
      }
      return or_res;
    }
    function int_of_base(param) {
      switch (param) {
        case /* Oct */
        0:
          return 8;
        case /* Hex */
        1:
          return 16;
        case /* Dec */
        2:
          return 10;
      }
    }
    function lowercase(c) {
      if (c >= /* 'A' */
      65 && c <= /* 'Z' */
      90 || c >= /* '\192' */
      192 && c <= /* '\214' */
      214 || c >= /* '\216' */
      216 && c <= /* '\222' */
      222) {
        return c + 32 | 0;
      } else {
        return c;
      }
    }
    function parse_format(fmt) {
      var len = fmt.length;
      if (len > 31) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "format_int: format too long",
          Error: new Error()
        };
      }
      var f = {
        justify: "+",
        signstyle: "-",
        filter: " ",
        alternate: false,
        base: (
          /* Dec */
          2
        ),
        signedconv: false,
        width: 0,
        uppercase: false,
        sign: 1,
        prec: -1,
        conv: "f"
      };
      var _i = 0;
      while (true) {
        var i = _i;
        if (i >= len) {
          return f;
        }
        var c = fmt.codePointAt(i);
        var exit = 0;
        if (c >= 69) {
          if (c >= 88) {
            if (c >= 121) {
              exit = 1;
            } else {
              switch (c) {
                case 88:
                  f.base = /* Hex */
                  1;
                  f.uppercase = true;
                  _i = i + 1 | 0;
                  continue;
                case 101:
                case 102:
                case 103:
                  exit = 5;
                  break;
                case 100:
                case 105:
                  exit = 4;
                  break;
                case 111:
                  f.base = /* Oct */
                  0;
                  _i = i + 1 | 0;
                  continue;
                case 117:
                  f.base = /* Dec */
                  2;
                  _i = i + 1 | 0;
                  continue;
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 98:
                case 99:
                case 104:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 118:
                case 119:
                  exit = 1;
                  break;
                case 120:
                  f.base = /* Hex */
                  1;
                  _i = i + 1 | 0;
                  continue;
              }
            }
          } else if (c >= 72) {
            exit = 1;
          } else {
            f.signedconv = true;
            f.uppercase = true;
            f.conv = String.fromCharCode(lowercase(c));
            _i = i + 1 | 0;
            continue;
          }
        } else {
          switch (c) {
            case 35:
              f.alternate = true;
              _i = i + 1 | 0;
              continue;
            case 32:
            case 43:
              exit = 2;
              break;
            case 45:
              f.justify = "-";
              _i = i + 1 | 0;
              continue;
            case 46:
              f.prec = 0;
              var j = i + 1 | 0;
              while ((/* @__PURE__ */ function(j2) {
                return function() {
                  var w = fmt.codePointAt(j2) - /* '0' */
                  48 | 0;
                  return w >= 0 && w <= 9;
                };
              }(j))()) {
                f.prec = (Math.imul(f.prec, 10) + fmt.codePointAt(j) | 0) - /* '0' */
                48 | 0;
                j = j + 1 | 0;
              }
              ;
              _i = j;
              continue;
            case 33:
            case 34:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 44:
            case 47:
              exit = 1;
              break;
            case 48:
              f.filter = "0";
              _i = i + 1 | 0;
              continue;
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              exit = 3;
              break;
            default:
              exit = 1;
          }
        }
        switch (exit) {
          case 1:
            _i = i + 1 | 0;
            continue;
          case 2:
            f.signstyle = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue;
          case 3:
            f.width = 0;
            var j$1 = i;
            while ((/* @__PURE__ */ function(j$12) {
              return function() {
                var w = fmt.codePointAt(j$12) - /* '0' */
                48 | 0;
                return w >= 0 && w <= 9;
              };
            }(j$1))()) {
              f.width = (Math.imul(f.width, 10) + fmt.codePointAt(j$1) | 0) - /* '0' */
              48 | 0;
              j$1 = j$1 + 1 | 0;
            }
            ;
            _i = j$1;
            continue;
          case 4:
            f.signedconv = true;
            f.base = /* Dec */
            2;
            _i = i + 1 | 0;
            continue;
          case 5:
            f.signedconv = true;
            f.conv = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue;
        }
      }
      ;
    }
    function finish_formatting(config, rawbuffer) {
      var justify = config.justify;
      var signstyle = config.signstyle;
      var filter = config.filter;
      var alternate = config.alternate;
      var base = config.base;
      var signedconv = config.signedconv;
      var width = config.width;
      var uppercase = config.uppercase;
      var sign = config.sign;
      var len = rawbuffer.length;
      if (signedconv && (sign < 0 || signstyle !== "-")) {
        len = len + 1 | 0;
      }
      if (alternate) {
        if (base === /* Oct */
        0) {
          len = len + 1 | 0;
        } else if (base === /* Hex */
        1) {
          len = len + 2 | 0;
        }
      }
      var buffer = "";
      if (justify === "+" && filter === " ") {
        for (var _for = len; _for < width; ++_for) {
          buffer = buffer + filter;
        }
      }
      if (signedconv) {
        if (sign < 0) {
          buffer = buffer + "-";
        } else if (signstyle !== "-") {
          buffer = buffer + signstyle;
        }
      }
      if (alternate && base === /* Oct */
      0) {
        buffer = buffer + "0";
      }
      if (alternate && base === /* Hex */
      1) {
        buffer = buffer + "0x";
      }
      if (justify === "+" && filter === "0") {
        for (var _for$1 = len; _for$1 < width; ++_for$1) {
          buffer = buffer + filter;
        }
      }
      buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
      if (justify === "-") {
        for (var _for$2 = len; _for$2 < width; ++_for$2) {
          buffer = buffer + " ";
        }
      }
      return buffer;
    }
    function format_int(fmt, i) {
      if (fmt === "%d") {
        return String(i);
      }
      var f = parse_format(fmt);
      var i$1 = i < 0 ? f.signedconv ? (f.sign = -1, -i >>> 0) : i >>> 0 : i;
      var s = i$1.toString(int_of_base(f.base));
      if (f.prec >= 0) {
        f.filter = " ";
        var n = f.prec - s.length | 0;
        if (n > 0) {
          s = "0".repeat(n) + s;
        }
      }
      return finish_formatting(f, s);
    }
    function dec_of_pos_int64(x) {
      if (!Caml.i64_lt(x, Caml_int64.zero)) {
        return Caml_int64.to_string(x);
      }
      var wbase = [
        0,
        10
      ];
      var y = Caml_int64.discard_sign(x);
      var match = Caml_int64.div_mod(y, wbase);
      var match$1 = Caml_int64.div_mod(Caml_int64.add([
        0,
        8
      ], match[1]), wbase);
      var quotient = Caml_int64.add(Caml_int64.add([
        214748364,
        3435973836
      ], match[0]), match$1[0]);
      return Caml_int64.to_string(quotient) + "0123456789"[Caml_int64.to_int32(match$1[1])];
    }
    function oct_of_int64(x) {
      var s = "";
      var wbase = [
        0,
        8
      ];
      var cvtbl = "01234567";
      if (Caml.i64_lt(x, Caml_int64.zero)) {
        var y = Caml_int64.discard_sign(x);
        var match = Caml_int64.div_mod(y, wbase);
        var quotient = Caml_int64.add([
          268435456,
          0
        ], match[0]);
        var modulus = match[1];
        s = cvtbl[Caml_int64.to_int32(modulus)] + s;
        while (Caml.i64_neq(quotient, Caml_int64.zero)) {
          var match$1 = Caml_int64.div_mod(quotient, wbase);
          quotient = match$1[0];
          modulus = match$1[1];
          s = cvtbl[Caml_int64.to_int32(modulus)] + s;
        }
        ;
      } else {
        var match$2 = Caml_int64.div_mod(x, wbase);
        var quotient$1 = match$2[0];
        var modulus$1 = match$2[1];
        s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
        while (Caml.i64_neq(quotient$1, Caml_int64.zero)) {
          var match$3 = Caml_int64.div_mod(quotient$1, wbase);
          quotient$1 = match$3[0];
          modulus$1 = match$3[1];
          s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
        }
        ;
      }
      return s;
    }
    function int64_format(fmt, x) {
      if (fmt === "%d") {
        return Caml_int64.to_string(x);
      }
      var f = parse_format(fmt);
      var x$1 = f.signedconv && Caml.i64_lt(x, Caml_int64.zero) ? (f.sign = -1, Caml_int64.neg(x)) : x;
      var match = f.base;
      var s;
      switch (match) {
        case /* Oct */
        0:
          s = oct_of_int64(x$1);
          break;
        case /* Hex */
        1:
          s = Caml_int64.to_hex(x$1);
          break;
        case /* Dec */
        2:
          s = dec_of_pos_int64(x$1);
          break;
      }
      var fill_s;
      if (f.prec >= 0) {
        f.filter = " ";
        var n = f.prec - s.length | 0;
        fill_s = n > 0 ? "0".repeat(n) + s : s;
      } else {
        fill_s = s;
      }
      return finish_formatting(f, fill_s);
    }
    function format_float(fmt, x) {
      var f = parse_format(fmt);
      var prec = f.prec < 0 ? 6 : f.prec;
      var x$1 = x < 0 ? (f.sign = -1, -x) : x;
      var s = "";
      if (isNaN(x$1)) {
        s = "nan";
        f.filter = " ";
      } else if (isFinite(x$1)) {
        var match = f.conv;
        switch (match) {
          case "e":
            s = x$1.toExponential(prec);
            var i = s.length;
            if (s.codePointAt(i - 3 | 0) === /* 'e' */
            101) {
              s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
            }
            break;
          case "f":
            s = x$1.toFixed(prec);
            break;
          case "g":
            var prec$1 = prec !== 0 ? prec : 1;
            s = x$1.toExponential(prec$1 - 1 | 0);
            var j = s.indexOf("e");
            var exp = Number(s.slice(j + 1 | 0)) | 0;
            if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
              var i$1 = j - 1 | 0;
              while (s.codePointAt(i$1) === /* '0' */
              48) {
                i$1 = i$1 - 1 | 0;
              }
              ;
              if (s.codePointAt(i$1) === /* '.' */
              46) {
                i$1 = i$1 - 1 | 0;
              }
              s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
              var i$2 = s.length;
              if (s.codePointAt(i$2 - 3 | 0) === /* 'e' */
              101) {
                s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
              }
            } else {
              var p = prec$1;
              if (exp < 0) {
                p = p - (exp + 1 | 0) | 0;
                s = x$1.toFixed(p);
              } else {
                while (function() {
                  s = x$1.toFixed(p);
                  return s.length > (prec$1 + 1 | 0);
                }()) {
                  p = p - 1 | 0;
                }
                ;
              }
              if (p !== 0) {
                var k = s.length - 1 | 0;
                while (s.codePointAt(k) === /* '0' */
                48) {
                  k = k - 1 | 0;
                }
                ;
                if (s.codePointAt(k) === /* '.' */
                46) {
                  k = k - 1 | 0;
                }
                s = s.slice(0, k + 1 | 0);
              }
            }
            break;
          default:
        }
      } else {
        s = "inf";
        f.filter = " ";
      }
      return finish_formatting(f, s);
    }
    var hexstring_of_float = function(x, prec, style) {
      if (!isFinite(x)) {
        if (isNaN(x))
          return "nan";
        return x > 0 ? "infinity" : "-infinity";
      }
      var sign = x == 0 && 1 / x == -Infinity ? 1 : x >= 0 ? 0 : 1;
      if (sign)
        x = -x;
      var exp = 0;
      if (x == 0) {
      } else if (x < 1) {
        while (x < 1 && exp > -1022) {
          x *= 2;
          exp--;
        }
      } else {
        while (x >= 2) {
          x /= 2;
          exp++;
        }
      }
      var exp_sign = exp < 0 ? "" : "+";
      var sign_str = "";
      if (sign)
        sign_str = "-";
      else {
        switch (style) {
          case 43:
            sign_str = "+";
            break;
          case 32:
            sign_str = " ";
            break;
          default:
            break;
        }
      }
      if (prec >= 0 && prec < 13) {
        var cst = Math.pow(2, prec * 4);
        x = Math.round(x * cst) / cst;
      }
      var x_str = x.toString(16);
      if (prec >= 0) {
        var idx = x_str.indexOf(".");
        if (idx < 0) {
          x_str += "." + "0".repeat(prec);
        } else {
          var size = idx + 1 + prec;
          if (x_str.length < size)
            x_str += "0".repeat(size - x_str.length);
          else
            x_str = x_str.substr(0, size);
        }
      }
      return sign_str + "0x" + x_str + "p" + exp_sign + exp.toString(10);
    };
    var float_of_string = function(s, exn) {
      var res = +s;
      if (s.length > 0 && res === res)
        return res;
      s = s.replace(/_/g, "");
      res = +s;
      if (s.length > 0 && res === res || /^[+-]?nan$/i.test(s)) {
        return res;
      }
      ;
      var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(s);
      if (m) {
        var m3 = m[3].replace(/0+$/, "");
        var mantissa = parseInt(m[1] + m[2] + m3, 16);
        var exponent = (m[4] | 0) - 4 * m3.length;
        res = mantissa * Math.pow(2, exponent);
        return res;
      }
      if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
      if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
      throw exn;
    };
    function float_of_string$1(s) {
      return float_of_string(s, {
        RE_EXN_ID: "Failure",
        _1: "float_of_string"
      });
    }
    exports2.format_float = format_float;
    exports2.hexstring_of_float = hexstring_of_float;
    exports2.format_int = format_int;
    exports2.float_of_string = float_of_string$1;
    exports2.int64_format = int64_format;
    exports2.int_of_string = int_of_string;
    exports2.int64_of_string = int64_of_string;
  }
});

// node_modules/rescript/lib/js/caml_string.js
var require_caml_string = __commonJS({
  "node_modules/rescript/lib/js/caml_string.js"(exports2) {
    "use strict";
    function get(s, i) {
      if (i >= s.length || i < 0) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return s.codePointAt(i);
    }
    function make(n, ch) {
      return String.fromCharCode(ch).repeat(n);
    }
    exports2.get = get;
    exports2.make = make;
  }
});

// node_modules/rescript/lib/js/caml_exceptions.js
var require_caml_exceptions = __commonJS({
  "node_modules/rescript/lib/js/caml_exceptions.js"(exports2) {
    "use strict";
    var id = {
      contents: 0
    };
    function create(str) {
      id.contents = id.contents + 1 | 0;
      return str + ("/" + id.contents);
    }
    function is_extension(e) {
      if (e == null) {
        return false;
      } else {
        return typeof e.RE_EXN_ID === "string";
      }
    }
    function exn_slot_name(x) {
      return x.RE_EXN_ID;
    }
    exports2.id = id;
    exports2.create = create;
    exports2.is_extension = is_extension;
    exports2.exn_slot_name = exn_slot_name;
  }
});

// node_modules/rescript/lib/js/caml_js_exceptions.js
var require_caml_js_exceptions = __commonJS({
  "node_modules/rescript/lib/js/caml_js_exceptions.js"(exports2) {
    "use strict";
    var Caml_option = require_caml_option();
    var Caml_exceptions = require_caml_exceptions();
    var $$Error = "JsError";
    function internalToOCamlException(e) {
      if (Caml_exceptions.is_extension(e)) {
        return e;
      } else {
        return {
          RE_EXN_ID: "JsError",
          _1: e
        };
      }
    }
    function as_js_exn(exn) {
      if (exn.RE_EXN_ID === $$Error) {
        return Caml_option.some(exn._1);
      }
    }
    exports2.$$Error = $$Error;
    exports2.internalToOCamlException = internalToOCamlException;
    exports2.as_js_exn = as_js_exn;
  }
});

// node_modules/rescript/lib/js/pervasives.js
var require_pervasives = __commonJS({
  "node_modules/rescript/lib/js/pervasives.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_sys = require_caml_sys();
    var Caml_format = require_caml_format();
    var Caml_string = require_caml_string();
    var Caml_exceptions = require_caml_exceptions();
    var Caml_js_exceptions2 = require_caml_js_exceptions();
    function failwith(s) {
      throw {
        RE_EXN_ID: "Failure",
        _1: s,
        Error: new Error()
      };
    }
    function invalid_arg(s) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: s,
        Error: new Error()
      };
    }
    var Exit = /* @__PURE__ */ Caml_exceptions.create("Pervasives.Exit");
    function abs(x) {
      if (x >= 0) {
        return x;
      } else {
        return -x | 0;
      }
    }
    function lnot(x) {
      return x ^ -1;
    }
    var min_int = -2147483648;
    function classify_float(x) {
      if (isFinite(x)) {
        if (Math.abs(x) >= 22250738585072014e-324) {
          return (
            /* FP_normal */
            0
          );
        } else if (x !== 0) {
          return (
            /* FP_subnormal */
            1
          );
        } else {
          return (
            /* FP_zero */
            2
          );
        }
      } else if (isNaN(x)) {
        return (
          /* FP_nan */
          4
        );
      } else {
        return (
          /* FP_infinite */
          3
        );
      }
    }
    function char_of_int(n) {
      if (n < 0 || n > 255) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "char_of_int",
          Error: new Error()
        };
      }
      return n;
    }
    function string_of_bool(b) {
      if (b) {
        return "true";
      } else {
        return "false";
      }
    }
    function bool_of_string(param) {
      switch (param) {
        case "false":
          return false;
        case "true":
          return true;
        default:
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "bool_of_string",
            Error: new Error()
          };
      }
    }
    function bool_of_string_opt(param) {
      switch (param) {
        case "false":
          return false;
        case "true":
          return true;
        default:
          return;
      }
    }
    function int_of_string_opt(s) {
      try {
        return Caml_format.int_of_string(s);
      } catch (raw_exn) {
        var exn = Caml_js_exceptions2.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === "Failure") {
          return;
        }
        throw exn;
      }
    }
    function valid_float_lexem(s) {
      var l = s.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i >= l) {
          return s + ".";
        }
        var match = Caml_string.get(s, i);
        if (match >= 48) {
          if (match >= 58) {
            return s;
          }
          _i = i + 1 | 0;
          continue;
        }
        if (match !== 45) {
          return s;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function string_of_float(f) {
      return valid_float_lexem(Caml_format.format_float("%.12g", f));
    }
    function float_of_string_opt(s) {
      try {
        return Caml_format.float_of_string(s);
      } catch (raw_exn) {
        var exn = Caml_js_exceptions2.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === "Failure") {
          return;
        }
        throw exn;
      }
    }
    function $at(l1, l2) {
      if (l1) {
        return {
          hd: l1.hd,
          tl: $at(l1.tl, l2)
        };
      } else {
        return l2;
      }
    }
    function print_newline(param) {
      console.log("");
    }
    function prerr_newline(param) {
      console.error("");
    }
    function print_int(i) {
      console.log(String(i));
    }
    function print_float(i) {
      console.log(valid_float_lexem(Caml_format.format_float("%.12g", i)));
    }
    function print_string(prim) {
      console.log(prim);
    }
    var exit_function = {
      contents: function(prim) {
      }
    };
    function at_exit(f) {
      var g = exit_function.contents;
      exit_function.contents = function(param) {
        Curry._1(f, void 0);
        Curry._1(g, void 0);
      };
    }
    function exit(retcode) {
      Curry._1(exit_function.contents, void 0);
      return Caml_sys.sys_exit(retcode);
    }
    var max_int = 2147483647;
    var infinity = Infinity;
    var neg_infinity = -Infinity;
    var max_float = 17976931348623157e292;
    var min_float = 22250738585072014e-324;
    var epsilon_float = 2220446049250313e-31;
    exports2.invalid_arg = invalid_arg;
    exports2.failwith = failwith;
    exports2.Exit = Exit;
    exports2.abs = abs;
    exports2.max_int = max_int;
    exports2.min_int = min_int;
    exports2.lnot = lnot;
    exports2.infinity = infinity;
    exports2.neg_infinity = neg_infinity;
    exports2.max_float = max_float;
    exports2.min_float = min_float;
    exports2.epsilon_float = epsilon_float;
    exports2.classify_float = classify_float;
    exports2.char_of_int = char_of_int;
    exports2.string_of_bool = string_of_bool;
    exports2.bool_of_string = bool_of_string;
    exports2.bool_of_string_opt = bool_of_string_opt;
    exports2.int_of_string_opt = int_of_string_opt;
    exports2.string_of_float = string_of_float;
    exports2.float_of_string_opt = float_of_string_opt;
    exports2.$at = $at;
    exports2.print_string = print_string;
    exports2.print_int = print_int;
    exports2.print_float = print_float;
    exports2.print_newline = print_newline;
    exports2.prerr_newline = prerr_newline;
    exports2.exit = exit;
    exports2.at_exit = at_exit;
    exports2.valid_float_lexem = valid_float_lexem;
  }
});

// node_modules/rescript/lib/js/belt_Result.js
var require_belt_Result = __commonJS({
  "node_modules/rescript/lib/js/belt_Result.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    function getExn(x) {
      if (x.TAG === /* Ok */
      0) {
        return x._0;
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefaultU(opt, $$default, f) {
      if (opt.TAG === /* Ok */
      0) {
        return f(opt._0);
      } else {
        return $$default;
      }
    }
    function mapWithDefault(opt, $$default, f) {
      return mapWithDefaultU(opt, $$default, Curry.__1(f));
    }
    function mapU(opt, f) {
      if (opt.TAG === /* Ok */
      0) {
        return {
          TAG: (
            /* Ok */
            0
          ),
          _0: f(opt._0)
        };
      } else {
        return {
          TAG: (
            /* Error */
            1
          ),
          _0: opt._0
        };
      }
    }
    function map(opt, f) {
      return mapU(opt, Curry.__1(f));
    }
    function flatMapU(opt, f) {
      if (opt.TAG === /* Ok */
      0) {
        return f(opt._0);
      } else {
        return {
          TAG: (
            /* Error */
            1
          ),
          _0: opt._0
        };
      }
    }
    function flatMap(opt, f) {
      return flatMapU(opt, Curry.__1(f));
    }
    function getWithDefault(opt, $$default) {
      if (opt.TAG === /* Ok */
      0) {
        return opt._0;
      } else {
        return $$default;
      }
    }
    function isOk(param) {
      if (param.TAG === /* Ok */
      0) {
        return true;
      } else {
        return false;
      }
    }
    function isError(param) {
      if (param.TAG === /* Ok */
      0) {
        return false;
      } else {
        return true;
      }
    }
    function eqU(a, b, f) {
      if (a.TAG === /* Ok */
      0) {
        if (b.TAG === /* Ok */
        0) {
          return f(a._0, b._0);
        } else {
          return false;
        }
      } else if (b.TAG === /* Ok */
      0) {
        return false;
      } else {
        return true;
      }
    }
    function eq(a, b, f) {
      return eqU(a, b, Curry.__2(f));
    }
    function cmpU(a, b, f) {
      if (a.TAG === /* Ok */
      0) {
        if (b.TAG === /* Ok */
        0) {
          return f(a._0, b._0);
        } else {
          return 1;
        }
      } else if (b.TAG === /* Ok */
      0) {
        return -1;
      } else {
        return 0;
      }
    }
    function cmp(a, b, f) {
      return cmpU(a, b, Curry.__2(f));
    }
    exports2.getExn = getExn;
    exports2.mapWithDefaultU = mapWithDefaultU;
    exports2.mapWithDefault = mapWithDefault;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.flatMapU = flatMapU;
    exports2.flatMap = flatMap;
    exports2.getWithDefault = getWithDefault;
    exports2.isOk = isOk;
    exports2.isError = isError;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
  }
});

// src/Object.js
var require_Object = __commonJS({
  "src/Object.js"(exports2) {
    "use strict";
    var Js_dict = require_js_dict();
    var Js_json = require_js_json();
    var Js_array = require_js_array();
    var Js_types = require_js_types();
    var Pervasives2 = require_pervasives();
    var Belt_Option = require_belt_Option();
    var Belt_Result2 = require_belt_Result();
    var Caml_option = require_caml_option();
    function classify(t) {
      var string = Js_types.classify(t);
      if (typeof string === "number") {
        return Pervasives2.failwith("Unreachable code");
      }
      switch (string.TAG | 0) {
        case /* JSString */
        1:
          return {
            TAG: (
              /* String */
              0
            ),
            _0: string._0
          };
        case /* JSObject */
        3:
          return {
            TAG: (
              /* Wrap */
              1
            ),
            _0: string._0
          };
        default:
          return Pervasives2.failwith("Unreachable code");
      }
    }
    var StringOption = {
      classify
    };
    function getId(ooi) {
      var id = classify(ooi);
      if (id.TAG === /* String */
      0) {
        return id._0;
      } else {
        return id._0.id;
      }
    }
    function toJSON(o) {
      var match = Js_dict.get(o, "@context");
      if (match !== void 0) {
      } else {
        o["@context"] = "https://www.w3.org/ns/activitystreams";
      }
      return o;
    }
    function isJSONString(json) {
      var match = Js_json.classify(json);
      if (typeof match === "number" || match.TAG !== /* JSONString */
      0) {
        return false;
      } else {
        return true;
      }
    }
    function validateJSON(json) {
      var dict = Js_json.classify(json);
      if (typeof dict === "number") {
        return false;
      }
      if (dict.TAG !== /* JSONObject */
      2) {
        return false;
      }
      var dict$1 = dict._0;
      var id = Belt_Option.map(Js_dict.get(dict$1, "id"), isJSONString);
      var type_ = Belt_Option.map(Js_dict.get(dict$1, "type"), isJSONString);
      var obj = Belt_Option.map(Js_dict.get(dict$1, "object"), function(x) {
        if (isJSONString(x)) {
          return true;
        } else {
          return validateJSON(x);
        }
      });
      var orderedItems = Belt_Option.map(Belt_Option.flatMap(Js_dict.get(dict$1, "orderedItems"), Js_json.decodeArray), function(param) {
        return Js_array.every(function(x) {
          if (isJSONString(x)) {
            return true;
          } else {
            return validateJSON(x);
          }
        }, param);
      });
      if (id === void 0) {
        return false;
      }
      if (!id) {
        return false;
      }
      if (type_ === void 0) {
        return false;
      }
      if (!type_) {
        return false;
      }
      if (obj !== void 0 && !obj) {
        return false;
      }
      if (orderedItems !== void 0 && !orderedItems) {
        return false;
      } else {
        return true;
      }
    }
    function fromString(s) {
      var tmp;
      try {
        tmp = {
          TAG: (
            /* Ok */
            0
          ),
          _0: JSON.parse(s)
        };
      } catch (exn) {
        tmp = {
          TAG: (
            /* Error */
            1
          ),
          _0: "Error parsing JSON string"
        };
      }
      return Belt_Result2.flatMap(tmp, function(x) {
        if (validateJSON(x)) {
          return {
            TAG: (
              /* Ok */
              0
            ),
            _0: x
          };
        } else {
          return {
            TAG: (
              /* Error */
              1
            ),
            _0: "JSON is not valid"
          };
        }
      });
    }
    function resultToOption(r) {
      return Belt_Result2.mapWithDefault(r, void 0, function(x) {
        return Caml_option.some(x);
      });
    }
    exports2.StringOption = StringOption;
    exports2.getId = getId;
    exports2.toJSON = toJSON;
    exports2.isJSONString = isJSONString;
    exports2.validateJSON = validateJSON;
    exports2.fromString = fromString;
    exports2.resultToOption = resultToOption;
  }
});

// src/Fetch.js
var require_Fetch = __commonJS({
  "src/Fetch.js"(exports2) {
    "use strict";
    var Config2 = require_Config();
    var Js_exn2 = require_js_exn();
    var $$Object2 = require_Object();
    var Js_dict = require_js_dict();
    var Js_json = require_js_json();
    var Belt_Option = require_belt_Option();
    var Caml_option = require_caml_option();
    var Caml_js_exceptions2 = require_caml_js_exceptions();
    var headers = {
      accept: "application/activity+json"
    };
    async function fetchKey(keyId) {
      var res = await fetch(keyId, {
        headers
      });
      try {
        return Belt_Option.flatMap(Belt_Option.flatMap(Belt_Option.flatMap(Js_dict.get(await res.json(), "publicKey"), Js_json.decodeObject), function(x) {
          return Js_dict.get(x, "publicKeyPem");
        }), Js_json.decodeString);
      } catch (raw_exn) {
        var exn = Caml_js_exceptions2.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === Js_exn2.$$Error) {
          return;
        }
        throw exn;
      }
    }
    async function fetchInbox(actor) {
      var res = await fetch(actor, {
        headers
      });
      try {
        return Belt_Option.flatMap(Js_dict.get(await res.json(), "inbox"), Js_json.decodeString);
      } catch (raw_exn) {
        var exn = Caml_js_exceptions2.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === Js_exn2.$$Error) {
          return;
        }
        throw exn;
      }
    }
    function atob(s) {
      return Buffer.from(s).toString("base64");
    }
    function btoa(s) {
      return Buffer.from(s, "base64").toString();
    }
    var headers$1 = {
      accept: "application/vnd.github+json",
      authorization: "Bearer " + Config2.ghToken,
      "x-gitHub-api-version": "2022-11-28"
    };
    async function put(content, path, sha) {
      return (await fetch(Config2.ghBaseURL + path, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify({
          message: "Update ActivityPub file",
          committer: {
            name: "LessPub Bot",
            email: "no-email@example.com"
          },
          content: Buffer.from(content).toString("base64"),
          sha
        })
      })).ok;
    }
    async function $$delete(path, sha) {
      return (await fetch(Config2.ghBaseURL + path, {
        method: "DELETE",
        headers: headers$1,
        body: JSON.stringify({
          message: "Delete ActivityPub file",
          committer: {
            name: "LessPub Bot",
            email: "no-email@example.com"
          },
          sha
        })
      })).ok;
    }
    async function get(path) {
      var res = await fetch(Config2.ghBaseURL + path, {
        headers: headers$1
      });
      if (!res.ok) {
        return [
          void 0,
          void 0
        ];
      }
      var dict = await res.json();
      var content = Belt_Option.map(Belt_Option.flatMap(Js_dict.get(dict, "content"), Js_json.decodeString), btoa);
      var sha = Belt_Option.flatMap(Js_dict.get(dict, "sha"), Js_json.decodeString);
      return [
        content,
        sha
      ];
    }
    async function insertToFile(ooi, path) {
      var match = await get(path);
      var collection = Belt_Option.getWithDefault(Belt_Option.flatMap(match[0], function(x) {
        return $$Object2.resultToOption($$Object2.fromString(x));
      }), {
        id: Config2.baseURL + path,
        type: "OrderedCollection",
        totalItems: 0,
        orderedItems: []
      });
      var totalItems = collection.totalItems;
      if (totalItems !== void 0) {
        var orderedItems = collection.orderedItems;
        if (orderedItems !== void 0) {
          if (orderedItems.includes(ooi)) {
            return true;
          } else {
            collection.totalItems = 1 + totalItems | 0;
            collection.orderedItems = [ooi].concat(orderedItems);
            return await put(JSON.stringify($$Object2.toJSON(collection)), path, match[1]);
          }
        }
        throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "Fetch.res",
            103,
            4
          ],
          Error: new Error()
        };
      }
      throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "Fetch.res",
          103,
          4
        ],
        Error: new Error()
      };
    }
    async function removeFromFile(ooi, path) {
      var match = await get(path);
      var sha = match[1];
      var collection = Belt_Option.flatMap(match[0], function(x) {
        return $$Object2.resultToOption($$Object2.fromString(x));
      });
      if (collection === void 0) {
        return true;
      }
      var collection$1 = Caml_option.valFromOption(collection);
      var totalItems = collection$1.totalItems;
      if (totalItems !== void 0) {
        var orderedItems = collection$1.orderedItems;
        if (orderedItems !== void 0) {
          var id = $$Object2.getId(ooi);
          console.log(totalItems, sha, id);
          var match$1 = orderedItems.findIndex(function(x) {
            return id === $$Object2.getId(x);
          });
          if (match$1 !== -1) {
            if (totalItems !== 1) {
              orderedItems.splice(match$1, 1);
              collection$1.totalItems = totalItems - 1 | 0;
              collection$1.orderedItems = orderedItems;
              return await put(JSON.stringify($$Object2.toJSON(collection$1)), path, sha);
            } else {
              return await $$delete(path, Belt_Option.getExn(sha));
            }
          } else {
            return true;
          }
        }
        throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "Fetch.res",
            116,
            8
          ],
          Error: new Error()
        };
      }
      throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "Fetch.res",
          116,
          8
        ],
        Error: new Error()
      };
    }
    var GitHub = {
      atob,
      btoa,
      headers: headers$1,
      put,
      $$delete,
      get,
      insertToFile,
      removeFromFile
    };
    exports2.headers = headers;
    exports2.fetchKey = fetchKey;
    exports2.fetchInbox = fetchInbox;
    exports2.GitHub = GitHub;
  }
});

// src/Security.js
var require_Security = __commonJS({
  "src/Security.js"(exports2) {
    "use strict";
    var Fetch2 = require_Fetch();
    var Config2 = require_Config();
    var Js_dict = require_js_dict();
    var Belt_Option = require_belt_Option();
    var Nodecrypto = require("node:crypto");
    function get(text) {
      return Nodecrypto.createHash("sha256").update(text).digest("base64");
    }
    var Hash = {
      get
    };
    function sign(data) {
      return Nodecrypto.sign("sha256", Buffer.from(data), Config2.privateKey).toString("base64");
    }
    function verify(data, publicKey, signature) {
      return Nodecrypto.verify("sha256", Buffer.from(data), publicKey, Buffer.from(signature, "base64"));
    }
    function verifyDigest($$event) {
      return Belt_Option.mapWithDefault(Js_dict.get($$event.headers, "digest"), false, function(x) {
        return x === "SHA-256=" + get(Belt_Option.getWithDefault($$event.body, ""));
      });
    }
    async function verifySignature($$event, keyId, headers, signature) {
      return Belt_Option.mapWithDefault(await Fetch2.fetchKey(keyId), false, function(publicKey) {
        var to_be_signed = headers.map(function(h) {
          var match = Js_dict.get($$event.headers, h);
          if (h === "(request-target)") {
            return "(request-target): " + $$event.httpMethod.toLowerCase() + " " + $$event.path;
          }
          if (match !== void 0) {
            return h + ": " + match;
          }
          throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "Security.res",
              42,
              10
            ],
            Error: new Error()
          };
        }).join("\n");
        return verify(to_be_signed, publicKey, signature);
      });
    }
    function parse(headers) {
      return Belt_Option.map(Js_dict.get(headers, "signature"), function(s) {
        var dict = Js_dict.fromArray(s.split(",").map(function(x) {
          var i = x.indexOf("=");
          return [
            x.slice(0, i),
            x.slice(i + 2 | 0, x.length - 1 | 0)
          ];
        }));
        var keyId = Js_dict.get(dict, "keyId");
        var signature = Js_dict.get(dict, "signature");
        var algorithm = Js_dict.get(dict, "algorithm");
        var headers2 = Belt_Option.map(Js_dict.get(dict, "headers"), function(s2) {
          return s2.split(" ");
        });
        return [
          keyId,
          signature,
          algorithm,
          headers2
        ];
      });
    }
    async function verify$1($$event) {
      var match = parse($$event.headers);
      if (match === void 0) {
        return false;
      }
      var keyId = match[0];
      if (keyId === void 0) {
        return false;
      }
      var signature = match[1];
      if (signature === void 0) {
        return false;
      }
      if (match[2] === void 0) {
        return false;
      }
      var headers = match[3];
      if (headers !== void 0 && verifyDigest($$event)) {
        return await verifySignature($$event, keyId, headers, signature);
      } else {
        return false;
      }
    }
    var Signature = {
      verifyDigest,
      verifySignature,
      parse,
      verify: verify$1
    };
    exports2.Hash = Hash;
    exports2.sign = sign;
    exports2.verify = verify;
    exports2.Signature = Signature;
  }
});

// src/Egress.js
var require_Egress = __commonJS({
  "src/Egress.js"(exports2) {
    "use strict";
    var Config2 = require_Config();
    var $$Object2 = require_Object();
    var Security = require_Security();
    function post(host, path, activity) {
      var body = JSON.stringify($$Object2.toJSON(activity));
      var date = (/* @__PURE__ */ new Date()).toUTCString();
      var digest = "SHA-256=" + Security.Hash.get(body);
      var to_be_signed = "(request-target): post " + path + "\nhost: " + host + "\ndate: " + date + "\ndigest: " + digest;
      var signature = Security.sign(to_be_signed);
      var fetch_options = {
        method: "POST",
        body,
        headers: {
          "content-type": "application/activity+json",
          host,
          date,
          digest,
          signature: 'keyId="' + Config2.keyId + '",algorithm="rsa-sha256",headers="(request-target) host date digest",signature="' + signature + '"'
        }
      };
      console.log("I will send:", fetch_options);
      return fetch("https://" + host + path, fetch_options);
    }
    exports2.post = post;
  }
});

// node_modules/rescript/lib/js/js_int.js
var require_js_int = __commonJS({
  "node_modules/rescript/lib/js/js_int.js"(exports2) {
    "use strict";
    function equal(x, y) {
      return x === y;
    }
    var max = 2147483647;
    var min = -2147483648;
    exports2.equal = equal;
    exports2.max = max;
    exports2.min = min;
  }
});

// node_modules/rescript/lib/js/js_math.js
var require_js_math = __commonJS({
  "node_modules/rescript/lib/js/js_math.js"(exports2) {
    "use strict";
    var Js_int = require_js_int();
    function unsafe_ceil(prim) {
      return Math.ceil(prim);
    }
    function ceil_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.ceil(f);
      }
    }
    function unsafe_floor(prim) {
      return Math.floor(prim);
    }
    function floor_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.floor(f);
      }
    }
    function random_int(min, max) {
      return floor_int(Math.random() * (max - min | 0)) + min | 0;
    }
    var ceil = ceil_int;
    var floor = floor_int;
    exports2.unsafe_ceil = unsafe_ceil;
    exports2.ceil_int = ceil_int;
    exports2.ceil = ceil;
    exports2.unsafe_floor = unsafe_floor;
    exports2.floor_int = floor_int;
    exports2.floor = floor;
    exports2.random_int = random_int;
  }
});

// node_modules/rescript/lib/js/belt_Array.js
var require_belt_Array = __commonJS({
  "node_modules/rescript/lib/js/belt_Array.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Curry = require_curry();
    var Js_math = require_js_math();
    var Caml_option = require_caml_option();
    function get(arr, i) {
      if (i >= 0 && i < arr.length) {
        return Caml_option.some(arr[i]);
      }
    }
    function getExn(arr, i) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            35,
            2
          ],
          Error: new Error()
        };
      }
      return arr[i];
    }
    function set(arr, i, v) {
      if (i >= 0 && i < arr.length) {
        arr[i] = v;
        return true;
      } else {
        return false;
      }
    }
    function setExn(arr, i, v) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            45,
            2
          ],
          Error: new Error()
        };
      }
      arr[i] = v;
    }
    function swapUnsafe(xs, i, j) {
      var tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function shuffleInPlace(xs) {
      var len = xs.length;
      for (var i = 0; i < len; ++i) {
        swapUnsafe(xs, i, Js_math.random_int(i, len));
      }
    }
    function shuffle(xs) {
      var result = xs.slice(0);
      shuffleInPlace(result);
      return result;
    }
    function reverseInPlace(xs) {
      var len = xs.length;
      var ofs = 0;
      for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
        swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
      }
    }
    function reverse(xs) {
      var len = xs.length;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = xs[(len - 1 | 0) - i | 0];
      }
      return result;
    }
    function make(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f;
      }
      return res;
    }
    function makeByU(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f(i);
      }
      return res;
    }
    function makeBy(l, f) {
      return makeByU(l, Curry.__1(f));
    }
    function makeByAndShuffleU(l, f) {
      var u = makeByU(l, f);
      shuffleInPlace(u);
      return u;
    }
    function makeByAndShuffle(l, f) {
      return makeByAndShuffleU(l, Curry.__1(f));
    }
    function range(start, finish) {
      var cut = finish - start | 0;
      if (cut < 0) {
        return [];
      }
      var arr = new Array(cut + 1 | 0);
      for (var i = 0; i <= cut; ++i) {
        arr[i] = start + i | 0;
      }
      return arr;
    }
    function rangeBy(start, finish, step) {
      var cut = finish - start | 0;
      if (cut < 0 || step <= 0) {
        return [];
      }
      var nb = (cut / step | 0) + 1 | 0;
      var arr = new Array(nb);
      var cur = start;
      for (var i = 0; i < nb; ++i) {
        arr[i] = cur;
        cur = cur + step | 0;
      }
      return arr;
    }
    function zip(xs, ys) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = [
          xs[i],
          ys[i]
        ];
      }
      return s;
    }
    function zipByU(xs, ys, f) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = f(xs[i], ys[i]);
      }
      return s;
    }
    function zipBy(xs, ys, f) {
      return zipByU(xs, ys, Curry.__2(f));
    }
    function concat(a1, a2) {
      var l1 = a1.length;
      var l2 = a2.length;
      var a1a2 = new Array(l1 + l2 | 0);
      for (var i = 0; i < l1; ++i) {
        a1a2[i] = a1[i];
      }
      for (var i$1 = 0; i$1 < l2; ++i$1) {
        a1a2[l1 + i$1 | 0] = a2[i$1];
      }
      return a1a2;
    }
    function concatMany(arrs) {
      var lenArrs = arrs.length;
      var totalLen = 0;
      for (var i = 0; i < lenArrs; ++i) {
        totalLen = totalLen + arrs[i].length | 0;
      }
      var result = new Array(totalLen);
      totalLen = 0;
      for (var j = 0; j < lenArrs; ++j) {
        var cur = arrs[j];
        for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
          result[totalLen] = cur[k];
          totalLen = totalLen + 1 | 0;
        }
      }
      return result;
    }
    function slice(a, offset, len) {
      if (len <= 0) {
        return [];
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var copyLength = hasLen < len ? hasLen : len;
      if (copyLength <= 0) {
        return [];
      }
      var result = new Array(copyLength);
      for (var i = 0; i < copyLength; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function sliceToEnd(a, offset) {
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var len = lena > ofs ? lena - ofs | 0 : 0;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function fill(a, offset, len, v) {
      if (len <= 0) {
        return;
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var fillLength = hasLen < len ? hasLen : len;
      if (fillLength <= 0) {
        return;
      }
      for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
        a[i] = v;
      }
    }
    function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function blit(a1, ofs1, a2, ofs2, len) {
      var lena1 = a1.length;
      var lena2 = a2.length;
      var srcofs1 = ofs1 < 0 ? Caml.int_max(lena1 + ofs1 | 0, 0) : ofs1;
      var srcofs2 = ofs2 < 0 ? Caml.int_max(lena2 + ofs2 | 0, 0) : ofs2;
      var blitLength = Caml.int_min(len, Caml.int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function forEachU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(a[i]);
      }
    }
    function forEach(a, f) {
      forEachU(a, Curry.__1(f));
    }
    function mapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(a[i]);
      }
      return r;
    }
    function map(a, f) {
      return mapU(a, Curry.__1(f));
    }
    function flatMapU(a, f) {
      return concatMany(mapU(a, f));
    }
    function flatMap(a, f) {
      return concatMany(mapU(a, Curry.__1(f)));
    }
    function getByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = Caml_option.some(v);
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getBy(a, p) {
      return getByU(a, Curry.__1(p));
    }
    function getIndexByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = i;
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getIndexBy(a, p) {
      return getIndexByU(a, Curry.__1(p));
    }
    function keepU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keep(a, f) {
      return keepU(a, Curry.__1(f));
    }
    function keepWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v, i)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepWithIndex(a, f) {
      return keepWithIndexU(a, Curry.__2(f));
    }
    function keepMapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        var v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Caml_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepMap(a, f) {
      return keepMapU(a, Curry.__1(f));
    }
    function forEachWithIndexU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(i, a[i]);
      }
    }
    function forEachWithIndex(a, f) {
      forEachWithIndexU(a, Curry.__2(f));
    }
    function mapWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(i, a[i]);
      }
      return r;
    }
    function mapWithIndex(a, f) {
      return mapWithIndexU(a, Curry.__2(f));
    }
    function reduceU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduce(a, x, f) {
      return reduceU(a, x, Curry.__2(f));
    }
    function reduceReverseU(a, x, f) {
      var r = x;
      for (var i = a.length - 1 | 0; i >= 0; --i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse(a, x, f) {
      return reduceReverseU(a, x, Curry.__2(f));
    }
    function reduceReverse2U(a, b, x, f) {
      var r = x;
      var len = Caml.int_min(a.length, b.length);
      for (var i = len - 1 | 0; i >= 0; --i) {
        r = f(r, a[i], b[i]);
      }
      return r;
    }
    function reduceReverse2(a, b, x, f) {
      return reduceReverse2U(a, b, x, Curry.__3(f));
    }
    function reduceWithIndexU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i], i);
      }
      return r;
    }
    function reduceWithIndex(a, x, f) {
      return reduceWithIndexU(a, x, Curry.__3(f));
    }
    function everyU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every(arr, f) {
      return everyU(arr, Curry.__1(f));
    }
    function someU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (b(arr[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some(arr, f) {
      return someU(arr, Curry.__1(f));
    }
    function everyAux2(arr1, arr2, _i, b, len) {
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr1[i], arr2[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every2U(a, b, p) {
      return everyAux2(a, b, 0, p, Caml.int_min(a.length, b.length));
    }
    function every2(a, b, p) {
      return every2U(a, b, Curry.__2(p));
    }
    function some2U(a, b, p) {
      var _i = 0;
      var len = Caml.int_min(a.length, b.length);
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (p(a[i], b[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some2(a, b, p) {
      return some2U(a, b, Curry.__2(p));
    }
    function eqU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena === lenb) {
        return everyAux2(a, b, 0, p, lena);
      } else {
        return false;
      }
    }
    function eq(a, b, p) {
      return eqU(a, b, Curry.__2(p));
    }
    function cmpU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena > lenb) {
        return 1;
      } else if (lena < lenb) {
        return -1;
      } else {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === lena) {
            return 0;
          }
          var c = p(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function cmp(a, b, p) {
      return cmpU(a, b, Curry.__2(p));
    }
    function partitionU(a, f) {
      var l = a.length;
      var i = 0;
      var j = 0;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var ii = 0; ii < l; ++ii) {
        var v = a[ii];
        if (f(v)) {
          a1[i] = v;
          i = i + 1 | 0;
        } else {
          a2[j] = v;
          j = j + 1 | 0;
        }
      }
      a1.length = i;
      a2.length = j;
      return [
        a1,
        a2
      ];
    }
    function partition(a, f) {
      return partitionU(a, Curry.__1(f));
    }
    function unzip(a) {
      var l = a.length;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var i = 0; i < l; ++i) {
        var match = a[i];
        a1[i] = match[0];
        a2[i] = match[1];
      }
      return [
        a1,
        a2
      ];
    }
    function joinWithU(a, sep, toString) {
      var l = a.length;
      if (l === 0) {
        return "";
      }
      var lastIndex = l - 1 | 0;
      var _i = 0;
      var _res = "";
      while (true) {
        var res = _res;
        var i = _i;
        if (i === lastIndex) {
          return res + toString(a[i]);
        }
        _res = res + (toString(a[i]) + sep);
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function joinWith(a, sep, toString) {
      return joinWithU(a, sep, Curry.__1(toString));
    }
    function initU(n, f) {
      var v = new Array(n);
      for (var i = 0; i < n; ++i) {
        v[i] = f(i);
      }
      return v;
    }
    function init(n, f) {
      return initU(n, Curry.__1(f));
    }
    exports2.get = get;
    exports2.getExn = getExn;
    exports2.set = set;
    exports2.setExn = setExn;
    exports2.shuffleInPlace = shuffleInPlace;
    exports2.shuffle = shuffle;
    exports2.reverseInPlace = reverseInPlace;
    exports2.reverse = reverse;
    exports2.make = make;
    exports2.range = range;
    exports2.rangeBy = rangeBy;
    exports2.makeByU = makeByU;
    exports2.makeBy = makeBy;
    exports2.makeByAndShuffleU = makeByAndShuffleU;
    exports2.makeByAndShuffle = makeByAndShuffle;
    exports2.zip = zip;
    exports2.zipByU = zipByU;
    exports2.zipBy = zipBy;
    exports2.unzip = unzip;
    exports2.concat = concat;
    exports2.concatMany = concatMany;
    exports2.slice = slice;
    exports2.sliceToEnd = sliceToEnd;
    exports2.fill = fill;
    exports2.blit = blit;
    exports2.blitUnsafe = blitUnsafe;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.flatMapU = flatMapU;
    exports2.flatMap = flatMap;
    exports2.getByU = getByU;
    exports2.getBy = getBy;
    exports2.getIndexByU = getIndexByU;
    exports2.getIndexBy = getIndexBy;
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.keepWithIndexU = keepWithIndexU;
    exports2.keepWithIndex = keepWithIndex;
    exports2.keepMapU = keepMapU;
    exports2.keepMap = keepMap;
    exports2.forEachWithIndexU = forEachWithIndexU;
    exports2.forEachWithIndex = forEachWithIndex;
    exports2.mapWithIndexU = mapWithIndexU;
    exports2.mapWithIndex = mapWithIndex;
    exports2.partitionU = partitionU;
    exports2.partition = partition;
    exports2.reduceU = reduceU;
    exports2.reduce = reduce;
    exports2.reduceReverseU = reduceReverseU;
    exports2.reduceReverse = reduceReverse;
    exports2.reduceReverse2U = reduceReverse2U;
    exports2.reduceReverse2 = reduceReverse2;
    exports2.reduceWithIndexU = reduceWithIndexU;
    exports2.reduceWithIndex = reduceWithIndex;
    exports2.joinWithU = joinWithU;
    exports2.joinWith = joinWith;
    exports2.someU = someU;
    exports2.some = some;
    exports2.everyU = everyU;
    exports2.every = every;
    exports2.every2U = every2U;
    exports2.every2 = every2;
    exports2.some2U = some2U;
    exports2.some2 = some2;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.initU = initU;
    exports2.init = init;
  }
});

// node_modules/rescript/lib/js/js_promise2.js
var require_js_promise2 = __commonJS({
  "node_modules/rescript/lib/js/js_promise2.js"(exports2) {
    "use strict";
    var then = function(p, cont) {
      return Promise.resolve(p).then(cont);
    };
    var $$catch = function(p, cont) {
      return Promise.resolve(p).catch(cont);
    };
    exports2.then = then;
    exports2.$$catch = $$catch;
  }
});

// src/Send.js
var Fs = require("fs");
var Path = require("path");
var Fetch = require_Fetch();
var Config = require_Config();
var Egress = require_Egress();
var Js_exn = require_js_exn();
var $$Object = require_Object();
var Nodeurl = require("node:url");
var Belt_Array = require_belt_Array();
var Pervasives = require_pervasives();
var Belt_Result = require_belt_Result();
var Js_promise2 = require_js_promise2();
var Caml_js_exceptions = require_caml_js_exceptions();
async function main(param) {
  var path_public = Path.join("public", "outbox");
  var path_static = Path.join("static", "outbox");
  var outbox;
  try {
    outbox = Fs.readFileSync(path_public, "utf8");
  } catch (raw_exn) {
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Js_exn.$$Error) {
      outbox = Fs.readFileSync(path_static, "utf8");
    } else {
      throw exn;
    }
  }
  var match = Belt_Result.getExn($$Object.fromString(outbox));
  var orderedItems = match.orderedItems;
  if (orderedItems !== void 0) {
    var obj = $$Object.StringOption.classify(orderedItems[0]);
    var last_create_note;
    last_create_note = obj.TAG === /* String */
    0 ? Pervasives.failwith("I need the Create Object, not Create id") : obj._0;
    console.log("I will send the last note:", $$Object.toJSON(last_create_note));
    var path = Path.join("static", "followers");
    var followers = Fs.readFileSync(path, "utf8");
    var match$1 = Belt_Result.getExn($$Object.fromString(followers));
    var orderedItems$1 = match$1.orderedItems;
    if (orderedItems$1 !== void 0) {
      var followers$1 = orderedItems$1.map(function(x) {
        var actor = $$Object.StringOption.classify(x);
        if (actor.TAG === /* String */
        0) {
          return actor._0;
        } else {
          return Pervasives.failwith("Followers should be string");
        }
      });
      var inboxes = Belt_Array.concat(Belt_Array.keepMap(await Promise.all(followers$1.map(Fetch.fetchInbox)), function(x) {
        return x;
      }), Config.extraInboxes);
      return await Promise.all(inboxes.map(function(x) {
        console.log("Sending to", x);
        var match2 = new Nodeurl.URL(x);
        return Egress.post(match2.host, match2.pathname, last_create_note);
      }));
    }
    throw {
      RE_EXN_ID: "Match_failure",
      _1: [
        "Send.res",
        21,
        2
      ],
      Error: new Error()
    };
  }
  throw {
    RE_EXN_ID: "Match_failure",
    _1: [
      "Send.res",
      10,
      2
    ],
    Error: new Error()
  };
}
Js_promise2.then(main(void 0), function(res) {
  console.log(res);
  return Promise.resolve(void 0);
});
exports.main = main;
