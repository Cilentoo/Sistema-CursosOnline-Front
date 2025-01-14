import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  h1 {
    font-size: 24px;
    color: #333;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  background-color: #013d32;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #015f49;
  }
`;

export const ButtonBack = styled(Button)`
  background-color: #333;
  margin-top: 20px;
  &:hover {
    background-color: #999;
  }
`;