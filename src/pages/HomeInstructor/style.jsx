import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleCourse = styled.h3`
  font-size: 30px;
`;

export const CourseCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
`;

export const CourseImage = styled.img`
  width: 160px;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;
`;

export const DescriptionCourse  = styled.p `
  font-size: 16px;
  font-weight: 1300;
`;

export const CourseInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 8px 16px;
  margin: 5px;
  background-color: #013d32;;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #03A688;
  }
`;

export const ButtonEdit = styled.button`
  padding: 8px 16px;
  margin: 5px;
  background-color: #ffca2c;;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffca2c;
  }
`;

export const ButtonDelete = styled.button`
  padding: 8px 16px;
  margin: 5px;
  background-color: #fa5a54;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #fa5a54;
  }
`;