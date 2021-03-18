import React from "react";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
  onDelete: (_id: string) => void;
  username: string;
}

export const Wishlist: React.FC<Props> = (props) => {
  return (
    <div className="wishlist">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <div className="controls">
        <Link href={`/${props.username}/${props.displayName}`}>
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
