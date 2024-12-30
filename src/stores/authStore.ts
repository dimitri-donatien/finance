// src/stores/authStore.ts
import { createSignal, onMount, createRoot } from "solid-js";
import { supabase } from "@/lib/supabase";

// Use createRoot to ensure the signal is created within a reactive context
const authStore = createRoot(() => {
  const [user, setUser] = createSignal<any>(null);

  // Check the session when the app initializes
  onMount(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setUser(sessionData?.session?.user || null);
  });

  // Listen for authentication state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  return { user };
});

export const { user } = authStore;
