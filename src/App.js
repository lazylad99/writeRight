import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  function toggleMode() {
    setDarkMode((oldMode) => !oldMode);
    setMyStyle((oldStyle) =>
      darkMode
        ? {
            color: "#042743",
          }
        : {
            color: "white",
          }
    );
    document.body.style.backgroundColor = darkMode ? "white" : "#042743";
    document.title = darkMode ? "WriteRight - Light" : "WriteRight - Dark";
  }

  return (
    <>
      <Router>
        <Navbar toggle={toggleMode} darkMode={darkMode} />
        <div className="container my-3" style={myStyle}>
          <Routes>
            <Route exact path="/" element={<TextForm />} />
            <Route
              exact
              path="/about"
              element={<About darkMode={darkMode} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
