import { Outlet } from "react-router-dom";
import { Footer } from "../../features/shared/components/Footer";
import { MainHeader } from "../../features/shared/components/MainHeader";

export function MainLayout() {
    return (
        <>
            <MainHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}