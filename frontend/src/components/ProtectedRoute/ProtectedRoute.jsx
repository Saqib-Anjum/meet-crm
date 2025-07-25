import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated ?? false);
const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);
  
  return isAuthenticated ? children : null; 
};

export default ProtectedRoute;



// ProtectedRoute.jsx
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// export default function ProtectedRoute() {
//   const isAuthenticated = useSelector(
//     (state) => state.auth?.isAuthenticated ?? false
//   );

//   if (!isAuthenticated) {
//     // redirect to /login
//     return <Navigate to="/login" replace />;
//   }

//   // render the nested routes
//   return <Outlet />;
// }
