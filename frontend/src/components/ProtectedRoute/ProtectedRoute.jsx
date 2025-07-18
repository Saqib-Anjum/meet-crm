import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated ?? false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);
  
  return isAuthenticated ? children : null; 
};

export default ProtectedRoute;
