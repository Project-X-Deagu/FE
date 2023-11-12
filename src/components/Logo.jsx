import React, { useState } from "react";
import styled from "styled-components";

export const SubButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: var(--bg-gray);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-blue);
    color: white;
  }
`;

export const LogoArea = styled.div`
  cursor: pointer;
  //background-color: var(--bg-blue);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  //margin: 30px auto;

  img {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    //transition: margin-left 0.3s ease-in-out;
  }

  p {
    font-size: 17px;
    margin-top: 5px;
    color: black;
  }
`;

export const Logo = ({ onLogoHover, onCategorySelect }) => {
  const [isHovered, setHovered] = useState(false);

  const handleLogoHover = () => {
    setHovered(true);
    onLogoHover(true);
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleLogoLeave = () => {
    setHovered(false);
    onLogoHover(false);
  };

  return (
    <LogoArea onMouseEnter={handleLogoHover} onMouseLeave={handleLogoLeave}>
      <div onClick={handleLogoClick} isHovered={isHovered}>
        <img src="./logo.png" alt="Logo" />
        {/* <p>DODODOC</p> */}
        {/* 인풋 창 */}
        {isHovered && (
          <>
            <SubButton
              onClick={(e) => {
                e.stopPropagation(); // 로고 클릭 이벤트 전파 방지
                handleCategoryClick("한글");
              }}
            >
              한글
            </SubButton>
            <SubButton
              onClick={(e) => {
                e.stopPropagation(); // 로고 클릭 이벤트 전파 방지
                handleCategoryClick("English");
              }}
            >
              English
            </SubButton>
          </>
        )}
      </div>
    </LogoArea>
  );
};

export default Logo;
