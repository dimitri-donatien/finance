import { supabase } from '../lib/supabase';

const Logout = () => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error.message);
        else alert('Logout successful');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
