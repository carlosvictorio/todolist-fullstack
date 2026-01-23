import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading, isAuthenticated, isLogout } = useAuth();

    if (loading) {
        return <LoadingPage />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={isLogout ? { isLogout: "Você saiu!" } : undefined}
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !user.roles?.some((role) => allowedRoles.includes(role))
    ) {
        return (
            <Navigate
                to="/login"
                state={{
                    unauthorized: "Faça login para acessar",
                }} //LoginForm deve receber e exibir um alert com essa mensagem
                replace
            />
        );
    }

    return children;
}
export default ProtectedRoute;
