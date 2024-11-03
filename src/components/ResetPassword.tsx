// src/components/ResetPassword.tsx
import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const ResetPassword = () => {
    const navigate = useNavigate();

    createEffect(() => {
        alert("Your password has been reset. Please log in with your new password.");
        navigate('/login');
    });

    return <p>Your password has been reset. Redirecting to login...</p>;
};

export default ResetPassword;
