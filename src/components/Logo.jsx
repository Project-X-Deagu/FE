import React, { useState } from "react";
import styled from "styled-components";

export const SubButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  /* background-color: var(-bg-gray); */
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.8 ease-in-out;

  &:hover {
    opacity: 1;
    background-color: var(--bg-blue);
    color: white;
  }

  margin-left: 20px;
`;

export const LogoArea = styled.div`
  cursor: pointer;
  background-color: var(--bg-gray);
  /* background-color: white; */
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  /* margin: 30px auto; */

  div {
    display: flex;
    flex-direction: row;
    /* transition: transform 0.8s ease-in-out; */
  }

  img {
    width: 40px;
    height: 40px;
    transition: transform 0.8s ease-in-out;
    transform: translateX() (0);
  }

  p {
    font-size: 17px;
    color: black;
  }

  &:hover {
    img {
      transform: translateX(-50px);
    }
    div {
      transform: translateX(-30px);
    }
  }

  ${SubButton} {
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  }
`;

export const Logo = ({ onLogoHover, onCategorySelect }) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const handleLogoHover = () => {
    setHovered(true);
    onLogoHover(true);
  };

  const handleLogoLeave = () => {
    if (!isClicked) {
      setHovered(false);
      onLogoHover(false);
    }
  };

  const handleLogoClick = () => {
    setClicked((prev) => !prev);
    // 로고 클릭 시 페이지 새로고침
    window.location.reload();
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  return (
    <LogoArea
      onMouseEnter={handleLogoHover}
      onMouseLeave={handleLogoLeave}
      isVisible={isHovered || isClicked}
    >
      <div onClick={handleLogoClick}>
        <img src="./logo.png" alt="Logo" />
        {(isHovered || isClicked) && (
          <>
            <SubButton
              isVisible={isHovered || isClicked}
              onClick={(e) => {
                e.stopPropagation(); // 로고 클릭 이벤트 전파 방지
                handleCategoryClick("한글");
              }}
            >
              한글
            </SubButton>
            <SubButton
              isVisible={isHovered || isClicked}
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
