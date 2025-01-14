import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../api/api";
import jwt_decode from "jwt-decode"; 
import { Container, Header, CourseImage, CourseInfo, CourseTitle, 
    CourseDescription, 
    RatingSection, RatingTitle, RatingForm, RatingInput, 
    SubmitRatingButton, RatingList, RatingItem, RatingText, CommentCard, 
    ModuleList, ModuleItem, ModuleTitle, 
    ModuleButton, Pagination, EnrollmentButton 
} from "./style";
import { toast } from "react-toastify";
import { BackButton } from "./style";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({ modules: [] });
  const [modules, setModules] = useState([]);
  const [ratingText, setRatingText] = useState("");
  const [ratingValue, setRatingValue] = useState(0); 
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await apiService.getCourseById(courseId);
        const assessmentsResponse = await apiService.getAssessmentsByCourse(courseId);
        
        setCourse(courseResponse.data);
        setRatings(assessmentsResponse.data || []);

        const modulesResponse = await apiService.getModulesByCourse(courseId);
        setModules(modulesResponse.data || []);
        console.log(modulesResponse.data);
        
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          setStudentId(decodedToken.nameid || decodedToken.studentId);
          setStudentName(decodedToken.unique_name || decodedToken.name || decodedToken.sub); 
        }

        if (studentId) {
            const enrollmentResponse = await apiService.checkEnrollment(studentId, courseId);
            setIsEnrolled(enrollmentResponse.data);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do curso.");
        toast.error("Erro ao carregar detalhes do curso.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, studentId]);

  const handleAddRating = async () => {
    if (!ratingValue || !ratingText) {
      toast.alert("Por favor, adicione uma nota e um comentário.");
      return;
    }

    const assessmentData = {
      CourseId: courseId,
      StudentId: studentId,
      Rating: ratingValue,
      Comment: ratingText,
    };

    try {
      await apiService.createAssessment(assessmentData);
      setRatings([...ratings, { rating: ratingValue, comment: ratingText, studentName: studentName }]); 
      setRatingText("");
      setRatingValue(0);
      toast.success("Avaliação adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar avaliação.");
      toast.error("Erro ao adicionar avaliação.");
    }
  };

  const handleEnrollment = async () => {
    const enrollmentData = {
      CourseId: courseId,
      StudentId: studentId,
      EnrollmentDate: new Date(),
    };

    try {
      if (isEnrolled) {
        await apiService.unenrollStudent(enrollmentData);
        setIsEnrolled(false);
        toast.success("Você se desinscreveu do curso. Tchau Tchau!");
      } else {
        await apiService.enrollStudent(enrollmentData);
        setIsEnrolled(true);
        toast.success("Você foi inscrito no curso. Bem vindo a bordo!");
      }
    } catch (error) {
      toast.error("Erro ao inscrever/desinscrever.");
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = ratings.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Carregando detalhes do curso...</p>;
  }

  return (
    <Container>
      <Header>
        <h1>Detalhes do Curso</h1>
        <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
      </Header>

      <CourseInfo>
        <CourseImage
          src={`data:image/jpeg;base64,${course.coverImage}`}
          alt={`Imagem do curso ${course.title}`}
        />
        <div>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseDescription>{course.description}</CourseDescription>
          
          <RatingSection>
            <RatingTitle>Avaliação do Curso:</RatingTitle>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: ratingValue >= star ? "#FFD700" : "#ccc",
                  }}
                  onClick={() => setRatingValue(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </RatingSection>
        </div>
      </CourseInfo>

      <ModuleList>
        <h3>Módulos:</h3>
        {course && modules && modules.length > 0 ? (
          <>
            {modules.slice(0, 5).map((module) => (
              <ModuleItem key={module.id}>
                <ModuleTitle>{module.title}</ModuleTitle>
                <p>{module.description}</p>
                <p>{module.lessonCount} Aulas</p>
              </ModuleItem>
            ))}
          </>
        ) : (
          <p>Nenhum módulo disponível.</p>
        )}
            <a href="https://www.youtube.com/watch?v=VKjFuX91G5Q&list=PL62G310vn6nFIsOCC0H-C2infYgwm8SWW">
                Acesse o link para Aulas
            </a>
      </ModuleList>
    
        <EnrollmentButton 
            isEnrolled={isEnrolled} 
            onClick={handleEnrollment}
        >
            {isEnrolled ? "Desinscrever" : "Inscrever-se"}
        </EnrollmentButton>
      <RatingSection>
        <RatingTitle>Adicionar Avaliação:</RatingTitle>
        <RatingForm>
          <div>
            <label>Avaliação: </label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: ratingValue >= star ? "#FFD700" : "#ccc",
                  }}
                  onClick={() => setRatingValue(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <RatingInput
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            placeholder="Deixe sua avaliação..."
            rows="4"
          />
          <SubmitRatingButton onClick={handleAddRating}>
            Enviar Avaliação
          </SubmitRatingButton>
        </RatingForm>
      </RatingSection>

      <RatingList>
        <RatingTitle>Comentários:</RatingTitle>
        {currentComments.map((rating, index) => (
          <RatingItem key={index}>
            <CommentCard>
              <h5>{rating.studentName}</h5>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: rating.rating >= star ? "#FFD700" : "#ccc",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <RatingText>{rating.comment}</RatingText>
            </CommentCard>
          </RatingItem>
        ))}
      </RatingList>

      <Pagination>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * commentsPerPage >= ratings.length}>Próximo</button>
      </Pagination>
    </Container>
  );
}