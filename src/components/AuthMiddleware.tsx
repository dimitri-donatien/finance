// src/components/AuthMiddleware.tsx
import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { user } from "@/stores/authStore";

type AuthMiddlewareProps = {
    requiresAuth?: boolean; // Indique si la page requiert une authentification
    redirectIfAuth?: boolean; // Rediriger si l'utilisateur est déjà connecté
    children: any;
}

const AuthMiddleware = (props: AuthMiddlewareProps) => {
    const navigate = useNavigate();

    createEffect(() => {
        const isAuthenticated = !!user(); // Vérifie si l'utilisateur est connecté

        if (props.requiresAuth && !isAuthenticated) {
            // Redirige vers la page de connexion si la page requiert une authentification et que l'utilisateur n'est pas connecté
            navigate("/", { replace: true });
        } else if (props.redirectIfAuth && isAuthenticated) {
            // Redirige vers le tableau de bord si l'utilisateur est déjà connecté et tente d'accéder à une page d'inscription ou de connexion
            navigate("/overview", { replace: true });
        }
    });

    return <>{props.children}</>;
};

export default AuthMiddleware;
