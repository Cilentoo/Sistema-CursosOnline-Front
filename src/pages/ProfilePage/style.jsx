import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
`;

export const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #013d32;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 40px;

  &:hover {
    background-color: #013d32 ;
  }

  &.danger {
    background-color: #fa5a54;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;


export const ButtonSave = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #013d32;
  border: none;
  border-radius: 4px;
  cursor: pointer;


  &:hover {
    background-color: #013d32 ;
  }

`;

export const ButtonCancel = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #fa5a54;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f ;
  }

`;

export const ButtonEdit = styled.button`
  font-size: 16px;
  color: black;
  background-color:rgb(238, 183, 20);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;

    &:hover {
    background-color:  #ffca2c;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-start;
`;