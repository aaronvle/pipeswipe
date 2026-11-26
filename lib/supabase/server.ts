import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { readSupabasePublicEnv, type SupabasePublicEnv } from "./env";

type CookieStore = {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options?: Record<string, unknown>) => void;
};

export async function createClient(
  env: SupabasePublicEnv = process.env,
  cookieStore?: CookieStore,
) {
  const { url, anonKey } = readSupabasePublicEnv(env);
  const store = cookieStore ?? (await cookies());

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies. Session refresh belongs in a proxy.
        }
      },
    },
  });
}
