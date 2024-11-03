import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

// General views (not protected)
const HomeView = lazy(() => import("@/views/Home"));

// Auth views
const Login = lazy(() => import("@/components/Login"));
const Signup = lazy(() => import("@/components/Signup"));

// Password views
const ForgotPassword = lazy(() => import("@/components/ForgotPassword"));
const ResetPassword = lazy(() => import("@/components/ResetPassword"));

// Error views
const NotFoundView = lazy(() => import("@/views/NotFound"));

const AppRoutes = () => {
    return (
        <>
            {/* <Route path="/home" component={HomeView} /> */}
            <Route path="/" component={HomeView} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />

            <Route path="/*404" component={NotFoundView} />
        </>
    );
};

export default AppRoutes;