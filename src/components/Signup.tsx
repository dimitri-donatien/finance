// src/components/Signup.tsx
import { createSignal } from 'solid-js';
import { supabase } from '../services/supabaseClient';

const Signup = () => {
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [error, setError] = createSignal<string | null>(null);

    const handleSignup = async (e: Event) => {
        e.preventDefault();
        setError(null);
        const { error } = await supabase.auth.signUp({ email: email(), password: password() });
        if (error) {
            setError(error.message);
        } else {
            alert("Signup successful! Check your email for confirmation.");
        }
    };

    return (
        <form onSubmit={handleSignup}>
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
            <button type="submit">Signup</button>
            {error() && <p style={{ color: 'red' }}>{error()}</p>}
        </form>
    );
};

export default Signup;
