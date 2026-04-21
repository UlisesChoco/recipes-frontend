import { Route, Routes } from "react-router-dom";
import LandingPage from "../features/landing/pages/LandingPage";
import { LandingLayout } from "./layout/LandingLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { JWTProtectedRoute } from "./guard/JWTProtectedRoute";
import { PublicRecipes } from "../features/recipes/pages/PublicRecipes";
import { MainLayout } from "./layout/MainLayout";
import { CreateRecipe } from "../features/recipes/pages/CreateRecipe";
import { MyRecipes } from "../features/recipes/pages/MyRecipes";
import { RecipeDetails } from "../features/recipes/pages/RecipeDetails";

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
                <Route element={<MainLayout />}>
                    <Route path="/recipes" element={<PublicRecipes />} />
                    <Route path="/recipes/me" element={<MyRecipes />} />
                    <Route path="/recipes/new" element={<CreateRecipe />} />
                    <Route path="/recipes/me/:id" element={<RecipeDetails />} />
                    <Route path="/recipes/:id" element={<RecipeDetails />} />
                </Route>
            </Route>
        </Routes>
    )
}