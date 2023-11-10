import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LogoArea = styled.div`
  //background-color: var(--bg-blue);
  width: 100%;
  height: 100px;
  line-height: 140px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

export const TextBoxArea = styled.div`
  //background-color: green;
  width: 80%;
  max-width: 800px;
  height: 300px;
  text-align: center;
  margin: 70px auto 0;
  display: fixed;
  justify-content: center;
  align-items: center;
`;

export const KeymapContainer = styled.div`
  //background-color: var(--bg-blue);
  width: 100%;
  height: 350px;
  display: flex;
  margin: 50px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
