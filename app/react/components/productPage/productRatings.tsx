import React from "react";
import ReactDOM from "react-dom";
import { ProductService } from "../../../js/service";
import { RatingStars } from "../ratingStars";
import { Rating } from "../types/product";

const ProductReviews = (props: ProductReviewsProps) => {
  const { ratings = [] } = props;
  return (
    <div className="product-reviews">
      {ratings.map((rating) => (
        <div className="review level">
          <div className="level-left">
            <div className="level-item">
              <RatingStars stars={Number(rating.stars)} />
            </div>
            <div className="level-item review-stars">
              <strong>{rating.stars}</strong>
            </div>
            <div className="level-item">{rating.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ProductReviewsProps {
  ratings: Rating[];
}

export const renderProductRatings = (reviews: Rating[]) => {
  // need to call this from outside to trigger force re-render
  ReactDOM.render(
    <ProductReviews ratings={reviews} />,
    document.getElementById("product-reviews")
  );
};
