import React from "react";
import Link from "next/link";
import { IWishlist } from "../types";
import { useSession } from "../store";

interface Props extends IWishlist {
  onDelete: (_id: string) => void;
}

export const Wishlist: React.FC<Props> = (props) => {
  const { user } = useSession();

  return (
    <div className="wishlist">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <div className="controls">
        <Link href={`/${user!.username}/${props.displayName}`}>
          <a>View</a>
        </Link>
        <button
          className="btn delete-wishlist"
          onClick={() => props.onDelete(props.displayName)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
