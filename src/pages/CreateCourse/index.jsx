import React, { useState } from "react";
import {
  Container,
  FormWrapper,
  Title,
  FormGroup,
  ImagePreview,
  Button,
  ErrorMessage,
} from "./style";
import apiService from "../../api/api";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode"; 

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getInstructorIdFromToken = () => {
    const token = localStorage.getItem("token"); 
    console.log(token)
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);  
        return decoded?.nameid ? parseInt(decoded.nameid, 10) : null; 
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    }
    return null;  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const instructorId = getInstructorIdFromToken();
  
    if (!title || !description || !coverImage) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const coverImageBase64 = reader.result.split(',')[1];  
  
      const courseData = {
        title,
        description,
        instructorId, 
        coverImage: coverImageBase64,  
      };
  
      try {
        await apiService.createCourse(courseData);  
        toast.success("Curso criado com sucesso!");
        setTitle("");
        setDescription("");
        setCoverImage(null);
        setPreview(null);
        setError("");
      } catch (error) {
        toast.error(error.response?.data?.message || "Erro ao criar o curso. Tente novamente.");
      }
    };
    reader.readAsDataURL(coverImage);  
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Criar Novo Curso</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do curso"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do curso"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="coverImage">Imagem de Capa</label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <ImagePreview>
                <img src={preview} alt="Preview da imagem" />
              </ImagePreview>
            )}
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Criar Curso</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default CreateCourse;
