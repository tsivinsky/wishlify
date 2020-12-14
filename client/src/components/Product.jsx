import React from "react";

export default function Product({
  id,
  title,
  price,
  priceCurrency,
  shipping,
  shippingCurrency,
  image,
  url,
  shop,
}) {
  // Merge price and shipping with their currencies
  price = priceCurrency + price;
  shipping = shippingCurrency + shipping;

  return (
    <div className="product">
      <img src={image} alt={title} className="product-image" />
      <h2 className="product-title">{title}</h2>
      <div className="product-price-block">
        <p className="price">{price}</p>
        <p className="shipping">{shipping}</p>
      </div>
      <div className="product-links-block">
        <a href={url}>View on {shop}</a>
      </div>
    </div>
  );
}
