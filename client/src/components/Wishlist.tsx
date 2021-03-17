import React from "react";

interface Props {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
  onDelete: (_id: string) => void;
}

export const Wishlist: React.FC<Props> = (props) => {
  return (
    <div className="wishlist">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <div className="controls">
        <button
          className="btn delete-wishlist"
          onClick={() => props.onDelete(props._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
