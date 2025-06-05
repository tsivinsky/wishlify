"use client";

import {
  CreateWishlistData,
  useCreateWishlistMutation,
  wishlistsQuery,
} from "@/api/wishlist";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function New() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createWishlistMutation = useCreateWishlistMutation();

  const form = useForm<CreateWishlistData>();

  const onSubmit = form.handleSubmit((data) => {
    createWishlistMutation.mutate(data, {
      onSuccess() {
        queryClient.invalidateQueries(wishlistsQuery());
        router.push("/");
      },
    });
  });

  return (
    <div className="container">
      <form className="flex flex-col gap-3 max-w-[600px]" onSubmit={onSubmit}>
        <Input
          type="text"
          label="Name"
          {...form.register("name", {
            required: "Required field",
          })}
        />
        <Input
          type="text"
          label="Description"
          {...form.register("description")}
        />
        <Button type="submit" className="mt-2 lg:w-fit">
          Create Wishlist
        </Button>
      </form>
    </div>
  );
}
