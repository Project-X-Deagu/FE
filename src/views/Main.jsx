import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "../components/Logo";
import TypingEffect from "../components/TypingEffect";
import { TextBoxArea } from "../components/TextBoxArea.jsx";
import { KoreanKeymap } from "../components/KoreanKeymap";
import { Keymap } from "../components/Keymap";
// import { Keymap } from "../components/KoreanKeymap";
import { KeymapArea } from "../css/style.js";

const TextBoxKeymapWrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

function Main() {
  const [keyColor, setKeyColor] = useState("white");
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryHover = (hovered) => {
    setCategoryVisible(hovered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleKeyPress = (key) => {
    if (key >= "a" && key <= "z") {
      setKeyColor("var(--bg-blue)");
    } else {
      setKeyColor("white");
    }
  };

  const getKeymapComponent = () => {
    switch (selectedCategory) {
      case "한글":
        return <KoreanKeymap keyColor={keyColor} />;
      case "English":
        return <Keymap keyColor={keyColor} />;
      // Add more cases for other categories
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <Logo
        onLogoHover={handleCategoryHover}
        onCategorySelect={handleCategorySelect}
      />
      {/* 카테고리 미선택 */}
      {!selectedCategory && <TypingEffect></TypingEffect>}
      {/* 카테고리 선택 */}
      {selectedCategory && (
        <TextBoxKeymapWrapper isVisible={selectedCategory !== null}>
          {/* 인풋 창 */}
          <TextBoxArea
            selectedCategory={selectedCategory}
            handleKeyPress={handleKeyPress}
          />
          {/* 키보드 레이아웃 */}
          <KeymapArea>{getKeymapComponent()}</KeymapArea>
        </TextBoxKeymapWrapper>
      )}
    </div>
  );
}

export default Main;
