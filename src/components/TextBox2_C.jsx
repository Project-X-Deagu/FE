import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  width: 70%;
  min-width: 200px;
  max-width: 850px;
  height: auto;
  min-height: 420px;
  resize: none;
  //border: none;
  border: 2px solid black;
  border-radius: 15px;
  outline: none;
  margin-top: 10px;
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
  width: 40px;
  height: 40px;
  margin: 0 25px 200px 25px;
`;

export const TextBox2_C = ({ onKeyPress }) => {
  const [text, setText] = useState(
    'void searchWord(const struct Dictionary *dictionary, const char *word) {\n    int found = 0;\n    for (int i = 0; i < dictionary->count; i++) {\n        if (strcmp(dictionary->words[i].word, word) == 0) {\n            printf("mean: %s\n", dictionary->words[i].meaning);\n            found = 1;\n            break;\n        }\n    }\n    if (!found) {\n        printf("can\'t find");\n    }\n}'
  );
  const [list, setList] = useState([]);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    axios.get("/api/english/c").then((res) => {
      setList(res.data);
      console.log(res);
    });
  }, []);

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
    setText(list[getRandom(18, 32)]);
  };

  return (
    <div>
      <ImgButton
        src="left-arrow.png"
        alt="Prev"
        onClick={handleImgButtonClick}
      />
      <StyledTextArea
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        // rows={1} // 한 줄로 인식하도록 설정
        autoFocus
      />
      <ImgButton
        src="right-arrow.png"
        alt="Next"
        onClick={handleImgButtonClick}
      />
    </div>
  );
};
