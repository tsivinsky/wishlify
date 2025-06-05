"use client";

import { useUserQuery } from "@/api/user";
import {
  useDeleteWishlistMutation,
  useWishlistQuery,
  wishlistsQuery,
} from "@/api/wishlist";
import { Button } from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function Wishlist() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ uuid: string }>();

  const { data: user } = useUserQuery();
  const { data: wishlist } = useWishlistQuery(params.uuid);

  const deleteMutation = useDeleteWishlistMutation();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete wishlist?")) return;
    if (!wishlist) return;

    deleteMutation.mutate(wishlist.id, {
      onSuccess() {
        queryClient.invalidateQueries(wishlistsQuery());
        router.push("/");
      },
    });
  };

  return (
    <div className="container">
      <h2 className="text-4xl font-semibold">{wishlist?.name}</h2>
      {wishlist?.description && (
        <p className="text-lg mt-4">{wishlist.description}</p>
      )}
      {user && wishlist && user.id === wishlist.user?.id && (
        <Button
          className="text-white bg-red-500 border-red-500 mt-4"
          onClick={handleDelete}
        >
          Delete Wishlist
        </Button>
      )}
    </div>
  );
}
