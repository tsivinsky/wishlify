"use client";

import { LoginUserData, useLoginMutation } from "@/api/auth";
import { userQuery } from "@/api/user";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginUserData>();
  const queryClient = useQueryClient();

  const loginMutation = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess() {
        queryClient.invalidateQueries(userQuery());
        router.push("/");
      },
    });
  });

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <form
        className="flex flex-col gap-3 max-w-[400px] w-full"
        onSubmit={onSubmit}
      >
        <Input
          type="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          {...form.register("email", {
            required: "Required field",
          })}
        />
        <Input
          type="password"
          label="Password"
          {...form.register("password", {
            required: "Required field",
          })}
        />
        <Button type="submit" loading={loginMutation.isPending}>
          Login
        </Button>
      </form>
      <p className="mt-5">
        Don't have an account?{" "}
        <Link
          href="/join"
          className="text-blue-500 underline hover:no-underline"
        >
          Join here
        </Link>
      </p>
    </div>
  );
}
