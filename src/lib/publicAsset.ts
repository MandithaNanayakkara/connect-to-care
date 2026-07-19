/** Resolve a file from Vite `public/` for the current deploy base (e.g. GitHub Pages). */
export function publicAsset(path: string): string {
  if (path.startsWith('data:')) {
    return path
  }

  const normalized = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
