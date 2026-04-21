import { Route, Routes } from "react-router-dom";
import LandingPage from "../features/landing/pages/LandingPage";
import { LandingLayout } from "./layout/LandingLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { JWTProtectedRoute } from "./guard/JWTProtectedRoute";
import { PublicRecipes } from "../features/recipes/pages/PublicRecipes";

export function AppRouter() {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<JWTProtectedRoute />}>
                <Route path="/recipes" element={<PublicRecipes />} />
            </Route>
        </Routes>
    )
}