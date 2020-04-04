/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import { Container, Sources } from "./styles";

export default function QrCodeReader() {
  const [scanner, setScanner] = useState();
  const [cameras, setCameras] = useState([]);
  const [selectedCam, setSelectedCam] = useState();

  useEffect(() => {
    if (selectedCam) {
      scanner.start(selectedCam);
    }
  }, [scanner, selectedCam]);

  useEffect(() => {
    console.log("teste");

    const scanner = new Instascan.Scanner({
      facingMode: "environment",
      video: document.getElementById("preview"),
      scanPeriod: 5,
    });

    setScanner(scanner);

    /* scanner.addListener("scan", function (content, image) {
      console.log("teste", content);
      alert(content);
      // self.scans.unshift({ date: +Date.now(), content: content });
    }); */

    Instascan.Camera.getCameras()
      .then(function (cameras) {
        setCameras(cameras);

        if (cameras.length > 0) {
          if (!selectedCam) setSelectedCam(cameras[1]);
          //scanner.start(cameras[0]);
        } else {
          alert("Nenhuma Camera encontrada");
          console.error("No cameras found.");
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }, [selectedCam]);

  return (
    <Container>
      <video id="preview"></video>
      <Sources>
        {cameras.map((cam) => {
          return <div onClick={() => setSelectedCam(cam)}>{cam.name}</div>;
        })}
      </Sources>
    </Container>
  );
}
