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
  border: 2px solid var(--bg-gray);
  border-radius: 50px;
  outline: none;
  //margin: 5 auto;
  padding: 10px 25px;
  font-weight: normal;
  font-size: 20px;

  &:focus {
    border-color: black;
  }
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

      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(selectionEnd);

      // Calculate the number of spaces needed to reach the next 4-column boundary
      const spacesNeeded = 4;

      const indentedText =
        textBeforeCursor + " ".repeat(spacesNeeded) + textAfterCursor;

      setText(indentedText);

      e.target.setSelectionRange(
        cursorPosition + spacesNeeded,
        cursorPosition + spacesNeeded
      );
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
