/*
 * Konva JavaScript Framework v1.6.5
 * http://konvajs.github.io/
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Fri Jul 28 2017
 *
 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
 * Modified work Copyright (C) 2014 - 2017 by Anton Lavrenov (Konva)
 *
 * @license
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
! function(t) { "use strict"; var e = Math.PI / 180,
        n = { version: "1.6.5", stages: [], idCounter: 0, ids: {}, names: {}, shapes: {}, listenClickTap: !1, inDblClickWindow: !1, enableTrace: !1, traceArrMax: 100, dblClickWindow: 400, pixelRatio: void 0, dragDistance: 0, angleDeg: !0, showWarnings: !0, Filters: {}, isDragging: function() { var t = n.DD; return !!t && t.isDragging }, isDragReady: function() { var t = n.DD; return !!t && !!t.node }, _addId: function(t, e) { void 0 !== e && (this.ids[e] = t) }, _removeId: function(t) { void 0 !== t && delete this.ids[t] }, _addName: function(t, e) { e && (this.names[e] || (this.names[e] = []), this.names[e].push(t)) }, _removeName: function(t, e) { if (t) { var n = this.names[t]; if (n) { for (var i = 0; i < n.length; i++) { n[i]._id === e && n.splice(i, 1) }
                        0 === n.length && delete this.names[t] } } }, getAngle: function(t) { return this.angleDeg ? t * e : t }, _detectIE: function(t) { var e = t.indexOf("msie "); if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10); if (t.indexOf("trident/") > 0) { var n = t.indexOf("rv:"); return parseInt(t.substring(n + 3, t.indexOf(".", n)), 10) } var i = t.indexOf("edge/"); return i > 0 && parseInt(t.substring(i + 5, t.indexOf(".", i)), 10) }, _parseUA: function(t) { var e = t.toLowerCase(),
                    i = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                    a = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
                    r = !!t.match(/IEMobile/i); return { browser: i[1] || "", version: i[2] || "0", isIE: n._detectIE(e), mobile: a, ieMobile: r } }, UA: void 0 },
        i = void 0 !== t ? t : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {}; if (n.UA = n._parseUA(i.navigator && i.navigator.userAgent || ""), i.Konva && console.error("Konva instance is already exist in current eviroment. Please use only one instance."), i.Konva = n, n.global = i, "object" == typeof exports) { if (i.window && i.window.document) n.document = i.window.document, n.window = i.window;
        else { var a = require("canvas"),
                r = require("jsdom").jsdom;
            n.window = r("<!DOCTYPE html><html><head></head><body></body></html>").defaultView, n.document = n.window.document, n.window.Image = a.Image, n._nodeCanvas = a } return void(module.exports = n) } "function" == typeof define && define.amd && define(function() { return n }), n.document = document, n.window = window }("undefined" != typeof global ? global : window),
function() { "use strict";
    Konva.Collection = function() { var t = [].slice.call(arguments),
            e = t.length,
            n = 0; for (this.length = e; n < e; n++) this[n] = t[n]; return this }, Konva.Collection.prototype = [], Konva.Collection.prototype.each = function(t) { for (var e = 0; e < this.length; e++) t(this[e], e) }, Konva.Collection.prototype.toArray = function() { var t, e = [],
            n = this.length; for (t = 0; t < n; t++) e.push(this[t]); return e }, Konva.Collection.toCollection = function(t) { var e, n = new Konva.Collection,
            i = t.length; for (e = 0; e < i; e++) n.push(t[e]); return n }, Konva.Collection._mapMethod = function(t) { Konva.Collection.prototype[t] = function() { var e, n = this.length,
                i = [].slice.call(arguments); for (e = 0; e < n; e++) this[e][t].apply(this[e], i); return this } }, Konva.Collection.mapMethods = function(t) { var e = t.prototype; for (var n in e) Konva.Collection._mapMethod(n) }, Konva.Transform = function(t) { this.m = t && t.slice() || [1, 0, 0, 1, 0, 0] }, Konva.Transform.prototype = { copy: function() { return new Konva.Transform(this.m) }, point: function(t) { var e = this.m; return { x: e[0] * t.x + e[2] * t.y + e[4], y: e[1] * t.x + e[3] * t.y + e[5] } }, translate: function(t, e) { return this.m[4] += this.m[0] * t + this.m[2] * e, this.m[5] += this.m[1] * t + this.m[3] * e, this }, scale: function(t, e) { return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this }, rotate: function(t) { var e = Math.cos(t),
                n = Math.sin(t),
                i = this.m[0] * e + this.m[2] * n,
                a = this.m[1] * e + this.m[3] * n,
                r = this.m[0] * -n + this.m[2] * e,
                o = this.m[1] * -n + this.m[3] * e; return this.m[0] = i, this.m[1] = a, this.m[2] = r, this.m[3] = o, this }, getTranslation: function() { return { x: this.m[4], y: this.m[5] } }, skew: function(t, e) { var n = this.m[0] + this.m[2] * e,
                i = this.m[1] + this.m[3] * e,
                a = this.m[2] + this.m[0] * t,
                r = this.m[3] + this.m[1] * t; return this.m[0] = n, this.m[1] = i, this.m[2] = a, this.m[3] = r, this }, multiply: function(t) { var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
                n = this.m[1] * t.m[0] + this.m[3] * t.m[1],
                i = this.m[0] * t.m[2] + this.m[2] * t.m[3],
                a = this.m[1] * t.m[2] + this.m[3] * t.m[3],
                r = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
                o = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5]; return this.m[0] = e, this.m[1] = n, this.m[2] = i, this.m[3] = a, this.m[4] = r, this.m[5] = o, this }, invert: function() { var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                e = this.m[3] * t,
                n = -this.m[1] * t,
                i = -this.m[2] * t,
                a = this.m[0] * t,
                r = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                o = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]); return this.m[0] = e, this.m[1] = n, this.m[2] = i, this.m[3] = a, this.m[4] = r, this.m[5] = o, this }, getMatrix: function() { return this.m }, setAbsolutePosition: function(t, e) { var n = this.m[0],
                i = this.m[1],
                a = this.m[2],
                r = this.m[3],
                o = this.m[4],
                s = this.m[5],
                h = (n * (e - s) - i * (t - o)) / (n * r - i * a),
                c = (t - o - a * h) / n; return this.translate(c, h) } }; var t = Math.PI / 180,
        e = 180 / Math.PI,
        n = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 132, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 255, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 203], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [119, 128, 144], slategrey: [119, 128, 144], snow: [255, 255, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], transparent: [255, 255, 255, 0], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 5] },
        i = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    Konva.Util = { _isElement: function(t) { return !(!t || 1 != t.nodeType) }, _isFunction: function(t) { return !!(t && t.constructor && t.call && t.apply) }, _isObject: function(t) { return !!t && t.constructor === Object }, _isArray: function(t) { return "[object Array]" === Object.prototype.toString.call(t) }, _isNumber: function(t) { return "[object Number]" === Object.prototype.toString.call(t) }, _isString: function(t) { return "[object String]" === Object.prototype.toString.call(t) }, _throttle: function(t, e, n) { var i, a, r, o = null,
                s = 0,
                h = n || {},
                c = function() { s = !1 === h.leading ? 0 : (new Date).getTime(), o = null, r = t.apply(i, a), i = a = null }; return function() { var n = (new Date).getTime();
                s || !1 !== h.leading || (s = n); var l = e - (n - s); return i = this, a = arguments, l <= 0 ? (clearTimeout(o), o = null, s = n, r = t.apply(i, a), i = a = null) : o || !1 === h.trailing || (o = setTimeout(c, l)), r } }, _hasMethods: function(t) { var e, n = []; for (e in t) t.hasOwnProperty(e) && this._isFunction(t[e]) && n.push(e); return n.length > 0 }, isValidSelector: function(t) { if ("string" != typeof t) return !1; var e = t[0]; return "#" === e || "." === e || e === e.toUpperCase() }, createCanvasElement: function() { var t = Konva.document.createElement("canvas"); try { t.style = t.style || {} } catch (t) {} return t }, isBrowser: function() { return "object" != typeof exports }, _isInDocument: function(t) { for (; t = t.parentNode;)
                if (t == Konva.document) return !0;
            return !1 }, _simplifyArray: function(t) { var e, n, i = [],
                a = t.length,
                r = Konva.Util; for (e = 0; e < a; e++) n = t[e], r._isNumber(n) ? n = Math.round(1e3 * n) / 1e3 : r._isString(n) || (n = n.toString()), i.push(n); return i }, _getImage: function(t, e) { var n, i; if (t)
                if (this._isElement(t)) e(t);
                else if (this._isString(t)) n = new Konva.window.Image, n.onload = function() { e(n) }, n.src = t;
            else if (t.data) { i = Konva.Util.createCanvasElement(), i.width = t.width, i.height = t.height; var a = i.getContext("2d");
                a.putImageData(t, 0, 0), this._getImage(i.toDataURL(), e) } else e(null);
            else e(null) }, _getRGBAString: function(t) { return ["rgba(", t.red || 0, ",", t.green || 0, ",", t.blue || 0, ",", t.alpha || 1, ")"].join("") }, _rgbToHex: function(t, e, n) { return ((1 << 24) + (t << 16) + (e << 8) + n).toString(16).slice(1) }, _hexToRgb: function(t) { t = t.replace("#", ""); var e = parseInt(t, 16); return { r: e >> 16 & 255, g: e >> 8 & 255, b: 255 & e } }, getRandomColor: function() { for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6;) t = "0" + t; return "#" + t }, get: function(t, e) { return void 0 === t ? e : t }, getRGB: function(t) { var e; return t in n ? (e = n[t], { r: e[0], g: e[1], b: e[2] }) : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = i.exec(t.replace(/ /g, "")), { r: parseInt(e[1], 10), g: parseInt(e[2], 10), b: parseInt(e[3], 10) }) : { r: 0, g: 0, b: 0 } }, colorToRGBA: function(t) { return t = t || "black", Konva.Util._namedColorToRBA(t) || Konva.Util._hex3ColorToRGBA(t) || Konva.Util._hex6ColorToRGBA(t) || Konva.Util._rgbColorToRGBA(t) || Konva.Util._rgbaColorToRGBA(t) }, _namedColorToRBA: function(t) { var e = n[t.toLowerCase()]; return e ? { r: e[0], g: e[1], b: e[2], a: 1 } : null }, _rgbColorToRGBA: function(t) { if (0 === t.indexOf("rgb(")) { t = t.match(/rgb\(([^)]+)\)/)[1]; var e = t.split(/ *, */).map(Number); return { r: e[0], g: e[1], b: e[2], a: 1 } } }, _rgbaColorToRGBA: function(t) { if (0 === t.indexOf("rgba(")) { t = t.match(/rgba\(([^)]+)\)/)[1]; var e = t.split(/ *, */).map(Number); return { r: e[0], g: e[1], b: e[2], a: e[3] } } }, _hex6ColorToRGBA: function(t) { if ("#" === t[0] && 7 === t.length) return { r: parseInt(t.slice(1, 3), 16), g: parseInt(t.slice(3, 5), 16), b: parseInt(t.slice(5, 7), 16), a: 1 } }, _hex3ColorToRGBA: function(t) { if ("#" === t[0] && 4 === t.length) return { r: parseInt(t[1] + t[1], 16), g: parseInt(t[2] + t[2], 16), b: parseInt(t[3] + t[3], 16), a: 1 } }, _merge: function(t, e) { var n = this._clone(e); for (var i in t) this._isObject(t[i]) ? n[i] = this._merge(t[i], n[i]) : n[i] = t[i]; return n }, cloneObject: function(t) { var e = {}; for (var n in t) this._isObject(t[n]) ? e[n] = this.cloneObject(t[n]) : this._isArray(t[n]) ? e[n] = this.cloneArray(t[n]) : e[n] = t[n]; return e }, cloneArray: function(t) { return t.slice(0) }, _degToRad: function(e) { return e * t }, _radToDeg: function(t) { return t * e }, _capitalize: function(t) { return t.charAt(0).toUpperCase() + t.slice(1) }, throw: function(t) { throw new Error("Konva error: " + t) }, error: function(t) { console.error("Konva error: " + t) }, warn: function(t) { Konva.global.console && console.warn && Konva.showWarnings && console.warn("Konva warning: " + t) }, extend: function(t, e) {
            function n() { this.constructor = t }
            n.prototype = e.prototype; var i = t.prototype;
            t.prototype = new n; for (var a in i) i.hasOwnProperty(a) && (t.prototype[a] = i[a]);
            t.__super__ = e.prototype, t.super = e }, addMethods: function(t, e) { var n; for (n in e) t.prototype[n] = e[n] }, _getControlPoints: function(t, e, n, i, a, r, o) { var s = Math.sqrt(Math.pow(n - t, 2) + Math.pow(i - e, 2)),
                h = Math.sqrt(Math.pow(a - n, 2) + Math.pow(r - i, 2)),
                c = o * s / (s + h),
                l = o * h / (s + h); return [n - c * (a - t), i - c * (r - e), n + l * (a - t), i + l * (r - e)] }, _expandPoints: function(t, e) { var n, i, a = t.length,
                r = []; for (n = 2; n < a - 2; n += 2) i = Konva.Util._getControlPoints(t[n - 2], t[n - 1], t[n], t[n + 1], t[n + 2], t[n + 3], e), r.push(i[0]), r.push(i[1]), r.push(t[n]), r.push(t[n + 1]), r.push(i[2]), r.push(i[3]); return r }, _removeLastLetter: function(t) { return t.substring(0, t.length - 1) }, each: function(t, e) { for (var n in t) e(n, t[n]) }, _getProjectionToSegment: function(t, e, n, i, a, r) { var o, s, h, c = (t - n) * (t - n) + (e - i) * (e - i); if (0 == c) o = t, s = e, h = (a - n) * (a - n) + (r - i) * (r - i);
            else { var l = ((a - t) * (n - t) + (r - e) * (i - e)) / c;
                l < 0 ? (o = t, s = e, h = (t - a) * (t - a) + (e - r) * (e - r)) : l > 1 ? (o = n, s = i, h = (n - a) * (n - a) + (i - r) * (i - r)) : (o = t + l * (n - t), s = e + l * (i - e), h = (o - a) * (o - a) + (s - r) * (s - r)) } return [o, s, h] }, _getProjectionToLine: function(t, e, n) { var i = Konva.Util.cloneObject(t),
                a = Number.MAX_VALUE; return e.forEach(function(r, o) { if (n || o !== e.length - 1) { var s = e[(o + 1) % e.length],
                        h = Konva.Util._getProjectionToSegment(r.x, r.y, s.x, s.y, t.x, t.y),
                        c = h[0],
                        l = h[1],
                        d = h[2];
                    d < a && (i.x = c, i.y = l, a = d) } }), i }, _prepareArrayForTween: function(t, e, n) { var i, a = [],
                r = []; if (t.length > e.length) { var o = e;
                e = t, t = o } for (i = 0; i < t.length; i += 2) a.push({ x: t[i], y: t[i + 1] }); for (i = 0; i < e.length; i += 2) r.push({ x: e[i], y: e[i + 1] }); var s = []; return r.forEach(function(t) { var e = Konva.Util._getProjectionToLine(t, a, n);
                s.push(e.x), s.push(e.y) }), s }, _prepareToStringify: function(t) { var e;
            t.visitedByCircularReferenceRemoval = !0; for (var n in t)
                if (t.hasOwnProperty(n) && t[n] && "object" == typeof t[n])
                    if (e = Object.getOwnPropertyDescriptor(t, n), t[n].visitedByCircularReferenceRemoval || Konva.Util._isElement(t[n])) { if (!e.configurable) return null;
                        delete t[n] } else if (null === Konva.Util._prepareToStringify(t[n])) { if (!e.configurable) return null;
                delete t[n] } return delete t.visitedByCircularReferenceRemoval, t } } }(),
function() { "use strict"; var t = Konva.Util.createCanvasElement(),
        e = t.getContext("2d"),
        n = function() { return (Konva.window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1) }();
    Konva.Canvas = function(t) { this.init(t) }, Konva.Canvas.prototype = { init: function(t) { var e = t || {},
                i = e.pixelRatio || Konva.pixelRatio || n;
            this.pixelRatio = i, this._canvas = Konva.Util.createCanvasElement(), this._canvas.style.padding = 0, this._canvas.style.margin = 0, this._canvas.style.border = 0, this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = 0, this._canvas.style.left = 0 }, getContext: function() { return this.context }, getPixelRatio: function() { return this.pixelRatio }, setPixelRatio: function(t) { var e = this.pixelRatio;
            this.pixelRatio = t, this.setSize(this.getWidth() / e, this.getHeight() / e) }, setWidth: function(t) { this.width = this._canvas.width = t * this.pixelRatio, this._canvas.style.width = t + "px"; var e = this.pixelRatio;
            this.getContext()._context.scale(e, e) }, setHeight: function(t) { this.height = this._canvas.height = t * this.pixelRatio, this._canvas.style.height = t + "px"; var e = this.pixelRatio;
            this.getContext()._context.scale(e, e) }, getWidth: function() { return this.width }, getHeight: function() { return this.height }, setSize: function(t, e) { this.setWidth(t), this.setHeight(e) }, toDataURL: function(t, e) { try { return this._canvas.toDataURL(t, e) } catch (t) { try { return this._canvas.toDataURL() } catch (t) { return Konva.Util.warn("Unable to get data URL. " + t.message), "" } } } }, Konva.SceneCanvas = function(t) { var e = t || {},
            n = e.width || 0,
            i = e.height || 0;
        Konva.Canvas.call(this, e), this.context = new Konva.SceneContext(this), this.setSize(n, i) }, Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas), Konva.HitCanvas = function(t) { var e = t || {},
            n = e.width || 0,
            i = e.height || 0;
        Konva.Canvas.call(this, e), this.context = new Konva.HitContext(this), this.setSize(n, i), this.hitCanvas = !0 }, Konva.Util.extend(Konva.HitCanvas, Konva.Canvas) }(),
