import React, { useState } from "react";
import "./css/App.css";
import RedirectModal from "./components/RedirectModal";

function App() {
  return (
    <div className="App" style={{ backgroundImage: "url(assets/back.webp)" }}>
      <RedirectModal />
    </div>
  );
}

export default App;
