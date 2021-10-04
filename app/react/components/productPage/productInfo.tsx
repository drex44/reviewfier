import React, { useState } from "react";
import ReactDOM from "react-dom";
import { parseStarNumber } from "../../utils/commonUtils";
import { RatingStars } from "../ratingStars";
import { NewReviewModal } from "./newReviewModal";
import { useProduct } from "./useProduct";

export const ProductInfo = (props: ProductInfoProps) => {
  const { product } = useProduct(props.productId);
  const [newReviewModalVisible, setNewReviewModalVisible] = useState(false);

  if (!product) {
    return null;
  }

  const fixedStars = parseStarNumber(product.avgStars);

  const openNewReviewModalVisible = () => {
    setNewReviewModalVisible(true);
  };

  const closeNewReviewModalVisible = () => {
    setNewReviewModalVisible(false);
  };

  return (
    <div className="product-info">
      <h1 className="title">{product.name}</h1>
      <div className="columns is-vcentered">
        <div className="column is-four-fifths">
          <span className="title avg-stars">
            <RatingStars stars={Number(fixedStars)} leftText={fixedStars} />
          </span>
        </div>
        <div className="column is-right">
          <button
            className="button new-review-btn"
            onClick={openNewReviewModalVisible}
          >
            Add Review
          </button>
        </div>
      </div>
      <hr />
      <NewReviewModal
        visible={newReviewModalVisible}
        productId={props.productId}
        closeModal={closeNewReviewModalVisible}
      />
    </div>
  );
};

interface ProductInfoProps {
  productId: string;
}

export const renderProductInfo = (id: string) => {
  // need to call this from router to trigger force re-render
  ReactDOM.render(
    <ProductInfo productId={id} />,
    document.getElementById("product-info")
  );
};
