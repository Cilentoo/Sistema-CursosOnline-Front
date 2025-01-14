import styled from "styled-components";

export const SidebarStyle = styled.div`
  background-color: ${(props) => (props.collapse ? "##fff" : "hsla(0, 0.00%, 100.00%, 0.5)")};
  color: #333;
  width: ${(props) => (props.collapse ? "80px" : "200px")};
  height: 87vh;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  border: 1px solid #444;

  .logo-area {
    padding: 20px;
    margin-top: 80px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }

  .collapse-sidebar-action {
    position: absolute;
    top: 160px;
    right: 30px;
    cursor: pointer;
    z-index: 10;
  }

  .user-container {
    display: flex;
    align-items: center;
    padding: 30px;
    border-top: 1px solid #444;
    cursor: pointer;
    margin-top: 60px;
     transition: background-color 0.3s;

    &:hover {
      background-color: #D9D9D9;
    }

  }

  .user-info {
    margin-left: 10px;
    color: #333;
    font-size: 14px;
     transition: background-color 0.3s;

    &:hover {
      background-color: #D9D9D9;
    }

  }

  .sidebar-nav-item {
    display: flex;
    align-items: center;
    margin-left: 9px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #D9D9D9;
    }

    .area-icons-label {
      display: flex;
      align-items: center;
    }

    .label-sidebar {
      margin-left: 10px;
      font-size: 16px;
    }
  }

  .sidebar-nav {
    margin-top: 20px;
    flex-grow: 1;
  }

  .sidebar-nav-item {
    padding: 15px 20px;
  }
`;


export const Accessibility = styled.button`
    background: transparent;
    border: none;
    flex-direction: column;
    display: flex;
    margin-top: 10px;
    margin-left: 15px;
    height: 40px;
    cursor: pointer;
    color:  ${({ theme }) => theme.text2};
  
     &:hover {
        color: #01A998;
        background: transparent;
    }
`;
