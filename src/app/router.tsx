import { Route, Routes } from "react-router-dom";
import LandingPage from "../features/landing/pages/LandingPage";
import { LandingLayout } from "./layout/LandingLayout";

export function AppRouter() {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>
        </Routes>
    )
}