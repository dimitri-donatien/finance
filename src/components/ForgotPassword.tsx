// src/components/ForgotPassword.tsx
import { createSignal } from 'solid-js';
import { supabase } from '../services/supabaseClient';

const ForgotPassword = () => {
    const [email, setEmail] = createSignal('');
    const [message, setMessage] = createSignal<string | null>(null);

    const handlePasswordReset = async (e: Event) => {
        e.preventDefault();
        const { error } = await supabase.auth.resetPasswordForEmail(email(), {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        setMessage(
            error ? error.message : 'Password reset email sent! Please check your inbox.'
        );
    };

    return (
        <form onSubmit={handlePasswordReset}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
            />
            <button type="submit">Send Password Reset Email</button>
            {message() && <p>{message()}</p>}
        </form>
    );
};

export default ForgotPassword;
