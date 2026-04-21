import { Navigate, Outlet } from "react-router-dom";
import { clearAuthToken, getAuthToken } from "../../features/auth/service/auth-token.storage";

export function JWTProtectedRoute() {
    const token = getAuthToken();

    if (!token)
        return <Navigate to="/login" replace />;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp < currentTime) {
            clearAuthToken();
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        clearAuthToken();
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}