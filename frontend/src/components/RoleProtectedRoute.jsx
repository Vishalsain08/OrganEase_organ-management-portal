import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (userType !== role) return <Navigate to="/login" replace />;

  return children;
};

export default RoleProtectedRoute;
