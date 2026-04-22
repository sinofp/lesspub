"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/@rescript/runtime/lib/js/Primitive_option.js
var require_Primitive_option = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_option.js"(exports2) {
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
    function fromNullable(x) {
      if (x == null) {
        return;
      } else {
        return some(x);
      }
    }
    function fromUndefined(x) {
      if (x === void 0) {
        return;
      } else {
        return some(x);
      }
    }
    function fromNull(x) {
      if (x === null) {
        return;
      } else {
        return some(x);
      }
    }
    function valFromOption(x) {
      if (x === null || x.BS_PRIVATE_NESTED_SOME_NONE === void 0) {
        return x;
      }
      let depth = x.BS_PRIVATE_NESTED_SOME_NONE;
      if (depth === 0) {
        return;
      } else {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
        };
      }
    }
    function toUndefined(x) {
      if (x === void 0) {
        return;
      } else {
        return valFromOption(x);
      }
    }
    function unwrapPolyVar(x) {
      if (x !== void 0) {
        return x.VAL;
      } else {
        return x;
      }
    }
    exports2.fromNullable = fromNullable;
    exports2.fromUndefined = fromUndefined;
    exports2.fromNull = fromNull;
    exports2.valFromOption = valFromOption;
    exports2.some = some;
    exports2.isNested = isNested;
    exports2.toUndefined = toUndefined;
    exports2.unwrapPolyVar = unwrapPolyVar;
  }
});

// node_modules/@rescript/runtime/lib/js/Belt_Option.js
var require_Belt_Option = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Belt_Option.js"(exports2) {
    "use strict";
    var Primitive_option = require_Primitive_option();
    function keep(opt, p) {
      if (opt !== void 0 && p(Primitive_option.valFromOption(opt))) {
        return opt;
      }
    }
    function forEach(opt, f) {
      if (opt !== void 0) {
        return f(Primitive_option.valFromOption(opt));
      }
    }
    function getOrThrow(x) {
      if (x !== void 0) {
        return Primitive_option.valFromOption(x);
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefault(opt, $$default, f) {
      if (opt !== void 0) {
        return f(Primitive_option.valFromOption(opt));
      } else {
        return $$default;
      }
    }
    function map(opt, f) {
      if (opt !== void 0) {
        return Primitive_option.some(f(Primitive_option.valFromOption(opt)));
      }
    }
    function flatMap(opt, f) {
      if (opt !== void 0) {
        return f(Primitive_option.valFromOption(opt));
      }
    }
    function getWithDefault(opt, $$default) {
      if (opt !== void 0) {
        return Primitive_option.valFromOption(opt);
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
    function isSome(x) {
      return x !== void 0;
    }
    function isNone(x) {
      return x === void 0;
    }
    function eq(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Primitive_option.valFromOption(a), Primitive_option.valFromOption(b));
        } else {
          return false;
        }
      } else {
        return b === void 0;
      }
    }
    function cmp(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Primitive_option.valFromOption(a), Primitive_option.valFromOption(b));
        } else {
          return 1;
        }
      } else if (b !== void 0) {
        return -1;
      } else {
        return 0;
      }
    }
    var keepU = keep;
    var forEachU = forEach;
    var getExn = getOrThrow;
    var mapWithDefaultU = mapWithDefault;
    var mapU = map;
    var flatMapU = flatMap;
    var eqU = eq;
    var cmpU = cmp;
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.getExn = getExn;
    exports2.getOrThrow = getOrThrow;
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

// actor.json
var require_actor = __commonJS({
  "actor.json"(exports2, module2) {
    module2.exports = {
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1"
      ],
      id: "https://<YOUR_HOST>/actor",
      type: "Person",
      followers: "https://<YOUR_HOST>/followers",
      preferredUsername: "<YOUR_ACCOUNT_NAME>",
      name: "<YOUR_DISPLAY_NAME>",
      summary: "<YOUR_BIO>",
      discoverable: true,
      published: "<PICK_A_DATE_YOU_LIKE>",
      inbox: "https://<YOUR_HOST>/inbox",
      outbox: "https://<YOUR_HOST>/outbox",
      publicKey: {
        id: "https://<YOUR_HOST>/actor#main-key",
        owner: "https://<YOUR_HOST>/actor",
        publicKeyPem: "<YOUR_PUBLIC_KEY>"
      },
      icon: {
        type: "Image",
        mediaType: "image/jpeg",
        url: "<YOUR_AVATAR_URL>"
      },
      image: {
        type: "Image",
        mediaType: "image/png",
        url: "<YOUR_HEADER_URL>"
      }
    };
  }
});

// src/Config.js
var require_Config = __commonJS({
  "src/Config.js"(exports2) {
    "use strict";
    var Belt_Option2 = require_Belt_Option();
    var ActorJson = require_actor();
    var baseURL = Belt_Option2.getExn(process.env["AP_BASE_URL"]);
    var privateKey = Belt_Option2.getExn(process.env["AP_PRIVATE_KEY"]).replace(/\\n/g, "\n");
    var ghToken = Belt_Option2.getExn(process.env["AP_GH_TOKEN"]);
    var ghBaseURL = Belt_Option2.getExn(process.env["AP_GH_BASE_URL"]);
    var extraInboxes = Belt_Option2.getWithDefault(Belt_Option2.map(process.env["AP_EXTRA_INBOXES"], (s) => s.split(",")), []);
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

// node_modules/@rescript/runtime/lib/js/Primitive_int.js
var require_Primitive_int = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_int.js"(exports2) {
    "use strict";
    function compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function div(x, y) {
      if (y === 0) {
        throw {
          RE_EXN_ID: "Division_by_zero",
          Error: new Error()
        };
      }
      return x / y | 0;
    }
    function mod_(x, y) {
      if (y === 0) {
        throw {
          RE_EXN_ID: "Division_by_zero",
          Error: new Error()
        };
      }
      return x % y;
    }
    exports2.compare = compare;
    exports2.min = min;
    exports2.max = max;
    exports2.div = div;
    exports2.mod_ = mod_;
  }
});

