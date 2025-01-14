import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import HomeInstructor from "../pages/HomeInstructor";
import Register from "../pages/Register";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";
import Sidebar from "../components/SideBar/Sidebar";
import CreateModules from "../pages/CreateModules";
import CourseDetails from "../pages/CourseDetails";
import HomeStudent from "../pages/HomeStudent";
import ProtectedRoute from "./ProtectedRoutes";
import ProfilePage from "../pages/ProfilePage";


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
            <Route path="/homeInstructor" element={
              <ProtectedRoute role="Instructor" element={<HomeInstructor />} redirectTo="/login" />
              } 
            />
            <Route path="/homeStudent" element={
                <ProtectedRoute role="Student" element={<HomeStudent />} redirectTo="/login" />
                } 
            />
          <Route path="/create-course" element={
            <ProtectedRoute role="Instructor" element={<CreateCourse />} redirectTo="/login" />
          } />

          <Route path="/create-modules/:courseId" element={
            <ProtectedRoute role="Instructor" element={<CreateModules />} redirectTo="/login" />
          } />

          <Route path="/course-details/:courseId" element={<CourseDetails />} />

          <Route path="/profile/:id" element={<ProfilePage />} />

          <Route path="/edit-course/:courseId" element={
            <ProtectedRoute role="Instructor" element={<EditCourse />} redirectTo="/login" />
          } />
          </Routes>
        </div>
      </div>
    );
}