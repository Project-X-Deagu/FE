import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import Sentence from "./Sentence";
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

export const TextBox2_PYTHON = ({ onKeyPress }) => {
  const [text, setText] = useState(
    "print('Hello World!')"
  );
  const [list, setList] = useState([]);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    axios.get("/api/english/python").then((res) => {
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
  const [inProgress, setInProgress] = useState(false);

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
        setText(list[step.current]);
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

        if (event.key === "Tab") {
          key.preventDefault();
          return body.concat("    ");
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

   const sentences = list
  .slice(step.current, step.current + 4)
  .map((item, index) => <Sentence sentence={item} key={index} />);

  return (
    <div className="sentence-task">
      <Sentence
        type="current-result"
        sentence={currentResult}
        input={currentInput}
      />
      <Sentence type="current-input" sentence={currentInput} />
      <div className="rest">
        {sentences}
      </div>
    </div>
  );
};