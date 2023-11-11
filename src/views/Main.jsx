// Main.jsx
import React, { useState } from "react";
import { Logo } from "../components/Logo";
import { TextBox1 } from "../components/TextBox1";
import { TextBox2 } from "../components/TextBox2";
import { Keymap } from "../components/Keymap";
import { Category } from "../components/Category";
import {
  LogoArea,
  CategoryArea,
  TextBoxArea,
  KeymapArea,
  SubButton,
} from "../css/style.js";

function Main() {
  const [keyColor, setKeyColor] = useState("white");
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogoClick = () => {
    window.location.reload();
  };

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

  return (
    <div>
      {/* 상단 로고 */}
      <LogoArea>
        <Logo onLogoHover={handleCategoryHover} />
      </LogoArea>
      {/* 드롭다운 카테고리 */}
      <CategoryArea>
        {/* <Category
          isVisible={isCategoryVisible}
          onSelectCategory={handleCategorySelect}
        ></Category> */}
        <SubButton onClick={() => handleCategorySelect("한글")}>한글</SubButton>
        <SubButton onClick={() => handleCategorySelect("English")}>
          English
        </SubButton>
      </CategoryArea>
      {/* 인풋 창 */}
      <TextBoxArea>
        {selectedCategory === "한글" && (
          <TextBox1 onKeyPress={handleKeyPress} />
        )}
        {selectedCategory === "English" && (
          <TextBox2 onKeyPress={handleKeyPress} />
        )}
      </TextBoxArea>
      {/* 키보드 레이아웃 */}
      <KeymapArea>
        <Keymap keyColor={keyColor}></Keymap>
      </KeymapArea>
    </div>
  );
}

export default Main;
