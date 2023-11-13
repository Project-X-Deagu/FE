import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import Sentence from "./Sentence2";
import useSound from "use-sound";
import keySoundAsset from "../mechanicalKeyboard.mp3";
import { KoreanInputHelper, inko } from "../helpers/KoreanInputHelper";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementProgressPercent,
  incrementTypeCount,
  selectWrongTyping,
  selectTypeSpeed,
  updateTitle,
} from "./scriptSlice";

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

export const TextBox2_JAVA = ({ onKeyPress }) => {
  const [text, setText] = useState(
    "TEST SENTENCE"
  );
  const [list, setList] = useState([]);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    axios.get("/api/english/java").then((res) => {
      setList(res.data);
      console.log(res);
    });
  }, []);

  /* 11월 14일 이후 변경 */
  const dispatch = useDispatch();
  const [playKeyPress] = useSound(keySoundAsset, {
    volume: 0.25,
    interrupt: true,
  });
  const step = useRef(0);
  const [script, setScript] = useState([]);
  const [language, setLanguage] = useState("english");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  const [finishedResult, setFinishedResult] = useState("");
  const [finishedInput, setFinishedInput] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [inProgress, setInProgress] = useState(true);

  const onKeyDown = useCallback(
    (event) => {
      if (inProgress) return;
      var flag = false;
      playKeyPress();
      console.log(event.code)
      if (event.code === 'Space') event.preventDefault();
      if (event.code === 'CapsLock' || event.code === "AltRight") {
        if (language === 'korean') setKoreanBuffer("");
        setLanguage(language === "korean" ? "english" : "korean");
        return;
      }
      dispatch(incrementTypeCount());

      if (event.code === "Enter" || userInput.length >= text.length){
        if (userInput.length < text.length) return;
        setFinishedResult(text);
        setFinishedInput(userInput);
        setUserInput("");
        setKoreanBuffer("");
        setCurrentInput("");
        setText(list[step.current + 1]);
        setCurrentResult(text);
        flag = true;
        step.current = step.current + 1;
        return;
      }

      if (language === "korean") {
        setKoreanBuffer((buf) => {
          const {nextUserInput, nextBuf} = KoreanInputHelper(
            buf,
            event,
            userInput
          );
          if (nextUserInput !== userInput) {
            if (!flag) setUserInput(nextUserInput);
          }
          return nextBuf;
        });
        return;
      }

      setUserInput((body) => {
        if (event.key === "Backspace") {
          event.preventDefault();
          return body.slice(0, -1);
        }

        if (event.key === "Enter") {
          return body.concat("\n");
        }

        if (event.key.length > 1) return body;

        return body.concat(event.key);
      });
    },
    [playKeyPress, language, userInput, inProgress, text]
  );

  useEffect(() => {
    setCurrentResult(text);
  }, []);

  useEffect(() => {
    setCurrentResult(text);
    setCurrentInput(userInput + inko.en2ko(koreanBuffer));
  });

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="sentence-task">
      <Sentence
        type="current-result2"
        sentence={currentResult}
        input={currentInput}
      />
    </div>
  );

  /*const handleInputChange = (e) => {
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
  );*/
};