"use client";

import { useUserQuery } from "@/api/user";
import {
  useDeleteWishlistMutation,
  useWishlistQuery,
  wishlistQuery,
  wishlistsQuery,
} from "@/api/wishlist";
import { Button } from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ProductModal } from "./ProductModal";
import Image from "next/image";
import { getApiImageUrl } from "@/utils/image";
import { useDeleteProductMutation } from "@/api/product";

export default function Wishlist() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ uuid: string }>();

  const { data: user } = useUserQuery();
  const { data: wishlist } = useWishlistQuery(params.uuid);

  const deleteWishlistMutation = useDeleteWishlistMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const isOwnerView =
    (user && wishlist && user.id === wishlist.user?.id) ?? false;

  const handleDeleteWishlist = () => {
    if (!window.confirm("Are you sure you want to delete wishlist?")) return;
    if (!wishlist) return;

    deleteWishlistMutation.mutate(wishlist.id, {
      onSuccess() {
        queryClient.invalidateQueries(wishlistsQuery());
        router.push("/");
      },
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    if (!wishlist) return;

    deleteProductMutation.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries(wishlistQuery(wishlist.uuid));
      },
    });
  };

  return (
    <div className="container">
      <h2 className="text-4xl font-semibold">{wishlist?.name}</h2>
      {wishlist?.description && (
        <p className="text-lg mt-4">{wishlist.description}</p>
      )}
      <div className="flex items-center gap-3 mt-4">
        {isOwnerView && (
          <Button
            className="text-white bg-red-500 border-red-500"
            loading={deleteWishlistMutation.isPending}
            onClick={handleDeleteWishlist}
          >
            Delete Wishlist
          </Button>
        )}
        {isOwnerView && wishlist && <ProductModal wishlist={wishlist} />}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {wishlist?.products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <Image
              src={getApiImageUrl(product.imageId)}
              alt=""
              width={300}
              height={300}
            />
            <p>{product.name}</p>
            {isOwnerView && (
              <Button
                size="small"
                className="w-fit mt-2 text-red-500"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
