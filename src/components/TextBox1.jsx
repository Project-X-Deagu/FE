import React, { useState } from "react";
import styled from "styled-components";

// 한국어 버전
export const StyledTextArea = styled.textarea`
  background-color: transparent;
  width: 90%;
  min-width: 200px;
  max-width: 750px;
  height: 25px;
  resize: none;
  //border: none;
  border-color: var(--bg-gray);
  border-width: 2px;
  border-radius: 50px;
  outline: none;
  //margin: 5 auto;
  padding: 10px 25px;
  font-size: 20px;
`;

export const ImgButton = styled.img`
  position: absolute;
  //top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const TextBox1 = ({ onKeyPress }) => {
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
      const textInLine = text.substring(lineStart, lineEnd !== -1 ? lineEnd : text.length);
      const textAfterLine = text.substring(lineEnd !== -1 ? lineEnd : text.length);

      // Insert 4 spaces at the cursor position in the line
      const indentedTextInLine = textInLine.substring(0, cursorPosition - lineStart) + " ".repeat(4) + textInLine.substring(cursorPosition - lineStart);

      // Combine all parts of the text
      const indentedText = textBeforeLine + indentedTextInLine + textAfterLine;

      setText(indentedText);

      // Set selection range to the end of the inserted spaces
      e.target.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
    }
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
      <ImgButton src="blue-button.png" alt="first try" />
      <ImgButton src="gray-button.png" alt="first try" />
      <ImgButton src="retry-button.png" alt="first try" />
    </div>
  );
};
