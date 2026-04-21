import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../../features/auth/service/auth-token.storage";

export function JWTProtectedRoute() {
    const token = getAuthToken();

    if (!token)
        return <Navigate to="/login" replace />;

    return <Outlet />;
}