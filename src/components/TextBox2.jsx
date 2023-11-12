import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EngTyping, { getRandomItem } from "./EngTyping";

// Eng 버전
export const StyledTextArea = styled.textarea`
  background-color: transparent;
  //background-color: white;
  width: 70%;
  min-width: 200px;
  max-width: 750px;
  height: auto;
  min-height: 350px;
  resize: none;
  //border: none;
  border: 2px solid black;
  border-radius: 15px;
  outline: none;
  margin-top: 50px;
  padding: 15px 25px;
  font-family: "D2Coding", sans-serif;
  font-size: 22px;

  &:focus {
    //border-color: black;
    background-color: transparent;
  }
`;

export const ImgButton = styled.img`
  cursor: pointer;
  width: 45px;
  height: 40px;
  margin-bottom: 170px;
  margin-left: 10px;
`;

export const TextBox2 = ({ onKeyPress }) => {
  const [text, setText] = useState("");

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

      // Insert 4 spaces at the cursor position in the line
      const indentedTextInLine =
        textInLine.substring(0, cursorPosition - lineStart) +
        " ".repeat(4) +
        textInLine.substring(cursorPosition - lineStart);

      // Combine all parts of the text
      const indentedText = textBeforeLine + indentedTextInLine + textAfterLine;

      setText(indentedText);

      // Set selection range to the end of the inserted spaces
      e.target.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
    }
  };

  const handleImgButtonClick = () => {
    setText(getRandomItem());
  };

  return (
    <div>
      <StyledTextArea
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        // rows={1} // 한 줄로 인식하도록 설정
        autoFocus
      />
      <ImgButton src="arrow.png" alt="Next" onClick={handleImgButtonClick} />
    </div>
  );
};
