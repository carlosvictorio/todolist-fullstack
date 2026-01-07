import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./pages/TodoList";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoadingPage from "./pages/LoadingPage";
import { Header } from "./components/Header/Header";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
    { path: "/header", element: <Header /> }, //Testando

    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFoundPage /> },
    { path: "/loading", element: <LoadingPage /> }, //Apagar
    {
        path: "/editing",
        element: (
            <AuthProvider>
                <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                    <EditPage />
                </ProtectedRoute>
            </AuthProvider>
        ),
    },

    {
        path: "/todolist",
        element: (
            <AuthProvider>
                <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                    <TodoList />
                </ProtectedRoute>
            </AuthProvider>
        ),
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