function() { "use strict"; var t = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"],
        e = ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation"];
    Konva.Context = function(t) { this.init(t) }, Konva.Context.prototype = { init: function(t) { this.canvas = t, this._context = t._canvas.getContext("2d"), Konva.enableTrace && (this.traceArr = [], this._enableTrace()) }, fillShape: function(t) { t.getFillEnabled() && this._fill(t) }, strokeShape: function(t) { t.getStrokeEnabled() && this._stroke(t) }, fillStrokeShape: function(t) { t.getFillEnabled() && this._fill(t), t.getStrokeEnabled() && this._stroke(t) }, getTrace: function(t) { var e, n, i, a, r = this.traceArr,
                o = r.length,
                s = ""; for (e = 0; e < o; e++) n = r[e], i = n.method, i ? (a = n.args, s += i, t ? s += "()" : Konva.Util._isArray(a[0]) ? s += "([" + a.join(",") + "])" : s += "(" + a.join(",") + ")") : (s += n.property, t || (s += "=" + n.val)), s += ";"; return s }, clearTrace: function() { this.traceArr = [] }, _trace: function(t) { var e, n = this.traceArr;
            n.push(t), (e = n.length) >= Konva.traceArrMax && n.shift() }, reset: function() { var t = this.getCanvas().getPixelRatio();
            this.setTransform(1 * t, 0, 0, 1 * t, 0, 0) }, getCanvas: function() { return this.canvas }, clear: function(t) { var e = this.getCanvas();
            t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio) }, _applyLineCap: function(t) { var e = t.getLineCap();
            e && this.setAttr("lineCap", e) }, _applyOpacity: function(t) { var e = t.getAbsoluteOpacity();
            1 !== e && this.setAttr("globalAlpha", e) }, _applyLineJoin: function(t) { var e = t.getLineJoin();
            e && this.setAttr("lineJoin", e) }, setAttr: function(t, e) { this._context[t] = e }, arc: function() { var t = arguments;
            this._context.arc(t[0], t[1], t[2], t[3], t[4], t[5]) }, beginPath: function() { this._context.beginPath() }, bezierCurveTo: function() { var t = arguments;
            this._context.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5]) }, clearRect: function() { var t = arguments;
            this._context.clearRect(t[0], t[1], t[2], t[3]) }, clip: function() { this._context.clip() }, closePath: function() { this._context.closePath() }, createImageData: function() { var t = arguments; return 2 === t.length ? this._context.createImageData(t[0], t[1]) : 1 === t.length ? this._context.createImageData(t[0]) : void 0 }, createLinearGradient: function() { var t = arguments; return this._context.createLinearGradient(t[0], t[1], t[2], t[3]) }, createPattern: function() { var t = arguments; return this._context.createPattern(t[0], t[1]) }, createRadialGradient: function() { var t = arguments; return this._context.createRadialGradient(t[0], t[1], t[2], t[3], t[4], t[5]) }, drawImage: function() { var t = arguments,
                e = this._context;
            3 === t.length ? e.drawImage(t[0], t[1], t[2]) : 5 === t.length ? e.drawImage(t[0], t[1], t[2], t[3], t[4]) : 9 === t.length && e.drawImage(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]) }, isPointInPath: function(t, e) { return this._context.isPointInPath(t, e) }, fill: function() { this._context.fill() }, fillRect: function(t, e, n, i) { this._context.fillRect(t, e, n, i) }, strokeRect: function(t, e, n, i) { this._context.strokeRect(t, e, n, i) }, fillText: function() { var t = arguments;
            this._context.fillText(t[0], t[1], t[2]) }, measureText: function(t) { return this._context.measureText(t) }, getImageData: function() { var t = arguments; return this._context.getImageData(t[0], t[1], t[2], t[3]) }, lineTo: function() { var t = arguments;
            this._context.lineTo(t[0], t[1]) }, moveTo: function() { var t = arguments;
            this._context.moveTo(t[0], t[1]) }, rect: function() { var t = arguments;
            this._context.rect(t[0], t[1], t[2], t[3]) }, putImageData: function() { var t = arguments;
            this._context.putImageData(t[0], t[1], t[2]) }, quadraticCurveTo: function() { var t = arguments;
            this._context.quadraticCurveTo(t[0], t[1], t[2], t[3]) }, restore: function() { this._context.restore() }, rotate: function() { var t = arguments;
            this._context.rotate(t[0]) }, save: function() { this._context.save() }, scale: function() { var t = arguments;
            this._context.scale(t[0], t[1]) }, setLineDash: function() { var t = arguments,
                e = this._context;
            this._context.setLineDash ? e.setLineDash(t[0]) : "mozDash" in e ? e.mozDash = t[0] : "webkitLineDash" in e && (e.webkitLineDash = t[0]) }, getLineDash: function() { return this._context.getLineDash() }, setTransform: function() { var t = arguments;
            this._context.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]) }, stroke: function() { this._context.stroke() }, strokeText: function() { var t = arguments;
            this._context.strokeText(t[0], t[1], t[2]) }, transform: function() { var t = arguments;
            this._context.transform(t[0], t[1], t[2], t[3], t[4], t[5]) }, translate: function() { var t = arguments;
            this._context.translate(t[0], t[1]) }, _enableTrace: function() { var e, n, i = this,
                a = t.length,
                r = Konva.Util._simplifyArray,
                o = this.setAttr; for (e = 0; e < a; e++) ! function(t) { var e, a = i[t];
                i[t] = function() { return n = r(Array.prototype.slice.call(arguments, 0)), e = a.apply(i, arguments), i._trace({ method: t, args: n }), e } }(t[e]);
            i.setAttr = function() { o.apply(i, arguments); var t = arguments[0],
                    e = arguments[1]; "shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()), i._trace({ property: t, val: e }) } } }, e.forEach(function(t) { Object.defineProperty(Konva.Context.prototype, t, { get: function() { return this._context[t] }, set: function(e) { this._context[t] = e } }) }), Konva.SceneContext = function(t) { Konva.Context.call(this, t) }, Konva.SceneContext.prototype = { _fillColor: function(t) { var e = t.fill();
            this.setAttr("fillStyle", e), t._fillFunc(this) }, _fillPattern: function(t) { var e = t.getFillPatternX(),
                n = t.getFillPatternY(),
                i = t.getFillPatternScale(),
                a = Konva.getAngle(t.getFillPatternRotation()),
                r = t.getFillPatternOffset();
            (e || n) && this.translate(e || 0, n || 0), a && this.rotate(a), i && this.scale(i.x, i.y), r && this.translate(-1 * r.x, -1 * r.y), this.setAttr("fillStyle", this.createPattern(t.getFillPatternImage(), t.getFillPatternRepeat() || "repeat")), this.fill() }, _fillLinearGradient: function(t) { var e = t.getFillLinearGradientStartPoint(),
                n = t.getFillLinearGradientEndPoint(),
                i = t.getFillLinearGradientColorStops(),
                a = this.createLinearGradient(e.x, e.y, n.x, n.y); if (i) { for (var r = 0; r < i.length; r += 2) a.addColorStop(i[r], i[r + 1]);
                this.setAttr("fillStyle", a), t._fillFunc(this) } }, _fillRadialGradient: function(t) { for (var e = t.getFillRadialGradientStartPoint(), n = t.getFillRadialGradientEndPoint(), i = t.getFillRadialGradientStartRadius(), a = t.getFillRadialGradientEndRadius(), r = t.getFillRadialGradientColorStops(), o = this.createRadialGradient(e.x, e.y, i, n.x, n.y, a), s = 0; s < r.length; s += 2) o.addColorStop(r[s], r[s + 1]);
            this.setAttr("fillStyle", o), this.fill() }, _fill: function(t) { var e = t.fill(),
                n = t.getFillPatternImage(),
                i = t.getFillLinearGradientColorStops(),
                a = t.getFillRadialGradientColorStops(),
                r = t.getFillPriority();
            e && "color" === r ? this._fillColor(t) : n && "pattern" === r ? this._fillPattern(t) : i && "linear-gradient" === r ? this._fillLinearGradient(t) : a && "radial-gradient" === r ? this._fillRadialGradient(t) : e ? this._fillColor(t) : n ? this._fillPattern(t) : i ? this._fillLinearGradient(t) : a && this._fillRadialGradient(t) }, _stroke: function(t) { var e = t.dash(),
                n = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
            t.hasStroke() && (n || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), e && t.dashEnabled() && (this.setLineDash(e), this.setAttr("lineDashOffset", t.dashOffset())), this.setAttr("lineWidth", t.strokeWidth()), this.setAttr("strokeStyle", t.stroke()), t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t._strokeFunc(this), n || this.restore()) }, _applyShadow: function(t) { var e = Konva.Util,
                n = e.get(t.getShadowRGBA(), "black"),
                i = e.get(t.getShadowBlur(), 5),
                a = e.get(t.getShadowOffset(), { x: 0, y: 0 }),
                r = t.getAbsoluteScale(),
                o = this.canvas.getPixelRatio(),
                s = r.x * o,
                h = r.y * o;
            this.setAttr("shadowColor", n), this.setAttr("shadowBlur", i * o * Math.min(Math.abs(s), Math.abs(h))), this.setAttr("shadowOffsetX", a.x * s), this.setAttr("shadowOffsetY", a.y * h) }, _applyGlobalCompositeOperation: function(t) { var e = t.getGlobalCompositeOperation(); "source-over" !== e && this.setAttr("globalCompositeOperation", e) } }, Konva.Util.extend(Konva.SceneContext, Konva.Context), Konva.HitContext = function(t) { Konva.Context.call(this, t) }, Konva.HitContext.prototype = { _fill: function(t) { this.save(), this.setAttr("fillStyle", t.colorKey), t._fillFuncHit(this), this.restore() }, _stroke: function(t) { if (t.hasStroke() && t.strokeHitEnabled()) { var e = t.getStrokeScaleEnabled() || t instanceof Konva.Text;
                e || (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)), this._applyLineCap(t), this.setAttr("lineWidth", t.strokeWidth()), this.setAttr("strokeStyle", t.colorKey), t._strokeFuncHit(this), e || this.restore() } } }, Konva.Util.extend(Konva.HitContext, Konva.Context) }(),
function() { "use strict";
    Konva.Factory = { addGetterSetter: function(t, e, n, i, a) { this.addGetter(t, e, n), this.addSetter(t, e, i, a), this.addOverloadedGetterSetter(t, e) }, addGetter: function(t, e, n) { var i = "get" + Konva.Util._capitalize(e);
            t.prototype[i] = function() { var t = this.attrs[e]; return void 0 === t ? n : t } }, addSetter: function(t, e, n, i) { var a = "set" + Konva.Util._capitalize(e);
            t.prototype[a] = function(t) { return n && (t = n.call(this, t)), this._setAttr(e, t), i && i.call(this), this } }, addComponentsGetterSetter: function(t, e, n, i, a) { var r, o, s = n.length,
                h = Konva.Util._capitalize,
                c = "get" + h(e),
                l = "set" + h(e);
            t.prototype[c] = function() { var t = {}; for (r = 0; r < s; r++) o = n[r], t[o] = this.getAttr(e + h(o)); return t }, t.prototype[l] = function(t) { var n, r = this.attrs[e];
                i && (t = i.call(this, t)); for (n in t) t.hasOwnProperty(n) && this._setAttr(e + h(n), t[n]); return this._fireChangeEvent(e, r, t), a && a.call(this), this }, this.addOverloadedGetterSetter(t, e) }, addOverloadedGetterSetter: function(t, e) { var n = Konva.Util._capitalize(e),
                i = "set" + n,
                a = "get" + n;
            t.prototype[e] = function() { return arguments.length ? (this[i](arguments[0]), this) : this[a]() } }, addDeprecatedGetterSetter: function(t, e, n, i) { var a = "get" + Konva.Util._capitalize(e),
                r = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
            t.prototype[a] = function() { Konva.Util.error(r); var t = this.attrs[e]; return void 0 === t ? n : t }, this.addSetter(t, e, i, function() { Konva.Util.error(r) }), this.addOverloadedGetterSetter(t, e) }, backCompat: function(t, e) { Konva.Util.each(e, function(e, n) { var i = t.prototype[n];
                t.prototype[e] = function() { i.apply(this, arguments), Konva.Util.error(e + " method is deprecated and will be removed soon. Use " + n + " instead") } }) }, afterSetFilter: function() { this._filterUpToDate = !1 } }, Konva.Validators = { RGBComponent: function(t) { return t > 255 ? 255 : t < 0 ? 0 : Math.round(t) }, alphaComponent: function(t) { return t > 1 ? 1 : t < 1e-4 ? 1e-4 : t } } }(),
function(t) {
    "use strict";
    var e = "Shape",
        n = ["id"],
        i = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(" "),
        a = ["scaleXChange.konva", "scaleYChange.konva"].join(" ");
    t.Node = function(t) { this._init(t) }, t.Util.addMethods(t.Node, {
        _init: function(e) { var n = this;
            this._id = t.idCounter++, this.eventListeners = {}, this.attrs = {}, this._cache = {}, this._filterUpToDate = !1, this._isUnderCache = !1, this.setAttrs(e), this.on(i, function() { this._clearCache("transform"), n._clearSelfAndDescendantCache("absoluteTransform") }), this.on(a, function() { n._clearSelfAndDescendantCache("absoluteScale") }), this.on("visibleChange.konva", function() { n._clearSelfAndDescendantCache("visible") }), this.on("listeningChange.konva", function() { n._clearSelfAndDescendantCache("listening") }), this.on("opacityChange.konva", function() { n._clearSelfAndDescendantCache("absoluteOpacity") }) },
        _clearCache: function(t) { t ? delete this._cache[t] : this._cache = {} },
        _getCache: function(t, e) { return void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t] },
        _clearSelfAndDescendantCache: function(t) { this._clearCache(t), this.children && this.getChildren().each(function(e) { e._clearSelfAndDescendantCache(t) }) },
        clearCache: function() { return delete this._cache.canvas, this._filterUpToDate = !1, this },
        cache: function(e) { var n = e || {},
                i = this.getClientRect(!0),
                a = n.width || i.width,
                r = n.height || i.height,
                o = n.pixelRatio,
                s = n.x || i.x,
                h = n.y || i.y,
                c = n.offset || 0,
                l = n.drawBorder || !1; if (!a || !r) throw new Error("Width or height of caching configuration equals 0.");
            a += 2 * c, r += 2 * c, s -= c, h -= c; var d = new t.SceneCanvas({ pixelRatio: o, width: a, height: r }),
                u = new t.SceneCanvas({ pixelRatio: o, width: a, height: r }),
                v = new t.HitCanvas({ pixelRatio: 1, width: a, height: r }),
                f = d.getContext(),
                g = v.getContext(); return v.isCache = !0, this.clearCache(), f.save(), g.save(), f.translate(-s, -h), g.translate(-s, -h), this._isUnderCache = !0, this._clearSelfAndDescendantCache("absoluteOpacity"), this._clearSelfAndDescendantCache("absoluteScale"), this.drawScene(d, this, !0), this.drawHit(v, this, !0), this._isUnderCache = !1, f.restore(), g.restore(), l && (f.save(), f.beginPath(), f.rect(0, 0, a, r), f.closePath(), f.setAttr("strokeStyle", "red"), f.setAttr("lineWidth", 5), f.stroke(), f.restore()), this._cache.canvas = { scene: d, filter: u, hit: v, x: s, y: h }, this },
        getClientRect: function() { throw new Error('abstract "getClientRect" method call') },
        _transformedRect: function(t) { var e, n, i, a, r = [{ x: t.x, y: t.y }, { x: t.x + t.width, y: t.y }, { x: t.x + t.width, y: t.y + t.height }, { x: t.x, y: t.y + t.height }],
                o = this.getTransform(); return r.forEach(function(t) { var r = o.point(t);
                void 0 === e && (e = i = r.x, n = a = r.y), e = Math.min(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.x), a = Math.max(a, r.y) }), { x: e, y: n, width: i - e, height: a - n } },
        _drawCachedSceneCanvas: function(t) { t.save(), t._applyOpacity(this), t._applyGlobalCompositeOperation(this), t.translate(this._cache.canvas.x, this._cache.canvas.y); var e = this._getCachedSceneCanvas(),
                n = e.pixelRatio;
            t.drawImage(e._canvas, 0, 0, e.width / n, e.height / n), t.restore() },
        _drawCachedHitCanvas: function(t) { var e = this._cache.canvas,
                n = e.hit;
            t.save(), t.translate(this._cache.canvas.x, this._cache.canvas.y), t.drawImage(n._canvas, 0, 0), t.restore() },
        _getCachedSceneCanvas: function() { var e, n, i, a, r = this.filters(),
                o = this._cache.canvas,
                s = o.scene,
                h = o.filter,
                c = h.getContext(); if (r) { if (!this._filterUpToDate) { var l = s.pixelRatio; try { for (e = r.length, c.clear(), c.drawImage(s._canvas, 0, 0, s.getWidth() / l, s.getHeight() / l), n = c.getImageData(0, 0, h.getWidth(), h.getHeight()), i = 0; i < e; i++) a = r[i], "function" == typeof a ? (a.call(this, n), c.putImageData(n, 0, 0)) : t.Util.error("Filter should be type of function, but got " + typeof a + " insted. Please check correct filters") } catch (e) { t.Util.error("Unable to apply filter. " + e.message) }
                    this._filterUpToDate = !0 } return h } return s },
        on: function(t, e) { if (3 === arguments.length) return this._delegate.apply(this, arguments); var n, i, a, r, o, s = t.split(" "),
                h = s.length; for (n = 0; n < h; n++) i = s[n], a = i.split("."), r = a[0], o = a[1] || "", this.eventListeners[r] || (this.eventListeners[r] = []), this.eventListeners[r].push({ name: o, handler: e }); return this },
        off: function(t) { var e, n, i, a, r, o, s = (t || "").split(" "),
                h = s.length; if (!t)
                for (n in this.eventListeners) this._off(n); for (e = 0; e < h; e++)
                if (i = s[e], a = i.split("."), r = a[0], o = a[1], r) this.eventListeners[r] && this._off(r, o);
                else
                    for (n in this.eventListeners) this._off(n, o);
            return this },
        dispatchEvent: function(t) { var e = { target: this, type: t.type, evt: t }; return this.fire(t.type, e), this },
        addEventListener: function(t, e) { return this.on(t, function(t) { e.call(this, t.evt) }), this },
        removeEventListener: function(t) { return this.off(t), this },
        _delegate: function(e, n, i) { var a = this;
            this.on(e, function(e) { for (var r = e.target.findAncestors(n, !0, a), o = 0; o < r.length; o++) e = t.Util.cloneObject(e), e.currentTarget = r[o], i.call(r[o], e) }) },
        remove: function() {
            var t = this.getParent();
            return t && t.children && (t.children.splice(this.index, 1), t._setChildrenIndices(), delete this.parent), this._clearSelfAndDescendantCache("stage"), this._clearSelfAndDescendantCache("absoluteTransform"), this._clearSelfAndDescendantCache("visible"), this._clearSelfAndDescendantCache("listening"), this._clearSelfAndDescendantCache("absoluteOpacity"), this
        },
        destroy: function() { t._removeId(this.getId()); for (var e = (this.getName() || "").split(/\s/g), n = 0; n < e.length; n++) { var i = e[n];
                t._removeName(i, this._id) } return this.remove(), this },
        getAttr: function(e) { var n = "get" + t.Util._capitalize(e); return t.Util._isFunction(this[n]) ? this[n]() : this.attrs[e] },
        getAncestors: function() { for (var e = this.getParent(), n = new t.Collection; e;) n.push(e), e = e.getParent(); return n },
        getAttrs: function() { return this.attrs || {} },
        setAttrs: function(e) { var n, i; if (!e) return this; for (n in e) "children" !== n && (i = "set" + t.Util._capitalize(n), t.Util._isFunction(this[i]) ? this[i](e[n]) : this._setAttr(n, e[n])); return this },
        isListening: function() { return this._getCache("listening", this._isListening) },
        _isListening: function() { var t = this.getListening(),
                e = this.getParent(); return "inherit" === t ? !e || e.isListening() : t },
        isVisible: function() { return this._getCache("visible", this._isVisible) },
        _isVisible: function() { var t = this.getVisible(),
                e = this.getParent(); return "inherit" === t ? !e || e.isVisible() : t },
        shouldDrawHit: function(t) { var e = this.getLayer(); return t && t.isCache || e && e.hitGraphEnabled() && this.isListening() && this.isVisible() },
        show: function() { return this.setVisible(!0), this },
        hide: function() { return this.setVisible(!1), this },
        getZIndex: function() { return this.index || 0 },
        getAbsoluteZIndex: function() {
            function t(c) { for (n = [], i = c.length, a = 0; a < i; a++) r = c[a], h++, r.nodeType !== e && (n = n.concat(r.getChildren().toArray())), r._id === s._id && (a = i);
                n.length > 0 && n[0].getDepth() <= o && t(n) } var n, i, a, r, o = this.getDepth(),
                s = this,
                h = 0; return "Stage" !== s.nodeType && t(s.getStage().getChildren()), h },
        getDepth: function() { for (var t = 0, e = this.parent; e;) t++, e = e.parent; return t },
        setPosition: function(t) { return this.setX(t.x), this.setY(t.y), this },
        getPosition: function() { return { x: this.getX(), y: this.getY() } },
        getAbsolutePosition: function(e) { var n = this.getAbsoluteTransform(e).getMatrix(),
                i = new t.Transform,
                a = this.offset(); return i.m = n.slice(), i.translate(a.x, a.y), i.getTranslation() },
        setAbsolutePosition: function(t) { var e, n = this._clearTransform(); return this.attrs.x = n.x, this.attrs.y = n.y, delete n.x, delete n.y, e = this.getAbsoluteTransform(), e.invert(), e.translate(t.x, t.y), t = { x: this.attrs.x + e.getTranslation().x, y: this.attrs.y + e.getTranslation().y }, this.setPosition({ x: t.x, y: t.y }), this._setTransform(n), this },
        _setTransform: function(t) { var e; for (e in t) this.attrs[e] = t[e];
            this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform") },
        _clearTransform: function() { var t = { x: this.getX(), y: this.getY(), rotation: this.getRotation(), scaleX: this.getScaleX(), scaleY: this.getScaleY(), offsetX: this.getOffsetX(), offsetY: this.getOffsetY(), skewX: this.getSkewX(), skewY: this.getSkewY() }; return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform"), t },
        move: function(t) { var e = t.x,
                n = t.y,
                i = this.getX(),
                a = this.getY(); return void 0 !== e && (i += e), void 0 !== n && (a += n), this.setPosition({ x: i, y: a }), this },
        _eachAncestorReverse: function(t, e) { var n, i, a = [],
                r = this.getParent(); if (e && e._id === this._id) return t(this), !0; for (a.unshift(this); r && (!e || r._id !== e._id);) a.unshift(r), r = r.parent; for (n = a.length, i = 0; i < n; i++) t(a[i]) },
        rotate: function(t) { return this.setRotation(this.getRotation() + t), this },
        moveToTop: function() { if (!this.parent) return t.Util.warn("Node has no parent. moveToTop function is ignored."), !1; var e = this.index; return this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0 },
        moveUp: function() { if (!this.parent) return t.Util.warn("Node has no parent. moveUp function is ignored."), !1; var e = this.index; return e < this.parent.getChildren().length - 1 && (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0) },
        moveDown: function() { if (!this.parent) return t.Util.warn("Node has no parent. moveDown function is ignored."), !1; var e = this.index; return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0) },
        moveToBottom: function() { if (!this.parent) return t.Util.warn("Node has no parent. moveToBottom function is ignored."), !1; var e = this.index; return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0) },
        setZIndex: function(e) { if (!this.parent) return t.Util.warn("Node has no parent. zIndex parameter is ignored."), !1; var n = this.index; return this.parent.children.splice(n, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this },
        getAbsoluteOpacity: function() { return this._getCache("absoluteOpacity", this._getAbsoluteOpacity) },
        _getAbsoluteOpacity: function() { var t = this.getOpacity(),
                e = this.getParent(); return e && !e._isUnderCache && (t *= this.getParent().getAbsoluteOpacity()), t },
        moveTo: function(t) { return this.getParent() !== t && ((this.__originalRemove || this.remove).call(this), t.add(this)), this },
        toObject: function() { var e, n, i, a, r = {},
                o = this.getAttrs();
            r.attrs = {}; for (e in o) n = o[e], i = this[e], delete o[e], a = i ? i.call(this) : null, o[e] = n, a !== n && (r.attrs[e] = n); return r.className = this.getClassName(), t.Util._prepareToStringify(r) },
        toJSON: function() { return JSON.stringify(this.toObject()) },
        getParent: function() { return this.parent },
        findAncestors: function(t, e, n) { var i = [];
            e && this._isMatch(t) && i.push(this); for (var a = this.parent; a;) { if (a === n) return i;
                a._isMatch(t) && i.push(a), a = a.parent } return i },
        findAncestor: function(t, e, n) { return this.findAncestors(t, e, n)[0] },
        _isMatch: function(e) { if (!e) return !1; var n, i, a = e.replace(/ /g, "").split(","),
                r = a.length; for (n = 0; n < r; n++)
                if (i = a[n], t.Util.isValidSelector(i) || (t.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), t.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), t.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0)) { if (this.id() === i.slice(1)) return !0 } else if ("." === i.charAt(0)) { if (this.hasName(i.slice(1))) return !0 } else if (0 !== this._get(i).length) return !0; return !1 },
        getLayer: function() { var t = this.getParent(); return t ? t.getLayer() : null },
        getStage: function() { return this._getCache("stage", this._getStage) },
        _getStage: function() { var t = this.getParent(); return t ? t.getStage() : void 0 },
        fire: function(t, e, n) { return e = e || {}, e.target = e.target || this, n ? this._fireAndBubble(t, e) : this._fire(t, e), this },
        getAbsoluteTransform: function(t) { return t ? this._getAbsoluteTransform(t) : this._getCache("absoluteTransform", this._getAbsoluteTransform) },
        _getAbsoluteTransform: function(e) { var n, i, a = new t.Transform; return this._eachAncestorReverse(function(t) { n = t.transformsEnabled(), i = t.getTransform(), "all" === n ? a.multiply(i) : "position" === n && a.translate(t.x(), t.y()) }, e), a },
        getAbsoluteScale: function(t) { return t ? this._getAbsoluteScale(t) : this._getCache("absoluteScale", this._getAbsoluteScale) },
        _getAbsoluteScale: function(t) { for (var e = this; e;) e._isUnderCache && (t = e), e = e.getParent(); var n = 1,
                i = 1; return this._eachAncestorReverse(function(t) { n *= t.scaleX(), i *= t.scaleY() }, t), { x: n, y: i } },
        getTransform: function() { return this._getCache("transform", this._getTransform) },
        _getTransform: function() { var e = new t.Transform,
                n = this.getX(),
                i = this.getY(),
                a = t.getAngle(this.getRotation()),
                r = this.getScaleX(),
                o = this.getScaleY(),
                s = this.getSkewX(),
                h = this.getSkewY(),
                c = this.getOffsetX(),
                l = this.getOffsetY(); return 0 === n && 0 === i || e.translate(n, i), 0 !== a && e.rotate(a), 0 === s && 0 === h || e.skew(s, h), 1 === r && 1 === o || e.scale(r, o), 0 === c && 0 === l || e.translate(-1 * c, -1 * l), e },
        clone: function(e) { var i, a, r, o, s, h = t.Util.cloneObject(this.attrs); for (var c in n) { delete h[n[c]] } for (i in e) h[i] = e[i]; var l = new this.constructor(h); for (i in this.eventListeners)
                for (a = this.eventListeners[i], r = a.length, o = 0; o < r; o++) s = a[o], s.name.indexOf("konva") < 0 && (l.eventListeners[i] || (l.eventListeners[i] = []), l.eventListeners[i].push(s)); return l },
        _toKonvaCanvas: function(e) { e = e || {}; var n = this.getStage(),
                i = e.x || 0,
                a = e.y || 0,
                r = e.pixelRatio || 1,
                o = new t.SceneCanvas({ width: e.width || this.getWidth() || (n ? n.getWidth() : 0), height: e.height || this.getHeight() || (n ? n.getHeight() : 0), pixelRatio: r }),
                s = o.getContext(); return s.save(), (i || a) && s.translate(-1 * i, -1 * a), this.drawScene(o), s.restore(), o },
        toCanvas: function(t) { return this._toKonvaCanvas(t)._canvas },
        toDataURL: function(t) { t = t || {}; var e = t.mimeType || null,
                n = t.quality || null; return this._toKonvaCanvas(t).toDataURL(e, n) },
        toImage: function(e) { if (!e || !e.callback) throw "callback required for toImage method config argument";
            t.Util._getImage(this.toDataURL(e), function(t) { e.callback(t) }) },
        setSize: function(t) { return this.setWidth(t.width), this.setHeight(t.height), this },
        getSize: function() { return { width: this.getWidth(), height: this.getHeight() } },
        getWidth: function() { return this.attrs.width || 0 },
        getHeight: function() { return this.attrs.height || 0 },
        getClassName: function() { return this.className || this.nodeType },
        getType: function() { return this.nodeType },
        getDragDistance: function() { return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : t.dragDistance },
        _get: function(t) { return this.className === t || this.nodeType === t ? [this] : [] },
        _off: function(t, e) { var n, i, a = this.eventListeners[t]; for (n = 0; n < a.length; n++)
                if (!("konva" === (i = a[n].name) && "konva" !== e || e && i !== e)) { if (a.splice(n, 1), 0 === a.length) { delete this.eventListeners[t]; break }
                    n-- } },
        _fireChangeEvent: function(t, e, n) { this._fire(t + "Change", { oldVal: e, newVal: n }) },
        setId: function(e) { var n = this.getId(); return t._removeId(n), t._addId(this, e), this._setAttr("id", e), this },
        setName: function(e) { var n, i, a = (this.getName() || "").split(/\s/g),
                r = (e || "").split(/\s/g); for (i = 0; i < a.length; i++) n = a[i], -1 === r.indexOf(n) && n && t._removeName(n, this._id); for (i = 0; i < r.length; i++) n = r[i], -1 === a.indexOf(n) && n && t._addName(this, n); return this._setAttr("name", e), this },
        addName: function(t) { if (!this.hasName(t)) { var e = this.name(),
                    n = e ? e + " " + t : t;
                this.setName(n) } return this },
        hasName: function(t) { return -1 !== (this.name() || "").split(/\s/g).indexOf(t) },
        removeName: function(t) { var e = (this.name() || "").split(/\s/g),
                n = e.indexOf(t); return -1 !== n && (e.splice(n, 1), this.setName(e.join(" "))), this },
        setAttr: function(e, n) { var i = "set" + t.Util._capitalize(e),
                a = this[i]; return t.Util._isFunction(a) ? a.call(this, n) : this._setAttr(e, n), this },
        _setAttr: function(t, e) { var n;
            (n = this.attrs[t]) !== e && (void 0 === e || null === e ? delete this.attrs[t] : this.attrs[t] = e, this._fireChangeEvent(t, n, e)) },
        _setComponentAttr: function(t, e, n) { var i;
            void 0 !== n && (i = this.attrs[t], i || (this.attrs[t] = this.getAttr(t)), this.attrs[t][e] = n, this._fireChangeEvent(t, i, n)) },
        _fireAndBubble: function(t, n, i) { var a = !0; if (n && this.nodeType === e && (n.target = this), "mouseenter" === t && i && (this._id === i._id || this.isAncestorOf && this.isAncestorOf(i)) ? a = !1 : "mouseleave" === t && i && (this._id === i._id || this.isAncestorOf && this.isAncestorOf(i)) && (a = !1), a) { this._fire(t, n); var r = ("mouseenter" === t || "mouseleave" === t) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent);
                (n && !n.cancelBubble || !n) && this.parent && this.parent.isListening() && !r && (i && i.parent ? this._fireAndBubble.call(this.parent, t, n, i.parent) : this._fireAndBubble.call(this.parent, t, n)) } },
        _fire: function(t, e) { var n, i = this.eventListeners[t]; if (e = e || {}, e.currentTarget = this, e.type = t, i)
                for (n = 0; n < i.length; n++) i[n].handler.call(this, e) },
        draw: function() { return this.drawScene(), this.drawHit(), this }
    }), t.Node.create = function(e, n) { return t.Util._isString(e) && (e = JSON.parse(e)), this._createNode(e, n) }, t.Node._createNode = function(e, n) { var i, a, r, o = t.Node.prototype.getClassName.call(e),
            s = e.children; if (n && (e.attrs.container = n), i = new t[o](e.attrs), s)
            for (a = s.length, r = 0; r < a; r++) i.add(this._createNode(s[r])); return i }, t.Factory.addOverloadedGetterSetter(t.Node, "position"), t.Factory.addGetterSetter(t.Node, "x", 0), t.Factory.addGetterSetter(t.Node, "y", 0), t.Factory.addGetterSetter(t.Node, "globalCompositeOperation", "source-over"), t.Factory.addGetterSetter(t.Node, "opacity", 1), t.Factory.addGetter(t.Node, "name"), t.Factory.addOverloadedGetterSetter(t.Node, "name"), t.Factory.addGetter(t.Node, "id"), t.Factory.addOverloadedGetterSetter(t.Node, "id"), t.Factory.addGetterSetter(t.Node, "rotation", 0), t.Factory.addComponentsGetterSetter(t.Node, "scale", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "scaleX", 1), t.Factory.addGetterSetter(t.Node, "scaleY", 1), t.Factory.addComponentsGetterSetter(t.Node, "skew", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "skewX", 0), t.Factory.addGetterSetter(t.Node, "skewY", 0), t.Factory.addComponentsGetterSetter(t.Node, "offset", ["x", "y"]), t.Factory.addGetterSetter(t.Node, "offsetX", 0), t.Factory.addGetterSetter(t.Node, "offsetY", 0), t.Factory.addSetter(t.Node, "dragDistance"), t.Factory.addOverloadedGetterSetter(t.Node, "dragDistance"), t.Factory.addSetter(t.Node, "width", 0), t.Factory.addOverloadedGetterSetter(t.Node, "width"), t.Factory.addSetter(t.Node, "height", 0), t.Factory.addOverloadedGetterSetter(t.Node, "height"), t.Factory.addGetterSetter(t.Node, "listening", "inherit"), t.Factory.addGetterSetter(t.Node, "preventDefault", !0), t.Factory.addGetterSetter(t.Node, "filters", void 0, function(t) { return this._filterUpToDate = !1, t }), t.Factory.addGetterSetter(t.Node, "visible", "inherit"), t.Factory.addGetterSetter(t.Node, "transformsEnabled", "all"), t.Factory.addOverloadedGetterSetter(t.Node, "size"), t.Factory.backCompat(t.Node, { rotateDeg: "rotate", setRotationDeg: "setRotation", getRotationDeg: "getRotation" }), t.Collection.mapMethods(t.Node)
}(Konva),
function() { "use strict";
    Konva.Filters.Grayscale = function(t) { var e, n, i = t.data,
            a = i.length; for (e = 0; e < a; e += 4) n = .34 * i[e] + .5 * i[e + 1] + .16 * i[e + 2], i[e] = n, i[e + 1] = n, i[e + 2] = n } }(),
