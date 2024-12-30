import { Route } from "@solidjs/router";
import { lazy } from "solid-js";
import AuthMiddleware from "@/components/AuthMiddleware";

// General views
const DashboardView = lazy(() => import("@/views/Dashboard"));
const TransactionsView = lazy(() => import("@/views/Transactions"));
const BudgetsView = lazy(() => import("@/views/Budgets"));
// const ReportsView = lazy(() => import("@/views/Reports"));

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

            {/* Routes nécessitant une authentification */}
            <Route path="/dashboard" component={() => (
                <AuthMiddleware requiresAuth>
                    <DashboardView />
                </AuthMiddleware>
            )} />

            <Route path="/budgets" component={() => (
                <AuthMiddleware requiresAuth>
                    <BudgetsView />
                </AuthMiddleware>
            )} />

            <Route path="/transactions" component={() => (
                <AuthMiddleware requiresAuth>
                    <TransactionsView />
                </AuthMiddleware>
            )} />

            {/* <Route path="/reports" component={() => (
                <AuthMiddleware requiresAuth>
                    <ReportsView />
                </AuthMiddleware>
            )} /> */}

            {/* Page pour les erreurs (404) */}
            <Route path="*404" component={NotFoundView} />
        </>
    );
};

export default AppRoutes;
