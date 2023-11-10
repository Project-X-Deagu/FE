// Main.jsx
import React, { useState } from "react";
import { Logo } from "../components/Logo";
import { TextBox } from "../components/TextBox";
import { Keymap } from "../components/Keymap";
import { LogoArea, TextBoxArea, KeymapContainer } from "../css/style.js";

export const Main = () => {
  const [keyColor, setKeyColor] = useState("white");

  const handleKeyPress = (key) => {
    // 여기에서 키 입력에 따라 키 색상을 변경합니다.
    if (key >= "a" && key <= "z") {
      setKeyColor("var(--bg-blue)");
    } else {
      setKeyColor("white");
    }
  };

  return (
    <div>
      {/* 상단 로고 */}
      <LogoArea>
        <Logo></Logo>
      </LogoArea>
      {/* 인풋 창 */}
      <TextBoxArea>
        <TextBox onKeyPress={handleKeyPress}></TextBox>
      </TextBoxArea>
      {/* 키보드 레이아웃 */}
      <KeymapContainer>
        <Keymap keyColor={keyColor}></Keymap>
      </KeymapContainer>
    </div>
  );
};
