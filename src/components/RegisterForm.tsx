import { createSignal } from "solid-js";
import { supabase } from "@/services/supabaseClient";
import { A } from "@solidjs/router";

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
        <section class="bg-white">
            <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        class="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div class="max-w-xl lg:max-w-3xl">
                        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Welcome to Finance
                        </h1>

                        <p class="mt-4 leading-relaxed text-gray-500">
                            A personal finance management app, your simplified tool to stay in control of your finances. Whether you are an individual wishing to track your expenses or a freelancer needing a quick overview of your income, our app is here to help you manage your budget easily and efficiently.
                        </p>

                        <form class="mt-8 grid grid-cols-6 gap-6">

                            <div class="col-span-6">
                                <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    autocomplete="email"
                                    onInput={(e) => setEmail(e.currentTarget.value)}
                                    class="mt-1 w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6">
                                <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    minlength="8"
                                    required
                                    autocomplete="current-password"
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                    class="mt-1 w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                                />
                            </div>

                            <div class="col-span-6">
                                {error() && <p class="text-red-500">{error()}</p>}
                            </div>

                            <div class="col-span-6">
                                {message() && <p>{message()}</p>}
                            </div>

                            <div class="col-span-6">
                                <p class="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" class="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" class="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    onClick={handleRegister}
                                >
                                    Create an account
                                </button>

                                <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <A href="/" class="text-gray-700 underline">Log in</A>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default RegisterForm;
