import React, { useState } from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 70%; /* 뷰포트 너비를 기준으로 100%로 설정 */
  min-height: 300px; /* 최소 높이를 설정 */
  height: auto;
  resize: none; /* 사용자 조절 비활성화 */
  background-color: transparent;
  border: none;
  //border-color: black;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
`;

export const TextBox = () => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
    // 텍스트 박스의 높이를 자동으로 조절
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      // input 값 확인
      const typing = e.target;
      console.log(typing.value);
      // 맞으면 초록색 체크 잠깐 보여주고 넘어가기
      // 틀리면 삐빅! 효과 후 재입력
    }
  };

  return (
    <div>
      <StyledTextArea
        value={text}
        onChange={handleInputChange}
        rows={1}
        autoFocus
      />
    </div>
  );
};
