import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../views/Main/main";
import { DetailsPage } from "../views/Details/details";
import ErrorPage from "./Error";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/pokemon/:id',
        element: <DetailsPage />,
        errorElement: <ErrorPage />
    }
])