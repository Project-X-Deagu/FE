import React, { useState } from "react";
import styled from "styled-components";
import EngTyping, { getRandomItem } from "./EngTyping";

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  //background-color: white;
  width: calc(70% - 10px);
  min-width: 100px;
  max-width: 700px;
  height: 25px;
  resize: none;
  overflow: hidden;
  //border: none;
  border: 2px solid black;
  border-radius: 20px;
  outline: none;
  margin: 150px 0 50px 0;
  padding: 10px 25px;
  font-family: "D2Coding", sans-serif;
  font-weight: normal;
  font-size: 20px;
  //ext-align: center;

  &:focus {
    //border-color: black;
    background-color: transparent;
  }
`;

export const ImgButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-top: 150px;
  margin-left: 20px;
  margin-bottom: 60px;
`;

export const TextBox1 = ({ onKeyPress }) => {
  const [text, setText] = useState(() => getRandomItem());

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const handleKeyDown = (e) => {
    onKeyPress(e.key);

    if (e.key === "Tab") {
      e.preventDefault();

      const cursorPosition = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;

      const lineStart = text.lastIndexOf("\n", cursorPosition - 1) + 1;
      const lineEnd = text.indexOf("\n", cursorPosition);

      const textBeforeLine = text.substring(0, lineStart);
      const textInLine = text.substring(
        lineStart,
        lineEnd !== -1 ? lineEnd : text.length
      );
      const textAfterLine = text.substring(
        lineEnd !== -1 ? lineEnd : text.length
      );

      const indentedTextInLine =
        textInLine.substring(0, cursorPosition - lineStart) +
        " ".repeat(4) +
        textInLine.substring(cursorPosition - lineStart);

      const indentedText = textBeforeLine + indentedTextInLine + textAfterLine;

      setText(indentedText);

      e.target.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleImgButtonClick();
    }
  };

  const handleImgButtonClick = () => {
    setText(getRandomItem());
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <StyledTextArea
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {/* <ImgButton
        src="green-check.png"
        alt="Next"
        onClick={handleImgButtonClick}
      />
      <ImgButton
        src="blue-check.png"
        alt="Next"
        onClick={handleImgButtonClick}
      />
      <ImgButton
        src="orange-nope.png"
        alt="Next"
        onClick={handleImgButtonClick}
      /> */}
    </div>
  );
};
