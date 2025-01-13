import axios from "axios";
const API_BASE_URL = "https://localhost:7259/api";

const getToken = () => {
    return localStorage.getItem("token");
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, (error) => {
      if (error.response.status === 401) {
          localStorage.removeItem("token");
      }
      return Promise.reject(error);
  }
);

const apiService ={
    getAllCourses: () => api.get("/course"),
    getCourseById: (id) => api.get(`/course/${id}`),
    createCourse: (courseData) => api.post("/course", courseData),
    updateCourse: (id, courseData) =>
      api.put(`/course/${id}`, courseData),
    deleteCourse: (id) => api.delete(`/course/${id}`),
  
    enrollStudent: (enrollmentData) =>
      api.post("/enrollment/enroll", enrollmentData),
    unenrollStudent: (enrollmentData) =>
      api.post("/enrollment/unenroll", enrollmentData),
    checkEnrollment: (studentId, courseId) =>
      api.get(`/enrollment/check-enrollment/${studentId}/${courseId}`),
  
    createModule: (moduleData) => api.post("/module", moduleData),
    updateModule: (id, moduleData) => api.put(`/module/${id}`, moduleData),
    deleteModule: (id) => api.delete(`/module/${id}`),
    getModulesByCourse: (courseId) =>
      api.get(`/module/course/${courseId}`),
  
    getUserById: (id) => api.get(`user/${id}`),
    login: (credentials) => api.post("user/login", credentials),
    register: (registrationData) =>
      api.post("user/register", registrationData),
    updateUser: (id, userData) => api.put(`user/update/${id}`, userData),
    inactivateUser: (id) => api.put(`user/inactivate/${id}`),
};

export default apiService;
