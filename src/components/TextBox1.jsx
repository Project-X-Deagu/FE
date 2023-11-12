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
  border-radius: 50px;
  outline: none;
  margin: 150px 0 50px 0; /* 수정된 부분 */
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
  width: 45px;
  height: 40px;
  margin-top: 150px;
  margin-left: 10px;
  margin-bottom: 50px;
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

      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(selectionEnd);

      const spacesNeeded = 4;

      const indentedText =
        textBeforeCursor + " ".repeat(spacesNeeded) + textAfterCursor;

      setText(indentedText);

      e.target.setSelectionRange(
        cursorPosition + spacesNeeded,
        cursorPosition + spacesNeeded
      );
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
      <ImgButton src="arrow.png" alt="Next" onClick={handleImgButtonClick} />
    </div>
  );
};
