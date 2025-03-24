/* jshint globalstrict: true, unused: true, undef: true, quotmark: true, browser: true, loopfunc: true */
/* global jQuery, console */
/* exported startEventType, moveEventType, endEventType */
'use strict';

var supportTouches = ('createTouch' in document);
var startEventType = supportTouches ? 'touchstart' : 'mousedown';
var moveEventType = supportTouches ? 'touchmove' : 'mousemove';
var endEventType = supportTouches ? 'touchend' : 'mouseup';
var $ = jQuery.noConflict();

/**
 * Provides a collection of helper functions you can use to manipulate cookie, manage audio,
 * detect using device, and manage messages.
 *
 * @author	KDD
 * @version	1.0
 * @since   2014-12-11
 */
function Util() {

}

/**
 * Properties
 */
Util.prototype.player = null;
Util.prototype.allowMsgList = [];
Util.prototype.echoCount = 1;

/**
 * Write log.
 *
 * @param  {String} key the key of value to write out
 * @param  {Object} value the value to write out
 */
Util.prototype.writeLog = function (key, value) {
    var isAllowMsg = (this.allowMsgList.length === 0) ? true : false;
    for (var k in this.allowMsgList) {
        if (this.allowMsgList[k] === key) {
            isAllowMsg = true;
            break;
        }
    }
    if (isAllowMsg) {
        if (arguments.length === 1) {
            console.log(key);
        } else {
            console.log(key + ': ' + value);
        }
    }
};

/**
 * Write message and show it in the front of screen.
 *
 * @param  {String} key the key of value to write out
 * @param  {Object} value the value to write out
 */
Util.prototype.echo = function (key, value) {
    var isAllowMsg = (this.allowMsgList.length === 0) ? true : false;
    var div = '<div id="container" style="width:300px;height:300px;background-color:orange;overflow:scroll;z-index:30000;position:absolute;top:0;left:0;"></div>';
    for (var k in this.allowMsgList) {
        if (this.allowMsgList[k] === key) {
            isAllowMsg = true;
            break;
        }
    }
    if (isAllowMsg) {
        var ele = $('#container');
        if (ele.length < 1) {
            $('body').append(div);
            ele = $('#container');
        }
        if (arguments.length === 1) {
            ele.append('<div>' + this.echoCount +': ' + key + '</div>');
        } else {
            ele.append('<div>' + this.echoCount +': ' + key + ': ' + value + '</div>');
        }
        var divEcho = document.getElementById('container');
        divEcho.scrollTop = divEcho.scrollHeight;
		this.echoCount++;
    }
};

/**
 * Set value to cookie.
 *
 * @param  {String} name	the name of cookie to be set
 * @param  {Object} value the value of cookie to be set
 * @param  {Integer} exdays available day for cookie (optional)
 */
Util.prototype.setCookie = function (name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    value = encodeURIComponent(value) + ((exdays === null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = name + '=' + value;
};

/**
 * Get value from cookie by cookie name.
 *
 * @param  {String} name the name of cookie to be get
 * @return {Object} value of cookie
 */
Util.prototype.getCookie = function (name) {
    var value = document.cookie;
    var start = value.indexOf(' ' + name + '=');
    if (start == -1) {
        start = value.indexOf(name + '=');
    }
    if (start === -1) {
        value = null;
    } else {
        start = value.indexOf('=', start) + 1;
        var end = value.indexOf(';', start);
        if (end === -1) {
            end = value.length;
        }
        value = decodeURIComponent(value.substring(start, end));
    }
    return value;
};

/**
 * Remove cookie by cookie name.
 *
 * @param  {String} name the name of cookie to be delete
 */
Util.prototype.deleteCookie = function (name) {
    document.cookie = encodeURIComponent(name) + '=deleted; expires=' + new Date(0).toUTCString();
};

/**
 * Detect user agent of using device.
 *
 * @return	{Boolean} return true if using device is iPad or iPhone, else return false
 */
Util.prototype.isIpad = function () {
    return navigator.userAgent.match(/iPad/i) !== null || navigator.userAgent.match(/iPhone/i) !== null;
};

/**
 * Play sound.
 *
 * @param  {String} src path of sound to play
 * @param  {Boolean} loop play sound loop if set to true
 */
Util.prototype.playSound = function (src, loop) {
    if (this.player === null) {
        this.player = new Audio();
    }
    this.player.pause();
    this.player.src = this.getSupportedAudioSrc(src);
	if (loop === true) {
		this.player.loop = true;
	}
    this.player.play();
};

/**
 * Play sound list.
 *
 * @param  {Array} srcList array list of source
 */
Util.prototype.playSoundList = function (srcList) {
    var util = this;
    var srcIndex = 0;
    util.playSound(srcList[srcIndex]);
    this.player.addEventListener('ended', function () {
        if (srcIndex != srcList.length - 1) {
            srcIndex++;
            util.playSound(srcList[srcIndex]);
        }
    });
};

/**
 * Stop sound.
 */
Util.prototype.stopSound = function () {
    this.player.pause();
};

/**
 * Get supported src.
 *
 * @param  {String} src path to audio source
 * @return {String} valid audio source
 */
Util.prototype.getSupportedAudioSrc = function (src) {
    var supportedAudioExtension = '';
    if (this.player.canPlayType('audio/mpeg')) {
        supportedAudioExtension = '.m4a';
    } else if (this.player.canPlayType('audio/ogg')) {
        supportedAudioExtension = '.ogg';
    }
    return src.substring(0, src.lastIndexOf('.')) + supportedAudioExtension;
};

/**
 * Left padding s with c to a total of n chars.
 *
 * @param  {Object} s object to apply padding
 * @param  {Object} c padding character
 * @param  {Integer} n number of padding
 * @return {String} sring of left padding
 */
Util.prototype.paddingLeft = function (s, c, n) {
    s = s.toString();
    c = c.toString();
    if (!s || !c || s.length >= n) {
        return s;
    }
    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
        s = c + s;
    }
    return s;
};

/**
 * Right padding s with c to a total of n chars.
 *
 * @param  {Object} s object to apply padding
 * @param  {Object} c padding character
 * @param  {Integer} n number of padding
 * @return {String} sring of right padding
 */
Util.prototype.paddingRight = function (s, c, n) {
    s = s.toString();
    c = c.toString();
    if (!s || !c || s.length >= n) {
        return s;
    }
    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
        s += c;
    }
    return s;
};
