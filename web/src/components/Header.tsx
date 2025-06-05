"use client";

import { useUserQuery } from "@/api/user";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./Button";
import { useLogoutMutation } from "@/api/auth";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { data: user } = useUserQuery();

  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logoutMutation.mutate(undefined, {
        onSuccess() {
          router.push("/login");
        },
      });
    }
  };

  return (
    <header className="container py-4">
      <div className="flex justify-between items-center">
        <h1>Wishlify</h1>
        {user && (
          <div className="flex items-center gap-2">
            <UserAvatar image={null} alt={user?.email[0] ?? ""} size={32} />
            <Button
              size="small"
              loading={logoutMutation.isPending}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
