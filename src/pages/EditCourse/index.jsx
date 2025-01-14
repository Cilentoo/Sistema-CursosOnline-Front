import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, Input, Button, ImagePreview } from "./style";
import jwt_decode from "jwt-decode"; 

export default function EditCourse() {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState({
    title: "",
    description: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiService.getCourseById(courseId);
        setCourse(response.data);
        setImage(response.data.coverImage); 
        setPreview(response.data.coverImage);
      } catch (error) {
        toast.error("Erro ao carregar curso.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);


  const handleUpdate = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("id", courseId);
    formData.append("title", course.title);
    formData.append("description", course.description);

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const instructorId = decodedToken.nameid; 
      formData.append("instructorId", instructorId); 
    }

    if (image instanceof File) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const coverImageBase64 = reader.result.split(",")[1]; 
          formData.append("coverImage", coverImageBase64); 
          await submitCourseUpdate(formData); 
        };
        reader.readAsDataURL(image);
      } else {
       
        formData.append("coverImage", image);
        await submitCourseUpdate(formData); 
      }
  };

  const submitCourseUpdate = async (formData) => {
    try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,  
            },
        };
          

      await apiService.updateCourse(courseId, formData);
      toast.success("Curso atualizado com sucesso!");
      window.location.href = "/homeInstructor";
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao atualizar curso.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Header>
        <h1>Editar Curso</h1>
      </Header>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Título Atual</label>
          <Input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Descrição Atual</label>
          <Input
            type="text"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Imagem de Capa</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <ImagePreview>
              <img src={preview} alt="Preview da imagem" />
            </ImagePreview>
          )}
        </div>

        <Button type="submit">Atualizar Curso</Button>
      </form>
    </Container>
  );
}