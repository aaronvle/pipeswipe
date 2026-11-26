import { readAppName } from "../lib/env";

export default function Home() {
  const appName = readAppName({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  });

  return (
    <main>
      <h1>{appName}</h1>
    </main>
  );
}
