'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n"])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  ", "\n"], ["\n  width: 100%;\n  ",
    "\n"])), function (_a) {
    var aspectRatio = _a.aspectRatio;
    return aspectRatio === 'cover'
        ? "\n    position: absolute;\n    bottom: 0\n    top: 0\n    left: 0\n    right: 0"
        : "\n    position: relative;\n    padding-bottom: " + 100 / aspectRatio + "%;";
});
var ErrorMsg = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 40px;\n"], ["\n  padding: 40px;\n"])));
var Cam = styled.video(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 0;\n  transform: rotateY(", ");\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 0;\n  transform: rotateY(", ");\n"])), function (_a) {
    var mirrored = _a.mirrored;
    return (mirrored ? '180deg' : '0deg');
});
var Canvas = styled.canvas(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

var Camera = React__default.forwardRef(function (_a, ref) {
    var _b = _a.facingMode, facingMode = _b === void 0 ? 'user' : _b, _c = _a.aspectRatio, aspectRatio = _c === void 0 ? 'cover' : _c, _d = _a.numberOfCamerasCallback, numberOfCamerasCallback = _d === void 0 ? function () { return null; } : _d, _e = _a.errorMessage, errorMessage = _e === void 0 ? 'Any camera device accessible. Please connect your camera or try different browser.' : _e, _f = _a.permissionDeniedMessage, permissionDeniedMessage = _f === void 0 ? 'Permission denied. Please refresh and give camera permission.' : _f;
    var player = React.useRef(null);
    var canvas = React.useRef(null);
    var container = React.useRef(null);
    var _g = React.useState(0), numberOfCameras = _g[0], setNumberOfCameras = _g[1];
    var _h = React.useState(null), stream = _h[0], setStream = _h[1];
    var _j = React.useState(facingMode), currentFacingMode = _j[0], setFacingMode = _j[1];
    var _k = React.useState(false), notSupported = _k[0], setNotSupported = _k[1];
    var _l = React.useState(false), permissionDenied = _l[0], setPermissionDenied = _l[1];
    React.useEffect(function () {
        numberOfCamerasCallback(numberOfCameras);
    }, [numberOfCameras]);
    React.useImperativeHandle(ref, function () { return ({
        takePhoto: function () {
            var _a, _b, _c, _d;
            if (numberOfCameras < 1) {
                throw new Error("There isn't any video device accessible.");
            }
            if (canvas === null || canvas === void 0 ? void 0 : canvas.current) {
                var playerWidth = ((_a = player === null || player === void 0 ? void 0 : player.current) === null || _a === void 0 ? void 0 : _a.videoWidth) || 1280;
                var playerHeight = ((_b = player === null || player === void 0 ? void 0 : player.current) === null || _b === void 0 ? void 0 : _b.videoHeight) || 720;
                var playerAR = playerWidth / playerHeight;
                var canvasWidth = ((_c = container === null || container === void 0 ? void 0 : container.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) || 1280;
                var canvasHeight = ((_d = container === null || container === void 0 ? void 0 : container.current) === null || _d === void 0 ? void 0 : _d.offsetHeight) || 1280;
                var canvasAR = canvasWidth / canvasHeight;
                var sX = void 0, sY = void 0, sW = void 0, sH = void 0;
                if (playerAR > canvasAR) {
                    sH = playerHeight;
                    sW = playerHeight * canvasAR;
                    sX = (playerWidth - sW) / 2;
                    sY = 0;
                }
                else {
                    sW = playerWidth;
                    sH = playerWidth / canvasAR;
                    sX = 0;
                    sY = (playerHeight - sH) / 2;
                }
                canvas.current.width = sW;
                canvas.current.height = sH;
                var context = canvas.current.getContext('2d');
                if (context && (player === null || player === void 0 ? void 0 : player.current)) {
                    context.drawImage(player.current, sX, sY, sW, sH, 0, 0, sW, sH);
                }
                var imgData = canvas.current.toDataURL('image/jpeg');
                return imgData;
            }
            else {
                throw new Error('Canvas is not supported');
            }
        },
        switchCamera: function () {
            if (numberOfCameras < 1) {
                throw new Error("There isn't any video device accessible.");
            }
            else if (numberOfCameras < 2) {
                console.warn('It is not possible to switch camera to different one, because there is only one video device accessible.');
            }
            var newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
            setFacingMode(newFacingMode);
            return newFacingMode;
        },
        getNumberOfCameras: function () {
            return numberOfCameras;
        },
    }); });
    React.useEffect(function () {
        initCameraStream(stream, setStream, currentFacingMode, setNumberOfCameras, setNotSupported, setPermissionDenied);
    }, [currentFacingMode]);
    React.useEffect(function () {
        if (stream && player && player.current) {
            player.current.srcObject = stream;
        }
        return function () {
            console.log('stop!');
            if (stream) {
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
        };
    }, [stream]);
    return (React__default.createElement(Container, { ref: container, aspectRatio: aspectRatio },
        React__default.createElement(Wrapper, null,
            permissionDenied ? React__default.createElement(ErrorMsg, null, errorMessage) : null,
            notSupported ? React__default.createElement(ErrorMsg, null, permissionDeniedMessage) : null,
            React__default.createElement(Cam, { ref: player, id: "video", muted: true, autoPlay: true, playsInline: true, mirrored: currentFacingMode === 'user' ? true : false }),
            React__default.createElement(Canvas, { ref: canvas }))));
});
Camera.displayName = 'Camera';
var initCameraStream = function (stream, setStream, currentFacingMode, setNumberOfCameras, setNotSupported, setPermissionDenied) {
    var _a;
    // stop any active streams in the window
    if (stream) {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    var constraints = {
        audio: false,
        video: {
            facingMode: currentFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1920 },
        },
    };
    if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
            setStream(handleSuccess(stream, setNumberOfCameras));
        })
            .catch(function (err) {
            handleError(err, setNotSupported, setPermissionDenied);
        });
    }
    else {
        var getWebcam = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (getWebcam) {
            getWebcam(constraints, function (stream) {
                setStream(handleSuccess(stream, setNumberOfCameras));
            }, function (err) {
                handleError(err, setNotSupported, setPermissionDenied);
            });
        }
        else {
            setNotSupported(true);
        }
    }
};
var handleSuccess = function (stream, setNumberOfCameras) {
    var track = stream.getVideoTracks()[0];
    var settings = track.getSettings();
    var str = JSON.stringify(settings, null, 4);
    console.log('Camera settings ' + str);
    navigator.mediaDevices
        .enumerateDevices()
        .then(function (r) { return setNumberOfCameras(r.filter(function (i) { return i.kind === 'videoinput'; }).length); });
    return stream;
};
var handleError = function (error, setNotSupported, setPermissionDenied) {
    console.error(error);
    //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (error.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
    }
    else {
        setNotSupported(true);
    }
};

exports.Camera = Camera;