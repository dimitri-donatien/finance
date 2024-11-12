import { Route } from "@solidjs/router";
import { lazy } from "solid-js";
import AuthMiddleware from "@/components/AuthMiddleware";

// General views
const OverView = lazy(() => import("@/views/Overview"));
const CategoriesView = lazy(() => import("@/views/Categories"));
const TransactionsView = lazy(() => import("@/views/Transactions"));

// Auth views
const LoginView = lazy(() => import("@/views/Login"));
const RegisterView = lazy(() => import("@/views/Register"));

// Error views
const NotFoundView = lazy(() => import("@/views/NotFound"));

const AppRoutes = () => {
    return (
        <>
            {/* Pages de connexion et d'inscription avec redirection si l'utilisateur est déjà authentifié */}
            <Route path="/" component={() => (
                <AuthMiddleware redirectIfAuth>
                    <LoginView />
                </AuthMiddleware>
            )} />

            <Route path="/register" component={() => (
                <AuthMiddleware redirectIfAuth>
                    <RegisterView />
                </AuthMiddleware>
            )} />

            {/* Page du tableau de bord (Overview) restreinte aux utilisateurs authentifiés */}
            <Route path="/overview" component={() => (
                <AuthMiddleware requiresAuth>
                    <OverView />
                </AuthMiddleware>
            )} />

            {/* Autres routes, accessibles sans authentification spécifique */}
            <Route path="/categories" component={CategoriesView} />
            <Route path="/transactions" component={TransactionsView} />

            {/* Page pour les erreurs (404) */}
            <Route path="*404" component={NotFoundView} />
        </>
    );
};

export default AppRoutes;
