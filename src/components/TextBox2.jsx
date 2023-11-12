import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Eng 버전
export const StyledTextArea = styled.textarea`
  background-color: transparent;
  background-color: white;
  width: 70%;
  min-width: 200px;
  max-width: 750px;
  height: auto;
  min-height: 350px;
  resize: none;
  //border: none;
  border: 2px solid white;
  border-radius: 15px;
  outline: none;
  margin-top: 50px;
  padding: 15px 25px;
  font-family: "D2Coding", sans-serif;
  font-size: 22px;

  &:focus {
    border-color: black;
    background-color: white;
  }
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

      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(selectionEnd);

      const spacesNeeded = 4 - (cursorPosition % 4);

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
    </div>
  );
};
