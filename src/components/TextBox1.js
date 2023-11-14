import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { incrementProgressPercent, incrementTypeCount } from "./sentenceSlice";
import { KoreanInputHelper, inko } from "../helpers/KoreanInputHelper";
import useSound from "use-sound";
import Sentence from "./Sentence";
import keySoundAsset from "../mechanicalKeyboard.mp3";

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  width: 90%;
  min-width: 200px;
  max-width: 800px;
  height: 25px;
  resize: none;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 20px;
  outline: none;
  margin: 5px 0;
  padding: 10px 25px;
  font-family: "D2Coding", sans-serif;
  font-weight: normal;
  font-size: 20px;

  &:focus {
    background-color: white;
  }
`;

export const ImgButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export const TextBox1 = ({ onKeyPress }) => {
  const [list, setList] = useState([]);
  const [showText, setShowText] = useState(
    "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다."
  );

  useEffect(() => {
    axios.get("/api/korean").then((res) => {
      setList(res.data);
      console.log(res);
    });
  }, []);

  /* 변수 추가 - 23.11.14 */
  const [playKeyPress] = useSound(keySoundAsset, {
    volume: 0.25,
    interrupt: true,
  });
  const dispatch = useDispatch();
  const step = useRef(0);
  const [language] = useState("korean");
  const [userInput, setUserInput] = useState("");
  const [koreanBuffer, setKoreanBuffer] = useState("");
  const [finishedResult, setFinishedResult] = useState("");
  const [finishedInput, setFinishedInput] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");

  const onKeyDown = useCallback(
    (event) => {
      if (event.code === "Space") event.preventDefault();

      var flag = false;
      playKeyPress();
      dispatch(incrementTypeCount());

      if (event.code === "Enter" || userInput.length >= showText.length) {
        if (userInput.length < showText.length) return;
        setFinishedResult(showText);
        setFinishedInput(userInput);
        setUserInput("");
        setShowText(list[step.current + 1].sentence);
        setCurrentResult(showText);
        flag = true;
        step.current = step.current + 1;
      }

      if (language === "korean") {
        setKoreanBuffer((buf) => {
          const { nextUserInput, nextBuf } = KoreanInputHelper(
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
    },
    [playKeyPress, language, userInput]
  );

  useEffect(() => {
    setCurrentResult(showText);
  }, []);

  useEffect(() => {
    setCurrentResult(showText);
    setCurrentInput(userInput + inko.en2ko(koreanBuffer));
  });

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  const sentences = list
    .slice(step.current + 1, step.current + 5)
    .map((item, index) => <Sentence sentence={item.sentence} key={index} />);

  return (
    <div className="sentence-task">
      <Sentence type="finished-input" sentence={finishedInput} />
      <Sentence
        type="current-result"
        sentence={currentResult}
        input={currentInput}
      />
      <Sentence type="current-input" sentence={currentInput} />
      <div className="rest">{sentences}</div>
    </div>
  );
};

export default TextBox1;
/* const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  const handleKeyDown = (e) => {
    onKeyPress(e.key);

    if (e.key === "Tab") {
      e.preventDefault();

      const cursorPosition = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;

      const lineStart = inputText.lastIndexOf("\n", cursorPosition - 1) + 1;
      const lineEnd = inputText.indexOf("\n", cursorPosition);

      const textBeforeLine = inputText.substring(0, lineStart);
      const textInLine = inputText.substring(
        lineStart,
        lineEnd !== -1 ? lineEnd : inputText.length
      );
      const textAfterLine = inputText.substring(
        lineEnd !== -1 ? lineEnd : inputText.length
      );

      const indentedTextInLine =
        textInLine.substring(0, cursorPosition - lineStart) +
        " ".repeat(4) +
        textInLine.substring(cursorPosition - lineStart);

      const indentedText = textBeforeLine + indentedTextInLine + textAfterLine;

      setInputText(indentedText);

      e.target.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleImgButtonClick();
    }
  };

  const handleImgButtonClick = () => {
    if (list.length > 0) {
      setShowText(list[getRandom(0, 51)].sentence);
      setInputText("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <ImgButton
        src="left-arrow.png"
        alt="Prev"
        onClick={handleImgButtonClick}
        style={{ marginRight: "10px" }}
      />
      <div
        style={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledTextArea
          name="showText"
          value={showText}
          onChange={() => {}}
          autoFocus
          readOnly
          style={{ marginBottom: "25px" }}
        />
        <StyledTextArea
          name="inputText"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      <ImgButton
        src="right-arrow.png"
        alt="Next"
        onClick={handleImgButtonClick}
        style={{ marginLeft: "25px" }}
      />
    </div>
  );
};
*/
