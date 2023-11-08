import styled from "styled-components";

export const Logo = () => {
  const handleLogoClick = () => {
    /* Logo를 클릭했을 때 새로고침 */
    window.location.reload();
  };

  return <div onClick={handleLogoClick}>DODODOC</div>;
};
