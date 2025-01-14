import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, Input, Button } from "./style";

export default function CreateModule() {
  const { courseId } = useParams();
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    lessonCount: 0,
  });
  const navigate = useNavigate();

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createModule({
        ...moduleData,
        courseId,
      });
      toast.success("Módulo criado com sucesso!");
      navigate(`/homeInstructor`);
    } catch (error) {
      toast.error("Erro ao criar módulo.");
      console.error("Erro ao criar módulo:", error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Adicionar Módulo ao Curso</h1>
      </Header>

      <form onSubmit={handleCreateModule}>
        <div>
          <label>Título</label>
          <Input
            type="text"
            value={moduleData.title}
            onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Descrição</label>
          <Input
            type="text"
            value={moduleData.description}
            onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Quantidade de Aulas</label>
          <Input
            type="number"
            value={moduleData.lessonCount}
            onChange={(e) => setModuleData({ ...moduleData, lessonCount: e.target.value })}
            required
          />
        </div>

        <Button type="submit">Criar Módulo</Button>
      </form>
    </Container>
  );
}