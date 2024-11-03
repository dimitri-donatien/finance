import { createSignal } from "solid-js";
import { supabase } from "@/services/supabaseClient";

function LoginForm() {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal<string | null>(null);

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email(),
            password: password(),
        });
        if (error) setError(error.message);
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                onInput={(e) => setEmail(e.currentTarget.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onInput={(e) => setPassword(e.currentTarget.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error() && <p>{error()}</p>}
        </div>
    );
}

export default LoginForm;
