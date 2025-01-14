import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import HomeInstructor from "../pages/HomeInstructor";
import Register from "../pages/Register";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";


export default function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/homeInstructor" element={<HomeInstructor />}></Route>
            <Route path="/create-course" element={<CreateCourse />}></Route>
            <Route path="/edit-course/:courseId" element={<EditCourse/>} />
        </Routes>
    );
}