import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
console.log("Loading:", loading);
console.log("User:", user);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
