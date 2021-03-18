import React from "react";

interface Props extends IProduct {
  onRemove: (_id: string) => void;
}

export const Product: React.FC<Props> = (props) => {
  return (
    <div className="product">
      <img src={props.image} alt={props.title} />
      <div className="info">
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
        <a href={props.url}>View on {props.shop}</a>
        <button onClick={() => props.onRemove(props._id)}>Remove</button>
      </div>
    </div>
  );
};
