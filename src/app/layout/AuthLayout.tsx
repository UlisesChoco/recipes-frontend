import { Outlet } from "react-router-dom";
import { Footer } from "../../features/shared/components/Footer";

export function AuthLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}