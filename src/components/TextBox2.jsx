import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Eng 버전
export const StyledTextArea = styled.textarea`
  //background-color: white;
  background-color: transparent;
  width: 90%;
  min-width: 200px;
  max-width: 750px;
  height: auto;
  min-height: 200px;
  resize: none;
  //border: none;
  border: 2px solid var(--bg-gray);
  border-radius: 20px;
  outline: none;
  //margin: 0 auto;
  padding: 10px 25px;
  font-size: 20px;

  &:focus {
    border-color: black;
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