// node_modules/@rescript/runtime/lib/js/Belt_Array.js
var require_Belt_Array = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Belt_Array.js"(exports2) {
    "use strict";
    var Primitive_int = require_Primitive_int();
    var Primitive_option = require_Primitive_option();
    function get(arr, i) {
      if (i >= 0 && i < arr.length) {
        return Primitive_option.some(arr[i]);
      }
    }
    function getOrThrow(arr, i) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "Belt_Array.res",
            29,
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
    function setOrThrow(arr, i, v) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "Belt_Array.res",
            44,
            2
          ],
          Error: new Error()
        };
      }
      arr[i] = v;
    }
    function swapUnsafe(xs, i, j) {
      let tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function shuffleInPlace(xs) {
      let len = xs.length;
      let random_int = (min, max) => Math.floor(Math.random() * (max - min | 0)) + min | 0;
      for (let i = 0; i < len; ++i) {
        swapUnsafe(xs, i, random_int(i, len));
      }
    }
    function shuffle(xs) {
      let result = xs.slice(0);
      shuffleInPlace(result);
      return result;
    }
    function reverseInPlace(xs) {
      let len = xs.length;
      let ofs = 0;
      for (let i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
        swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
      }
    }
    function reverse(xs) {
      let len = xs.length;
      let result = new Array(len);
      for (let i = 0; i < len; ++i) {
        result[i] = xs[(len - 1 | 0) - i | 0];
      }
      return result;
    }
    function make(l, f) {
      if (l <= 0) {
        return [];
      }
      let res = new Array(l);
      for (let i = 0; i < l; ++i) {
        res[i] = f;
      }
      return res;
    }
    function makeBy(l, f) {
      if (l <= 0) {
        return [];
      }
      let res = new Array(l);
      for (let i = 0; i < l; ++i) {
        res[i] = f(i);
      }
      return res;
    }
    function makeByAndShuffle(l, f) {
      let u = makeBy(l, f);
      shuffleInPlace(u);
      return u;
    }
    function range(start, finish) {
      let cut = finish - start | 0;
      if (cut < 0) {
        return [];
      }
      let arr = new Array(cut + 1 | 0);
      for (let i = 0; i <= cut; ++i) {
        arr[i] = start + i | 0;
      }
      return arr;
    }
    function rangeBy(start, finish, step) {
      let cut = finish - start | 0;
      if (cut < 0 || step <= 0) {
        return [];
      }
      let nb = (cut / step | 0) + 1 | 0;
      let arr = new Array(nb);
      let cur = start;
      for (let i = 0; i < nb; ++i) {
        arr[i] = cur;
        cur = cur + step | 0;
      }
      return arr;
    }
    function zip(xs, ys) {
      let lenx = xs.length;
      let leny = ys.length;
      let len = Primitive_int.min(lenx, leny);
      let s = new Array(len);
      for (let i = 0; i < len; ++i) {
        s[i] = [
          xs[i],
          ys[i]
        ];
      }
      return s;
    }
    function zipBy(xs, ys, f) {
      let lenx = xs.length;
      let leny = ys.length;
      let len = Primitive_int.min(lenx, leny);
      let s = new Array(len);
      for (let i = 0; i < len; ++i) {
        s[i] = f(xs[i], ys[i]);
      }
      return s;
    }
    function concat(a1, a2) {
      let l1 = a1.length;
      let l2 = a2.length;
      let a1a2 = new Array(l1 + l2 | 0);
      for (let i = 0; i < l1; ++i) {
        a1a2[i] = a1[i];
      }
      for (let i$1 = 0; i$1 < l2; ++i$1) {
        a1a2[l1 + i$1 | 0] = a2[i$1];
      }
      return a1a2;
    }
    function concatMany(arrs) {
      let lenArrs = arrs.length;
      let totalLen = 0;
      for (let i = 0; i < lenArrs; ++i) {
        totalLen = totalLen + arrs[i].length | 0;
      }
      let result = new Array(totalLen);
      totalLen = 0;
      for (let j = 0; j < lenArrs; ++j) {
        let cur = arrs[j];
        for (let k = 0, k_finish = cur.length; k < k_finish; ++k) {
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
      let lena = a.length;
      let ofs = offset < 0 ? Primitive_int.max(lena + offset | 0, 0) : offset;
      let hasLen = lena - ofs | 0;
      let copyLength = Primitive_int.min(hasLen, len);
      if (copyLength <= 0) {
        return [];
      }
      let result = new Array(copyLength);
      for (let i = 0; i < copyLength; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function sliceToEnd(a, offset) {
      let lena = a.length;
      let ofs = offset < 0 ? Primitive_int.max(lena + offset | 0, 0) : offset;
      let len = lena > ofs ? lena - ofs | 0 : 0;
      let result = new Array(len);
      for (let i = 0; i < len; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function fill(a, offset, len, v) {
      if (len <= 0) {
        return;
      }
      let lena = a.length;
      let ofs = offset < 0 ? Primitive_int.max(lena + offset | 0, 0) : offset;
      let hasLen = lena - ofs | 0;
      let fillLength = Primitive_int.min(hasLen, len);
      if (fillLength <= 0) {
        return;
      }
      for (let i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
        a[i] = v;
      }
    }
    function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
      if (srcofs2 <= srcofs1) {
        for (let j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (let j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function blit(a1, ofs1, a2, ofs2, len) {
      let lena1 = a1.length;
      let lena2 = a2.length;
      let srcofs1 = ofs1 < 0 ? Primitive_int.max(lena1 + ofs1 | 0, 0) : ofs1;
      let srcofs2 = ofs2 < 0 ? Primitive_int.max(lena2 + ofs2 | 0, 0) : ofs2;
      let blitLength = Primitive_int.min(len, Primitive_int.min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
      if (srcofs2 <= srcofs1) {
        for (let j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (let j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function forEach(a, f) {
      for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(a[i]);
      }
    }
    function map(a, f) {
      let l = a.length;
      let r = new Array(l);
      for (let i = 0; i < l; ++i) {
        r[i] = f(a[i]);
      }
      return r;
    }
    function flatMap(a, f) {
      return concatMany(map(a, f));
    }
    function getBy(a, p) {
      let l = a.length;
      let i = 0;
      let r;
      while (r === void 0 && i < l) {
        let v = a[i];
        if (p(v)) {
          r = Primitive_option.some(v);
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getIndexBy(a, p) {
      let l = a.length;
      let i = 0;
      let r;
      while (r === void 0 && i < l) {
        let v = a[i];
        if (p(v)) {
          r = i;
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function keep(a, f) {
      let l = a.length;
      let r = new Array(l);
      let j = 0;
      for (let i = 0; i < l; ++i) {
        let v = a[i];
        if (f(v)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepWithIndex(a, f) {
      let l = a.length;
      let r = new Array(l);
      let j = 0;
      for (let i = 0; i < l; ++i) {
        let v = a[i];
        if (f(v, i)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepMap(a, f) {
      let l = a.length;
      let r = new Array(l);
      let j = 0;
      for (let i = 0; i < l; ++i) {
        let v = a[i];
        let v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Primitive_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function forEachWithIndex(a, f) {
      for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(i, a[i]);
      }
    }
    function mapWithIndex(a, f) {
      let l = a.length;
      let r = new Array(l);
      for (let i = 0; i < l; ++i) {
        r[i] = f(i, a[i]);
      }
      return r;
    }
    function reduce(a, x, f) {
      let r = x;
      for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse(a, x, f) {
      let r = x;
      for (let i = a.length - 1 | 0; i >= 0; --i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse2(a, b, x, f) {
      let r = x;
      let len = Primitive_int.min(a.length, b.length);
      for (let i = len - 1 | 0; i >= 0; --i) {
        r = f(r, a[i], b[i]);
      }
      return r;
    }
    function reduceWithIndex(a, x, f) {
      let r = x;
      for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i], i);
      }
      return r;
    }
    function every(arr, b) {
      let len = arr.length;
      let _i = 0;
      while (true) {
        let i = _i;
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
    function some(arr, b) {
      let len = arr.length;
      let _i = 0;
      while (true) {
        let i = _i;
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
    function everyAux2(arr1, arr2, _i, b, len) {
      while (true) {
        let i = _i;
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
    function every2(a, b, p) {
      return everyAux2(a, b, 0, p, Primitive_int.min(a.length, b.length));
    }
    function some2(a, b, p) {
      let _i = 0;
      let len = Primitive_int.min(a.length, b.length);
      while (true) {
        let i = _i;
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
    function eq(a, b, p) {
      let lena = a.length;
      let lenb = b.length;
      if (lena === lenb) {
        return everyAux2(a, b, 0, p, lena);
      } else {
        return false;
      }
    }
    function cmp(a, b, p) {
      let lena = a.length;
      let lenb = b.length;
      if (lena > lenb) {
        return 1;
      } else if (lena < lenb) {
        return -1;
      } else {
        let _i = 0;
        while (true) {
          let i = _i;
          if (i === lena) {
            return 0;
          }
          let c = p(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function partition(a, f) {
      let l = a.length;
      let i = 0;
      let j = 0;
      let a1 = new Array(l);
      let a2 = new Array(l);
      for (let ii = 0; ii < l; ++ii) {
        let v = a[ii];
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
    function unzip(a) {
      let l = a.length;
      let a1 = new Array(l);
      let a2 = new Array(l);
      for (let i = 0; i < l; ++i) {
        let match = a[i];
        a1[i] = match[0];
        a2[i] = match[1];
      }
      return [
        a1,
        a2
      ];
    }
    function joinWith(a, sep, toString) {
      let l = a.length;
      if (l === 0) {
        return "";
      }
      let lastIndex = l - 1 | 0;
      let _i = 0;
      let _res = "";
      while (true) {
        let res = _res;
        let i = _i;
        if (i === lastIndex) {
          return res + toString(a[i]);
        }
        _res = res + (toString(a[i]) + sep);
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function init(n, f) {
      let v = new Array(n);
      for (let i = 0; i < n; ++i) {
        v[i] = f(i);
      }
      return v;
    }
    var getExn = getOrThrow;
    var setExn = setOrThrow;
    var makeByU = makeBy;
    var makeByAndShuffleU = makeByAndShuffle;
    var zipByU = zipBy;
    var forEachU = forEach;
    var mapU = map;
    var flatMapU = flatMap;
    var getByU = getBy;
    var getIndexByU = getIndexBy;
    var keepU = keep;
    var keepWithIndexU = keepWithIndex;
    var keepMapU = keepMap;
    var forEachWithIndexU = forEachWithIndex;
    var mapWithIndexU = mapWithIndex;
    var partitionU = partition;
    var reduceU = reduce;
    var reduceReverseU = reduceReverse;
    var reduceReverse2U = reduceReverse2;
    var reduceWithIndexU = reduceWithIndex;
    var joinWithU = joinWith;
    var someU = some;
    var everyU = every;
    var every2U = every2;
    var some2U = some2;
    var cmpU = cmp;
    var eqU = eq;
    var initU = init;
    exports2.get = get;
    exports2.getExn = getExn;
    exports2.getOrThrow = getOrThrow;
    exports2.set = set;
    exports2.setExn = setExn;
    exports2.setOrThrow = setOrThrow;
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

// node_modules/@rescript/runtime/lib/js/Primitive_exceptions.js
var require_Primitive_exceptions = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_exceptions.js"(exports2) {
    "use strict";
    function isExtension(e) {
      if (e == null) {
        return false;
      } else {
        return typeof e.RE_EXN_ID === "string";
      }
    }
    function internalToException(e) {
      if (isExtension(e)) {
        return e;
      } else {
        return {
          RE_EXN_ID: "JsExn",
          _1: e
        };
      }
    }
    var idMap = {};
    function create(str) {
      let v = idMap[str];
      if (v !== void 0) {
        let id = v + 1 | 0;
        idMap[str] = id;
        return str + ("/" + id);
      }
      idMap[str] = 1;
      return str;
    }
    var $$Error = "JsExn";
    exports2.$$Error = $$Error;
    exports2.create = create;
    exports2.internalToException = internalToException;
  }
});

// node_modules/@rescript/runtime/lib/js/Pervasives.js
var require_Pervasives = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Pervasives.js"(exports2) {
    "use strict";
    var Primitive_exceptions2 = require_Primitive_exceptions();
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
    var Exit = /* @__PURE__ */ Primitive_exceptions2.create("Pervasives.Exit");
    function abs(x) {
      if (x >= 0) {
        return x;
      } else {
        return -x | 0;
      }
    }
    var min_int = -2147483648;
    function classify_float(x) {
      if (isFinite(x)) {
        if (Math.abs(x) >= 22250738585072014e-324) {
          return "FP_normal";
        } else if (x !== 0) {
          return "FP_subnormal";
        } else {
          return "FP_zero";
        }
      } else if (isNaN(x)) {
        return "FP_nan";
      } else {
        return "FP_infinite";
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
      let n = Number.parseInt(s);
      if (n === NaN) {
        return;
      } else {
        return n;
      }
    }
    function $at(l1, l2) {
      if (l1 !== 0) {
        return {
          hd: l1.hd,
          tl: $at(l1.tl, l2)
        };
      } else {
        return l2;
      }
    }
    var max_int = 2147483647;
    var infinity = Infinity;
    var neg_infinity = -Infinity;
    var max_float = 17976931348623157e292;
    var min_float = 22250738585072014e-324;
    var epsilon_float = 2220446049250313e-31;
    exports2.failwith = failwith;
    exports2.invalid_arg = invalid_arg;
    exports2.Exit = Exit;
    exports2.abs = abs;
    exports2.max_int = max_int;
    exports2.min_int = min_int;
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
    exports2.$at = $at;
  }
});

// node_modules/@rescript/runtime/lib/js/Belt_Result.js
var require_Belt_Result = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Belt_Result.js"(exports2) {
    "use strict";
    function getOrThrow(x) {
      if (x.TAG === "Ok") {
        return x._0;
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefault(opt, $$default, f) {
      if (opt.TAG === "Ok") {
        return f(opt._0);
      } else {
        return $$default;
      }
    }
    function map(opt, f) {
      if (opt.TAG === "Ok") {
        return {
          TAG: "Ok",
          _0: f(opt._0)
        };
      } else {
        return {
          TAG: "Error",
          _0: opt._0
        };
      }
    }
    function flatMap(opt, f) {
      if (opt.TAG === "Ok") {
        return f(opt._0);
      } else {
        return {
          TAG: "Error",
          _0: opt._0
        };
      }
    }
    function getWithDefault(opt, $$default) {
      if (opt.TAG === "Ok") {
        return opt._0;
      } else {
        return $$default;
      }
    }
    function isOk(x) {
      return x.TAG === "Ok";
    }
    function isError(x) {
      return x.TAG !== "Ok";
    }
    function eq(a, b, f) {
      if (a.TAG === "Ok") {
        if (b.TAG === "Ok") {
          return f(a._0, b._0);
        } else {
          return false;
        }
      } else {
        return b.TAG !== "Ok";
      }
    }
    function cmp(a, b, f) {
      if (a.TAG === "Ok") {
        if (b.TAG === "Ok") {
          return f(a._0, b._0);
        } else {
          return 1;
        }
      } else if (b.TAG === "Ok") {
        return -1;
      } else {
        return 0;
      }
    }
    var getExn = getOrThrow;
    var mapWithDefaultU = mapWithDefault;
    var mapU = map;
    var flatMapU = flatMap;
    var eqU = eq;
    var cmpU = cmp;
    exports2.getExn = getExn;
    exports2.getOrThrow = getOrThrow;
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

// node_modules/@rescript/runtime/lib/js/Stdlib_JSON.js
var require_Stdlib_JSON = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Stdlib_JSON.js"(exports2) {
    "use strict";
    function classify(value) {
      let match = Object.prototype.toString.call(value);
      switch (match) {
        case "[object Array]":
          return {
            TAG: "Array",
            _0: value
          };
        case "[object Boolean]":
          return {
            TAG: "Bool",
            _0: value
          };
        case "[object Null]":
          return "Null";
        case "[object Number]":
          return {
            TAG: "Number",
            _0: value
          };
        case "[object String]":
          return {
            TAG: "String",
            _0: value
          };
        default:
          return {
            TAG: "Object",
            _0: value
          };
      }
    }
    var Classify = {
      classify
    };
    var Encode = {};
    function bool(json) {
      if (typeof json === "boolean") {
        return json;
      }
    }
    function $$null(json) {
      if (json === null) {
        return null;
      }
    }
    function string(json) {
      if (typeof json === "string") {
        return json;
      }
    }
    function float(json) {
      if (typeof json === "number") {
        return json;
      }
    }
    function object(json) {
      if (typeof json === "object" && json !== null && !Array.isArray(json)) {
        return json;
      }
    }
    function array(json) {
      if (Array.isArray(json)) {
        return json;
      }
    }
    var Decode = {
      bool,
      $$null,
      string,
      float,
      object,
      array
    };
    exports2.Classify = Classify;
    exports2.Encode = Encode;
    exports2.Decode = Decode;
  }
});

// node_modules/@rescript/runtime/lib/js/Stdlib_Type.js
var require_Stdlib_Type = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Stdlib_Type.js"(exports2) {
    "use strict";
    function classify(value) {
      let match = Object.prototype.toString.call(value);
      switch (match) {
        case "[object BigInt]":
          return {
            TAG: "BigInt",
            _0: value
          };
        case "[object Boolean]":
          return {
            TAG: "Bool",
            _0: value
          };
        case "[object AsyncFunction]":
        case "[object Function]":
        case "[object GeneratorFunction]":
          return {
            TAG: "Function",
            _0: value
          };
        case "[object Null]":
          return "Null";
        case "[object Number]":
          return {
            TAG: "Number",
            _0: value
          };
        case "[object String]":
          return {
            TAG: "String",
            _0: value
          };
        case "[object Symbol]":
          return {
            TAG: "Symbol",
            _0: value
          };
        case "[object Undefined]":
          return "Undefined";
        default:
          return {
            TAG: "Object",
            _0: value
          };
      }
    }
    var Classify = {
      classify
    };
    exports2.Classify = Classify;
  }
});

// src/APObject.js
var require_APObject = __commonJS({
  "src/APObject.js"(exports2) {
    "use strict";
    var Belt_Array2 = require_Belt_Array();
    var Pervasives2 = require_Pervasives();
    var Belt_Option2 = require_Belt_Option();
    var Belt_Result2 = require_Belt_Result();
    var Stdlib_JSON = require_Stdlib_JSON();
    var Stdlib_Type = require_Stdlib_Type();
    var Primitive_option = require_Primitive_option();
    function classify(t) {
      let string = Stdlib_Type.Classify.classify(t);
      if (typeof string !== "object") {
        return Pervasives2.failwith("Unreachable code");
      }
      switch (string.TAG) {
        case "String":
          return {
            TAG: "String",
            _0: string._0
          };
        case "Object":
          return {
            TAG: "Wrap",
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
      let id = classify(ooi);
      if (id.TAG === "String") {
        return id._0;
      } else {
        return id._0.id;
      }
    }
    function toJSON(o) {
      let match = o["@context"];
      if (match !== void 0) {
      } else {
        o["@context"] = "https://www.w3.org/ns/activitystreams";
      }
      return o;
    }
    function isJSONString(json) {
      return Belt_Option2.isSome(Stdlib_JSON.Decode.string(json));
    }
    function validateJSON(json) {
      let dict = Stdlib_JSON.Decode.object(json);
      if (dict === void 0) {
        return false;
      }
      let id = Belt_Option2.map(dict["id"], isJSONString);
      let type_ = Belt_Option2.map(dict["type"], isJSONString);
      let obj = Belt_Option2.map(dict["object"], (x) => {
        if (Belt_Option2.isSome(Stdlib_JSON.Decode.string(x))) {
          return true;
        } else {
          return validateJSON(x);
        }
      });
      let orderedItems = Belt_Option2.map(Belt_Option2.flatMap(dict["orderedItems"], Stdlib_JSON.Decode.array), (items) => Belt_Array2.every(items, (x) => {
        if (Belt_Option2.isSome(Stdlib_JSON.Decode.string(x))) {
          return true;
        } else {
          return validateJSON(x);
        }
      }));
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
      if (orderedItems !== void 0) {
        return orderedItems;
      } else {
        return true;
      }
    }
    function fromString(s) {
      let tmp;
      try {
        tmp = {
          TAG: "Ok",
          _0: JSON.parse(s)
        };
      } catch (exn) {
        tmp = {
          TAG: "Error",
          _0: "Error parsing JSON string"
        };
      }
      return Belt_Result2.flatMap(tmp, (x) => {
        if (validateJSON(x)) {
          return {
            TAG: "Ok",
            _0: x
          };
        } else {
          return {
            TAG: "Error",
            _0: "JSON is not valid"
          };
        }
      });
    }
    function resultToOption(r) {
      return Belt_Result2.mapWithDefault(r, void 0, (x) => Primitive_option.some(x));
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

// node_modules/@rescript/runtime/lib/js/Primitive_bool.js
var require_Primitive_bool = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_bool.js"(exports2) {
    "use strict";
    function compare(x, y) {
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
    function min(x, y) {
      if (x) {
        return y;
      } else {
        return x;
      }
    }
    function max(x, y) {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    exports2.compare = compare;
    exports2.min = min;
    exports2.max = max;
  }
});

// node_modules/@rescript/runtime/lib/js/Primitive_float.js
var require_Primitive_float = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_float.js"(exports2) {
    "use strict";
    function compare(x, y) {
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
    function min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    exports2.compare = compare;
    exports2.min = min;
    exports2.max = max;
  }
});

// node_modules/@rescript/runtime/lib/js/Primitive_string.js
var require_Primitive_string = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_string.js"(exports2) {
    "use strict";
    function compare(s1, s2) {
      if (s1 === s2) {
        return 0;
      } else if (s1 < s2) {
        return -1;
      } else {
        return 1;
      }
    }
    function min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function getChar(s, i) {
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
      return String.fromCodePoint(ch).repeat(n);
    }
    exports2.compare = compare;
    exports2.min = min;
    exports2.max = max;
    exports2.getChar = getChar;
    exports2.make = make;
  }
});

// node_modules/@rescript/runtime/lib/js/Primitive_object.js
var require_Primitive_object = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Primitive_object.js"(exports2) {
    "use strict";
    var Primitive_bool = require_Primitive_bool();
    var Primitive_float = require_Primitive_float();
    var Primitive_string = require_Primitive_string();
    var for_in = function(o, foo) {
      for (var x in o) {
        foo(x);
      }
    };
    function updateDummy(prim0, prim1) {
      Object.assign(prim0, prim1);
    }
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      let a_type = typeof a;
      let b_type = typeof b;
      switch (a_type) {
        case "bigint":
          if (b_type === "bigint") {
            return Primitive_float.compare(a, b);
          }
          break;
        case "boolean":
          if (b_type === "boolean") {
            return Primitive_bool.compare(a, b);
          }
          break;
        case "function":
          if (b_type === "function") {
            throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "compare: functional value",
              Error: new Error()
            };
          }
          break;
        case "number":
          if (b_type === "number") {
            return Primitive_float.compare(a, b);
          }
          break;
        case "string":
          if (b_type === "string") {
            return Primitive_string.compare(a, b);
          } else {
            return 1;
          }
        case "undefined":
          return -1;
      }
      switch (b_type) {
        case "string":
          return -1;
        case "undefined":
          return 1;
        default:
          if (a_type === "boolean") {
            return 1;
          }
          if (b_type === "boolean") {
            return -1;
          }
          if (a_type === "function") {
            return 1;
          }
          if (b_type === "function") {
            return -1;
          }
          if (a_type === "number") {
            if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return 1;
            } else {
              return -1;
            }
          }
          if (b_type === "number") {
            if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return -1;
            } else {
              return 1;
            }
          }
          if (a === null) {
            if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return 1;
            } else {
              return -1;
            }
          }
          if (b === null) {
            if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return -1;
            } else {
              return 1;
            }
          }
          if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
            if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return aux_obj_compare(a, b);
            } else {
              return -1;
            }
          }
          let tag_a = a.TAG;
          let tag_b = b.TAG;
          if (tag_a !== tag_b) {
            if (tag_a < tag_b) {
              return -1;
            } else {
              return 1;
            }
          }
          let len_a = a.length | 0;
          let len_b = b.length | 0;
          if (len_a === len_b) {
            if (Array.isArray(a)) {
              let _i = 0;
              while (true) {
                let i = _i;
                if (i === len_a) {
                  return 0;
                }
                let res = compare(a[i], b[i]);
                if (res !== 0) {
                  return res;
                }
                _i = i + 1 | 0;
                continue;
              }
              ;
            } else if (a instanceof Date && b instanceof Date) {
              return a - b;
            } else {
              return aux_obj_compare(a, b);
            }
          } else if (len_a < len_b) {
            let _i$1 = 0;
            while (true) {
              let i$1 = _i$1;
              if (i$1 === len_a) {
                return -1;
              }
              let res$1 = compare(a[i$1], b[i$1]);
              if (res$1 !== 0) {
                return res$1;
              }
              _i$1 = i$1 + 1 | 0;
              continue;
            }
            ;
          } else {
            let _i$2 = 0;
            while (true) {
              let i$2 = _i$2;
              if (i$2 === len_b) {
                return 1;
              }
              let res$2 = compare(a[i$2], b[i$2]);
              if (res$2 !== 0) {
                return res$2;
              }
              _i$2 = i$2 + 1 | 0;
              continue;
            }
            ;
          }
      }
    }
    function aux_obj_compare(a, b) {
      let min_key_lhs = {
        contents: void 0
      };
      let min_key_rhs = {
        contents: void 0
      };
      let do_key = (param, key) => {
        let min_key = param[2];
        let b2 = param[1];
        if (!(!Object.prototype.hasOwnProperty.call(b2, key) || compare(param[0][key], b2[key]) > 0)) {
          return;
        }
        let mk = min_key.contents;
        if (mk !== void 0 && key >= mk) {
          return;
        } else {
          min_key.contents = key;
          return;
        }
      };
      let do_key_a = (key) => do_key([
        a,
        b,
        min_key_rhs
      ], key);
      let do_key_b = (key) => do_key([
        b,
        a,
        min_key_lhs
      ], key);
      for_in(a, do_key_a);
      for_in(b, do_key_b);
      let match = min_key_lhs.contents;
      let match$1 = min_key_rhs.contents;
      if (match !== void 0) {
        if (match$1 !== void 0) {
          return Primitive_string.compare(match, match$1);
        } else {
          return -1;
        }
      } else if (match$1 !== void 0) {
        return 1;
      } else {
        return 0;
      }
    }
    function equal(a, b) {
      if (a === b) {
        return true;
      }
      let a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "bigint" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      }
      let b_type = typeof b;
      if (a_type === "function" || b_type === "function") {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: functional value",
          Error: new Error()
        };
      }
      if (b_type === "number" || b_type === "bigint" || b_type === "undefined" || b === null) {
        return false;
      }
      let tag_a = a.TAG;
      let tag_b = b.TAG;
      if (tag_a !== tag_b) {
        return false;
      }
      let len_a = a.length | 0;
      let len_b = b.length | 0;
      if (len_a === len_b) {
        if (Array.isArray(a)) {
          let _i = 0;
          while (true) {
            let i = _i;
            if (i === len_a) {
              return true;
            }
            if (!equal(a[i], b[i])) {
              return false;
            }
            _i = i + 1 | 0;
            continue;
          }
          ;
        } else if (a instanceof Date && b instanceof Date) {
          return !(a > b || a < b);
        } else {
          let result = {
            contents: true
          };
          let do_key_a = (key) => {
            if (!Object.prototype.hasOwnProperty.call(b, key)) {
              result.contents = false;
              return;
            }
          };
          let do_key_b = (key) => {
            if (!Object.prototype.hasOwnProperty.call(a, key) || !equal(b[key], a[key])) {
              result.contents = false;
              return;
            }
          };
          for_in(a, do_key_a);
          if (result.contents) {
            for_in(b, do_key_b);
          }
          return result.contents;
        }
      } else {
        return false;
      }
    }
    function notequal(a, b) {
      if ((typeof a === "number" || typeof a === "bigint") && (typeof b === "number" || typeof b === "bigint")) {
        return a !== b;
      } else {
        return !equal(a, b);
      }
    }
    function greaterequal(a, b) {
      if ((typeof a === "number" || typeof a === "bigint") && (typeof b === "number" || typeof b === "bigint")) {
        return a >= b;
      } else {
        return compare(a, b) >= 0;
      }
    }
    function greaterthan(a, b) {
      if ((typeof a === "number" || typeof a === "bigint") && (typeof b === "number" || typeof b === "bigint")) {
        return a > b;
      } else {
        return compare(a, b) > 0;
      }
    }
    function lessequal(a, b) {
      if ((typeof a === "number" || typeof a === "bigint") && (typeof b === "number" || typeof b === "bigint")) {
        return a <= b;
      } else {
        return compare(a, b) <= 0;
      }
    }
    function lessthan(a, b) {
      if ((typeof a === "number" || typeof a === "bigint") && (typeof b === "number" || typeof b === "bigint")) {
        return a < b;
      } else {
        return compare(a, b) < 0;
      }
    }
    function min(x, y) {
      if (compare(x, y) <= 0) {
        return x;
      } else {
        return y;
      }
    }
    function max(x, y) {
      if (compare(x, y) >= 0) {
        return x;
      } else {
        return y;
      }
    }
    exports2.updateDummy = updateDummy;
    exports2.compare = compare;
    exports2.equal = equal;
    exports2.notequal = notequal;
    exports2.greaterequal = greaterequal;
    exports2.greaterthan = greaterthan;
    exports2.lessthan = lessthan;
    exports2.lessequal = lessequal;
    exports2.min = min;
    exports2.max = max;
  }
});

// src/Fetch.js
var require_Fetch = __commonJS({
  "src/Fetch.js"(exports2) {
    "use strict";
    var Config2 = require_Config();
    var APObject2 = require_APObject();
    var Belt_Array2 = require_Belt_Array();
    var Belt_Option2 = require_Belt_Option();
    var Stdlib_JSON = require_Stdlib_JSON();
    var Primitive_object = require_Primitive_object();
    var Primitive_option = require_Primitive_option();
    var Primitive_exceptions2 = require_Primitive_exceptions();
    var headers = {
      accept: "application/activity+json"
    };
    async function fetchKey(keyId) {
      let res = await fetch(keyId, {
        headers
      });
      try {
        return Belt_Option2.flatMap(Belt_Option2.flatMap(Belt_Option2.flatMap((await res.json())["publicKey"], Stdlib_JSON.Decode.object), (x) => x["publicKeyPem"]), Stdlib_JSON.Decode.string);
      } catch (raw_exn) {
        let exn = Primitive_exceptions2.internalToException(raw_exn);
        if (exn.RE_EXN_ID === "JsExn") {
          return;
        }
        throw exn;
      }
    }
    async function fetchInbox(actor) {
      let res = await fetch(actor, {
        headers
      });
      try {
        return Belt_Option2.flatMap((await res.json())["inbox"], Stdlib_JSON.Decode.string);
      } catch (raw_exn) {
        let exn = Primitive_exceptions2.internalToException(raw_exn);
        if (exn.RE_EXN_ID === "JsExn") {
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
      let res = await fetch(Config2.ghBaseURL + path, {
        headers: headers$1
      });
      if (!res.ok) {
        return [
          void 0,
          void 0
        ];
      }
      let dict = await res.json();
      let content = Belt_Option2.map(Belt_Option2.flatMap(dict["content"], Stdlib_JSON.Decode.string), btoa);
      let sha = Belt_Option2.flatMap(dict["sha"], Stdlib_JSON.Decode.string);
      return [
        content,
        sha
      ];
    }
    async function insertToFile(ooi, path) {
      let match = await get(path);
      let collection = Belt_Option2.getWithDefault(Belt_Option2.flatMap(match[0], (x) => APObject2.resultToOption(APObject2.fromString(x))), {
        id: Config2.baseURL + path,
        type: "OrderedCollection",
        totalItems: 0,
        orderedItems: []
      });
      let totalItems = Belt_Option2.getWithDefault(collection.totalItems, 0);
      let orderedItems = Belt_Option2.getWithDefault(collection.orderedItems, []);
      if (Belt_Array2.some(orderedItems, (x) => Primitive_object.equal(x, ooi))) {
        return true;
      } else {
        collection.totalItems = 1 + totalItems | 0;
        collection.orderedItems = Belt_Array2.concat([ooi], orderedItems);
        return await put(JSON.stringify(APObject2.toJSON(collection)), path, match[1]);
      }
    }
    async function removeFromFile(ooi, path) {
      let match = await get(path);
      let sha = match[1];
      let collection = Belt_Option2.flatMap(match[0], (x) => APObject2.resultToOption(APObject2.fromString(x)));
      if (collection === void 0) {
        return true;
      }
      let collection$1 = Primitive_option.valFromOption(collection);
      let totalItems = Belt_Option2.getWithDefault(collection$1.totalItems, 0);
      let orderedItems = Belt_Option2.getWithDefault(collection$1.orderedItems, []);
      let id = APObject2.getId(ooi);
      console.log(totalItems, sha, id);
      let match$1 = Belt_Array2.getIndexBy(orderedItems, (x) => id === APObject2.getId(x));
      if (match$1 !== void 0) {
        if (totalItems !== 1) {
          collection$1.totalItems = totalItems - 1 | 0;
          collection$1.orderedItems = Belt_Array2.keepWithIndex(orderedItems, (param, j) => j !== match$1);
          return await put(JSON.stringify(APObject2.toJSON(collection$1)), path, sha);
        } else {
          return await $$delete(path, Belt_Option2.getExn(sha));
        }
      } else {
        return true;
      }
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
    var Belt_Array2 = require_Belt_Array();
    var Belt_Option2 = require_Belt_Option();
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
    function verifyDigest(event) {
      return Belt_Option2.mapWithDefault(event.headers["digest"], false, (x) => x === "SHA-256=" + get(Belt_Option2.getWithDefault(event.body, "")));
    }
    async function verifySignature(event, keyId, headers, signature) {
      return Belt_Option2.mapWithDefault(await Fetch2.fetchKey(keyId), false, (publicKey) => {
        let to_be_signed = Belt_Array2.map(headers, (h) => {
          let match = event.headers[h];
          if (h === "(request-target)") {
            return `(request-target): ` + event.httpMethod.toLowerCase() + ` ` + event.path;
          } else if (match !== void 0) {
            return h + ": " + match;
          } else {
            return h + ": ";
          }
        }).join("\n");
        return verify(to_be_signed, publicKey, signature);
      });
    }
    function parse(headers) {
      return Belt_Option2.map(headers["signature"], (s) => {
        let dict = Object.fromEntries(Belt_Array2.map(s.split(","), (x) => {
          let i = x.indexOf("=");
          return [
            x.slice(0, i),
            x.slice(i + 2 | 0, x.length - 1 | 0)
          ];
        }));
        let keyId = dict["keyId"];
        let signature = dict["signature"];
        let algorithm = dict["algorithm"];
        let headers2 = Belt_Option2.map(dict["headers"], (s2) => s2.split(" "));
        return [
          keyId,
          signature,
          algorithm,
          headers2
        ];
      });
    }
    async function verify$1(event) {
      let match = parse(event.headers);
      if (match === void 0) {
        return false;
      }
      let keyId = match[0];
      if (keyId === void 0) {
        return false;
      }
      let signature = match[1];
      if (signature === void 0) {
        return false;
      }
      if (match[2] === void 0) {
        return false;
      }
      let headers = match[3];
      if (headers !== void 0 && verifyDigest(event)) {
        return await verifySignature(event, keyId, headers, signature);
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
    var APObject2 = require_APObject();
    var Security = require_Security();
    function post(host, path, activity) {
      let body = JSON.stringify(APObject2.toJSON(activity));
      let date = (/* @__PURE__ */ new Date()).toUTCString();
      let digest = "SHA-256=" + Security.Hash.get(body);
      let to_be_signed = `(request-target): post ` + path + `
host: ` + host + `
date: ` + date + `
digest: ` + digest;
      let signature = Security.sign(to_be_signed);
      let fetch_options = {
        method: "POST",
        body,
        headers: {
          "content-type": "application/activity+json",
          host,
          date,
          digest,
          signature: `keyId="` + Config2.keyId + `",algorithm="rsa-sha256",headers="(request-target) host date digest",signature="` + signature + `"`
        }
      };
      console.log("I will send:", fetch_options);
      return fetch(`https://` + host + path, fetch_options);
    }
    exports2.post = post;
  }
});

// node_modules/@rescript/runtime/lib/js/Stdlib_Promise.js
var require_Stdlib_Promise = __commonJS({
  "node_modules/@rescript/runtime/lib/js/Stdlib_Promise.js"(exports2) {
    "use strict";
    var Primitive_exceptions2 = require_Primitive_exceptions();
    function $$catch(promise, callback) {
      return promise.catch((err) => callback(Primitive_exceptions2.internalToException(err)));
    }
    exports2.$$catch = $$catch;
  }
});

// src/Send.js
var Fetch = require_Fetch();
var Config = require_Config();
var Egress = require_Egress();
var Nodefs = require("node:fs");
var APObject = require_APObject();
var Nodeurl = require("node:url");
var Nodepath = require("node:path");
var Belt_Array = require_Belt_Array();
var Pervasives = require_Pervasives();
var Belt_Option = require_Belt_Option();
var Belt_Result = require_Belt_Result();
var Stdlib_Promise = require_Stdlib_Promise();
var Primitive_exceptions = require_Primitive_exceptions();
async function main() {
  let path_public = Nodepath.join("public", "outbox");
  let path_static = Nodepath.join("static", "outbox");
  let outbox;
  try {
    outbox = Nodefs.readFileSync(path_public, "utf8");
  } catch (raw_exn) {
    let exn = Primitive_exceptions.internalToException(raw_exn);
    if (exn.RE_EXN_ID === "JsExn") {
      outbox = Nodefs.readFileSync(path_static, "utf8");
    } else {
      throw exn;
    }
  }
  let orderedItems = Belt_Option.getWithDefault(Belt_Result.getExn(APObject.fromString(outbox)).orderedItems, []);
  let obj = APObject.StringOption.classify(orderedItems[0]);
  let last_create_note;
  last_create_note = obj.TAG === "String" ? Pervasives.failwith("I need the Create Object, not Create id") : obj._0;
  console.log("I will send the last note:", APObject.toJSON(last_create_note));
  let path = Nodepath.join("static", "followers");
  let followers = Nodefs.readFileSync(path, "utf8");
  let orderedItems$1 = Belt_Option.getWithDefault(Belt_Result.getExn(APObject.fromString(followers)).orderedItems, []);
  let followers$1 = Belt_Array.map(orderedItems$1, (x) => {
    let actor = APObject.StringOption.classify(x);
    if (actor.TAG === "String") {
      return actor._0;
    } else {
      return Pervasives.failwith("Followers should be string");
    }
  });
  let inboxes = Belt_Array.concat(Belt_Array.keepMap(await Promise.all(Belt_Array.map(followers$1, (actor) => Stdlib_Promise.$$catch(Fetch.fetchInbox(actor), (e) => {
    console.log("Failed to fetch inbox for:", actor);
    console.log("Error:", e);
    return Promise.resolve(void 0);
  }))), (x) => x), Config.extraInboxes);
  return await Promise.all(Belt_Array.map(inboxes, (x) => {
    console.log("Sending to", x);
    let match = new Nodeurl.URL(x);
    return Egress.post(match.host, match.pathname, last_create_note);
  }));
}
main().then((res) => {
  console.log(res);
  return Promise.resolve();
});
exports.main = main;
