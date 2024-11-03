import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

// General views (not protected)
const OverView = lazy(() => import("@/views/Overview"));
const CategoriesView = lazy(() => import("@/views/Categories"));
const TransactionsView = lazy(() => import("@/views/Transactions"));

// Auth views
const Login = lazy(() => import("@/components/LoginForm"));
const Register = lazy(() => import("@/components/RegisterForm"));

// Password views
const ForgotPassword = lazy(() => import("@/components/ForgotPassword"));
// const ResetPassword = lazy(() => import("@/components/ResetPassword"));

// Error views
const NotFoundView = lazy(() => import("@/views/NotFound"));

const AppRoutes = () => {
    return (
        <>
            <Route path="/" component={OverView} />
            <Route path="/categories" component={CategoriesView} />
            <Route path="/transactions" component={TransactionsView} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            {/* <Route path="/reset-password" component={ResetPassword} /> */}

            <Route path="/*404" component={NotFoundView} />
        </>
    );
};

export default AppRoutes;