function() { "use strict";
    Konva.Filters.Brighten = function(t) { var e, n = 255 * this.brightness(),
            i = t.data,
            a = i.length; for (e = 0; e < a; e += 4) i[e] += n, i[e + 1] += n, i[e + 2] += n }, Konva.Factory.addGetterSetter(Konva.Node, "brightness", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.Invert = function(t) { var e, n = t.data,
            i = n.length; for (e = 0; e < i; e += 4) n[e] = 255 - n[e], n[e + 1] = 255 - n[e + 1], n[e + 2] = 255 - n[e + 2] } }(),
function() { "use strict";

    function t() { this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null }

    function e(e, a) { var r, o, s, h, c, l, d, u, v, f, g, p, m, y, _, K, S, C, x, w, b, F, T, P, A = e.data,
            G = e.width,
            k = e.height,
            D = a + a + 1,
            M = G - 1,
            R = k - 1,
            L = a + 1,
            I = L * (L + 1) / 2,
            O = new t,
            N = null,
            U = O,
            E = null,
            B = null,
            H = n[a],
            W = i[a]; for (s = 1; s < D; s++) U = U.next = new t, s === L && (N = U); for (U.next = O, d = l = 0, o = 0; o < k; o++) { for (K = S = C = x = u = v = f = g = 0, p = L * (w = A[l]), m = L * (b = A[l + 1]), y = L * (F = A[l + 2]), _ = L * (T = A[l + 3]), u += I * w, v += I * b, f += I * F, g += I * T, U = O, s = 0; s < L; s++) U.r = w, U.g = b, U.b = F, U.a = T, U = U.next; for (s = 1; s < L; s++) h = l + ((M < s ? M : s) << 2), u += (U.r = w = A[h]) * (P = L - s), v += (U.g = b = A[h + 1]) * P, f += (U.b = F = A[h + 2]) * P, g += (U.a = T = A[h + 3]) * P, K += w, S += b, C += F, x += T, U = U.next; for (E = O, B = N, r = 0; r < G; r++) A[l + 3] = T = g * H >> W, 0 !== T ? (T = 255 / T, A[l] = (u * H >> W) * T, A[l + 1] = (v * H >> W) * T, A[l + 2] = (f * H >> W) * T) : A[l] = A[l + 1] = A[l + 2] = 0, u -= p, v -= m, f -= y, g -= _, p -= E.r, m -= E.g, y -= E.b, _ -= E.a, h = d + ((h = r + a + 1) < M ? h : M) << 2, K += E.r = A[h], S += E.g = A[h + 1], C += E.b = A[h + 2], x += E.a = A[h + 3], u += K, v += S, f += C, g += x, E = E.next, p += w = B.r, m += b = B.g, y += F = B.b, _ += T = B.a, K -= w, S -= b, C -= F, x -= T, B = B.next, l += 4;
            d += G } for (r = 0; r < G; r++) { for (S = C = x = K = v = f = g = u = 0, l = r << 2, p = L * (w = A[l]), m = L * (b = A[l + 1]), y = L * (F = A[l + 2]), _ = L * (T = A[l + 3]), u += I * w, v += I * b, f += I * F, g += I * T, U = O, s = 0; s < L; s++) U.r = w, U.g = b, U.b = F, U.a = T, U = U.next; for (c = G, s = 1; s <= a; s++) l = c + r << 2, u += (U.r = w = A[l]) * (P = L - s), v += (U.g = b = A[l + 1]) * P, f += (U.b = F = A[l + 2]) * P, g += (U.a = T = A[l + 3]) * P, K += w, S += b, C += F, x += T, U = U.next, s < R && (c += G); for (l = r, E = O, B = N, o = 0; o < k; o++) h = l << 2, A[h + 3] = T = g * H >> W, T > 0 ? (T = 255 / T, A[h] = (u * H >> W) * T, A[h + 1] = (v * H >> W) * T, A[h + 2] = (f * H >> W) * T) : A[h] = A[h + 1] = A[h + 2] = 0, u -= p, v -= m, f -= y, g -= _, p -= E.r, m -= E.g, y -= E.b, _ -= E.a, h = r + ((h = o + L) < R ? h : R) * G << 2, u += K += E.r = A[h], v += S += E.g = A[h + 1], f += C += E.b = A[h + 2], g += x += E.a = A[h + 3], E = E.next, p += w = B.r, m += b = B.g, y += F = B.b, _ += T = B.a, K -= w, S -= b, C -= F, x -= T, B = B.next, l += G } } var n = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
        i = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    Konva.Filters.Blur = function(t) { var n = Math.round(this.blurRadius());
        n > 0 && e(t, n) }, Konva.Factory.addGetterSetter(Konva.Node, "blurRadius", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";

    function t(t, e, n) { var i = 4 * (n * t.width + e),
            a = []; return a.push(t.data[i++], t.data[i++], t.data[i++], t.data[i++]), a }

    function e(t, e) { return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2)) }

    function n(t) { for (var e = [0, 0, 0], n = 0; n < t.length; n++) e[0] += t[n][0], e[1] += t[n][1], e[2] += t[n][2]; return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e }

    function i(i, a) { var r = t(i, 0, 0),
            o = t(i, i.width - 1, 0),
            s = t(i, 0, i.height - 1),
            h = t(i, i.width - 1, i.height - 1),
            c = a || 10; if (e(r, o) < c && e(o, h) < c && e(h, s) < c && e(s, r) < c) { for (var l = n([o, r, h, s]), d = [], u = 0; u < i.width * i.height; u++) { var v = e(l, [i.data[4 * u], i.data[4 * u + 1], i.data[4 * u + 2]]);
                d[u] = v < c ? 0 : 255 } return d } }

    function a(t, e) { for (var n = 0; n < t.width * t.height; n++) t.data[4 * n + 3] = e[n] }

    function r(t, e, n) { for (var i = [1, 1, 1, 1, 0, 1, 1, 1, 1], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; s < n; s++)
            for (var h = 0; h < e; h++) { for (var c = s * e + h, l = 0, d = 0; d < a; d++)
                    for (var u = 0; u < a; u++) { var v = s + d - r,
                            f = h + u - r; if (v >= 0 && v < n && f >= 0 && f < e) { var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p } }
                o[c] = 2040 === l ? 255 : 0 }
        return o }

    function o(t, e, n) { for (var i = [1, 1, 1, 1, 1, 1, 1, 1, 1], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; s < n; s++)
            for (var h = 0; h < e; h++) { for (var c = s * e + h, l = 0, d = 0; d < a; d++)
                    for (var u = 0; u < a; u++) { var v = s + d - r,
                            f = h + u - r; if (v >= 0 && v < n && f >= 0 && f < e) { var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p } }
                o[c] = l >= 1020 ? 255 : 0 }
        return o }

    function s(t, e, n) { for (var i = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], a = Math.round(Math.sqrt(i.length)), r = Math.floor(a / 2), o = [], s = 0; s < n; s++)
            for (var h = 0; h < e; h++) { for (var c = s * e + h, l = 0, d = 0; d < a; d++)
                    for (var u = 0; u < a; u++) { var v = s + d - r,
                            f = h + u - r; if (v >= 0 && v < n && f >= 0 && f < e) { var g = v * e + f,
                                p = i[d * a + u];
                            l += t[g] * p } }
                o[c] = l }
        return o }
    Konva.Filters.Mask = function(t) { var e = this.threshold(),
            n = i(t, e); return n && (n = r(n, t.width, t.height), n = o(n, t.width, t.height), n = s(n, t.width, t.height), a(t, n)), t }, Konva.Factory.addGetterSetter(Konva.Node, "threshold", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.RGB = function(t) { var e, n, i = t.data,
            a = i.length,
            r = this.red(),
            o = this.green(),
            s = this.blue(); for (e = 0; e < a; e += 4) n = (.34 * i[e] + .5 * i[e + 1] + .16 * i[e + 2]) / 255, i[e] = n * r, i[e + 1] = n * o, i[e + 2] = n * s, i[e + 3] = i[e + 3] }, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function(t) { return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t) }), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function(t) { return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t) }), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.RGBA = function(t) { var e, n, i = t.data,
            a = i.length,
            r = this.red(),
            o = this.green(),
            s = this.blue(),
            h = this.alpha(); for (e = 0; e < a; e += 4) n = 1 - h, i[e] = r * h + i[e] * n, i[e + 1] = o * h + i[e + 1] * n, i[e + 2] = s * h + i[e + 2] * n }, Konva.Factory.addGetterSetter(Konva.Node, "red", 0, function(t) { return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t) }), Konva.Factory.addGetterSetter(Konva.Node, "green", 0, function(t) { return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t) }), Konva.Factory.addGetterSetter(Konva.Node, "blue", 0, Konva.Validators.RGBComponent, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "alpha", 1, function(t) { return this._filterUpToDate = !1, t > 1 ? 1 : t < 0 ? 0 : t }) }(),
function() { "use strict";
    Konva.Filters.HSV = function(t) { var e, n, i, a, r, o = t.data,
            s = o.length,
            h = Math.pow(2, this.value()),
            c = Math.pow(2, this.saturation()),
            l = Math.abs(this.hue() + 360) % 360,
            d = h * c * Math.cos(l * Math.PI / 180),
            u = h * c * Math.sin(l * Math.PI / 180),
            v = .299 * h + .701 * d + .167 * u,
            f = .587 * h - .587 * d + .33 * u,
            g = .114 * h - .114 * d - .497 * u,
            p = .299 * h - .299 * d - .328 * u,
            m = .587 * h + .413 * d + .035 * u,
            y = .114 * h - .114 * d + .293 * u,
            _ = .299 * h - .3 * d + 1.25 * u,
            K = .587 * h - .586 * d - 1.05 * u,
            S = .114 * h + .886 * d - .2 * u; for (e = 0; e < s; e += 4) n = o[e + 0], i = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = v * n + f * i + g * a, o[e + 1] = p * n + m * i + y * a, o[e + 2] = _ * n + K * i + S * a, o[e + 3] = r }, Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "value", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Factory.addGetterSetter(Konva.Node, "hue", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "saturation", 0, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "luminance", 0, null, Konva.Factory.afterSetFilter), Konva.Filters.HSL = function(t) { var e, n, i, a, r, o = t.data,
            s = o.length,
            h = Math.pow(2, this.saturation()),
            c = Math.abs(this.hue() + 360) % 360,
            l = 127 * this.luminance(),
            d = 1 * h * Math.cos(c * Math.PI / 180),
            u = 1 * h * Math.sin(c * Math.PI / 180),
            v = .299 + .701 * d + .167 * u,
            f = .587 - .587 * d + .33 * u,
            g = .114 - .114 * d - .497 * u,
            p = .299 - .299 * d - .328 * u,
            m = .587 + .413 * d + .035 * u,
            y = .114 - .114 * d + .293 * u,
            _ = .299 - .3 * d + 1.25 * u,
            K = .587 - .586 * d - 1.05 * u,
            S = .114 + .886 * d - .2 * u; for (e = 0; e < s; e += 4) n = o[e + 0], i = o[e + 1], a = o[e + 2], r = o[e + 3], o[e + 0] = v * n + f * i + g * a + l, o[e + 1] = p * n + m * i + y * a + l, o[e + 2] = _ * n + K * i + S * a + l, o[e + 3] = r } }(),
