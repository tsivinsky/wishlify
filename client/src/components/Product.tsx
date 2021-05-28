import Link from "next/link";
import React from "react";
import { IProduct } from "../types";

interface Props extends IProduct {
  onRemove: (_id: string) => void;
}

export const Product: React.FC<Props> = (props) => {
  return (
    <div className="product">
      <div className="info">
        <img src={props.image} alt={props.title} />

        <h2>{props.title}</h2>
        <div className="price">
          <p>
            <span>Price: </span>
            {props.currency}
            {props.price}
          </p>
          <p>
            <span>Shipping: </span>
            {props.currency}
            {props.shipping}
          </p>
        </div>
      </div>

      <div className="controls">
        <Link href={props.url}>
          <button className="btn btn-primary">View on {props.shop}</button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => props.onRemove(props._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
