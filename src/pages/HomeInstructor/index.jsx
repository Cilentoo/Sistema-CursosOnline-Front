import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, CourseCard, Button } from "./style";

export default function HomeInstructor() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await apiService.getAllCourses();
      setCourses(response.data);
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
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div>
                <Button
                  onClick={() => window.location.href = `/edit-course/${course.id}`}
                >
                  Editar
                </Button>
                <Button onClick={() => handleDelete(course.id)} danger>
                  Excluir
                </Button>
              </div>
            </CourseCard>
          ))}
        </div>
      )}
    </Container>
  );
}