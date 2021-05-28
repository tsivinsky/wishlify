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
      <div className="info">
        <h2>{props.name}</h2>
        <p>{props.description || "No description"}</p>
      </div>

      <div className="controls">
        <Link href={`/${user!.username}/${props.displayName}`}>
          <button className="btn btn-primary">View</button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => props.onDelete(props.displayName)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
