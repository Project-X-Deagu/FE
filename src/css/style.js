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

export const CategoryArea = styled.div`
  //background-color: yellowgreen;
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  display: flex;
  justify-content: space-around;
`;

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

export const TextBoxArea = styled.div`
  //background-color: green;
  width: 70%;
  height: auto;
  text-align: center;
  margin: 20px auto;
  display: fixed;
  justify-content: center;
  align-items: center;
`;

export const KeymapArea = styled.div`
  //background-color: var(--bg-blue);
  width: 100%;
  height: 350px;
  display: flex;
  margin: 80px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