function() { "use strict";
    Konva.Filters.Emboss = function(t) { var e = 10 * this.embossStrength(),
            n = 255 * this.embossWhiteLevel(),
            i = this.embossDirection(),
            a = this.embossBlend(),
            r = 0,
            o = 0,
            s = t.data,
            h = t.width,
            c = t.height,
            l = 4 * h,
            d = c; switch (i) {
            case "top-left":
                r = -1, o = -1; break;
            case "top":
                r = -1, o = 0; break;
            case "top-right":
                r = -1, o = 1; break;
            case "right":
                r = 0, o = 1; break;
            case "bottom-right":
                r = 1, o = 1; break;
            case "bottom":
                r = 1, o = 0; break;
            case "bottom-left":
                r = 1, o = -1; break;
            case "left":
                r = 0, o = -1; break;
            default:
                Konva.Util.error("Unknown emboss direction: " + i) }
        do { var u = (d - 1) * l,
                v = r;
            d + v < 1 && (v = 0), d + v > c && (v = 0); var f = (d - 1 + v) * h * 4,
                g = h;
            do { var p = u + 4 * (g - 1),
                    m = o;
                g + m < 1 && (m = 0), g + m > h && (m = 0); var y = f + 4 * (g - 1 + m),
                    _ = s[p] - s[y],
                    K = s[p + 1] - s[y + 1],
                    S = s[p + 2] - s[y + 2],
                    C = _,
                    x = C > 0 ? C : -C,
                    w = K > 0 ? K : -K,
                    b = S > 0 ? S : -S; if (w > x && (C = K), b > x && (C = S), C *= e, a) { var F = s[p] + C,
                        T = s[p + 1] + C,
                        P = s[p + 2] + C;
                    s[p] = F > 255 ? 255 : F < 0 ? 0 : F, s[p + 1] = T > 255 ? 255 : T < 0 ? 0 : T, s[p + 2] = P > 255 ? 255 : P < 0 ? 0 : P } else { var A = n - C;
                    A < 0 ? A = 0 : A > 255 && (A = 255), s[p] = s[p + 1] = s[p + 2] = A } } while (--g) } while (--d) }, Konva.Factory.addGetterSetter(Konva.Node, "embossStrength", .5, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossWhiteLevel", .5, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossDirection", "top-left", null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "embossBlend", !1, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";

    function t(t, e, n, i, a) { var r, o = n - e,
            s = a - i; return 0 === o ? i + s / 2 : 0 === s ? i : (r = (t - e) / o, r = s * r + i) }
    Konva.Filters.Enhance = function(e) { var n, i, a, r, o = e.data,
            s = o.length,
            h = o[0],
            c = h,
            l = o[1],
            d = l,
            u = o[2],
            v = u,
            f = this.enhance(); if (0 !== f) { for (r = 0; r < s; r += 4) n = o[r + 0], n < h ? h = n : n > c && (c = n), i = o[r + 1], i < l ? l = i : i > d && (d = i), a = o[r + 2], a < u ? u = a : a > v && (v = a);
            c === h && (c = 255, h = 0), d === l && (d = 255, l = 0), v === u && (v = 255, u = 0); var g, p, m, y, _, K, S, C, x; for (f > 0 ? (p = c + f * (255 - c), m = h - f * (h - 0), _ = d + f * (255 - d), K = l - f * (l - 0), C = v + f * (255 - v), x = u - f * (u - 0)) : (g = .5 * (c + h), p = c + f * (c - g), m = h + f * (h - g), y = .5 * (d + l), _ = d + f * (d - y), K = l + f * (l - y), S = .5 * (v + u), C = v + f * (v - S), x = u + f * (u - S)), r = 0; r < s; r += 4) o[r + 0] = t(o[r + 0], h, c, m, p), o[r + 1] = t(o[r + 1], l, d, K, _), o[r + 2] = t(o[r + 2], u, v, x, C) } }, Konva.Factory.addGetterSetter(Konva.Node, "enhance", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.Posterize = function(t) { var e, n = Math.round(254 * this.levels()) + 1,
            i = t.data,
            a = i.length,
            r = 255 / n; for (e = 0; e < a; e += 1) i[e] = Math.floor(i[e] / r) * r }, Konva.Factory.addGetterSetter(Konva.Node, "levels", .5, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.Noise = function(t) { var e, n = 255 * this.noise(),
            i = t.data,
            a = i.length,
            r = n / 2; for (e = 0; e < a; e += 4) i[e + 0] += r - 2 * r * Math.random(), i[e + 1] += r - 2 * r * Math.random(), i[e + 2] += r - 2 * r * Math.random() }, Konva.Factory.addGetterSetter(Konva.Node, "noise", .2, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.Pixelate = function(t) { var e, n, i, a, r, o, s, h, c, l, d, u, v, f, g = Math.ceil(this.pixelSize()),
            p = t.width,
            m = t.height,
            y = Math.ceil(p / g),
            _ = Math.ceil(m / g); if (t = t.data, g <= 0) return void Konva.Util.error("pixelSize value can not be <= 0"); for (u = 0; u < y; u += 1)
            for (v = 0; v < _; v += 1) { for (a = 0, r = 0, o = 0, s = 0, h = u * g, c = h + g, l = v * g, d = l + g, f = 0, e = h; e < c; e += 1)
                    if (!(e >= p))
                        for (n = l; n < d; n += 1) n >= m || (i = 4 * (p * n + e), a += t[i + 0], r += t[i + 1], o += t[i + 2], s += t[i + 3], f += 1);
                for (a /= f, r /= f, o /= f, e = h; e < c; e += 1)
                    if (!(e >= p))
                        for (n = l; n < d; n += 1) n >= m || (i = 4 * (p * n + e), t[i + 0] = a, t[i + 1] = r, t[i + 2] = o, t[i + 3] = s) } }, Konva.Factory.addGetterSetter(Konva.Node, "pixelSize", 8, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Filters.Threshold = function(t) { var e, n = 255 * this.threshold(),
            i = t.data,
            a = i.length; for (e = 0; e < a; e += 1) i[e] = i[e] < n ? 0 : 255 }, Konva.Factory.addGetterSetter(Konva.Node, "threshold", .5, null, Konva.Factory.afterSetFilter) }(),
function() {
    "use strict";
    /**
     * Sepia Filter
     * Based on: Pixastic Lib - Sepia filter - v0.1.0
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * @function
     * @name Sepia
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author Jacob Seidelin <jseidelin@nihilogic.dk>
     * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Sepia]);
     */
    Konva.Filters.Sepia = function(t) { var e, n, i, a, r, o, s, h, c, l = t.data,
            d = t.width,
            u = t.height,
            v = 4 * d;
        do { e = (u - 1) * v, n = d;
            do { i = e + 4 * (n - 1), a = l[i], r = l[i + 1], o = l[i + 2], s = .393 * a + .769 * r + .189 * o, h = .349 * a + .686 * r + .168 * o, c = .272 * a + .534 * r + .131 * o, l[i] = s > 255 ? 255 : s, l[i + 1] = h > 255 ? 255 : h, l[i + 2] = c > 255 ? 255 : c, l[i + 3] = l[i + 3] } while (--n) } while (--u) }
}(),
function() { "use strict";
    Konva.Filters.Solarize = function(t) { var e = t.data,
            n = t.width,
            i = t.height,
            a = 4 * n,
            r = i;
        do { var o = (r - 1) * a,
                s = n;
            do { var h = o + 4 * (s - 1),
                    c = e[h],
                    l = e[h + 1],
                    d = e[h + 2];
                c > 127 && (c = 255 - c), l > 127 && (l = 255 - l), d > 127 && (d = 255 - d), e[h] = c, e[h + 1] = l, e[h + 2] = d } while (--s) } while (--r) } }(),
function() { "use strict"; var t = function(t, e, n) { var i, a, r, o, s = t.data,
                h = e.data,
                c = t.width,
                l = t.height,
                d = n.polarCenterX || c / 2,
                u = n.polarCenterY || l / 2,
                v = 0,
                f = 0,
                g = 0,
                p = 0,
                m = Math.sqrt(d * d + u * u);
            a = c - d, r = l - u, o = Math.sqrt(a * a + r * r), m = o > m ? o : m; var y, _, K, S, C = l,
                x = c,
                w = 360 / x * Math.PI / 180; for (_ = 0; _ < x; _ += 1)
                for (K = Math.sin(_ * w), S = Math.cos(_ * w), y = 0; y < C; y += 1) a = Math.floor(d + m * y / C * S), r = Math.floor(u + m * y / C * K), i = 4 * (r * c + a), v = s[i + 0], f = s[i + 1], g = s[i + 2], p = s[i + 3], i = 4 * (_ + y * c), h[i + 0] = v, h[i + 1] = f, h[i + 2] = g, h[i + 3] = p },
        e = function(t, e, n) { var i, a, r, o, s, h, c = t.data,
                l = e.data,
                d = t.width,
                u = t.height,
                v = n.polarCenterX || d / 2,
                f = n.polarCenterY || u / 2,
                g = 0,
                p = 0,
                m = 0,
                y = 0,
                _ = Math.sqrt(v * v + f * f);
            a = d - v, r = u - f, h = Math.sqrt(a * a + r * r), _ = h > _ ? h : _; var K, S, C, x, w = u,
                b = d,
                F = n.polarRotation || 0; for (a = 0; a < d; a += 1)
                for (r = 0; r < u; r += 1) o = a - v, s = r - f, K = Math.sqrt(o * o + s * s) * w / _, S = (180 * Math.atan2(s, o) / Math.PI + 360 + F) % 360, S = S * b / 360, C = Math.floor(S), x = Math.floor(K), i = 4 * (x * d + C), g = c[i + 0], p = c[i + 1], m = c[i + 2], y = c[i + 3], i = 4 * (r * d + a), l[i + 0] = g, l[i + 1] = p, l[i + 2] = m, l[i + 3] = y },
        n = Konva.Util.createCanvasElement();
    Konva.Filters.Kaleidoscope = function(i) { var a, r, o, s, h, c, l, d, u, v, f = i.width,
            g = i.height,
            p = Math.round(this.kaleidoscopePower()),
            m = Math.round(this.kaleidoscopeAngle()),
            y = Math.floor(f * (m % 360) / 360); if (!(p < 1)) { n.width = f, n.height = g; var _ = n.getContext("2d").getImageData(0, 0, f, g);
            t(i, _, { polarCenterX: f / 2, polarCenterY: g / 2 }); for (var K = f / Math.pow(2, p); K <= 8;) K *= 2, p -= 1;
            K = Math.ceil(K); var S = K,
                C = 0,
                x = S,
                w = 1; for (y + K > f && (C = S, x = 0, w = -1), r = 0; r < g; r += 1)
                for (a = C; a !== x; a += w) o = Math.round(a + y) % f, u = 4 * (f * r + o), h = _.data[u + 0], c = _.data[u + 1], l = _.data[u + 2], d = _.data[u + 3], v = 4 * (f * r + a), _.data[v + 0] = h, _.data[v + 1] = c, _.data[v + 2] = l, _.data[v + 3] = d; for (r = 0; r < g; r += 1)
                for (S = Math.floor(K), s = 0; s < p; s += 1) { for (a = 0; a < S + 1; a += 1) u = 4 * (f * r + a), h = _.data[u + 0], c = _.data[u + 1], l = _.data[u + 2], d = _.data[u + 3], v = 4 * (f * r + 2 * S - a - 1), _.data[v + 0] = h, _.data[v + 1] = c, _.data[v + 2] = l, _.data[v + 3] = d;
                    S *= 2 }
            e(_, i, { polarRotation: 0 }) } }, Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopePower", 2, null, Konva.Factory.afterSetFilter), Konva.Factory.addGetterSetter(Konva.Node, "kaleidoscopeAngle", 0, null, Konva.Factory.afterSetFilter) }(),
function() { "use strict";
    Konva.Container = function(t) { this.__init(t) }, Konva.Util.addMethods(Konva.Container, { __init: function(t) { this.children = new Konva.Collection, Konva.Node.call(this, t) }, getChildren: function(t) { if (!t) return this.children; var e = new Konva.Collection; return this.children.each(function(n) { t(n) && e.push(n) }), e }, hasChildren: function() { return this.getChildren().length > 0 }, removeChildren: function() { for (var t, e = Konva.Collection.toCollection(this.children), n = 0; n < e.length; n++) t = e[n], delete t.parent, t.index = 0, t.remove(); return e = null, this.children = new Konva.Collection, this }, destroyChildren: function() { for (var t, e = Konva.Collection.toCollection(this.children), n = 0; n < e.length; n++) t = e[n], delete t.parent, t.index = 0, t.destroy(); return e = null, this.children = new Konva.Collection, this }, add: function(t) { if (arguments.length > 1) { for (var e = 0; e < arguments.length; e++) this.add(arguments[e]); return this } if (t.getParent()) return t.moveTo(this), this; var n = this.children; return this._validateAdd(t), t.index = n.length, t.parent = this, n.push(t), this._fire("add", { child: t }), Konva.DD && t.isDragging() && Konva.DD.anim.setLayers(t.getLayer()), this }, destroy: function() { return this.hasChildren() && this.destroyChildren(), Konva.Node.prototype.destroy.call(this), this }, find: function(t) { var e, n, i, a, r, o, s, h = [],
                c = t.replace(/ /g, "").split(","),
                l = c.length; for (e = 0; e < l; e++)
                if (i = c[e], Konva.Util.isValidSelector(i) || (Konva.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), Konva.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), Konva.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0))(r = this._getNodeById(i.slice(1))) && h.push(r);
                else if ("." === i.charAt(0)) a = this._getNodesByName(i.slice(1)), h = h.concat(a);
            else
                for (o = this.getChildren(), s = o.length, n = 0; n < s; n++) h = h.concat(o[n]._get(i)); return Konva.Collection.toCollection(h) }, findOne: function(t) { return this.find(t)[0] }, _getNodeById: function(t) { var e = Konva.ids[t]; return void 0 !== e && this.isAncestorOf(e) ? e : null }, _getNodesByName: function(t) { var e = Konva.names[t] || []; return this._getDescendants(e) }, _get: function(t) { for (var e = Konva.Node.prototype._get.call(this, t), n = this.getChildren(), i = n.length, a = 0; a < i; a++) e = e.concat(n[a]._get(t)); return e }, toObject: function() { var t = Konva.Node.prototype.toObject.call(this);
            t.children = []; for (var e = this.getChildren(), n = e.length, i = 0; i < n; i++) { var a = e[i];
                t.children.push(a.toObject()) } return t }, _getDescendants: function(t) { for (var e = [], n = t.length, i = 0; i < n; i++) { var a = t[i];
                this.isAncestorOf(a) && e.push(a) } return e }, isAncestorOf: function(t) { for (var e = t.getParent(); e;) { if (e._id === this._id) return !0;
                e = e.getParent() } return !1 }, clone: function(t) { var e = Konva.Node.prototype.clone.call(this, t); return this.getChildren().each(function(t) { e.add(t.clone()) }), e }, getAllIntersections: function(t) { var e = []; return this.find("Shape").each(function(n) { n.isVisible() && n.intersects(t) && e.push(n) }), e }, _setChildrenIndices: function() { this.children.each(function(t, e) { t.index = e }) }, drawScene: function(t, e, n) { var i = this.getLayer(),
                a = t || i && i.getCanvas(),
                r = a && a.getContext(),
                o = this._cache.canvas,
                s = o && o.scene; return this.isVisible() && (!n && s ? (r.save(), i._applyTransform(this, r, e), this._drawCachedSceneCanvas(r), r.restore()) : this._drawChildren(a, "drawScene", e, !1, n)), this }, drawHit: function(t, e, n) { var i = this.getLayer(),
                a = t || i && i.hitCanvas,
                r = a && a.getContext(),
                o = this._cache.canvas,
                s = o && o.hit; return this.shouldDrawHit(a) && (i && i.clearHitCache(), !n && s ? (r.save(), i._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore()) : this._drawChildren(a, "drawHit", e)), this }, _drawChildren: function(t, e, n, i, a) { var r, o, s = this.getLayer(),
                h = t && t.getContext(),
                c = this.getClipWidth(),
                l = this.getClipHeight(),
                d = this.getClipFunc(),
                u = c && l || d; if (u && s) { h.save(); var v = this.getAbsoluteTransform(n),
                    f = v.getMatrix();
                h.transform(f[0], f[1], f[2], f[3], f[4], f[5]), h.beginPath(), d ? d.call(this, h, this) : (r = this.getClipX(), o = this.getClipY(), h.rect(r, o, c, l)), h.clip(), f = v.copy().invert().getMatrix(), h.transform(f[0], f[1], f[2], f[3], f[4], f[5]) }
            this.children.each(function(r) { r[e](t, n, i, a) }), u && h.restore() }, shouldDrawHit: function(t) { var e = this.getLayer(),
                n = Konva.DD,
                i = n && Konva.isDragging() && -1 !== Konva.DD.anim.getLayers().indexOf(e); return t && t.isCache || e && e.hitGraphEnabled() && this.isVisible() && !i }, getClientRect: function(t) { var e, n, i, a, r = { x: 0, y: 0, width: 0, height: 0 }; return this.children.each(function(t) { if (t.isVisible()) { var r = t.getClientRect();
                    void 0 === e ? (e = r.x, n = r.y, i = r.x + r.width, a = r.y + r.height) : (e = Math.min(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.x + r.width), a = Math.max(a, r.y + r.height)) } }), 0 !== this.children.length && (r = { x: e, y: n, width: i - e, height: a - n }), t ? r : this._transformedRect(r) } }), Konva.Util.extend(Konva.Container, Konva.Node), Konva.Container.prototype.get = Konva.Container.prototype.find, Konva.Factory.addComponentsGetterSetter(Konva.Container, "clip", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Container, "clipX"), Konva.Factory.addGetterSetter(Konva.Container, "clipY"), Konva.Factory.addGetterSetter(Konva.Container, "clipWidth"), Konva.Factory.addGetterSetter(Konva.Container, "clipHeight"), Konva.Factory.addGetterSetter(Konva.Container, "clipFunc"), Konva.Collection.mapMethods(Konva.Container) }(),
function(t) { "use strict";

    function e(t) { t.fill() }

    function n(t) { t.stroke() }

    function i(t) { t.fill() }

    function a(t) { t.stroke() }

    function r() { this._clearCache(s) }

    function o() { this._clearCache(h) } var s = "hasShadow",
        h = "shadowRGBA";
    t.Shape = function(t) { this.__init(t) }, t.Util.addMethods(t.Shape, { __init: function(s) { this.nodeType = "Shape", this._fillFunc = e, this._strokeFunc = n, this._fillFuncHit = i, this._strokeFuncHit = a; for (var h, c = t.shapes;;)
                if ((h = t.Util.getRandomColor()) && !(h in c)) break;
            this.colorKey = h, c[h] = this, t.Node.call(this, s), this.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", r), this.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", o) }, hasChildren: function() { return !1 }, getChildren: function() { return [] }, getContext: function() { return this.getLayer().getContext() }, getCanvas: function() { return this.getLayer().getCanvas() }, hasShadow: function() { return this._getCache(s, this._hasShadow) }, _hasShadow: function() { return this.getShadowEnabled() && 0 !== this.getShadowOpacity() && !!(this.getShadowColor() || this.getShadowBlur() || this.getShadowOffsetX() || this.getShadowOffsetY()) }, getShadowRGBA: function() { return this._getCache(h, this._getShadowRGBA) }, _getShadowRGBA: function() { if (this.hasShadow()) { var e = t.Util.colorToRGBA(this.shadowColor()); return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a * (this.getShadowOpacity() || 1) + ")" } }, hasFill: function() { return !!(this.getFill() || this.getFillPatternImage() || this.getFillLinearGradientColorStops() || this.getFillRadialGradientColorStops()) }, hasStroke: function() { return this.strokeEnabled() && !!this.stroke() }, intersects: function(t) { var e, n = this.getStage(),
                i = n.bufferHitCanvas; return i.getContext().clear(), this.drawHit(i), e = i.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data, e[3] > 0 }, destroy: function() { return t.Node.prototype.destroy.call(this), delete t.shapes[this.colorKey], this }, _useBufferCanvas: function(t) { return !t && this.perfectDrawEnabled() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage() || this.perfectDrawEnabled() && this.hasShadow() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage() }, getSelfRect: function() { var t = this.getSize(); return { x: this._centroid ? Math.round(-t.width / 2) : 0, y: this._centroid ? Math.round(-t.height / 2) : 0, width: t.width, height: t.height } }, getClientRect: function(t) { var e = this.getSelfRect(),
                n = this.hasStroke() && this.strokeWidth() || 0,
                i = e.width + n,
                a = e.height + n,
                r = this.hasShadow() ? this.shadowOffsetX() : 0,
                o = this.hasShadow() ? this.shadowOffsetY() : 0,
                s = i + Math.abs(r),
                h = a + Math.abs(o),
                c = this.hasShadow() && this.shadowBlur() || 0,
                l = s + 2 * c,
                d = h + 2 * c,
                u = 0;
            Math.round(n / 2) !== n / 2 && (u = 1); var v = { width: l + u, height: d + u, x: -Math.round(n / 2 + c) + Math.min(r, 0) + e.x, y: -Math.round(n / 2 + c) + Math.min(o, 0) + e.y }; return t ? v : this._transformedRect(v) }, drawScene: function(t, e, n, i) { var a, r, o, s = this.getLayer(),
                h = t || s.getCanvas(),
                c = h.getContext(),
                l = this._cache.canvas,
                d = this.sceneFunc(),
                u = this.hasShadow(),
                v = this.hasStroke(); if (!this.isVisible()) return this; if (l) return c.save(), s._applyTransform(this, c, e), this._drawCachedSceneCanvas(c), c.restore(), this; if (!d) return this; if (c.save(), this._useBufferCanvas(n) && !i) { if (a = this.getStage(), r = a.bufferCanvas, o = r.getContext(), o.clear(), o.save(), o._applyLineJoin(this), !n)
                    if (s) s._applyTransform(this, o, e);
                    else { var f = this.getAbsoluteTransform(e).getMatrix();
                        c.transform(f[0], f[1], f[2], f[3], f[4], f[5]) }
                d.call(this, o), o.restore(); var g = r.pixelRatio;
                u && !h.hitCanvas ? (c.save(), c._applyShadow(this), c._applyOpacity(this), c._applyGlobalCompositeOperation(this), c.drawImage(r._canvas, 0, 0, r.width / g, r.height / g), c.restore()) : (c._applyOpacity(this), c._applyGlobalCompositeOperation(this), c.drawImage(r._canvas, 0, 0, r.width / g, r.height / g)) } else { if (c._applyLineJoin(this), !n)
                    if (s) s._applyTransform(this, c, e);
                    else { var p = this.getAbsoluteTransform(e).getMatrix();
                        c.transform(p[0], p[1], p[2], p[3], p[4], p[5]) }
                u && v && !h.hitCanvas ? (c.save(), n || (c._applyOpacity(this), c._applyGlobalCompositeOperation(this)), c._applyShadow(this), d.call(this, c), c.restore(), this.hasFill() && this.getShadowForStrokeEnabled() && d.call(this, c)) : u && !h.hitCanvas ? (c.save(), n || (c._applyOpacity(this), c._applyGlobalCompositeOperation(this)), c._applyShadow(this), d.call(this, c), c.restore()) : (n || (c._applyOpacity(this), c._applyGlobalCompositeOperation(this)), d.call(this, c)) } return c.restore(), this }, drawHit: function(t, e, n) { var i = this.getLayer(),
                a = t || i.hitCanvas,
                r = a.getContext(),
                o = this.hitFunc() || this.sceneFunc(),
                s = this._cache.canvas,
                h = s && s.hit; if (!this.shouldDrawHit(a)) return this; if (i && i.clearHitCache(), h) return r.save(), i._applyTransform(this, r, e), this._drawCachedHitCanvas(r), r.restore(), this; if (!o) return this; if (r.save(), r._applyLineJoin(this), !n)
                if (i) i._applyTransform(this, r, e);
                else { var c = this.getAbsoluteTransform(e).getMatrix();
                    r.transform(c[0], c[1], c[2], c[3], c[4], c[5]) }
            return o.call(this, r), r.restore(), this }, drawHitFromCache: function(e) { var n, i, a, r, o, s, h = e || 0,
                c = this._cache.canvas,
                l = this._getCachedSceneCanvas(),
                d = c.hit,
                u = d.getContext(),
                v = d.getWidth(),
                f = d.getHeight();
            u.clear(), u.drawImage(l._canvas, 0, 0, v, f); try { for (n = u.getImageData(0, 0, v, f), i = n.data, a = i.length, r = t.Util._hexToRgb(this.colorKey), o = 0; o < a; o += 4) s = i[o + 3], s > h ? (i[o] = r.r, i[o + 1] = r.g, i[o + 2] = r.b, i[o + 3] = 255) : i[o + 3] = 0;
                u.putImageData(n, 0, 0) } catch (e) { t.Util.error("Unable to draw hit graph from cached scene canvas. " + e.message) } return this } }), t.Util.extend(t.Shape, t.Node), t.Factory.addGetterSetter(t.Shape, "stroke"), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "strokeAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "strokeWidth", 2), t.Factory.addGetterSetter(t.Shape, "strokeHitEnabled", !0), t.Factory.addGetterSetter(t.Shape, "perfectDrawEnabled", !0), t.Factory.addGetterSetter(t.Shape, "shadowForStrokeEnabled", !0), t.Factory.addGetterSetter(t.Shape, "lineJoin"), t.Factory.addGetterSetter(t.Shape, "lineCap"), t.Factory.addGetterSetter(t.Shape, "sceneFunc"), t.Factory.addGetterSetter(t.Shape, "hitFunc"), t.Factory.addGetterSetter(t.Shape, "dash"), t.Factory.addGetterSetter(t.Shape, "dashOffset", 0), t.Factory.addGetterSetter(t.Shape, "shadowColor"), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "shadowAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "shadowBlur"), t.Factory.addGetterSetter(t.Shape, "shadowOpacity"), t.Factory.addComponentsGetterSetter(t.Shape, "shadowOffset", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "shadowOffsetX", 0), t.Factory.addGetterSetter(t.Shape, "shadowOffsetY", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternImage"), t.Factory.addGetterSetter(t.Shape, "fill"), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillRed", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillGreen", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillBlue", 0, t.Validators.RGBComponent), t.Factory.addDeprecatedGetterSetter(t.Shape, "fillAlpha", 1, t.Validators.alphaComponent), t.Factory.addGetterSetter(t.Shape, "fillPatternX", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternY", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientColorStops"), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartRadius", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndRadius", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientColorStops"), t.Factory.addGetterSetter(t.Shape, "fillPatternRepeat", "repeat"), t.Factory.addGetterSetter(t.Shape, "fillEnabled", !0), t.Factory.addGetterSetter(t.Shape, "strokeEnabled", !0), t.Factory.addGetterSetter(t.Shape, "shadowEnabled", !0), t.Factory.addGetterSetter(t.Shape, "dashEnabled", !0), t.Factory.addGetterSetter(t.Shape, "strokeScaleEnabled", !0), t.Factory.addGetterSetter(t.Shape, "fillPriority", "color"), t.Factory.addComponentsGetterSetter(t.Shape, "fillPatternOffset", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillPatternOffsetX", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternOffsetY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillPatternScale", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillPatternScaleX", 1), t.Factory.addGetterSetter(t.Shape, "fillPatternScaleY", 1), t.Factory.addComponentsGetterSetter(t.Shape, "fillLinearGradientStartPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientStartPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientStartPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillLinearGradientEndPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientEndPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillLinearGradientEndPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillRadialGradientStartPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientStartPointY", 0), t.Factory.addComponentsGetterSetter(t.Shape, "fillRadialGradientEndPoint", ["x", "y"]), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndPointX", 0), t.Factory.addGetterSetter(t.Shape, "fillRadialGradientEndPointY", 0), t.Factory.addGetterSetter(t.Shape, "fillPatternRotation", 0), t.Factory.backCompat(t.Shape, { dashArray: "dash", getDashArray: "getDash", setDashArray: "getDash", drawFunc: "sceneFunc", getDrawFunc: "getSceneFunc", setDrawFunc: "setSceneFunc", drawHitFunc: "hitFunc", getDrawHitFunc: "getHitFunc", setDrawHitFunc: "setHitFunc" }), t.Collection.mapMethods(t.Shape) }(Konva),
function() { "use strict";

    function t(t, n) { t.content.addEventListener(n, function(i) { t[e + n](i) }, !1) } var e = "_",
        n = ["mousedown", "mousemove", "mouseup", "mouseout", "touchstart", "touchmove", "touchend", "mouseover", "wheel", "contextmenu"],
        i = n.length;
    Konva.Stage = function(t) { this.___init(t) }, Konva.Util.addMethods(Konva.Stage, { ___init: function(t) { this.nodeType = "Stage", Konva.Container.call(this, t), this._id = Konva.idCounter++, this._buildDOM(), this._bindContentEvents(), this._enableNestedTransforms = !1, Konva.stages.push(this) }, _validateAdd: function(t) { "Layer" !== t.getType() && Konva.Util.throw("You may only add layers to the stage.") }, setContainer: function(t) { if ("string" == typeof t) { if ("." === t.charAt(0)) { var e = t.slice(1);
                    t = Konva.document.getElementsByClassName(e)[0] } else { var n;
                    n = "#" !== t.charAt(0) ? t : t.slice(1), t = Konva.document.getElementById(n) } if (!t) throw "Can not find container in document with id " + n } return this._setAttr("container", t), this }, shouldDrawHit: function() { return !0 }, draw: function() { return Konva.Node.prototype.draw.call(this), this }, setHeight: function(t) { return Konva.Node.prototype.setHeight.call(this, t), this._resizeDOM(), this }, setWidth: function(t) { return Konva.Node.prototype.setWidth.call(this, t), this._resizeDOM(), this }, clear: function() { var t, e = this.children,
                n = e.length; for (t = 0; t < n; t++) e[t].clear(); return this }, clone: function(t) { return t || (t = {}), t.container = Konva.document.createElement("div"), Konva.Container.prototype.clone.call(this, t) }, destroy: function() { var t = this.content;
            Konva.Container.prototype.destroy.call(this), t && Konva.Util._isInDocument(t) && this.getContainer().removeChild(t); var e = Konva.stages.indexOf(this); return e > -1 && Konva.stages.splice(e, 1), this }, getPointerPosition: function() { return this.pointerPos }, getStage: function() { return this }, getContent: function() { return this.content }, toDataURL: function(t) { t = t || {}; var e = t.mimeType || null,
                n = t.quality || null,
                i = t.x || 0,
                a = t.y || 0,
                r = new Konva.SceneCanvas({ width: t.width || this.getWidth(), height: t.height || this.getHeight(), pixelRatio: t.pixelRatio }),
                o = r.getContext()._context,
                s = this.children;
            (i || a) && o.translate(-1 * i, -1 * a), s.each(function(t) { var e = t.getCanvas().getWidth(),
                    n = t.getCanvas().getHeight(),
                    i = t.getCanvas().getPixelRatio();
                o.drawImage(t.getCanvas()._canvas, 0, 0, e / i, n / i) }); var h = r.toDataURL(e, n); return t.callback && t.callback(h), h }, toImage: function(t) { var e = t.callback;
            t.callback = function(t) { Konva.Util._getImage(t, function(t) { e(t) }) }, this.toDataURL(t) }, getIntersection: function(t, e) { var n, i, a = this.getChildren(),
                r = a.length,
                o = r - 1; for (n = o; n >= 0; n--)
                if (i = a[n].getIntersection(t, e)) return i;
            return null }, _resizeDOM: function() { if (this.content) { var t, e, n = this.getWidth(),
                    i = this.getHeight(),
                    a = this.getChildren(),
                    r = a.length; for (this.content.style.width = n + "px", this.content.style.height = i + "px", this.bufferCanvas.setSize(n, i), this.bufferHitCanvas.setSize(n, i), t = 0; t < r; t++) e = a[t], e.setSize(n, i), e.batchDraw() } }, add: function(t) { if (arguments.length > 1) { for (var e = 0; e < arguments.length; e++) this.add(arguments[e]); return this } return Konva.Container.prototype.add.call(this, t), t._setCanvasSize(this.width(), this.height()), t.draw(), this.content.appendChild(t.canvas._canvas), this }, getParent: function() { return null }, getLayer: function() { return null }, getLayers: function() { return this.getChildren() }, _bindContentEvents: function() { for (var e = 0; e < i; e++) t(this, n[e]) }, _mouseover: function(t) { Konva.UA.mobile || (this._setPointerPosition(t), this._fire("contentMouseover", { evt: t })) }, _mouseout: function(t) { if (!Konva.UA.mobile) { this._setPointerPosition(t); var e = this.targetShape;
                e && !Konva.isDragging() && (e._fireAndBubble("mouseout", { evt: t }), e._fireAndBubble("mouseleave", { evt: t }), this.targetShape = null), this.pointerPos = void 0, this._fire("contentMouseout", { evt: t }) } }, _mousemove: function(t) { if (Konva.UA.ieMobile) return this._touchmove(t); if ((void 0 !== t.movementX || void 0 !== t.movementY) && 0 === t.movementY && 0 === t.movementX) return null; if (Konva.UA.mobile) return null;
            this._setPointerPosition(t); var e;
            Konva.isDragging() || (e = this.getIntersection(this.getPointerPosition()), e && e.isListening() ? Konva.isDragging() || this.targetShape && this.targetShape._id === e._id ? e._fireAndBubble("mousemove", { evt: t }) : (this.targetShape && (this.targetShape._fireAndBubble("mouseout", { evt: t }, e), this.targetShape._fireAndBubble("mouseleave", { evt: t }, e)), e._fireAndBubble("mouseover", { evt: t }, this.targetShape), e._fireAndBubble("mouseenter", { evt: t }, this.targetShape), this.targetShape = e) : this.targetShape && !Konva.isDragging() && (this.targetShape._fireAndBubble("mouseout", { evt: t }), this.targetShape._fireAndBubble("mouseleave", { evt: t }), this.targetShape = null), this._fire("contentMousemove", { evt: t })), t.preventDefault && t.preventDefault() }, _mousedown: function(t) { if (Konva.UA.ieMobile) return this._touchstart(t); if (!Konva.UA.mobile) { this._setPointerPosition(t); var e = this.getIntersection(this.getPointerPosition());
                Konva.listenClickTap = !0, e && e.isListening() && (this.clickStartShape = e, e._fireAndBubble("mousedown", { evt: t })), this._fire("contentMousedown", { evt: t }) }
            t.preventDefault && t.preventDefault() }, _mouseup: function(t) { if (Konva.UA.ieMobile) return this._touchend(t); if (!Konva.UA.mobile) { this._setPointerPosition(t); var e = this.getIntersection(this.getPointerPosition()),
                    n = this.clickStartShape,
                    i = !1,
                    a = Konva.DD;
                Konva.inDblClickWindow ? (i = !0, Konva.inDblClickWindow = !1) : a && a.justDragged ? a && (a.justDragged = !1) : Konva.inDblClickWindow = !0, setTimeout(function() { Konva.inDblClickWindow = !1 }, Konva.dblClickWindow), e && e.isListening() && (e._fireAndBubble("mouseup", { evt: t }), Konva.listenClickTap && n && n._id === e._id && (e._fireAndBubble("click", { evt: t }), i && e._fireAndBubble("dblclick", { evt: t }))), this._fire("contentMouseup", { evt: t }), Konva.listenClickTap && (this._fire("contentClick", { evt: t }), i && this._fire("contentDblclick", { evt: t })), Konva.listenClickTap = !1 }
            t.preventDefault && t.preventDefault() }, _contextmenu: function(t) { this._fire("contentContextmenu", { evt: t }) }, _touchstart: function(t) { this._setPointerPosition(t); var e = this.getIntersection(this.getPointerPosition());
            Konva.listenClickTap = !0, e && e.isListening() && (this.tapStartShape = e, e._fireAndBubble("touchstart", { evt: t }), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire("contentTouchstart", { evt: t }) }, _touchend: function(t) { this._setPointerPosition(t); var e = this.getIntersection(this.getPointerPosition()),
                n = !1;
            Konva.inDblClickWindow ? (n = !0, Konva.inDblClickWindow = !1) : Konva.inDblClickWindow = !0, setTimeout(function() { Konva.inDblClickWindow = !1 }, Konva.dblClickWindow), e && e.isListening() && (e._fireAndBubble("touchend", { evt: t }), Konva.listenClickTap && this.tapStartShape && e._id === this.tapStartShape._id && (e._fireAndBubble("tap", { evt: t }), n && e._fireAndBubble("dbltap", { evt: t })), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire("contentTouchend", { evt: t }), Konva.listenClickTap && (this._fire("contentTap", { evt: t }), n && this._fire("contentDbltap", { evt: t })), Konva.listenClickTap = !1 }, _touchmove: function(t) { this._setPointerPosition(t); var e, n = Konva.DD;
            Konva.isDragging() || (e = this.getIntersection(this.getPointerPosition()), e && e.isListening() && (e._fireAndBubble("touchmove", { evt: t }), e.isListening() && e.preventDefault() && t.preventDefault && t.preventDefault()), this._fire("contentTouchmove", { evt: t })), n && Konva.isDragging() && Konva.DD.node.preventDefault() && t.preventDefault() }, _wheel: function(t) { this._setPointerPosition(t); var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() && e._fireAndBubble("wheel", { evt: t }), this._fire("contentWheel", { evt: t }) }, _setPointerPosition: function(t) { var e = this._getContentPosition(),
                n = null,
                i = null; if (t = t || window.event, void 0 !== t.touches) { if (t.touches.length > 0) { var a = t.touches[0];
                    n = a.clientX - e.left, i = a.clientY - e.top } } else n = t.clientX - e.left, i = t.clientY - e.top;
            null !== n && null !== i && (this.pointerPos = { x: n, y: i }) }, _getContentPosition: function() { var t = this.content.getBoundingClientRect ? this.content.getBoundingClientRect() : { top: 0, left: 0 }; return { top: t.top, left: t.left } }, _buildDOM: function() { var t = this.getContainer(); if (!t) { if (Konva.Util.isBrowser()) throw "Stage has no container. A container is required.";
                t = Konva.document.createElement("div") }
            t.innerHTML = "", this.content = Konva.document.createElement("div"), this.content.style.position = "relative", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), t.appendChild(this.content), this.bufferCanvas = new Konva.SceneCanvas, this.bufferHitCanvas = new Konva.HitCanvas({ pixelRatio: 1 }), this._resizeDOM() }, _onContent: function(t, e) { var n, i, a = t.split(" "),
                r = a.length; for (n = 0; n < r; n++) i = a[n], this.content.addEventListener(i, e, !1) }, cache: function() { Konva.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.") }, clearCache: function() {} }), Konva.Util.extend(Konva.Stage, Konva.Container), Konva.Factory.addGetter(Konva.Stage, "container"), Konva.Factory.addOverloadedGetterSetter(Konva.Stage, "container") }(),
function() { "use strict";
    Konva.BaseLayer = function(t) { this.___init(t) }, Konva.Util.addMethods(Konva.BaseLayer, { ___init: function(t) { this.nodeType = "Layer", Konva.Container.call(this, t) }, createPNGStream: function() { return this.canvas._canvas.createPNGStream() }, getCanvas: function() { return this.canvas }, getHitCanvas: function() { return this.hitCanvas }, getContext: function() { return this.getCanvas().getContext() }, clear: function(t) { return this.getContext().clear(t), this }, clearHitCache: function() { this._hitImageData = void 0 }, setZIndex: function(t) { Konva.Node.prototype.setZIndex.call(this, t); var e = this.getStage(); return e && (e.content.removeChild(this.getCanvas()._canvas), t < e.getChildren().length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.getChildren()[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas)), this }, moveToTop: function() { Konva.Node.prototype.moveToTop.call(this); var t = this.getStage(); return t && (t.content.removeChild(this.getCanvas()._canvas), t.content.appendChild(this.getCanvas()._canvas)), this }, moveUp: function() { if (!Konva.Node.prototype.moveUp.call(this)) return this; var t = this.getStage(); return t ? (t.content.removeChild(this.getCanvas()._canvas), this.index < t.getChildren().length - 1 ? t.content.insertBefore(this.getCanvas()._canvas, t.getChildren()[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getCanvas()._canvas), this) : this }, moveDown: function() { if (Konva.Node.prototype.moveDown.call(this)) { var t = this.getStage(); if (t) { var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas) } } return this }, moveToBottom: function() { if (Konva.Node.prototype.moveToBottom.call(this)) { var t = this.getStage(); if (t) { var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas) } } return this }, getLayer: function() { return this }, remove: function() { var t = this.getCanvas()._canvas; return Konva.Node.prototype.remove.call(this), t && t.parentNode && Konva.Util._isInDocument(t) && t.parentNode.removeChild(t), this }, getStage: function() { return this.parent }, setSize: function(t, e) { return this.canvas.setSize(t, e), this }, getWidth: function() { if (this.parent) return this.parent.getWidth() }, setWidth: function() { Konva.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.') }, getHeight: function() { if (this.parent) return this.parent.getHeight() }, setHeight: function() { Konva.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.') }, _applyTransform: function(t, e, n) { var i = t.getAbsoluteTransform(n).getMatrix();
            e.transform(i[0], i[1], i[2], i[3], i[4], i[5]) } }), Konva.Util.extend(Konva.BaseLayer, Konva.Container), Konva.Factory.addGetterSetter(Konva.BaseLayer, "clearBeforeDraw", !0), Konva.Collection.mapMethods(Konva.BaseLayer) }(),
function() {
    "use strict";
    var t = [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
        e = t.length;
    Konva.Layer = function(t) { this.____init(t) }, Konva.Util.addMethods(Konva.Layer, {
        ____init: function(t) { this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, this.hitCanvas = new Konva.HitCanvas({ pixelRatio: 1 }), Konva.BaseLayer.call(this, t) },
        _setCanvasSize: function(t, e) { this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e) },
        _validateAdd: function(t) { var e = t.getType(); "Group" !== e && "Shape" !== e && Konva.Util.throw("You may only add groups and shapes to a layer.") },
        getIntersection: function(n, i) { var a, r, o, s; if (!this.hitGraphEnabled() || !this.isVisible()) return null; for (var h = 1, c = !1;;) { for (r = 0; r < e; r++) { if (o = t[r], a = this._getIntersection({ x: n.x + o.x * h, y: n.y + o.y * h }), (s = a.shape) && i) return s.findAncestor(i, !0); if (s) return s; if (c = !!a.antialiased, !a.antialiased) break } if (!c) return null;
                h += 1 } },
        _getImageData: function(t, e) { var n = this.hitCanvas.width || 1,
                i = this.hitCanvas.height || 1,
                a = Math.round(e) * n + Math.round(t); return this._hitImageData || (this._hitImageData = this.hitCanvas.context.getImageData(0, 0, n, i)), [this._hitImageData.data[4 * a + 0], this._hitImageData.data[4 * a + 1], this._hitImageData.data[4 * a + 2], this._hitImageData.data[4 * a + 3]] },
        _getIntersection: function(t) { var e, n, i = this.hitCanvas.pixelRatio,
                a = this.hitCanvas.context.getImageData(Math.round(t.x * i), Math.round(t.y * i), 1, 1).data,
                r = a[3]; return 255 === r ? (e = Konva.Util._rgbToHex(a[0], a[1], a[2]), n = Konva.shapes["#" + e], n ? { shape: n } : { antialiased: !0 }) : r > 0 ? { antialiased: !0 } : {} },
        drawScene: function(t, e) { var n = this.getLayer(),
                i = t || n && n.getCanvas(); return this._fire("beforeDraw", { node: this }), this.getClearBeforeDraw() && i.getContext().clear(), Konva.Container.prototype.drawScene.call(this, i, e), this._fire("draw", { node: this }), this },
        drawHit: function(t, e) { var n = this.getLayer(),
                i = t || n && n.hitCanvas; return n && n.getClearBeforeDraw() && n.getHitCanvas().getContext().clear(), Konva.Container.prototype.drawHit.call(this, i, e), this.imageData = null, this },
        clear: function(t) { return Konva.BaseLayer.prototype.clear.call(this, t), this.getHitCanvas().getContext().clear(t), this.imageData = null, this },
        setVisible: function(t) { return Konva.Node.prototype.setVisible.call(this, t), t ? (this.getCanvas()._canvas.style.display = "block", this.hitCanvas._canvas.style.display = "block") : (this.getCanvas()._canvas.style.display = "none", this.hitCanvas._canvas.style.display = "none"), this },
        enableHitGraph: function() { return this.setHitGraphEnabled(!0), this },
        disableHitGraph: function() { return this.setHitGraphEnabled(!1), this },
        setSize: function(t, e) { return Konva.BaseLayer.prototype.setSize.call(this, t, e), this.hitCanvas.setSize(t, e), this }
    }), Konva.Util.extend(Konva.Layer, Konva.BaseLayer), Konva.Factory.addGetterSetter(Konva.Layer, "hitGraphEnabled", !0), Konva.Collection.mapMethods(Konva.Layer)
}(),
function() { "use strict";
    Konva.FastLayer = function(t) { this.____init(t) }, Konva.Util.addMethods(Konva.FastLayer, { ____init: function(t) { this.nodeType = "Layer", this.canvas = new Konva.SceneCanvas, Konva.BaseLayer.call(this, t) }, _validateAdd: function(t) { "Shape" !== t.getType() && Konva.Util.throw("You may only add shapes to a fast layer.") }, _setCanvasSize: function(t, e) { this.canvas.setSize(t, e) }, hitGraphEnabled: function() { return !1 }, getIntersection: function() { return null }, drawScene: function(t) { var e = this.getLayer(),
                n = t || e && e.getCanvas(); return this.getClearBeforeDraw() && n.getContext().clear(), Konva.Container.prototype.drawScene.call(this, n), this }, draw: function() { return this.drawScene(), this }, setVisible: function(t) { return Konva.Node.prototype.setVisible.call(this, t), this.getCanvas()._canvas.style.display = t ? "block" : "none", this } }), Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer), Konva.Collection.mapMethods(Konva.FastLayer) }(),
function() { "use strict";
    Konva.Group = function(t) { this.___init(t) }, Konva.Util.addMethods(Konva.Group, { ___init: function(t) { this.nodeType = "Group", Konva.Container.call(this, t) }, _validateAdd: function(t) { var e = t.getType(); "Group" !== e && "Shape" !== e && Konva.Util.throw("You may only add groups and shapes to groups.") } }), Konva.Util.extend(Konva.Group, Konva.Container), Konva.Collection.mapMethods(Konva.Group) }(),
function(t) { "use strict";

    function e(t) { setTimeout(t, 1e3 / 60) }

    function n() { return a.apply(t.global, arguments) } var i = function() { return t.global.performance && t.global.performance.now ? function() { return t.global.performance.now() } : function() { return (new Date).getTime() } }(),
        a = function() { return t.global.requestAnimationFrame || t.global.webkitRequestAnimationFrame || t.global.mozRequestAnimationFrame || t.global.oRequestAnimationFrame || t.global.msRequestAnimationFrame || e }();
    t.Animation = function(e, n) { var a = t.Animation;
        this.func = e, this.setLayers(n), this.id = a.animIdCounter++, this.frame = { time: 0, timeDiff: 0, lastTime: i() } }, t.Animation.prototype = { setLayers: function(t) { var e = []; return e = t ? t.length > 0 ? t : [t] : [], this.layers = e, this }, getLayers: function() { return this.layers }, addLayer: function(t) { var e, n = this.layers,
                i = n.length; for (e = 0; e < i; e++)
                if (n[e]._id === t._id) return !1;
            return this.layers.push(t), !0 }, isRunning: function() { var e, n = t.Animation,
                i = n.animations,
                a = i.length; for (e = 0; e < a; e++)
                if (i[e].id === this.id) return !0;
            return !1 }, start: function() { var e = t.Animation; return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = i(), e._addAnimation(this), this }, stop: function() { return t.Animation._removeAnimation(this), this }, _updateFrameObject: function(t) { this.frame.timeDiff = t - this.frame.lastTime, this.frame.lastTime = t, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff } }, t.Animation.animations = [], t.Animation.animIdCounter = 0, t.Animation.animRunning = !1, t.Animation._addAnimation = function(t) { this.animations.push(t), this._handleAnimation() }, t.Animation._removeAnimation = function(t) { var e, n = t.id,
            i = this.animations,
            a = i.length; for (e = 0; e < a; e++)
            if (i[e].id === n) { this.animations.splice(e, 1); break } }, t.Animation._runFrames = function() { var t, e, n, a, r, o, s, h, c = {},
            l = this.animations; for (a = 0; a < l.length; a++)
            if (t = l[a], e = t.layers, n = t.func, t._updateFrameObject(i()), o = e.length, !n || !1 !== n.call(t, t.frame))
                for (r = 0; r < o; r++) s = e[r], void 0 !== s._id && (c[s._id] = s);
        for (h in c) c.hasOwnProperty(h) && c[h].draw() }, t.Animation._animationLoop = function() { var e = t.Animation;
        e.animations.length ? (e._runFrames(), n(e._animationLoop)) : e.animRunning = !1 }, t.Animation._handleAnimation = function() { this.animRunning || (this.animRunning = !0, n(this._animationLoop)) }, t.BaseLayer.prototype.batchDraw = function() { var e = this,
            n = t.Animation; return this.batchAnim || (this.batchAnim = new n(function() { e.batchAnim.stop() }, this)), this.batchAnim.isRunning() || this.batchAnim.start(), this }, t.Stage.prototype.batchDraw = function() { return this.getChildren().each(function(t) { t.batchDraw() }), this } }(Konva),
function() { "use strict"; var t = { node: 1, duration: 1, easing: 1, onFinish: 1, yoyo: 1 },
        e = 0,
        n = ["fill", "stroke", "shadowColor"],
        i = function(t, e, n, i, a, r, o) { this.prop = t, this.propFunc = e, this.begin = i, this._pos = i, this.duration = r, this._change = 0, this.prevPos = 0, this.yoyo = o, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = n, this._change = a - this.begin, this.pause() };
    i.prototype = { fire: function(t) { var e = this[t];
            e && e() }, setTime: function(t) { t > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t, this.update()) }, getTime: function() { return this._time }, setPosition: function(t) { this.prevPos = this._pos, this.propFunc(t), this._pos = t }, getPosition: function(t) { return void 0 === t && (t = this._time), this.func(t, this.begin, this._change, this.duration) }, play: function() { this.state = 2, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay") }, reverse: function() { this.state = 3, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse") }, seek: function(t) { this.pause(), this._time = t, this.update(), this.fire("onSeek") }, reset: function() { this.pause(), this._time = 0, this.update(), this.fire("onReset") }, finish: function() { this.pause(), this._time = this.duration, this.update(), this.fire("onFinish") }, update: function() { this.setPosition(this.getPosition(this._time)) }, onEnterFrame: function() { var t = this.getTimer() - this._startTime;
            2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t) }, pause: function() { this.state = 1, this.fire("onPause") }, getTimer: function() { return (new Date).getTime() } }, Konva.Tween = function(n) { var a, r, o = this,
            s = n.node,
            h = s._id,
            c = n.easing || Konva.Easings.Linear,
            l = !!n.yoyo;
        a = void 0 === n.duration ? 1 : 0 === n.duration ? .001 : n.duration, this.node = s, this._id = e++; var d = s.getLayer() || (s instanceof Konva.Stage ? s.getLayers() : null);
        d || Konva.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new Konva.Animation(function() { o.tween.onEnterFrame() }, d), this.tween = new i(r, function(t) { o._tweenFunc(t) }, c, 0, 1, 1e3 * a, l), this._addListeners(), Konva.Tween.attrs[h] || (Konva.Tween.attrs[h] = {}), Konva.Tween.attrs[h][this._id] || (Konva.Tween.attrs[h][this._id] = {}), Konva.Tween.tweens[h] || (Konva.Tween.tweens[h] = {}); for (r in n) void 0 === t[r] && this._addAttr(r, n[r]);
        this.reset(), this.onFinish = n.onFinish, this.onReset = n.onReset }, Konva.Tween.attrs = {}, Konva.Tween.tweens = {}, Konva.Tween.prototype = { _addAttr: function(t, e) { var i, a, r, o, s, h, c, l = this.node,
                d = l._id; if (r = Konva.Tween.tweens[d][t], r && delete Konva.Tween.attrs[d][r][t], i = l.getAttr(t), Konva.Util._isArray(e))
                for (a = [], s = Math.max(e.length, i.length), "points" === t && e.length !== i.length && (e.length > i.length ? (c = i, i = Konva.Util._prepareArrayForTween(i, e, l.closed())) : (h = e, e = Konva.Util._prepareArrayForTween(e, i, l.closed()))), o = 0; o < s; o++) a.push(e[o] - i[o]);
            else if (-1 !== n.indexOf(t)) { i = Konva.Util.colorToRGBA(i); var u = Konva.Util.colorToRGBA(e);
                a = { r: u.r - i.r, g: u.g - i.g, b: u.b - i.b, a: u.a - i.a } } else a = e - i;
            Konva.Tween.attrs[d][this._id][t] = { start: i, diff: a, end: e, trueEnd: h, trueStart: c }, Konva.Tween.tweens[d][t] = this._id }, _tweenFunc: function(t) { var e, i, a, r, o, s, h, c, l = this.node,
                d = Konva.Tween.attrs[l._id][this._id]; for (e in d) { if (i = d[e], a = i.start, r = i.diff, c = i.end, Konva.Util._isArray(a))
                    for (o = [], h = Math.max(a.length, c.length), s = 0; s < h; s++) o.push((a[s] || 0) + r[s] * t);
                else o = -1 !== n.indexOf(e) ? "rgba(" + Math.round(a.r + r.r * t) + "," + Math.round(a.g + r.g * t) + "," + Math.round(a.b + r.b * t) + "," + (a.a + r.a * t) + ")" : a + r * t;
                l.setAttr(e, o) } }, _addListeners: function() { var t = this;
            this.tween.onPlay = function() { t.anim.start() }, this.tween.onReverse = function() { t.anim.start() }, this.tween.onPause = function() { t.anim.stop() }, this.tween.onFinish = function() { var e = t.node,
                    n = Konva.Tween.attrs[e._id][t._id];
                n.points && n.points.trueEnd && e.points(n.points.trueEnd), t.onFinish && t.onFinish.call(t) }, this.tween.onReset = function() { var e = t.node,
                    n = Konva.Tween.attrs[e._id][t._id];
                n.points && n.points.trueStart && e.points(n.points.trueStart), t.onReset && t.onReset() } }, play: function() { return this.tween.play(), this }, reverse: function() { return this.tween.reverse(), this }, reset: function() { return this.tween.reset(), this }, seek: function(t) { return this.tween.seek(1e3 * t), this }, pause: function() { return this.tween.pause(), this }, finish: function() { return this.tween.finish(), this }, destroy: function() { var t, e = this.node._id,
                n = this._id,
                i = Konva.Tween.tweens[e];
            this.pause(); for (t in i) delete Konva.Tween.tweens[e][t];
            delete Konva.Tween.attrs[e][n] } }, Konva.Node.prototype.to = function(t) { var e = t.onFinish;
        t.node = this, t.onFinish = function() { this.destroy(), e && e() }, new Konva.Tween(t).play() }, Konva.Easings = { BackEaseIn: function(t, e, n, i) { var a = 1.70158; return n * (t /= i) * t * ((a + 1) * t - a) + e }, BackEaseOut: function(t, e, n, i) { var a = 1.70158; return n * ((t = t / i - 1) * t * ((a + 1) * t + a) + 1) + e }, BackEaseInOut: function(t, e, n, i) { var a = 1.70158; return (t /= i / 2) < 1 ? n / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + e : n / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + e }, ElasticEaseIn: function(t, e, n, i, a, r) { var o = 0; return 0 === t ? e : 1 == (t /= i) ? e + n : (r || (r = .3 * i), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r) + e) }, ElasticEaseOut: function(t, e, n, i, a, r) { var o = 0; return 0 === t ? e : 1 == (t /= i) ? e + n : (r || (r = .3 * i), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), a * Math.pow(2, -10 * t) * Math.sin((t * i - o) * (2 * Math.PI) / r) + n + e) }, ElasticEaseInOut: function(t, e, n, i, a, r) { var o = 0; return 0 === t ? e : 2 == (t /= i / 2) ? e + n : (r || (r = i * (.3 * 1.5)), !a || a < Math.abs(n) ? (a = n, o = r / 4) : o = r / (2 * Math.PI) * Math.asin(n / a), t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r) * -.5 + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / r) * .5 + n + e) }, BounceEaseOut: function(t, e, n, i) { return (t /= i) < 1 / 2.75 ? n * (7.5625 * t * t) + e : t < 2 / 2.75 ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e }, BounceEaseIn: function(t, e, n, i) { return n - Konva.Easings.BounceEaseOut(i - t, 0, n, i) + e }, BounceEaseInOut: function(t, e, n, i) { return t < i / 2 ? .5 * Konva.Easings.BounceEaseIn(2 * t, 0, n, i) + e : .5 * Konva.Easings.BounceEaseOut(2 * t - i, 0, n, i) + .5 * n + e }, EaseIn: function(t, e, n, i) { return n * (t /= i) * t + e }, EaseOut: function(t, e, n, i) { return -n * (t /= i) * (t - 2) + e }, EaseInOut: function(t, e, n, i) { return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e }, StrongEaseIn: function(t, e, n, i) { return n * (t /= i) * t * t * t * t + e }, StrongEaseOut: function(t, e, n, i) { return n * ((t = t / i - 1) * t * t * t * t + 1) + e }, StrongEaseInOut: function(t, e, n, i) { return (t /= i / 2) < 1 ? n / 2 * t * t * t * t * t + e : n / 2 * ((t -= 2) * t * t * t * t + 2) + e }, Linear: function(t, e, n, i) { return n * t / i + e } } }(),
