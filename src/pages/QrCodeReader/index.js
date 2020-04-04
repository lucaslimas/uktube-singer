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
    const scanner = new Instascan.Scanner({
      video: document.getElementById("preview"),
      scanPeriod: 5,
    });

    setScanner(scanner);

    scanner.addListener("scan", function (content, image) {
      console.log("teste", content);
      alert(content);
      // self.scans.unshift({ date: +Date.now(), content: content });
    });

    Instascan.Camera.getCameras()
      .then(function (cameras) {
        setCameras(cameras);

        if (cameras.length > 0) {
          if (!selectedCam) setSelectedCam(cameras[0]);
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
          return <div onClick={() => onSelectCam(cam)}>{cam.name}</div>;
        })}
      </Sources>
    </Container>
  );
}
