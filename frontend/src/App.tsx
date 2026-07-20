import { BrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import AppRoutes from "./router/AppRouter";

import { DashboardProvider } from "./context/DashboardContext";

export default function App(){

    return(

        <BrowserRouter>

            <DashboardProvider>

                <MainLayout>

                    <AppRoutes/>

                </MainLayout>

            </DashboardProvider>

        </BrowserRouter>

    );

}