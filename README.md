# Sistema Front-End para web de cursos online - Web Api ( CSHARP# ) React VITE

## Sobre o Projeto - API

Desenvolver uma api web, na linguagem c#, para algum sistema de minha escolha, a ideia é que teremos dois atores que vão interagir com um front-end basico para um site de cursos online, e neste repositório integrar um visual para interagir com a api citada
</br>

### Critérios do Projeto

- Requisitos:
- Versionamento
• Organização do Código
• Modelo de arquitetura de pastas.
• Utilizar principios do DDD
• Usar Xunit ou Nunit para testes unitários
• Utilizar Dapper para acesso ao banco de dados
• .NET 8.0 ou superior
• Integração com React VITE
• Visual de interação para os métodos da Api
Bônus (Extra):
• Usar autenticação do tipo jwt, ou basic
• Utilizar Mensageria com RabbitMq ou outro (Opcional)

### Abaixo está a estrutura do diretório do projeto:

```bash
/src
├── Sistema-CursosOnline               # React project
├── src/                               # Pasta raiz do código fonte
│   ├── Api/                           # Pasta de componentes de aplicação do projeto
│   │  ├── Api.jsx/                    # Configuração dos endpoints da Api
│   ├── Assets/                        # Fotos do projeto
│   ├── components/                    # Componentes do projeto
│   │  ├──SiderBar                     # Componente de Sidebar
│   │  ├──Toastify                     # Componente de notificações de avisos
│   ├── Assets/                        # Contextos
│   |  ├──themeContext                 # Temas 
│   ├── Pages/                         # Páginas do projeto
│   │  ├──CourseDetails                # Detalhes do curso
│   │  ├──CreateCourse                 # Criação de curso
│   │  ├──CreateModules                # Criação de módulos de curso
│   │  ├──EditCourse                   # Edição de curso
│   │  ├──HomeInstructor               # Principal Instrutor
│   │  ├──HomeStudent                  # Principal Aluno
│   │  ├──Login                        # Página Login
│   │  ├──Register                     # Página registro
│   │  ├──ProfilePage                  # Detalhes de um perfil
│   ├── routes/                        # Pasta de rotas
│   │  ├──AppRoutes                    # Rotas da aplicação
│   │  ├──ProtectedRoutes              # Proteção de rotas
│   ├── App.jsx/                       # Aplicação
│   ├── main.jsx/                      # Renderização
├── gitattributes/                     # Atributos git
├── .gitingore/                        # gitignore
├── README/                            # arquivo de paginação detelhes do projeto
├── eslint/                            # configuração eslint
├── index.html/                        # Html padrão react
├── package.json/                      # Json de dependencias
├── vite.config/                       # Config do vite

```


### Status do projeto: **CONCLUÍDO**

## 📁 Acesso ao projeto

**Você pode acessar e baixar o código fonte do projeto final
[aqui](https://github.com/Cilentoo/Sistema-CursosOnline-Front).**

**Após baixar o projeto, você pode abrir com o Visual Code, IDE utilizada para realizar a programação.**
**Configurar o arquivo api.jsx, na linha BASEURL com o localhost e a porta onde roda seu .NET**


## Stack utilizada

- React VITE
- Bibliotecas React
**Rodar o terminal da aplicação com o comando npm i, para instalação de todas as dependencias e modulos.**
- **Ferramentas:**
- Git
- GitHub
- VisualStudio Code
