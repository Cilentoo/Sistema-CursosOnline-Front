import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    color: #333;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;


export const ButtonBack = styled.button`
    background-color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    width: 10rem;
    margin-top: 20px;
    color: white;
    &:hover {
        background-color: #e0e0e0;
    }

    &:focus {
        outline: none;
    }
`;


export const Button = styled.button`
  background-color: #013d32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 10rem;
  margin-top: 20px;

  &:hover {
    background-color: #03A688;
  }

  &:active {
    background-color: #03A688;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ImagePreview = styled.div`
  margin-top: 10px;

  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
`;


export const ButtonExpand = styled.button`
  background-color: #013d32;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 4px;

    &hover{
      background-color: #03A688;
    }
`;

export const ModulePanel = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
`;

export const ModuleItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ButtonSave = styled.button`
  background-color: #013d32;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ButtonDeleteModule = styled.button`
  background-color: #013d32;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
`;