export function sanitizeWishlistName(name: string): string {
  // Replace all symbols except of "-" and "_" with dash "-"
  const displayName = name.toLowerCase().replace(/[^\w\s]| /gi, "-");

  return displayName;
}
