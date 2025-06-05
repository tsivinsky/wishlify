"use client";

import { useWishlistsQuery } from "@/api/wishlist";
import { Button } from "@/components/Button";
import { clsx } from "clsx";
import Link from "next/link";

export default function Home() {
  const { data: wishlists } = useWishlistsQuery();

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <Link href="/new">
          <Button size="small">Create Wishlist</Button>
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2 lg:min-w-[400px] lg:max-w-fit">
        {wishlists?.map((wishlist, i) => (
          <div
            key={wishlist.id}
            className={clsx("flex justify-between items-end gap-4", {
              "border-b border-neutral-900 pb-4": i < wishlists.length - 1,
            })}
          >
            <div className="flex flex-col gap-1">
              <h2>{wishlist.name}</h2>
              {wishlist.description && <p>{wishlist.description}</p>}
            </div>
            <Link href={`/${wishlist.uuid}`}>
              <Button size="small">View</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
