import React from "react";
import { TextBox2 } from "./TextBox2";

const textData = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is fun and challenging.",
  "React is a popular JavaScript library for building user interfaces.",
  "Practice makes perfect.",
  "Coding is a skill worth mastering.",
];

const TypingPractice = () => {
  const handleKeyPress = (key) => {
    // 부모 컴포넌트에서 필요한 키 이벤트 처리
    if (key === "Tab") {
      // 추가적인 동작 수행
    }
  };

  return <TextBox2 textData={textData} onKeyPress={handleKeyPress} />;
};

export default TypingPractice;