function() { "use strict";
    Konva.DD = { anim: new Konva.Animation(function() { var t = this.dirty; return this.dirty = !1, t }), isDragging: !1, justDragged: !1, offset: { x: 0, y: 0 }, node: null, _drag: function(t) { var e = Konva.DD,
                n = e.node; if (n) { if (!e.isDragging) { var i = n.getStage().getPointerPosition(),
                        a = n.dragDistance(); if (Math.max(Math.abs(i.x - e.startPointerPos.x), Math.abs(i.y - e.startPointerPos.y)) < a) return }
                n.getStage()._setPointerPosition(t), n._setDragPosition(t), e.isDragging || (e.isDragging = !0, n.fire("dragstart", { type: "dragstart", target: n, evt: t }, !0)), n.fire("dragmove", { type: "dragmove", target: n, evt: t }, !0) } }, _endDragBefore: function(t) { var e, n = Konva.DD,
                i = n.node;
            i && (e = i.getLayer(), n.anim.stop(), n.isDragging && (n.isDragging = !1, n.justDragged = !0, Konva.listenClickTap = !1, t && (t.dragEndNode = i)), delete n.node, (i.getLayer() || e || i instanceof Konva.Stage) && (e || i).draw()) }, _endDragAfter: function(t) { t = t || {}; var e = t.dragEndNode;
            t && e && e.fire("dragend", { type: "dragend", target: e, evt: t }, !0) } }, Konva.Node.prototype.startDrag = function() { var t = Konva.DD,
            e = this.getStage(),
            n = this.getLayer(),
            i = e.getPointerPosition(),
            a = this.getAbsolutePosition();
        i && (t.node && t.node.stopDrag(), t.node = this, t.startPointerPos = i, t.offset.x = i.x - a.x, t.offset.y = i.y - a.y, t.anim.setLayers(n || this.getLayers()), t.anim.start(), this._setDragPosition()) }, Konva.Node.prototype._setDragPosition = function(t) { var e = Konva.DD,
            n = this.getStage().getPointerPosition(),
            i = this.getDragBoundFunc(); if (n) { var a = { x: n.x - e.offset.x, y: n.y - e.offset.y };
            void 0 !== i && (a = i.call(this, a, t)), this.setAbsolutePosition(a), this._lastPos && this._lastPos.x === a.x && this._lastPos.y === a.y || (e.anim.dirty = !0), this._lastPos = a } }, Konva.Node.prototype.stopDrag = function() { var t = Konva.DD,
            e = {};
        t._endDragBefore(e), t._endDragAfter(e) }, Konva.Node.prototype.setDraggable = function(t) { this._setAttr("draggable", t), this._dragChange() }; var t = Konva.Node.prototype.remove;
    Konva.Node.prototype.__originalRemove = t, Konva.Node.prototype.remove = function() { var e = Konva.DD;
        e.node && e.node._id === this._id && this.stopDrag(), t.call(this) }, Konva.Node.prototype.isDragging = function() { var t = Konva.DD; return !(!t.node || t.node._id !== this._id || !t.isDragging) }, Konva.Node.prototype._listenDrag = function() { var t = this;
        this._dragCleanup(), "Stage" === this.getClassName() ? this.on("contentMousedown.konva contentTouchstart.konva", function(e) { Konva.DD.node || t.startDrag(e) }) : this.on("mousedown.konva touchstart.konva", function(e) { 1 !== e.evt.button && 2 !== e.evt.button && (Konva.DD.node || t.startDrag(e)) }) }, Konva.Node.prototype._dragChange = function() { if (this.attrs.draggable) this._listenDrag();
        else { this._dragCleanup(); var t = this.getStage(),
                e = Konva.DD;
            t && e.node && e.node._id === this._id && e.node.stopDrag() } }, Konva.Node.prototype._dragCleanup = function() { "Stage" === this.getClassName() ? (this.off("contentMousedown.konva"), this.off("contentTouchstart.konva")) : (this.off("mousedown.konva"), this.off("touchstart.konva")) }, Konva.Factory.addGetterSetter(Konva.Node, "dragBoundFunc"), Konva.Factory.addGetter(Konva.Node, "draggable", !1), Konva.Factory.addOverloadedGetterSetter(Konva.Node, "draggable"); var e = Konva.document.documentElement;
    e.addEventListener("mouseup", Konva.DD._endDragBefore, !0), e.addEventListener("touchend", Konva.DD._endDragBefore, !0), e.addEventListener("mousemove", Konva.DD._drag), e.addEventListener("touchmove", Konva.DD._drag), e.addEventListener("mouseup", Konva.DD._endDragAfter, !1), e.addEventListener("touchend", Konva.DD._endDragAfter, !1) }(),
