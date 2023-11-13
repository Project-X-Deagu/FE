import React from "react";
import styled from "styled-components";
import { TextBox1 } from "./TextBox1";
import { TextBox2_C } from "./TextBox2_C";
import { TextBox2_JAVA } from "./TextBox2_JAVA";
import { TextBox2_PYTHON } from "./TextBox2_PYTHON";

export const StyledTextBoxArea = styled.div`
  //background-color: orange;
  width: 100%;
  height: auto;
  min-height: 400px;
  text-align: center;
  margin-top: 20px;
  display: fixed;
  justify-content: center;
  align-items: center;
`;

export const TextBoxArea = ({ selectedCategory, handleKeyPress }) => {
  return (
    <StyledTextBoxArea>
      {selectedCategory === "한글" && <TextBox1 onKeyPress={handleKeyPress} />}
      {selectedCategory === "JAVA" && (
        <TextBox2_JAVA onKeyPress={handleKeyPress} />
      )}
      {selectedCategory === "PYTHON" && (
        <TextBox2_PYTHON onKeyPress={handleKeyPress} />
      )}
      {selectedCategory === "C" && (
        <TextBox2_C onKeyPress={handleKeyPress} />
      )}
    </StyledTextBoxArea>
  );
};
