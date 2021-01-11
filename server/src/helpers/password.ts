import bcrypt from "bcryptjs";

export function checkPassword(password: string, hash: string): boolean {
  const isMatch = bcrypt.compareSync(password, hash);

  return isMatch;
}
