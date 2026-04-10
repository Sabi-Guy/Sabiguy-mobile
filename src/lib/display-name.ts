export function toDisplayName(email?: string | null) {
  if (!email) return "SabiGuy User";

  const localPart = email.split("@")[0] ?? "";
  const words = localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (words.length === 0) {
    return "SabiGuy User";
  }

  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function toFirstName(name?: string | null, email?: string | null) {
  const source = name?.trim() || toDisplayName(email);
  const first = source.split(/\s+/)[0];
  return first || "SabiGuy";
}
