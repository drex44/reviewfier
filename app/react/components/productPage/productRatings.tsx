import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ProductService } from "../../../service/productService";
import { RatingStars } from "../ratingStars";
import { RatingDto, WSUpdate } from "../types/product";

const ProductReviews = (props: ProductReviewsProps) => {

  const [ratings, setRatings] = useState([]);
  const ratingsRef = useRef(ratings);

  useEffect(() => {
    ratingsRef.current = [];
    setRatings([]);
    ProductService.subscribeRatings(props.productId, (resp: WSUpdate<RatingDto>) => {
      const newRatings: {[id: string]: RatingDto} = {};
      ratingsRef.current.forEach((rating: RatingDto) => {
        newRatings[rating.id] = rating;
      });
      resp.additions.forEach(rating => {
        newRatings[rating.id] = rating;
      })
      resp.updates.forEach(rating => {
        newRatings[rating.id] = rating;
      })
      resp.deletes.forEach(rating => {
        delete newRatings[rating.id];
      })
      ratingsRef.current = Object.values(newRatings);
      setRatings(Object.values(newRatings));
    });
  }, [props.productId]);

  return (
    <div className="product-reviews">
      <h3 className="title is-4">Reviews</h3>
      {ratings.map((rating) => (
        <div className="review level" key={rating.id}>
          <div className="level-left">
            <div className="level-item">
              <RatingStars stars={rating.stars} />
            </div>
            <div className="level-item review-stars">
              <strong>{rating.stars}</strong>, {rating.review}
            </div>
            <div className="level-item"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ProductReviewsProps {
  productId: string;
}

export const renderProductRatings = (id: string) => {
  // need to call this from outside to trigger force re-render
  if (id) {
    ReactDOM.render(
      <ProductReviews productId={id} />,
      document.getElementById("reviews")
    );
  }
};
