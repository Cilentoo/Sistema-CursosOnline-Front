import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, CourseCard, Button, CourseImage, CourseInfo, TitleCourse, DescriptionCourse } from "./style";

export default function HomeAluno() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await apiService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error("Erro ao carregar os cursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  return (
    <Container>
      <Header>
        <h1>Todos os Cursos</h1>
      </Header>

      {courses.length === 0 ? (
        <p>Não há cursos disponíveis.</p>
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
                <Button onClick={() => window.location.href = `/course-details/${course.id}`}>
                  Ver Detalhes
                </Button>
              </CourseInfo>
            </CourseCard>
          ))}
        </div>
      )}
    </Container>
  );
}