function() { "use strict";
    Konva.Rect = function(t) { this.___init(t) }, Konva.Rect.prototype = { ___init: function(t) { Konva.Shape.call(this, t), this.className = "Rect", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e = this.getCornerRadius(),
                n = this.getWidth(),
                i = this.getHeight();
            t.beginPath(), e ? (e = Math.min(e, n / 2, i / 2), t.moveTo(e, 0), t.lineTo(n - e, 0), t.arc(n - e, e, e, 3 * Math.PI / 2, 0, !1), t.lineTo(n, i - e), t.arc(n - e, i - e, e, 0, Math.PI / 2, !1), t.lineTo(e, i), t.arc(e, i - e, e, Math.PI / 2, Math.PI, !1), t.lineTo(0, e), t.arc(e, e, e, Math.PI, 3 * Math.PI / 2, !1)) : t.rect(0, 0, n, i), t.closePath(), t.fillStrokeShape(this) } }, Konva.Util.extend(Konva.Rect, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Rect, "cornerRadius", 0), Konva.Collection.mapMethods(Konva.Rect) }(),
function() { "use strict"; var t = 2 * Math.PI - 1e-4;
    Konva.Circle = function(t) { this.___init(t) }, Konva.Circle.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Circle", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(e) { e.beginPath(), e.arc(0, 0, this.getRadius(), 0, t, !1), e.closePath(), e.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getRadius() }, getHeight: function() { return 2 * this.getRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) } }, Konva.Util.extend(Konva.Circle, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Circle, "radius", 0), Konva.Factory.addOverloadedGetterSetter(Konva.Circle, "radius"), Konva.Collection.mapMethods(Konva.Circle) }(),
function() { "use strict"; var t = 2 * Math.PI - 1e-4;
    Konva.Ellipse = function(t) { this.___init(t) }, Konva.Ellipse.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Ellipse", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(e) { var n = this.getRadiusX(),
                i = this.getRadiusY();
            e.beginPath(), e.save(), n !== i && e.scale(1, i / n), e.arc(0, 0, n, 0, t, !1), e.restore(), e.closePath(), e.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getRadiusX() }, getHeight: function() { return 2 * this.getRadiusY() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.setRadius({ x: t / 2 }) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.setRadius({ y: t / 2 }) } }, Konva.Util.extend(Konva.Ellipse, Konva.Shape), Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, "radius", ["x", "y"]), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusX", 0), Konva.Factory.addGetterSetter(Konva.Ellipse, "radiusY", 0), Konva.Collection.mapMethods(Konva.Ellipse) }(),
