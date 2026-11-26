import { createBrowserClient } from "@supabase/ssr";
import { readSupabasePublicEnv, type SupabasePublicEnv } from "./env";

export function createClient(env: SupabasePublicEnv = process.env) {
  const { url, anonKey } = readSupabasePublicEnv(env);

  return createBrowserClient(url, anonKey);
}
