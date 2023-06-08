import React, { useState } from "react";

export default function TextForm() {
  const [text, setText] = useState("");
  const [fWord, setFindWord] = useState("");
  const [rWord, setReplaceWord] = useState("");
  const [showReplaceInput, setShowReplaceInput] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
  };

  const handleLowClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
  };

  const handleClearText = () => {
    const newText = "";
    setText(newText);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const handleFindChange = (event) => {
    setFindWord(event.target.value);
  };

  const handleReplaceChange = (event) => {
    setReplaceWord(event.target.value);
  };

  const handleReplaceClick = () => {
    setShowReplaceInput(true);
  };

  const handleReplaceSubmit = () => {
    let newText = text.replaceAll(fWord, rWord);
    setText(newText);
    setShowReplaceInput(false);
  };

  const handleSpeak = () => {
    if (!isSpeaking) {
      const msg = new SpeechSynthesisUtterance(text || "textarea is empty");
      msg.onend = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    element.click();
  };

  const readTxt = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="container my-3">
        <h1>Enter the text below to analyze</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="box"
            rows="8"
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
        </div>
        <div className="mx-1">
          <button
            className="btn btn-primary mx-1 my-1"
            onClick={handleUpClick}
            disabled={text.length === 0}
          >
            UpperCase
          </button>

          <button
            className="btn btn-primary mx-1 my-1"
            onClick={handleLowClick}
            disabled={text.length === 0}
          >
            LowerCase
          </button>

          <button
            className="btn btn-primary mx-1 my-1"
            onClick={handleClearText}
            disabled={text.length === 0}
          >
            Clear Text
          </button>

          <button
            className="btn btn-primary mx-1 my-1"
            onClick={handleCopyText}
            disabled={text.length === 0}
          >
            Copy Text
          </button>

          <button
            className="btn btn-primary mx-1 my-1"
            onClick={handleExtraSpaces}
            disabled={text.length === 0}
          >
            Remove Extra Spaces
          </button>

          <button className="btn btn-primary mx-1 my-1" onClick={handleSpeak}>
            {isSpeaking ? "Stop" : "Speak"}
          </button>

          <button
            className="btn btn-primary mx-1 my-1 "
            onClick={handleDownloadTxt}
            disabled={text.length === 0}
          >
            Download Text
          </button>

          {showReplaceInput ? (
            <div>
              <input
                type="text"
                class="form-control w-25 h-25 p-3 d-inline mx-1 my-2"
                placeholder="Find"
                value={fWord}
                onChange={handleFindChange}
              />
              <input
                type="text"
                class="form-control w-25 h-25 p-3 d-inline mx-1 my-2"
                placeholder="Replace"
                value={rWord}
                onChange={handleReplaceChange}
              />
              <button
                onClick={handleReplaceSubmit}
                disabled={text.length === 0}
                className="btn btn-primary mx-1 my-1"
              >
                Replace
              </button>
            </div>
          ) : (
            <button
              onClick={handleReplaceClick}
              disabled={text.length === 0}
              className="btn btn-primary mx-1 my-1"
            >
              Replace
            </button>
          )}

          <div class="input-group w-25 h-25 mx-1 my-1 mb-3">
            <input
              type="file"
              className="form-control mx-1"
              accept="text/plain"
              onChange={readTxt}
            />
          </div>
        </div>
        <div className="container mx-1 my-2">
          <h2>Your text summary</h2>
          <p>
            {
              text.split(/\s+/).filter((element) => {
                return element.length !== 0;
              }).length
            }{" "}
            words and {text.length} letters.
          </p>
          <p>
            {0.008 *
              text.split(/\s+/).filter((element) => {
                return element.length !== 0;
              }).length}{" "}
            minutes read.
          </p>
          <h2>Preview</h2>
          <p>{text.length === 0 ? "Nothing to preview!" : text}</p>
        </div>
      </div>
    </>
  );
}

// TextForm.propTypes = {

// }
