import React from "react";
import styled from "styled-components";
import { TextBox1 } from "./TextBox1";
import { TextBox2 } from "./TextBox2";

export const StyledTextBoxArea = styled.div`
  //background-color: green;
  width: 70%;
  height: auto;
  text-align: center;
  margin: 20px auto;
  display: fixed;
  justify-content: center;
  align-items: center;
`;

export const TextBoxArea = ({ selectedCategory, handleKeyPress }) => {
  return (
    <StyledTextBoxArea>
      {selectedCategory === "한글" && <TextBox1 onKeyPress={handleKeyPress} />}
      {selectedCategory === "English" && (
        <TextBox2 onKeyPress={handleKeyPress} />
      )}
    </StyledTextBoxArea>
  );
};
