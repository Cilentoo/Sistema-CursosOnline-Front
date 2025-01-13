import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #343a40;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #495057;
  }

  input,
  textarea {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    resize: none;

    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    min-height: 100px;
  }
`;

export const ImagePreview = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ced4da;
  padding: 10px;
  border-radius: 5px;

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 5px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;
