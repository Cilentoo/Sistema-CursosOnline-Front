import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineExitToApp } from "react-icons/md";
import { SidebarStyle, Accessibility} from "./style"; 
import { MdOutlineTextDecrease, MdOutlineTextIncrease } from 'react-icons/md';


function Sidebar({ logOut, windowSize }) {
    const [sideBarCollapse, setSideBarCollapse] = useState(true);
    const navigate = useNavigate();

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

  const getUserNameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        return decoded?.unique_name ? decoded.unique_name : "Usuário";
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return "Usuário";
      }
    }
    return "Usuário";
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        return decoded?.nameid ? decoded.nameid : null;  
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    }
    return null;
  };

  const userName = getUserNameFromToken();
  const userId = getUserIdFromToken(); 

  function handleLogOut() {
    logOut();
    navigate("/login"); 
  }

  function handleGoToProfile() {
    navigate(`/profile/${userId}`);
  }


  return (
    <div className={windowSize >= 992 ? "col-1" : "col-0"} style={{ padding: 0 }}>
      <SidebarStyle collapse={sideBarCollapse}>
        <div className="logo-area">
          {sideBarCollapse ? <span>SGCO</span> : <span>Sistema de Cursos Online</span>}
        </div>
        <div className="collapse-sidebar-action">
          {sideBarCollapse ? (
            <BsArrowBarRight
              title="Expandir"
              onClick={() => setSideBarCollapse(!sideBarCollapse)}
            />
          ) : (
            <BsArrowBarLeft
              title="Retrair"
              onClick={() => setSideBarCollapse(!sideBarCollapse)}
            />
          )}
        </div>

        <div className="user-container"  onClick={handleGoToProfile}>
          <BiUserCircle title={userName} />
          {!sideBarCollapse && (
            <div className="user-info">
              <span className="label-sidebar" title={userName}>
                {userName}
              </span>
            </div>
          )}
        </div>

        <div className="sidebar-nav-item" onClick={handleLogOut}>
          <div className="area-icons-label">
            <MdOutlineExitToApp title="Sair" />
            {!sideBarCollapse && <span className="label-sidebar">Sair</span>}
          </div>
        </div>
        <div>
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
        </div>
      </SidebarStyle>
    </div>
  );
}

export default Sidebar;