function() { "use strict"; var t = 2 * Math.PI - 1e-4;
    Konva.Ring = function(t) { this.___init(t) }, Konva.Ring.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Ring", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(e) { e.beginPath(), e.arc(0, 0, this.getInnerRadius(), 0, t, !1), e.moveTo(this.getOuterRadius(), 0), e.arc(0, 0, this.getOuterRadius(), t, 0, !0), e.closePath(), e.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getOuterRadius() }, getHeight: function() { return 2 * this.getOuterRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2) }, setOuterRadius: function(t) { this._setAttr("outerRadius", t), this.setWidth(2 * t), this.setHeight(2 * t) } }, Konva.Util.extend(Konva.Ring, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Ring, "innerRadius", 0), Konva.Factory.addGetter(Konva.Ring, "outerRadius", 0), Konva.Factory.addOverloadedGetterSetter(Konva.Ring, "outerRadius"), Konva.Collection.mapMethods(Konva.Ring) }(),
function() { "use strict";
    Konva.Wedge = function(t) { this.___init(t) }, Konva.Wedge.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Wedge", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { t.beginPath(), t.arc(0, 0, this.getRadius(), 0, Konva.getAngle(this.getAngle()), this.getClockwise()), t.lineTo(0, 0), t.closePath(), t.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getRadius() }, getHeight: function() { return 2 * this.getRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) } }, Konva.Util.extend(Konva.Wedge, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Wedge, "radius", 0), Konva.Factory.addGetterSetter(Konva.Wedge, "angle", 0), Konva.Factory.addGetterSetter(Konva.Wedge, "clockwise", !1), Konva.Factory.backCompat(Konva.Wedge, { angleDeg: "angle", getAngleDeg: "getAngle", setAngleDeg: "setAngle" }), Konva.Collection.mapMethods(Konva.Wedge) }(),
function() { "use strict";
    Konva.Arc = function(t) { this.___init(t) }, Konva.Arc.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Arc", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e = Konva.getAngle(this.angle()),
                n = this.clockwise();
            t.beginPath(), t.arc(0, 0, this.getOuterRadius(), 0, e, n), t.arc(0, 0, this.getInnerRadius(), e, 0, !n), t.closePath(), t.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getOuterRadius() }, getHeight: function() { return 2 * this.getOuterRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.getOuterRadius() !== t / 2 && this.setOuterRadius(t / 2) } }, Konva.Util.extend(Konva.Arc, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Arc, "innerRadius", 0), Konva.Factory.addGetterSetter(Konva.Arc, "outerRadius", 0), Konva.Factory.addGetterSetter(Konva.Arc, "angle", 0), Konva.Factory.addGetterSetter(Konva.Arc, "clockwise", !1), Konva.Collection.mapMethods(Konva.Arc) }(),
function() { "use strict";
    Konva.Image = function(t) { this.___init(t) }, Konva.Image.prototype = { ___init: function(t) { Konva.Shape.call(this, t), this.className = "Image", this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc) }, _useBufferCanvas: function() { return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke() && this.getStage() }, _sceneFunc: function(t) { var e, n, i, a = this.getWidth(),
                r = this.getHeight(),
                o = this.getImage();
            o && (e = this.getCropWidth(), n = this.getCropHeight(), i = e && n ? [o, this.getCropX(), this.getCropY(), e, n, 0, 0, a, r] : [o, 0, 0, a, r]), (this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, a, r), t.closePath(), t.fillStrokeShape(this)), o && t.drawImage.apply(t, i) }, _hitFunc: function(t) { var e = this.getWidth(),
                n = this.getHeight();
            t.beginPath(), t.rect(0, 0, e, n), t.closePath(), t.fillStrokeShape(this) }, getWidth: function() { var t = this.getImage(); return this.attrs.width || (t ? t.width : 0) }, getHeight: function() { var t = this.getImage(); return this.attrs.height || (t ? t.height : 0) } }, Konva.Util.extend(Konva.Image, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Image, "image"), Konva.Factory.addComponentsGetterSetter(Konva.Image, "crop", ["x", "y", "width", "height"]), Konva.Factory.addGetterSetter(Konva.Image, "cropX", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropY", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropWidth", 0), Konva.Factory.addGetterSetter(Konva.Image, "cropHeight", 0), Konva.Collection.mapMethods(Konva.Image), Konva.Image.fromURL = function(t, e) { var n = new Image;
        n.onload = function() { var t = new Konva.Image({ image: n });
            e(t) }, n.src = t } }(),
function() { "use strict";

    function t(t) { t.fillText(this.partialText, 0, 0) }

    function e(t) { t.strokeText(this.partialText, 0, 0) } var n = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "lineHeight", "text", "width", "height", "wrap", "letterSpacing"],
        i = n.length,
        a = Konva.Util.createCanvasElement().getContext("2d");
    Konva.Text = function(t) { this.___init(t) }, Konva.Text.prototype = { ___init: function(a) { a = a || {}, a.fillLinearGradientColorStops || a.fillRadialGradientColorStops || (a.fill = a.fill || "black"), Konva.Shape.call(this, a), this._fillFunc = t, this._strokeFunc = e, this.className = "Text"; for (var r = 0; r < i; r++) this.on(n[r] + "Change.konva", this._setTextData);
            this._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc) }, _sceneFunc: function(t) { var e, n = this.getPadding(),
                i = this.getTextHeight(),
                a = this.getLineHeight() * i,
                r = this.textArr,
                o = r.length,
                s = this.getAlign(),
                h = this.getWidth(),
                c = this.getLetterSpacing(),
                l = this.textDecoration(),
                d = this.fill(),
                u = this.fontSize(); for (t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", "middle"), t.setAttr("textAlign", "left"), t.save(), n ? (t.translate(n, 0), t.translate(0, n + i / 2)) : t.translate(0, i / 2), e = 0; e < o; e++) { var v = r[e],
                    f = v.text,
                    g = v.width; if (t.save(), "right" === s ? t.translate(h - g - 2 * n, 0) : "center" === s && t.translate((h - g - 2 * n) / 2, 0), -1 !== l.indexOf("underline") && (t.save(), t.beginPath(), t.moveTo(0, Math.round(a / 2)), t.lineTo(Math.round(g), Math.round(a / 2)), t.lineWidth = u / 15, t.strokeStyle = d, t.stroke(), t.restore()), -1 !== l.indexOf("line-through") && (t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(Math.round(g), 0), t.lineWidth = u / 15, t.strokeStyle = d, t.stroke(), t.restore()), 0 !== c || "justify" === s)
                    for (var p = f.split(" ").length - 1, m = 0; m < f.length; m++) { var y = f[m]; " " === y && e !== o - 1 && "justify" === s && t.translate(Math.floor((h - g) / p), 0), this.partialText = y, t.fillStrokeShape(this), t.translate(Math.round(this._getTextSize(y).width) + c, 0) } else this.partialText = f, t.fillStrokeShape(this);
                t.restore(), t.translate(0, a) }
            t.restore() }, _hitFunc: function(t) { var e = this.getWidth(),
                n = this.getHeight();
            t.beginPath(), t.rect(0, 0, e, n), t.closePath(), t.fillStrokeShape(this) }, setText: function(t) { var e = Konva.Util._isString(t) ? t : (t || "").toString(); return this._setAttr("text", e), this }, getWidth: function() { return "auto" === this.attrs.width || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.getPadding() : this.attrs.width }, getHeight: function() { return "auto" === this.attrs.height || void 0 === this.attrs.height ? this.getTextHeight() * this.textArr.length * this.getLineHeight() + 2 * this.getPadding() : this.attrs.height }, getTextWidth: function() { return this.textWidth }, getTextHeight: function() { return this.textHeight }, _getTextSize: function(t) { var e, n = a,
                i = this.getFontSize(); return n.save(), n.font = this._getContextFont(), e = n.measureText(t), n.restore(), { width: e.width, height: parseInt(i, 10) } }, _getContextFont: function() { return Konva.UA.isIE ? this.getFontStyle() + " " + this.getFontSize() + "px " + this.getFontFamily() : this.getFontStyle() + " " + this.getFontVariant() + " " + this.getFontSize() + "px " + this.getFontFamily() }, _addTextLine: function(t) { "justify" === this.align() && (t = t.trim()); var e = this._getTextWidth(t); return this.textArr.push({ text: t, width: e }) }, _getTextWidth: function(t) { var e = this.getLetterSpacing(),
                n = t.length; return a.measureText(t).width + (n ? e * (n - 1) : 0) }, _setTextData: function() { var t = this.getText().split("\n"),
                e = +this.getFontSize(),
                n = 0,
                i = this.getLineHeight() * e,
                r = this.attrs.width,
                o = this.attrs.height,
                s = "auto" !== r,
                h = "auto" !== o,
                c = this.getPadding(),
                l = r - 2 * c,
                d = o - 2 * c,
                u = 0,
                v = this.getWrap(),
                f = "none" !== v,
                g = "char" !== v && f;
            this.textArr = [], a.save(), a.font = this._getContextFont(); for (var p = 0, m = t.length; p < m; ++p) { var y = t[p],
                    _ = this._getTextWidth(y); if (s && _ > l)
                    for (; y.length > 0;) { for (var K = 0, S = y.length, C = "", x = 0; K < S;) { var w = K + S >>> 1,
                                b = y.slice(0, w + 1),
                                F = this._getTextWidth(b);
                            F <= l ? (K = w + 1, C = b, x = F) : S = w } if (!C) break; if (g) { var T = Math.max(C.lastIndexOf(" "), C.lastIndexOf("-")) + 1;
                            T > 0 && (K = T, C = C.slice(0, K), x = this._getTextWidth(C)) } if (this._addTextLine(C), n = Math.max(n, x), u += i, !f || h && u + i > d) break; if (y = y.slice(K), y.length > 0 && (_ = this._getTextWidth(y)) <= l) { this._addTextLine(y), u += i, n = Math.max(n, _); break } } else this._addTextLine(y), u += i, n = Math.max(n, _); if (h && u + i > d) break }
            a.restore(), this.textHeight = e, this.textWidth = n } }, Konva.Util.extend(Konva.Text, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Text, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.Text, "fontSize", 12), Konva.Factory.addGetterSetter(Konva.Text, "fontStyle", "normal"), Konva.Factory.addGetterSetter(Konva.Text, "fontVariant", "normal"), Konva.Factory.addGetterSetter(Konva.Text, "padding", 0), Konva.Factory.addGetterSetter(Konva.Text, "align", "left"), Konva.Factory.addGetterSetter(Konva.Text, "lineHeight", 1), Konva.Factory.addGetterSetter(Konva.Text, "wrap", "word"), Konva.Factory.addGetterSetter(Konva.Text, "letterSpacing", 0), Konva.Factory.addGetter(Konva.Text, "text", ""), Konva.Factory.addOverloadedGetterSetter(Konva.Text, "text"), Konva.Factory.addGetterSetter(Konva.Text, "textDecoration", ""), Konva.Collection.mapMethods(Konva.Text) }(),
function() { "use strict";
    Konva.Line = function(t) { this.___init(t) }, Konva.Line.prototype = { ___init: function(t) { Konva.Shape.call(this, t), this.className = "Line", this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() { this._clearCache("tensionPoints") }), this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e, n, i, a = this.getPoints(),
                r = a.length,
                o = this.getTension(),
                s = this.getClosed(),
                h = this.getBezier(); if (r) { if (t.beginPath(), t.moveTo(a[0], a[1]), 0 !== o && r > 4) { for (e = this.getTensionPoints(), n = e.length, i = s ? 0 : 4, s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); i < n - 2;) t.bezierCurveTo(e[i++], e[i++], e[i++], e[i++], e[i++], e[i++]);
                    s || t.quadraticCurveTo(e[n - 2], e[n - 1], a[r - 2], a[r - 1]) } else if (h)
                    for (i = 2; i < r;) t.bezierCurveTo(a[i++], a[i++], a[i++], a[i++], a[i++], a[i++]);
                else
                    for (i = 2; i < r; i += 2) t.lineTo(a[i], a[i + 1]);
                s ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this) } }, getTensionPoints: function() { return this._getCache("tensionPoints", this._getTensionPoints) }, _getTensionPoints: function() { return this.getClosed() ? this._getTensionPointsClosed() : Konva.Util._expandPoints(this.getPoints(), this.getTension()) }, _getTensionPointsClosed: function() { var t = this.getPoints(),
                e = t.length,
                n = this.getTension(),
                i = Konva.Util,
                a = i._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], n),
                r = i._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], n),
                o = Konva.Util._expandPoints(t, n); return [a[2], a[3]].concat(o).concat([r[0], r[1], t[e - 2], t[e - 1], r[2], r[3], a[0], a[1], t[0], t[1]]) }, getWidth: function() { return this.getSelfRect().width }, getHeight: function() { return this.getSelfRect().height }, getSelfRect: function() { var t;
            t = 0 !== this.getTension() ? this._getTensionPoints() : this.getPoints(); for (var e, n, i = t[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++) e = t[2 * s], n = t[2 * s + 1], i = Math.min(i, e), a = Math.max(a, e), r = Math.min(r, n), o = Math.max(o, n); return { x: Math.round(i), y: Math.round(r), width: Math.round(a - i), height: Math.round(o - r) } } }, Konva.Util.extend(Konva.Line, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Line, "closed", !1), Konva.Factory.addGetterSetter(Konva.Line, "bezier", !1), Konva.Factory.addGetterSetter(Konva.Line, "tension", 0), Konva.Factory.addGetterSetter(Konva.Line, "points", []), Konva.Collection.mapMethods(Konva.Line) }(),
