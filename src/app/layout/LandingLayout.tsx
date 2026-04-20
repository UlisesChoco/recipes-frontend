import { Outlet } from "react-router-dom";
import { Footer } from "../../features/shared/components/Footer";
import { LandingHeader } from "../../features/landing/components/LandingHeader";

export function LandingLayout() {
    return (
        <>
            <LandingHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}