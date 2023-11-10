import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LogoArea = styled.div`
  //background-color: var(--bg-blue);
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 30px;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  p {
    font-size: 17px;
    margin-top: 5px;
    color: black;
  }
`;

export const TextBoxArea = styled.div`
  //background-color: green;
  width: 70%;
  height: 300px;
  text-align: center;
  margin: 20px auto;
  display: fixed;
  justify-content: center;
  align-items: center;
`;

export const KeymapContainer = styled.div`
  //background-color: var(--bg-blue);
  width: 100%;
  height: 350px;
  display: flex;
  margin: 80px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
