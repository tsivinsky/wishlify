export function sanitizeName(name: string): string {
  let displayName: string;

  // Make name to be in lower case
  displayName = name.toLowerCase();

  // Replace all symbols except of "-" and "_" with dash "-"
  displayName = displayName.replace(/[^\w\s]| /gi, "-");

  return displayName;
}
