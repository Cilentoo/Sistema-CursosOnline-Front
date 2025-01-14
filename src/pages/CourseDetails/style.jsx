import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-left: 20px;
  border: 1px solid #ccc;
  background-color: #ddd;
  
`;

export const Header = styled.header`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  h1 {
    font-size: 2.5rem;
    color: #333;
  }
`;

export const CourseInfo = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const CourseImage = styled.img`
  width: 300px;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 60px;
  margin-top: 30px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const CourseTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  color: black;

`;

export const CourseDescription = styled.p`
  font-size: 1.2rem;
  color: #333;
  max-width: 600px;
  margin-bottom: 20px;

`;

export const RatingSection = styled.section`
  margin-top: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const RatingTitle = styled.h3`
  font-size: 1.5rem;
  color: black;
  margin-bottom: 15px;
`;

export const RatingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RatingInput = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
  min-height: 80px;
`;

export const SubmitRatingButton = styled.button`
  padding: 10px 20px;
  background-color: #013d32;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #03A688;
  }
`;


export const RatingList = styled.div`
  margin-top: 30px;
`;

export const RatingItem = styled.div`
  background: #ecf0f1;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const RatingText = styled.p`
  font-size: 1rem;
  color: #34495e;
`;


export const CommentCard = styled.div`
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h5 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: black;
  }
  
  p {
    font-size: 1rem;
    color: black;
  }
  
  .stars {
    margin-bottom: 10px;
    display: flex;
  }

  .star {
    cursor: pointer;
    font-size: 2rem;
    color: #f39c12;
    margin-right: 5px;
  }
`;


export const ModuleList = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ModuleItem = styled.div`
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


export const ModuleTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: black;
`;

export const ModuleButton = styled.button`
  padding: 10px 20px;
  background-color: #013d32;;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1abc9c;
  }
`;


export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  button {
    padding: 10px;
    background-color: #013d32;;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color:  #1abc9c;
    }

    &:disabled {
      background-color: #333;
      cursor: not-allowed;
    }
  }

  span {
    align-self: center;
    margin: 0 10px;
    font-size: 1.2rem;
  }
`;

export const EnrollmentButton = styled.button`
  background-color: ${(props) => (props.isEnrolled ? "#333" : "#013d32")}; 
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color:  #1abc9c;
    transform: scale(1.05); 
  }

  &:disabled {
    background-color: #ccc; 
    cursor: not-allowed;
  }
`;

export const BackButton = styled.button`
  background-color: #333;
  color: white;
  width: 100px;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px; /* Adiciona um pequeno espaço à esquerda */

  &:hover {
    background-color: #555;
  }
`;