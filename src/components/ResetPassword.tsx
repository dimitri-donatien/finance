// import { createSignal, onMount } from "solid-js";
// import { supabase } from "@/services/supabaseClient";
// import { useSearchParams } from "@solidjs/router";

// const ResetPassword = () => {
//     const [newPassword, setNewPassword] = createSignal("");
//     const [error, setError] = createSignal("");
//     const [message, setMessage] = createSignal("");
//     const [searchParams] = useSearchParams();

//     onMount(() => {
//         if (!searchParams.access_token) {
//             setError("Token d'accès non valide.");
//         }
//     });

//     const handleResetPassword = async () => {
//         const accessToken = searchParams.access_token;
//         if (!accessToken) {
//             setError("Token d'accès non valide.");
//             return;
//         }

//         const { error } = await supabase.auth.updateUser(accessToken, {
//             password: newPassword(),
//         });
//         if (error) {
//             setError(error.message);
//         } else {
//             setMessage("Votre mot de passe a été réinitialisé avec succès.");
//         }
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <input type="password" placeholder="New Password" onInput={(e) => setNewPassword(e.currentTarget.value)} />
//             <button onClick={handleResetPassword}>Reset Password</button>
//             {error() && <p style={{ color: "red" }}>{error()}</p>}
//             {message() && <p>{message()}</p>}
//         </div>
//     );
// };

// export default ResetPassword;
