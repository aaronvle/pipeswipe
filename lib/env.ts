export function readAppName(env: { NEXT_PUBLIC_APP_NAME?: string }): string {
  const name = env.NEXT_PUBLIC_APP_NAME?.trim();

  if (!name) {
    return "pipeswipe";
  }

  return name;
}
