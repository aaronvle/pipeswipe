export type SupabasePublicEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  [key: string]: string | undefined;
};

const URL_NAME = "NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY_NAME = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export function readSupabasePublicEnv(env: SupabasePublicEnv): {
  url: string;
  anonKey: string;
} {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  const missing: string[] = [];

  if (!url) {
    missing.push(URL_NAME);
  }

  if (!anonKey) {
    missing.push(ANON_KEY_NAME);
  }

  if (missing.length > 0) {
    const label = missing.length === 1 ? "variable" : "variables";
    throw new Error(
      `Missing Supabase environment ${label}: ${missing.join(", ")}.`,
    );
  }

  return { url, anonKey };
}
