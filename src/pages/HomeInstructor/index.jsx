import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, CourseCard, Button, CourseImage, CourseInfo } from "./style"; 
import { TitleCourse } from "./style";
import { DescriptionCourse } from "./style";
import { ButtonDelete } from "./style";
import { ButtonEdit } from "./style";
import jwt_decode from "jwt-decode"; 

const getLoggedInstructorId = () => {
  const token = localStorage.getItem('token'); 
  if (token) {
    try {
      const decodedToken = jwt_decode(token); 
      return decodedToken.instructorId || decodedToken.nameid; 
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      return null;
    }
  }
  return null;
};

export default function HomeInstructor() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await apiService.getAllCourses();

      const loggedInstructorId = getLoggedInstructorId();

      
      if (!loggedInstructorId) {
        toast.error("Você não está autenticado.");
        return;
      }

      const filteredCourses = response.data.filter(course => {
        return String(course.instructorId) === String(loggedInstructorId);
      });
      
      setCourses(filteredCourses);
    } catch (error) {
      toast.error("Erro ao carregar cursos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
      toast.success("Curso excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir curso.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Header>
        <h1>Meus Cursos</h1>
        <Button onClick={() => (window.location.href = "/create-course")}>
          Criar Novo Curso
        </Button>
      </Header>

      {courses.length === 0 ? (
        <p>Não há cursos cadastrados.</p>
      ) : (
        <div>
          {courses.map((course) => (
            <CourseCard key={course.id}>
              {course.coverImage && (
                <CourseImage
                  src={`data:image/jpeg;base64,${course.coverImage}`} 
                  alt={`Imagem do curso ${course.title}`}
                />
              )}
              <CourseInfo>
                <TitleCourse>{course.title}</TitleCourse>
                <DescriptionCourse>{course.description}</DescriptionCourse>
                <div>
                  <ButtonEdit
                    onClick={() => window.location.href = `/edit-course/${course.id}`}
                  >
                    Editar
                  </ButtonEdit>
                  <ButtonDelete onClick={() => handleDelete(course.id)}>
                    Excluir
                  </ButtonDelete>
                </div>
              </CourseInfo>
            </CourseCard>
          ))}
        </div>
      )}
    </Container>
  );
}