import React, { useEffect, useState } from "react";
import Instacam from "instacam";

// import { Container } from './styles';

export default function Capture() {
  const [cam, setCam] = useState();
  useEffect(() => {
    const camera = new Instacam(document.getElementById("camera"), {
      width: 800,
      height: 600,
    });

    console.log("teste");

    camera.addListener("scan", (content) => {
      console.log(content);
    });
  }, []);
  return (
    <>
      Essa é minha camera
      <canvas id="camera" />
    </>
  );
}
