import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import HomeInstructor from "../pages/HomeInstructor";
import Register from "../pages/Register";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";
import Sidebar from "../components/SideBar/Sidebar";


export default function AppRoutes() {

    const logOut = () => {
        localStorage.removeItem("token");
      };
    return (
        <div style={{ display: "flex",  padding: "20px"}}>
        <Sidebar logOut={logOut} windowSize={window.innerWidth} />
  
        <div style={{ flex: 1,  }}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homeInstructor" element={<HomeInstructor />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/edit-course/:courseId" element={<EditCourse />} />
          </Routes>
        </div>
      </div>
    );
}