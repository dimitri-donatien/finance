import { createSignal } from "solid-js";
import { supabase } from "@/lib/supabase";
import { A } from "@solidjs/router";

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

                <div class="mt-8 grid grid-cols-6 gap-6">

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

                    <div class="mt-1 col-span-6">
                        {error() && <p class="text-red-500">{error()}</p>}
                    </div>

                    {/* <div class="col-span-6">
                                <p class="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" class="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" class="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div> */}

                    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button
                            class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                            Don't have an account?
                            <A href="/register" class="text-gray-700 underline">Register</A>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginForm;
