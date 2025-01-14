import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../api/api";
import { Container, Header, Input, Button, ImagePreview, ButtonExpand, ModulePanel, ModuleItem, ButtonDeleteModule } from "./style";
import jwt_decode from "jwt-decode";
import { ButtonBack } from "./style";

export default function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    coverImage: "",
  });
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiService.getCourseById(courseId);
        const modulesResponse = await apiService.getModulesByCourse(courseId);
        setCourse(response.data);
        setImage(response.data.coverImage); 
        setPreview(response.data.coverImage);
        setModules(modulesResponse.data);
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

  const handleDeleteModule = async (moduleId) => {
    try {
      await apiService.deleteModule(moduleId);
      setModules(modules.filter((module) => module.id !== moduleId));
      toast.success("Módulo excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir módulo.");
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

  const handleModuleChange = (e, moduleId) => {
    const { name, value } = e.target;
    setModules(modules.map((module) =>
      module.id === moduleId ? { ...module, [name]: value } : module
    ));
  };

  const handleModuleSave = async (moduleId) => {
    const moduleToUpdate = modules.find(module => module.id === moduleId);
    try {
      await apiService.updateModule(moduleId, moduleToUpdate);
      toast.success("Módulo atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar módulo.");
    }
  };

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState); 
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
          <label>Título</label>
          <Input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Descrição</label>
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
        <ButtonExpand
          onClick={(e) => {
          e.preventDefault();
          toggleExpand();
        }}
        >
          {expanded ? "Ocultar Módulos" : "Mostrar Módulos"}
        </ButtonExpand>

        {expanded && (
          <ModulePanel>
            {modules.length > 0 ? (
              modules.map((module) => (
                <ModuleItem key={module.id}>
                  <div>
                    <label>Título do Módulo</label>
                    <Input
                      type="text"
                      name="title"
                      value={module.title}
                      onChange={(e) => handleModuleChange(e, module.id)}
                    />
                  </div>

                  <div>
                    <label>Descrição do Módulo</label>
                    <Input
                      type="text"
                      name="description"
                      value={module.description}
                      onChange={(e) => handleModuleChange(e, module.id)}
                    />
                  </div>

                  <div>
                    <label>Contagem de Aulas</label>
                    <Input
                      type="number"
                      name="lessonCount"
                      value={module.lessonCount}
                      onChange={(e) => handleModuleChange(e, module.id)}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button onClick={() => handleModuleSave(module.id)}>
                      Salvar Módulo
                    </Button>
                    <ButtonDeleteModule
                        type="button" 
                        onClick={() => handleDeleteModule(module.id)}
                        style={{ backgroundColor: "#f44336" }}
                    >
                      Excluir Módulo
                    </ButtonDeleteModule>
                  </div>
                </ModuleItem>
              ))
            ) : (
              <p>Este curso não tem módulos ainda.</p>
            )}
          </ModulePanel>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit">Atualizar Curso</Button>
          <ButtonBack onClick={() => navigate(-1)}>Voltar</ButtonBack>
        </div>
      </form>
    </Container>
  );
}