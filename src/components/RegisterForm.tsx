import { createSignal } from "solid-js";
import { supabase } from "@/services/supabaseClient";

const RegisterForm = () => {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal("");
    const [message, setMessage] = createSignal("");

    const handleRegister = async () => {
        setError("");
        const { error } = await supabase.auth.signUp({
            email: email(),
            password: password(),
        });
        if (error) {
            setError(error.message);
        } else {
            setMessage("Un email de confirmation a été envoyé.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" onInput={(e) => setEmail(e.currentTarget.value)} />
            <input type="password" placeholder="Password" onInput={(e) => setPassword(e.currentTarget.value)} />
            <button onClick={handleRegister}>Register</button>
            {error() && <p style={{ color: "red" }}>{error()}</p>}
            {message() && <p>{message()}</p>}
        </div>
    );
};

export default RegisterForm;
