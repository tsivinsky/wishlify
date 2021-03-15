interface IAuth {
  token: string | null;
  user: IUser | null;
}

export function isUserAuthorized(auth: IAuth): boolean {
  if (auth.token !== null && auth.user !== null) return true;

  return false;
}
