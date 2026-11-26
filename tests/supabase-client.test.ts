import { expect, test } from "vitest";
import { createClient as createBrowserClient } from "../lib/supabase/client";
import { createClient as createServerClient } from "../lib/supabase/server";

const localEnv = {
  NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "local-anon-key",
};

test("browser client rejects a missing url", () => {
  expect(() =>
    createBrowserClient({ NEXT_PUBLIC_SUPABASE_ANON_KEY: "local-anon-key" }),
  ).toThrowError(/NEXT_PUBLIC_SUPABASE_URL/);
});

test("browser client rejects a blank anon key", () => {
  expect(() =>
    createBrowserClient({
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "   ",
    }),
  ).toThrowError(/NEXT_PUBLIC_SUPABASE_ANON_KEY/);
});

test("browser client is created from the public env", () => {
  const client = createBrowserClient(localEnv);

  expect(typeof client.from).toBe("function");
  expect(typeof client.auth.getSession).toBe("function");
});

test("server client rejects missing public env before it reads cookies", async () => {
  await expect(createServerClient({})).rejects.toThrow(
    /NEXT_PUBLIC_SUPABASE_URL/,
  );
  await expect(createServerClient({})).rejects.toThrow(
    /NEXT_PUBLIC_SUPABASE_ANON_KEY/,
  );
});

test("server client is created with the caller cookie store", async () => {
  const writes: string[] = [];
  const client = await createServerClient(localEnv, {
    getAll: () => [{ name: "sb-local-auth-token", value: "session" }],
    set: (name) => {
      writes.push(name);
    },
  });

  expect(typeof client.from).toBe("function");
  expect(writes).toEqual([]);
});
