import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
  }
`;

export const CourseCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 8px 0;
    color: #666;
  }

  div {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? "#fa5a54" : "#013d32")};
  color: #fff;

  &:hover {
    background-color: ${(props) => (props.danger ? "#fa5a54" : "#03A688;")};
  }
`;