function() { "use strict";
    Konva.Sprite = function(t) { this.___init(t) }, Konva.Sprite.prototype = { ___init: function(t) { Konva.Shape.call(this, t), this.className = "Sprite", this._updated = !0; var e = this;
            this.anim = new Konva.Animation(function() { var t = e._updated; return e._updated = !1, t }), this.on("animationChange.konva", function() { this.frameIndex(0) }), this.on("frameIndexChange.konva", function() { this._updated = !0 }), this.on("frameRateChange.konva", function() { this.anim.isRunning() && (clearInterval(this.interval), this._setInterval()) }), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc) }, _sceneFunc: function(t) { var e = this.getAnimation(),
                n = this.frameIndex(),
                i = 4 * n,
                a = this.getAnimations()[e],
                r = this.frameOffsets(),
                o = a[i + 0],
                s = a[i + 1],
                h = a[i + 2],
                c = a[i + 3],
                l = this.getImage(); if ((this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, h, c), t.closePath(), t.fillStrokeShape(this)), l)
                if (r) { var d = r[e],
                        u = 2 * n;
                    t.drawImage(l, o, s, h, c, d[u + 0], d[u + 1], h, c) } else t.drawImage(l, o, s, h, c, 0, 0, h, c) }, _hitFunc: function(t) { var e = this.getAnimation(),
                n = this.frameIndex(),
                i = 4 * n,
                a = this.getAnimations()[e],
                r = this.frameOffsets(),
                o = a[i + 2],
                s = a[i + 3]; if (t.beginPath(), r) { var h = r[e],
                    c = 2 * n;
                t.rect(h[c + 0], h[c + 1], o, s) } else t.rect(0, 0, o, s);
            t.closePath(), t.fillShape(this) }, _useBufferCanvas: function() { return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke() }, _setInterval: function() { var t = this;
            this.interval = setInterval(function() { t._updateIndex() }, 1e3 / this.getFrameRate()) }, start: function() { var t = this.getLayer();
            this.anim.setLayers(t), this._setInterval(), this.anim.start() }, stop: function() { this.anim.stop(), clearInterval(this.interval) }, isRunning: function() { return this.anim.isRunning() }, _updateIndex: function() { var t = this.frameIndex(),
                e = this.getAnimation();
            t < this.getAnimations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0) } }, Konva.Util.extend(Konva.Sprite, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Sprite, "animation"), Konva.Factory.addGetterSetter(Konva.Sprite, "animations"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameOffsets"), Konva.Factory.addGetterSetter(Konva.Sprite, "image"), Konva.Factory.addGetterSetter(Konva.Sprite, "frameIndex", 0), Konva.Factory.addGetterSetter(Konva.Sprite, "frameRate", 17), Konva.Factory.backCompat(Konva.Sprite, { index: "frameIndex", getIndex: "getFrameIndex", setIndex: "setFrameIndex" }), Konva.Collection.mapMethods(Konva.Sprite) }(),
function() {
    "use strict";
    Konva.Path = function(t) { this.___init(t) }, Konva.Path.prototype = {
        ___init: function(t) { this.dataArray = []; var e = this;
            Konva.Shape.call(this, t), this.className = "Path", this.dataArray = Konva.Path.parsePathData(this.getData()), this.on("dataChange.konva", function() { e.dataArray = Konva.Path.parsePathData(this.getData()) }), this.sceneFunc(this._sceneFunc) },
        _sceneFunc: function(t) { var e = this.dataArray;
            t.beginPath(); for (var n = 0; n < e.length; n++) { var i = e[n].command,
                    a = e[n].points; switch (i) {
                    case "L":
                        t.lineTo(a[0], a[1]); break;
                    case "M":
                        t.moveTo(a[0], a[1]); break;
                    case "C":
                        t.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]); break;
                    case "Q":
                        t.quadraticCurveTo(a[0], a[1], a[2], a[3]); break;
                    case "A":
                        var r = a[0],
                            o = a[1],
                            s = a[2],
                            h = a[3],
                            c = a[4],
                            l = a[5],
                            d = a[6],
                            u = a[7],
                            v = s > h ? s : h,
                            f = s > h ? 1 : s / h,
                            g = s > h ? h / s : 1;
                        t.translate(r, o), t.rotate(d), t.scale(f, g), t.arc(0, 0, v, c, c + l, 1 - u), t.scale(1 / f, 1 / g), t.rotate(-d), t.translate(-r, -o); break;
                    case "z":
                        t.closePath() } }
            t.fillStrokeShape(this) },
        getSelfRect: function() {
            var t = [];
            this.dataArray.forEach(function(e) { t = t.concat(e.points) });
            for (var e, n, i = t[0], a = t[0], r = t[1], o = t[1], s = 0; s < t.length / 2; s++) e = t[2 * s], n = t[2 * s + 1], i = Math.min(i, e), a = Math.max(a, e), r = Math.min(r, n), o = Math.max(o, n);
            return {
                x: Math.round(i),
                y: Math.round(r),
                width: Math.round(a - i),
                height: Math.round(o - r)
            }
        }
    }, Konva.Util.extend(Konva.Path, Konva.Shape), Konva.Path.getLineLength = function(t, e, n, i) { return Math.sqrt((n - t) * (n - t) + (i - e) * (i - e)) }, Konva.Path.getPointOnLine = function(t, e, n, i, a, r, o) { void 0 === r && (r = e), void 0 === o && (o = n); var s = (a - n) / (i - e + 1e-8),
            h = Math.sqrt(t * t / (1 + s * s));
        i < e && (h *= -1); var c, l = s * h; if (i === e) c = { x: r, y: o + l };
        else if ((o - n) / (r - e + 1e-8) === s) c = { x: r + h, y: o + l };
        else { var d, u, v = this.getLineLength(e, n, i, a); if (v < 1e-8) return; var f = (r - e) * (i - e) + (o - n) * (a - n);
            f /= v * v, d = e + f * (i - e), u = n + f * (a - n); var g = this.getLineLength(r, o, d, u),
                p = Math.sqrt(t * t - g * g);
            h = Math.sqrt(p * p / (1 + s * s)), i < e && (h *= -1), l = s * h, c = { x: d + h, y: u + l } } return c }, Konva.Path.getPointOnCubicBezier = function(t, e, n, i, a, r, o, s, h) {
        function c(t) { return t * t * t }

        function l(t) { return 3 * t * t * (1 - t) }

        function d(t) { return 3 * t * (1 - t) * (1 - t) }

        function u(t) { return (1 - t) * (1 - t) * (1 - t) } return { x: s * c(t) + r * l(t) + i * d(t) + e * u(t), y: h * c(t) + o * l(t) + a * d(t) + n * u(t) } }, Konva.Path.getPointOnQuadraticBezier = function(t, e, n, i, a, r, o) {
        function s(t) { return t * t }

        function h(t) { return 2 * t * (1 - t) }

        function c(t) { return (1 - t) * (1 - t) } return { x: r * s(t) + i * h(t) + e * c(t), y: o * s(t) + a * h(t) + n * c(t) } }, Konva.Path.getPointOnEllipticalArc = function(t, e, n, i, a, r) { var o = Math.cos(r),
            s = Math.sin(r),
            h = { x: n * Math.cos(a), y: i * Math.sin(a) }; return { x: t + (h.x * o - h.y * s), y: e + (h.x * s + h.y * o) } }, Konva.Path.parsePathData = function(t) { if (!t) return []; var e = t,
            n = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
        e = e.replace(new RegExp(" ", "g"), ","); for (var i = 0; i < n.length; i++) e = e.replace(new RegExp(n[i], "g"), "|" + n[i]); var a = e.split("|"),
            r = [],
            o = 0,
            s = 0; for (i = 1; i < a.length; i++) { var h = a[i],
                c = h.charAt(0);
            h = h.slice(1), h = h.replace(new RegExp(",-", "g"), "-"), h = h.replace(new RegExp("-", "g"), ",-"), h = h.replace(new RegExp("e,-", "g"), "e-"); var l = h.split(",");
            l.length > 0 && "" === l[0] && l.shift(); for (var d = 0; d < l.length; d++) l[d] = parseFloat(l[d]); for (; l.length > 0 && !isNaN(l[0]);) { var u, v, f, g, p, m, y, _, K, S, C = null,
                    x = [],
                    w = o,
                    b = s; switch (c) {
                    case "l":
                        o += l.shift(), s += l.shift(), C = "L", x.push(o, s); break;
                    case "L":
                        o = l.shift(), s = l.shift(), x.push(o, s); break;
                    case "m":
                        var F = l.shift(),
                            T = l.shift(); if (o += F, s += T, C = "M", r.length > 2 && "z" === r[r.length - 1].command)
                            for (var P = r.length - 2; P >= 0; P--)
                                if ("M" === r[P].command) { o = r[P].points[0] + F, s = r[P].points[1] + T; break }
                        x.push(o, s), c = "l"; break;
                    case "M":
                        o = l.shift(), s = l.shift(), C = "M", x.push(o, s), c = "L"; break;
                    case "h":
                        o += l.shift(), C = "L", x.push(o, s); break;
                    case "H":
                        o = l.shift(), C = "L", x.push(o, s); break;
                    case "v":
                        s += l.shift(), C = "L", x.push(o, s); break;
                    case "V":
                        s = l.shift(), C = "L", x.push(o, s); break;
                    case "C":
                        x.push(l.shift(), l.shift(), l.shift(), l.shift()), o = l.shift(), s = l.shift(), x.push(o, s); break;
                    case "c":
                        x.push(o + l.shift(), s + l.shift(), o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "C", x.push(o, s); break;
                    case "S":
                        v = o, f = s, u = r[r.length - 1], "C" === u.command && (v = o + (o - u.points[2]), f = s + (s - u.points[3])), x.push(v, f, l.shift(), l.shift()), o = l.shift(), s = l.shift(), C = "C", x.push(o, s); break;
                    case "s":
                        v = o, f = s, u = r[r.length - 1], "C" === u.command && (v = o + (o - u.points[2]), f = s + (s - u.points[3])), x.push(v, f, o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "C", x.push(o, s); break;
                    case "Q":
                        x.push(l.shift(), l.shift()), o = l.shift(), s = l.shift(), x.push(o, s); break;
                    case "q":
                        x.push(o + l.shift(), s + l.shift()), o += l.shift(), s += l.shift(), C = "Q", x.push(o, s); break;
                    case "T":
                        v = o, f = s, u = r[r.length - 1], "Q" === u.command && (v = o + (o - u.points[0]), f = s + (s - u.points[1])), o = l.shift(), s = l.shift(), C = "Q", x.push(v, f, o, s); break;
                    case "t":
                        v = o, f = s, u = r[r.length - 1], "Q" === u.command && (v = o + (o - u.points[0]), f = s + (s - u.points[1])), o += l.shift(), s += l.shift(), C = "Q", x.push(v, f, o, s); break;
                    case "A":
                        g = l.shift(), p = l.shift(), m = l.shift(), y = l.shift(), _ = l.shift(), K = o, S = s, o = l.shift(), s = l.shift(), C = "A", x = this.convertEndpointToCenterParameterization(K, S, o, s, y, _, g, p, m); break;
                    case "a":
                        g = l.shift(), p = l.shift(), m = l.shift(), y = l.shift(), _ = l.shift(), K = o, S = s, o += l.shift(), s += l.shift(), C = "A", x = this.convertEndpointToCenterParameterization(K, S, o, s, y, _, g, p, m) }
                r.push({ command: C || c, points: x, start: { x: w, y: b }, pathLength: this.calcLength(w, b, C || c, x) }) } "z" !== c && "Z" !== c || r.push({ command: "z", points: [], start: void 0, pathLength: 0 }) } return r }, Konva.Path.calcLength = function(t, e, n, i) { var a, r, o, s, h = Konva.Path; switch (n) {
            case "L":
                return h.getLineLength(t, e, i[0], i[1]);
            case "C":
                for (a = 0, r = h.getPointOnCubicBezier(0, t, e, i[0], i[1], i[2], i[3], i[4], i[5]), s = .01; s <= 1; s += .01) o = h.getPointOnCubicBezier(s, t, e, i[0], i[1], i[2], i[3], i[4], i[5]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o; return a;
            case "Q":
                for (a = 0, r = h.getPointOnQuadraticBezier(0, t, e, i[0], i[1], i[2], i[3]), s = .01; s <= 1; s += .01) o = h.getPointOnQuadraticBezier(s, t, e, i[0], i[1], i[2], i[3]), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o; return a;
            case "A":
                a = 0; var c = i[4],
                    l = i[5],
                    d = i[4] + l,
                    u = Math.PI / 180; if (Math.abs(c - d) < u && (u = Math.abs(c - d)), r = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], c, 0), l < 0)
                    for (s = c - u; s > d; s -= u) o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o;
                else
                    for (s = c + u; s < d; s += u) o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], s, 0), a += h.getLineLength(r.x, r.y, o.x, o.y), r = o; return o = h.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], d, 0), a += h.getLineLength(r.x, r.y, o.x, o.y) } return 0 }, Konva.Path.convertEndpointToCenterParameterization = function(t, e, n, i, a, r, o, s, h) { var c = h * (Math.PI / 180),
            l = Math.cos(c) * (t - n) / 2 + Math.sin(c) * (e - i) / 2,
            d = -1 * Math.sin(c) * (t - n) / 2 + Math.cos(c) * (e - i) / 2,
            u = l * l / (o * o) + d * d / (s * s);
        u > 1 && (o *= Math.sqrt(u), s *= Math.sqrt(u)); var v = Math.sqrt((o * o * (s * s) - o * o * (d * d) - s * s * (l * l)) / (o * o * (d * d) + s * s * (l * l)));
        a === r && (v *= -1), isNaN(v) && (v = 0); var f = v * o * d / s,
            g = v * -s * l / o,
            p = (t + n) / 2 + Math.cos(c) * f - Math.sin(c) * g,
            m = (e + i) / 2 + Math.sin(c) * f + Math.cos(c) * g,
            y = function(t) { return Math.sqrt(t[0] * t[0] + t[1] * t[1]) },
            _ = function(t, e) { return (t[0] * e[0] + t[1] * e[1]) / (y(t) * y(e)) },
            K = function(t, e) { return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(_(t, e)) },
            S = K([1, 0], [(l - f) / o, (d - g) / s]),
            C = [(l - f) / o, (d - g) / s],
            x = [(-1 * l - f) / o, (-1 * d - g) / s],
            w = K(C, x); return _(C, x) <= -1 && (w = Math.PI), _(C, x) >= 1 && (w = 0), 0 === r && w > 0 && (w -= 2 * Math.PI), 1 === r && w < 0 && (w += 2 * Math.PI), [p, m, o, s, S, w, c, r] }, Konva.Factory.addGetterSetter(Konva.Path, "data"), Konva.Collection.mapMethods(Konva.Path)
}(),
function() { "use strict";

    function t(t) { t.fillText(this.partialText, 0, 0) }

    function e(t) { t.strokeText(this.partialText, 0, 0) }
    Konva.TextPath = function(t) { this.___init(t) }, Konva.TextPath.prototype = { ___init: function(n) { var i = this;
            this.dummyCanvas = Konva.Util.createCanvasElement(), this.dataArray = [], Konva.Shape.call(this, n), this._fillFunc = t, this._strokeFunc = e, this._fillFuncHit = t, this._strokeFuncHit = e, this.className = "TextPath", this.dataArray = Konva.Path.parsePathData(this.attrs.data), this.on("dataChange.konva", function() { i.dataArray = Konva.Path.parsePathData(this.attrs.data), i._setTextData() }), this.on("textChange.konva alignChange.konva letterSpacingChange.konva", i._setTextData), i._setTextData(), this.sceneFunc(this._sceneFunc), this.hitFunc(this._hitFunc) }, _sceneFunc: function(t) { t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", this.getTextBaseline()), t.setAttr("textAlign", "left"), t.save(); var e = this.textDecoration(),
                n = this.fill(),
                i = this.fontSize(),
                a = this.glyphInfo; "underline" === e && t.beginPath(); for (var r = 0; r < a.length; r++) { t.save(); var o = a[r].p0;
                t.translate(o.x, o.y), t.rotate(a[r].rotation), this.partialText = a[r].text, t.fillStrokeShape(this), "underline" === e && (0 === r && t.moveTo(0, i / 2 + 1), t.lineTo(i, i / 2 + 1)), t.restore() } "underline" === e && (t.strokeStyle = n, t.lineWidth = i / 20, t.stroke()), t.restore() }, _hitFunc: function(t) { t.beginPath(); var e = this.glyphInfo; if (e.length >= 1) { var n = e[0].p0;
                t.moveTo(n.x, n.y) } for (var i = 0; i < e.length; i++) { var a = e[i].p1;
                t.lineTo(a.x, a.y) }
            t.setAttr("lineWidth", this.getFontSize()), t.setAttr("strokeStyle", this.colorKey), t.stroke() }, getTextWidth: function() { return this.textWidth }, getTextHeight: function() { return this.textHeight }, setText: function(t) { Konva.Text.prototype.setText.call(this, t) }, _getTextSize: function(t) { var e = this.dummyCanvas,
                n = e.getContext("2d");
            n.save(), n.font = this._getContextFont(); var i = n.measureText(t); return n.restore(), { width: i.width, height: parseInt(this.attrs.fontSize, 10) } }, _setTextData: function() { var t = this,
                e = this._getTextSize(this.attrs.text),
                n = this.getLetterSpacing(),
                i = this.align();
            this.textWidth = e.width, this.textHeight = e.height; var a = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * n, 0);
            this.glyphInfo = []; for (var r = 0, o = 0; o < t.dataArray.length; o++) t.dataArray[o].pathLength > 0 && (r += t.dataArray[o].pathLength); var s = 0; "center" === i && (s = Math.max(0, r / 2 - a / 2)), "right" === i && (s = Math.max(0, r - a)); for (var h, c, l, d = this.getText().split(""), u = this.getText().split(" ").length - 1, v = -1, f = 0, g = function() { f = 0; for (var e = t.dataArray, n = v + 1; n < e.length; n++) { if (e[n].pathLength > 0) return v = n, e[n]; "M" === e[n].command && (h = { x: e[n].points[0], y: e[n].points[1] }) } return {} }, p = function(e) { var o = t._getTextSize(e).width + n; " " === e && "justify" === i && (o += (r - a) / u); var s = 0,
                        d = 0; for (c = void 0; Math.abs(o - s) / o > .01 && d < 25;) { d++; for (var v = s; void 0 === l;)(l = g()) && v + l.pathLength < o && (v += l.pathLength, l = void 0); if (l === {} || void 0 === h) return; var p = !1; switch (l.command) {
                            case "L":
                                Konva.Path.getLineLength(h.x, h.y, l.points[0], l.points[1]) > o ? c = Konva.Path.getPointOnLine(o, h.x, h.y, l.points[0], l.points[1], h.x, h.y) : l = void 0; break;
                            case "A":
                                var m = l.points[4],
                                    y = l.points[5],
                                    _ = l.points[4] + y;
                                0 === f ? f = m + 1e-8 : o > s ? f += Math.PI / 180 * y / Math.abs(y) : f -= Math.PI / 360 * y / Math.abs(y), (y < 0 && f < _ || y >= 0 && f > _) && (f = _, p = !0), c = Konva.Path.getPointOnEllipticalArc(l.points[0], l.points[1], l.points[2], l.points[3], f, l.points[6]); break;
                            case "C":
                                0 === f ? f = o > l.pathLength ? 1e-8 : o / l.pathLength : o > s ? f += (o - s) / l.pathLength : f -= (s - o) / l.pathLength, f > 1 && (f = 1, p = !0), c = Konva.Path.getPointOnCubicBezier(f, l.start.x, l.start.y, l.points[0], l.points[1], l.points[2], l.points[3], l.points[4], l.points[5]); break;
                            case "Q":
                                0 === f ? f = o / l.pathLength : o > s ? f += (o - s) / l.pathLength : f -= (s - o) / l.pathLength, f > 1 && (f = 1, p = !0), c = Konva.Path.getPointOnQuadraticBezier(f, l.start.x, l.start.y, l.points[0], l.points[1], l.points[2], l.points[3]) }
                        void 0 !== c && (s = Konva.Path.getLineLength(h.x, h.y, c.x, c.y)), p && (p = !1, l = void 0) } }, m = t._getTextSize("C").width + n, y = 0; y < s / m && (p("C"), void 0 !== h && void 0 !== c); y++) h = c; for (var _ = 0; _ < d.length && (p(d[_]), void 0 !== h && void 0 !== c); _++) { var K = Konva.Path.getLineLength(h.x, h.y, c.x, c.y),
                    S = Konva.Path.getPointOnLine(0 + K / 2, h.x, h.y, c.x, c.y),
                    C = Math.atan2(c.y - h.y, c.x - h.x);
                this.glyphInfo.push({ transposeX: S.x, transposeY: S.y, text: d[_], rotation: C, p0: h, p1: c }), h = c } }, getSelfRect: function() { var t = [];
            this.glyphInfo.forEach(function(e) { t.push(e.p0.x), t.push(e.p0.y), t.push(e.p1.x), t.push(e.p1.y) }); for (var e, n, i = t[0], a = t[0], r = t[0], o = t[0], s = 0; s < t.length / 2; s++) e = t[2 * s], n = t[2 * s + 1], i = Math.min(i, e), a = Math.max(a, e), r = Math.min(r, n), o = Math.max(o, n); var h = this.fontSize(); return { x: Math.round(i) - h / 2, y: Math.round(r) - h / 2, width: Math.round(a - i) + h, height: Math.round(o - r) + h } } }, Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont, Konva.Util.extend(Konva.TextPath, Konva.Shape), Konva.Factory.addGetterSetter(Konva.TextPath, "fontFamily", "Arial"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontSize", 12), Konva.Factory.addGetterSetter(Konva.TextPath, "fontStyle", "normal"), Konva.Factory.addGetterSetter(Konva.TextPath, "align", "left"), Konva.Factory.addGetterSetter(Konva.TextPath, "letterSpacing", 0), Konva.Factory.addGetterSetter(Konva.TextPath, "textBaseline", "middle"), Konva.Factory.addGetterSetter(Konva.TextPath, "fontVariant", "normal"), Konva.Factory.addGetter(Konva.TextPath, "text", ""), Konva.Factory.addGetterSetter(Konva.TextPath, "textDecoration", null), Konva.Collection.mapMethods(Konva.TextPath) }(),
function() { "use strict";
    Konva.RegularPolygon = function(t) { this.___init(t) }, Konva.RegularPolygon.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "RegularPolygon", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e, n, i, a = this.attrs.sides,
                r = this.attrs.radius; for (t.beginPath(), t.moveTo(0, 0 - r), e = 1; e < a; e++) n = r * Math.sin(2 * e * Math.PI / a), i = -1 * r * Math.cos(2 * e * Math.PI / a), t.lineTo(n, i);
            t.closePath(), t.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getRadius() }, getHeight: function() { return 2 * this.getRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.radius() !== t / 2 && this.setRadius(t / 2) } }, Konva.Util.extend(Konva.RegularPolygon, Konva.Shape), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "radius", 0), Konva.Factory.addGetterSetter(Konva.RegularPolygon, "sides", 0), Konva.Collection.mapMethods(Konva.RegularPolygon) }(),
function() { "use strict";
    Konva.Star = function(t) { this.___init(t) }, Konva.Star.prototype = { _centroid: !0, ___init: function(t) { Konva.Shape.call(this, t), this.className = "Star", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e = this.innerRadius(),
                n = this.outerRadius(),
                i = this.numPoints();
            t.beginPath(), t.moveTo(0, 0 - n); for (var a = 1; a < 2 * i; a++) { var r = a % 2 == 0 ? n : e,
                    o = r * Math.sin(a * Math.PI / i),
                    s = -1 * r * Math.cos(a * Math.PI / i);
                t.lineTo(o, s) }
            t.closePath(), t.fillStrokeShape(this) }, getWidth: function() { return 2 * this.getOuterRadius() }, getHeight: function() { return 2 * this.getOuterRadius() }, setWidth: function(t) { Konva.Node.prototype.setWidth.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2) }, setHeight: function(t) { Konva.Node.prototype.setHeight.call(this, t), this.outerRadius() !== t / 2 && this.setOuterRadius(t / 2) } }, Konva.Util.extend(Konva.Star, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Star, "numPoints", 5), Konva.Factory.addGetterSetter(Konva.Star, "innerRadius", 0), Konva.Factory.addGetterSetter(Konva.Star, "outerRadius", 0), Konva.Collection.mapMethods(Konva.Star) }(),
function() { "use strict"; var t = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width"],
        e = t.length;
    Konva.Label = function(t) { this.____init(t) }, Konva.Label.prototype = { ____init: function(t) { var e = this;
            Konva.Group.call(this, t), this.className = "Label", this.on("add.konva", function(t) { e._addListeners(t.child), e._sync() }) }, getText: function() { return this.find("Text")[0] }, getTag: function() { return this.find("Tag")[0] }, _addListeners: function(n) { var i, a = this,
                r = function() { a._sync() }; for (i = 0; i < e; i++) n.on(t[i] + "Change.konva", r) }, getWidth: function() { return this.getText().getWidth() }, getHeight: function() { return this.getText().getHeight() }, _sync: function() { var t, e, n, i, a, r, o, s = this.getText(),
                h = this.getTag(); if (s && h) { switch (t = s.getWidth(), e = s.getHeight(), n = h.getPointerDirection(), i = h.getPointerWidth(), o = h.getPointerHeight(), a = 0, r = 0, n) {
                    case "up":
                        a = t / 2, r = -1 * o; break;
                    case "right":
                        a = t + i, r = e / 2; break;
                    case "down":
                        a = t / 2, r = e + o; break;
                    case "left":
                        a = -1 * i, r = e / 2 }
                h.setAttrs({ x: -1 * a, y: -1 * r, width: t, height: e }), s.setAttrs({ x: -1 * a, y: -1 * r }) } } }, Konva.Util.extend(Konva.Label, Konva.Group), Konva.Collection.mapMethods(Konva.Label), Konva.Tag = function(t) { this.___init(t) }, Konva.Tag.prototype = { ___init: function(t) { Konva.Shape.call(this, t), this.className = "Tag", this.sceneFunc(this._sceneFunc) }, _sceneFunc: function(t) { var e = this.getWidth(),
                n = this.getHeight(),
                i = this.getPointerDirection(),
                a = this.getPointerWidth(),
                r = this.getPointerHeight(),
                o = Math.min(this.getCornerRadius(), e / 2, n / 2);
            t.beginPath(), o ? t.moveTo(o, 0) : t.moveTo(0, 0), "up" === i && (t.lineTo((e - a) / 2, 0), t.lineTo(e / 2, -1 * r), t.lineTo((e + a) / 2, 0)), o ? (t.lineTo(e - o, 0), t.arc(e - o, o, o, 3 * Math.PI / 2, 0, !1)) : t.lineTo(e, 0), "right" === i && (t.lineTo(e, (n - r) / 2), t.lineTo(e + a, n / 2), t.lineTo(e, (n + r) / 2)), o ? (t.lineTo(e, n - o), t.arc(e - o, n - o, o, 0, Math.PI / 2, !1)) : t.lineTo(e, n), "down" === i && (t.lineTo((e + a) / 2, n), t.lineTo(e / 2, n + r), t.lineTo((e - a) / 2, n)), o ? (t.lineTo(o, n), t.arc(o, n - o, o, Math.PI / 2, Math.PI, !1)) : t.lineTo(0, n), "left" === i && (t.lineTo(0, (n + r) / 2), t.lineTo(-1 * a, n / 2), t.lineTo(0, (n - r) / 2)), o && (t.lineTo(0, o), t.arc(o, o, o, Math.PI, 3 * Math.PI / 2, !1)), t.closePath(), t.fillStrokeShape(this) }, getSelfRect: function() { var t = 0,
                e = 0,
                n = this.getPointerWidth(),
                i = this.getPointerHeight(),
                a = this.pointerDirection(),
                r = this.getWidth(),
                o = this.getHeight(); return "up" === a ? (e -= i, o += i) : "down" === a ? o += i : "left" === a ? (t -= 1.5 * n, r += n) : "right" === a && (r += 1.5 * n), { x: t, y: e, width: r, height: o } } }, Konva.Util.extend(Konva.Tag, Konva.Shape), Konva.Factory.addGetterSetter(Konva.Tag, "pointerDirection", "none"), Konva.Factory.addGetterSetter(Konva.Tag, "pointerWidth", 0), Konva.Factory.addGetterSetter(Konva.Tag, "pointerHeight", 0), Konva.Factory.addGetterSetter(Konva.Tag, "cornerRadius", 0), Konva.Collection.mapMethods(Konva.Tag) }(),
function() { "use strict";
    Konva.Arrow = function(t) { this.____init(t) }, Konva.Arrow.prototype = { ____init: function(t) { Konva.Line.call(this, t), this.className = "Arrow" }, _sceneFunc: function(t) { Konva.Line.prototype._sceneFunc.apply(this, arguments); var e = 2 * Math.PI,
                n = this.points(),
                i = n.length,
                a = n[i - 2] - n[i - 4],
                r = n[i - 1] - n[i - 3],
                o = (Math.atan2(r, a) + e) % e,
                s = this.pointerLength(),
                h = this.pointerWidth();
            t.save(), t.beginPath(), t.translate(n[i - 2], n[i - 1]), t.rotate(o), t.moveTo(0, 0), t.lineTo(-s, h / 2), t.lineTo(-s, -h / 2), t.closePath(), t.restore(), this.pointerAtBeginning() && (t.save(), t.translate(n[0], n[1]), a = n[2] - n[0], r = n[3] - n[1], t.rotate((Math.atan2(-r, -a) + e) % e), t.moveTo(0, 0), t.lineTo(-s, h / 2), t.lineTo(-s, -h / 2), t.closePath(), t.restore()), t.fillStrokeShape(this) } }, Konva.Util.extend(Konva.Arrow, Konva.Line), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerLength", 10), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerWidth", 10), Konva.Factory.addGetterSetter(Konva.Arrow, "pointerAtBeginning", !1), Konva.Collection.mapMethods(Konva.Arrow) }();