import React, { useState, useEffect } from "react";
import styled from "styled-components";

// export const TypingContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const TextBox = styled.input`
//   font-size: 16px;
//   margin: 10px;
//   padding: 5px;
//   width: 80%;
//   text-align: center;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   outline: none;
//   color: ${(props) => (props.isCorrect ? "green" : "black")};
// `;

// export const SentenceContainer = styled.div`
//   margin: 20px;
// `;

// export const TextBox2 = ({ textData, onKeyPress }) => {
//   const [currentSentence, setCurrentSentence] = useState(0);
//   const [inputValue, setInputValue] = useState("");
//   const [isCorrect, setIsCorrect] = useState([]);

//   useEffect(() => {
//     const sentence = textData[currentSentence];
//     const correctArray = Array(sentence.length).fill(false);
//     setIsCorrect(correctArray);
//   }, [currentSentence, textData]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     const sentence = textData[currentSentence];
//     const newIsCorrect = sentence.split("").map((char, index) => {
//       return char === value[index];
//     });

//     setIsCorrect(newIsCorrect);
//   };

//   const handleKeyPressLocal = (key) => {
//     onKeyPress(key);

//     if (key === "Tab") {
//       handleNextSentence();
//     }
//   };

//   const handleNextSentence = () => {
//     setInputValue("");
//     setCurrentSentence((prev) => (prev + 1 < textData.length ? prev + 1 : 0));
//   };

//   return (
//     <TypingContainer>
//       <SentenceContainer>
//         <p>{textData[currentSentence]}</p>
//       </SentenceContainer>
//       <TextBox
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={(e) => handleKeyPressLocal(e.key)}
//         isCorrect={isCorrect}
//       />
//     </TypingContainer>
//   );
// };

// Eng 버전
export const StyledTextArea = styled.textarea`
  //background-color: white;
  background-color: transparent;
  width: 90%;
  min-width: 200px;
  max-width: 750px;
  height: auto;
  min-height: 200px;
  resize: none;
  //border: none;
  border-color: var(--bg-gray);
  border-width: 2px;
  border-radius: 20px;
  outline: none;
  //margin: 0 auto;
  padding: 10px 25px;
  font-size: 20px;
  overflow-y: visible;
`;

export const TextBox2 = ({ onKeyPress }) => {
  const [text, setText] = useState("");

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

      const spacesNeeded = 4 - (cursorPosition % 4);

      const indentedText =
        textBeforeCursor + " ".repeat(spacesNeeded) + textAfterCursor;

      setText(indentedText);

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
