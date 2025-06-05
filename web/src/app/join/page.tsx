"use client";

import { RegisterUserData, useRegisterMutation } from "@/api/auth";
import { userQuery } from "@/api/user";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Join() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<RegisterUserData>();

  const registerMutation = useRegisterMutation();

  const onSubmit = form.handleSubmit((data) => {
    registerMutation.mutate(data, {
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
            minLength: 6,
          })}
        />
        <Button type="submit" loading={registerMutation.isPending}>
          Join
        </Button>
      </form>
      <p className="mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-500 underline hover:no-underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
