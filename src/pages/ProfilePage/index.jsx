import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import apiService from '../../api/api';
import { toast } from 'react-toastify';
import { Container, ProfileCard, Input, Button, ActionsContainer } from './style';
import { ButtonEdit } from './style';
import { ButtonCancel } from './style';
import { ButtonSave } from './style';


function ProfilePage() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.getUserById(id);
        setUserInfo(response.data);  
        setNewName(response.data.name);
        setNewEmail(response.data.email);
      } catch (error) {
        toast.error('Erro ao carregar dados do usuário!');
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      const updatedUserInfo = { name: newName, email: newEmail };
      await apiService.updateUser(id, updatedUserInfo); 
      setUserInfo(updatedUserInfo);
      setIsEditing(false);
      toast.success('Informações atualizadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar informações!');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(userInfo.name);
    setNewEmail(userInfo.email);
  };

  const handleDeleteAccount = async () => {
    try {
      await apiService.inactivateUser(id); 
      toast.success('Conta desativada com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao desativar a conta!');
    }
  };

  function handleGoToHome() {
    const role = userInfo.role;
    if (role === "Instructor") {
      navigate("/homeInstructor");
    } else {
      navigate("/homeStudent"); 
    }
  }

  return (
    <Container>
      <ProfileCard>
        <h1>Perfil de {userInfo.name}</h1>

        <div>
          {isEditing ? (
            <div>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Novo nome"
              />
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Novo e-mail"
              />
              <ActionsContainer>
                <ButtonSave onClick={handleSaveChanges}>Salvar</ButtonSave>
                <ButtonCancel onClick={handleCancel}>Cancelar</ButtonCancel>
              </ActionsContainer>
            </div>
          ) : (
            <div>
              <p>Nome: {userInfo.name}</p>
              <p>Email: {userInfo.email}</p>
              <ButtonEdit onClick={() => setIsEditing(true)}>Editar</ButtonEdit>
            </div>
            
          )}
        {!isEditing && (
            <ActionsContainer>
              <Button onClick={handleDeleteAccount} className="danger">
                Desativar Conta
              </Button>
              <Button onClick={handleGoToHome}>Voltar para o Início</Button>
            </ActionsContainer>
        )}
        </div>
      </ProfileCard>
    </Container>
  );
}

export default ProfilePage;