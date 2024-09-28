import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../views/Main/main";
import { DetailsPage } from "../views/Details/details";
import ErrorPage from "./Error";

export const router = createBrowserRouter([
    {
        path: '/pokedex/',
        element: <MainPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/pokedex/pokemon/:id',
        element: <DetailsPage />,
        errorElement: <ErrorPage />
    }
])