import React, { useState } from "react";
import styled from "styled-components";

export const SubButton = styled.button`
  padding: 10px 15px;
  font-weight: bold;
  font-size: 16px;
  background-color: transparent;
  /* background-color: white; */
  border: none;
  border-radius: 5px;
  cursor: pointer;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.8 ease-in-out;

  &:hover {
    opacity: 1;
    //background-color: var(--bg-blue);
    //background-color: #2626263a;
    color: var(--bg-blue);
  }

  margin-left: 30px;
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
    align-items: center;
    justify-content: center;
    //transition: transform 0.8s ease-in-out;
  }

  img {
    width: 40px;
    height: 40px;
    transition: transform 0.5s ease-in-out;
  }

  p {
    font-size: 17px;
    color: black;
  }

  &:hover {
    img {
      transform: translateX(-30px);
    }
    div {
      transform: translateX(-20px);
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
                e.stopPropagation();
                handleCategoryClick("한글");
              }}
            >
              한글
            </SubButton>
            <SubButton
              isVisible={isHovered || isClicked}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick("JAVA");
              }}
            >
              Java
            </SubButton>
            <SubButton
              isVisible={isHovered || isClicked}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick("PYTHON");
              }}
            >
              Python
            </SubButton>
            <SubButton
              isVisible={isHovered || isClicked}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick("C");
              }}
            >
              C
            </SubButton>
          </>
        )}
      </div>
    </LogoArea>
  );
};

export default Logo;
