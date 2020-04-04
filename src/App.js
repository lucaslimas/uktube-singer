import React from "react";
import GlobalStyle from "./global/styles";

import QrCodeReader from "./pages/QrCodeReader";

function App() {
  return (
    <>
      <GlobalStyle />
      <QrCodeReader />
    </>
  );
}

export default App;
