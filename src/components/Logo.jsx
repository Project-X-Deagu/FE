import React, { useState } from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  cursor: pointer;
`;

export const Logo = ({ onLogoHover }) => {
  const [isHovered, setHovered] = useState(false);

  const handleLogoHover = () => {
    setHovered(!isHovered);
    onLogoHover(!isHovered);
  };

  return (
    <LogoContainer
      onMouseEnter={handleLogoHover}
      onMouseLeave={handleLogoHover}
    >
      <img src="./logo.png" alt="Logo"></img>
      <p style={{ color: isHovered ? "red" : "black" }}>DODODOC</p>
    </LogoContainer>
  );
};

export default Logo;
