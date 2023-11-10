import styled from "styled-components";

export const Logo = () => {
  const handleLogoClick = () => {
    /* Logo를 클릭했을 때 새로고침 */
    window.location.reload();
  };

  return (
    <div onClick={handleLogoClick}>
      <img src="./logo.png" alt="Logo"></img>
      <p> DODODOC </p>
    </div>
  );
};
