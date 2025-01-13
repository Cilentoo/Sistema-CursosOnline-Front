import { useState, useContext } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
const foto = new URL("../../assets/curso_icon.png", import.meta.url);
import apiService from '../../api/api';
import { Form, InputGroup } from 'react-bootstrap';
import {
    Container, Forme,
    Imagem, Accessibility,
    AccessibilityContainer,
    Titulo,
    ButtonEntrar,
    TextoEntrar,
    Logo,
} from "./style";
import { MdContrast, MdOutlineTextDecrease, MdOutlineTextIncrease } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { ThemeContext } from '../../context/themeContext';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { switchTheme, isDarkMode } = useContext(ThemeContext);


    const handlePasswordToggle = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    function changeFontSize(action) {
        const elements = ["h1, h2"];
        elements.map((element) => {
            const selector = document.querySelector(element);
            let value = getComputedStyle(selector).getPropertyValue("font-size");
            value = value.replace("px", "");
            value = action === "aumentar" ? parseInt(value) + 2 : parseInt(value) - 2;
            document.querySelector(element).style.fontSize = `${value}px`;
        });
    }


    const handlePasswordButton = (
        <a onClick={handlePasswordToggle} >
            {showPassword ? (
                <BsEye />
            ) : (
                <BsEyeSlash />
            )}
        </a>
    )

    const handleLogin = async (e) => {
        e.preventDefault();


        if (!email || !password) {
            toast.warning("Preencha todos os campos.");
            return;
        }

        try{
            const response = await apiService.login({ email, password });
            const token  = response.data.token;
            if(token){
                localStorage.setItem('token', token);
                toast.success("Login efetuado com sucesso!");
                          
                setTimeout(() => {
                    window.location.href = "/homeInstructor";
                }, 2000);
            }
        }catch(error){
            toast.error(error.response?.data?.message || "Erro ao efetuar login.");
        }
    };

    return (
        <Container>
            <Imagem src={foto} alt="icon_curso" />
            <AccessibilityContainer>
                <Accessibility
                    aria-label="botao contraste"
                    tabIndex="5"
                    type="button"
                    onClick={switchTheme} >
                    <MdContrast size={28} />
                </Accessibility>
                <Accessibility
                    aria-label="botao aumentar"
                    tabIndex="6"
                    type="button"
                    onClick={() => changeFontSize("aumentar")}>
                    <MdOutlineTextIncrease size={28} />
                </Accessibility>
                <Accessibility
                    aria-label="botao diminuir"
                    tabIndex="7"
                    type="button"
                    onClick={() => changeFontSize("diminuir")}>
                    <MdOutlineTextDecrease size={28} />
                </Accessibility>
            </AccessibilityContainer >

            <Forme onSubmit={handleLogin}>
                <Logo src={foto} alt="icon_curso" />
                <Titulo>Sistema de Cursos Online</Titulo>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        tabIndex="1"
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
                <ButtonEntrar type="submit" tabIndex="4" aria-label="botao entrar">
                    <TextoEntrar>Entrar</TextoEntrar>
                </ButtonEntrar>
            </Forme>
        </Container >
    );
}