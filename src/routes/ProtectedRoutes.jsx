import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';


const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.role || null;  
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }
  return null;
};


const ProtectedRoute = ({ element, role, redirectTo }) => {
  const navigate = useNavigate();
  const userRole = getRoleFromToken();

  useEffect(() => {
    if (!userRole || userRole !== role) {
    
      navigate(redirectTo || '/login');
    }
  }, [userRole, navigate, role, redirectTo]);

  return userRole === role ? element : null;
};

export default ProtectedRoute;