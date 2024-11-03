// src/components/Login.tsx
import { createSignal } from 'solid-js';
import { supabase } from '../services/supabaseClient';

const Login = () => {
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [error, setError] = createSignal<string | null>(null);

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: email(),
            password: password(),
        });
        if (error) {
            setError(error.message);
        } else {
            alert("Login successful!");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
            />
            <button type="submit">Login</button>
            {error() && <p style={{ color: 'red' }}>{error()}</p>}
        </form>
    );
};

export default Login;
