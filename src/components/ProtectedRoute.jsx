import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAppContext();

  if (role === null) return <p className="p-6">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role?.trim().toLowerCase())) {
    return <p className="p-6 text-red-500">Access denied for role: {role}</p>;
  }

  return children;
};

export default ProtectedRoute;
