import React, { useEffect, useState, useCallback } from "react";
import { isMobile } from "react-device-detect";

// import QrScanner from "qr-scanner";

import { Container, Sources, Canvas, Snapshot } from "./styles";

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    // First get ahold of the legacy getUserMedia, if present
    var getUserMedia =
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(
        new Error("getUserMedia is not implemented in this browser")
      );
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Camera() {
  const [camera, setCamera] = useState();
  const [facingMode, setFacingMode] = useState(
    isMobile ? "environment" : "user"
  );

  const startCapture = useCallback(async () => {
    if (camera) {
      const capture = document.getElementById("capture");
      var ctx = capture.getContext("2d");
      var img = new Image();

      ctx.drawImage(camera, 0, 0, capture.width, capture.height);

      img.src = capture.toDataURL("image/png");
      img.width = 240;

      // eslint-disable-next-line no-undef
      console.QrScanner.scanImage(img)
        .then(async (result) => {
          alert(result);
          await sleep(10);
          startCapture();
        })
        .catch(async (error) => {
          await sleep(10);
          startCapture();
        });
    } else {
      await sleep(10);
      startCapture();
    }
  }, [camera]);

  useEffect(() => {
    startCapture();
  }, [camera, startCapture]);

  useEffect(() => {
    const faceMode = isMobile
      ? {
          exact: facingMode,
        }
      : facingMode;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: faceMode,
        },
      })
      .then(function (mediaStream) {
        var video = document.getElementById("camera");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
          setCamera(video);
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
        alert(err.name);
      });
  }, [facingMode]);

  function flipCamera() {
    camera &&
      camera.srcObject &&
      camera.srcObject.getTracks().forEach((t) => t.stop());
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  }

  function onCapture() {
    const capture = document.getElementById("capture");
    const snapshot = document.getElementById("snapshot");

    var ctx = capture.getContext("2d");
    var img = new Image();

    ctx.drawImage(camera, 0, 0, capture.width, capture.height);

    img.src = capture.toDataURL("image/png");
    img.width = 240;

    snapshot.innerHTML = "";
    snapshot.appendChild(img);
  }

  function onClear() {
    const snapshot = document.getElementById("snapshot");
    snapshot.innerHTML = "";
  }

  return (
    <>
      <Container>
        <video id="camera" />
        <Canvas id="capture" width="320" height="240"></Canvas>
        <Snapshot id="snapshot"></Snapshot>
      </Container>

      <Sources>
        <button type="button" onClick={flipCamera}>
          SWITCH
        </button>
        <button type="button" onClick={onCapture}>
          Capturar
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </Sources>
    </>
  );
}

/*
      {isMobile && (
        <Sources>
          <button type="button" onClick={flipCamera}>
            SWITCH
          </button>
          <button type="button" onClick={onCapture}>
            Capturar
          </button>
        </Sources>
      )}
*/
