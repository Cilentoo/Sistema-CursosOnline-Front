import { useState, useContext } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
const foto = new URL("../../assets/curso_icon.png", import.meta.url);
import apiService from '../../api/api';
import { Form, InputGroup } from 'react-bootstrap';
import {
    Container, Forme,
    Imagem, 
    Titulo,
    ButtonEntrar,
    TextoEntrar,
    Logo,
} from "./style";
import { HiOutlineLockClosed } from 'react-icons/hi';
import { ThemeContext } from '../../context/themeContext';
import { toast } from 'react-toastify';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handlePasswordToggle = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };


    const handlePasswordButton = (
        <a onClick={handlePasswordToggle} >
            {showPassword ? (
                <BsEye />
            ) : (
                <BsEyeSlash />
            )}
        </a>
    )

    const handleRegister = async (e) => {
        e.preventDefault();


        if (!name || !email || !password || !role) {
            toast.warning("Preencha todos os campos.");
            return;
        }

        try{
            await apiService.register({ name, email, password, role });
            toast.success("Cadastro realizado com sucesso! Redirecionando para o login...");
            
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }catch(error){
            toast.error(error.response?.data?.message || "Erro ao efetuar cadastro.");
        }
    };

    return (
        <Container>
            <Imagem src={foto} alt="icon_cursos" />
            <Forme onSubmit={handleRegister}>
                <Logo src={foto} alt="icon_cursos" />
                <Titulo>Sistema de Cursos Online</Titulo>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Username"
                        aria-label="Nome"
                        tabIndex="1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        tabIndex="2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3"><HiOutlineLockClosed /></InputGroup.Text>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        tabIndex="2"
                        placeholder="Senha"
                        aria-label="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon5">{handlePasswordButton}</InputGroup.Text>
                </InputGroup>
                <Form.Group className="mb-3">
                    <Form.Label>Para qual função é o cadastro?</Form.Label>
                        <div key="inline-radio" className="d-flex" >
                            <Form.Check
                                type="radio"
                                inline
                                label="Aluno"
                                name="role"
                                value="Student"
                                onChange={(e) => setRole(e.target.value)}
                                tabIndex="4"
                                aria-label="Aluno"
                            />
                            <Form.Check
                                type="radio"
                                inline
                                label="Instrutor"
                                name="role"
                                value="Instructor"
                                onChange={(e) => setRole(e.target.value)}
                                tabIndex="5"
                                aria-label="Instrutor"
                             />

                            <div className="ms-3">
                                <a href="/login" style={{ textDecoration: 'none', color: '#007bff', marginLeft: '70px' }}>
                                    Ja é cadastrado? Ir ao login
                                </a>
                            </div>
                        </div>
                    </Form.Group>
                <ButtonEntrar type="submit" tabIndex="4" aria-label="botao entrar">
                    <TextoEntrar>Entrar</TextoEntrar>
                </ButtonEntrar>
            </Forme>
        </Container >
    );
}