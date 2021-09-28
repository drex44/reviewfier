import React from "react";
import ReactDOM from "react-dom";
import { RatingStars } from "../ratingStars";
import { useProduct } from "./useProduct";

export const ProductInfo = (props: ProductInfoProps) => {
  const { product } = useProduct(props.productId);
  
  if (!product) {
    return null;
  }

  const fixedStars = parseFloat(String(product.avgStars)).toFixed(2);

  return (
    <div className="product-info">
      <h1 className="title">{product.name}</h1>
      <div className="columns is-vcentered">
        <div className="column is-four-fifths">
          <span className="title avg-stars">
            <RatingStars stars={Number(fixedStars)} text={fixedStars} />
          </span>
        </div>
        <div className="column is-right">
          <button className="button new-review-btn">Add Review</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

interface ProductInfoProps {
  productId: string
}

export const renderProductInfo = (id: string) => {
  // need to call this from router to trigger force re-render
  ReactDOM.render(<ProductInfo productId={id} />, document.getElementById("product-info"));
}