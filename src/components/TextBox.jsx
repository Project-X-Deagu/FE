// TextBox.jsx
import React, { useState } from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  height: auto;
  resize: none;
  background-color: transparent;
  border-color: black;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
  font-size: 20px;
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
  };

  return (
    <div>
      <StyledTextArea
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={1}
        autoFocus
      />
    </div>
  );
};
