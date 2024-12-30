import { createSignal } from 'solid-js';
import { supabase } from '../lib/supabase';

const ForgotPassword = () => {
    const [email, setEmail] = createSignal("");
    const [error, setError] = createSignal("");
    const [message, setMessage] = createSignal("");

    const handleForgotPassword = async () => {
        setError("");
        const { error } = await supabase.auth.resetPasswordForEmail(email());
        if (error) {
            setError(error.message);
        } else {
            setMessage("Un email de réinitialisation de mot de passe a été envoyé.");
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Email" onInput={(e) => setEmail(e.currentTarget.value)} />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            {error() && <p style={{ color: "red" }}>{error()}</p>}
            {message() && <p>{message()}</p>}
        </div>
    );
};

export default ForgotPassword;
