export function sanitizeText(input: string, max = 5000) {
  return input.replace(/[<>]/g, "").trim().slice(0, max);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function isSafeUrl(url: string) {
  if (!url) return true;
  try {
    if (url.startsWith("/uploads/") || url.startsWith("/")) return true;
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
