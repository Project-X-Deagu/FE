// TextBox.jsx
import React, { useState } from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  height: auto;
  resize: none;
  background-color: transparent;
  border: none;
  //border-color: black;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
  font-size: 20px;
  //white-space: pre-wrap;
`;

export const TextBox = ({ onKeyPress }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
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
      const spacesNeeded = 4 - (cursorPosition % 4);

      // Insert spaces at the cursor position
      const indentedText =
        textBeforeCursor + " ".repeat(spacesNeeded) + textAfterCursor;

      setText(indentedText);

      // Set selection range to the end of the inserted spaces
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
