import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ProductService } from "../../../service/productService";
import { showError } from "../../utils/commonUtils";
import { StarSelector } from "./starSelector";

export const NewReviewModal = (props: NewReviewModalProps) => {
  const { visible } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const submit = () => {
    if ((stars === 0 && review) || stars > 0) {
      setLoading(true);
      ProductService.addNewRating({ review, productId: props.productId, stars })
        .then((resp) => {
          if (resp.id) {
            props.closeModal();
          } else {
            showError("Error adding new review. Please try again later.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showError(
        "Please add review if you want to give zero rating or add rating greater than zero if there is no review."
      );
    }
  };

  const onStarsChange = (newStars: number) => {
    setStars(newStars);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  useEffect(() => {
    setReview("");
    setStars(0);
  }, [props.visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={cn("modal new-rating-form is-active")}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">What's your rating?</p>
          <div className="is-full-mobile is-half-tablet is-three-fifths">
            <div className="field">
              <label className="label">Rating</label>
              <div className="control">
                <span className="icon-text rating-star">
                  <StarSelector value={stars} onChange={onStarsChange} />
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Review</label>
              <div className="control">
                <textarea
                  value={review}
                  maxLength={350}
                  className="textarea"
                  name="review"
                  placeholder="Start typing..."
                  onChange={(event) => setReview(event.target.value)}
                  onKeyPress={handleKeyPress}
                ></textarea>
              </div>
              <p className="help">
                <em>* Press Enter to submit.</em>
              </p>
            </div>

            <div className="actions has-text-centered field is-grouped">
              <button
                className={cn("button control", { disabled: loading })}
                id="new-rating-close-btn"
                onClick={props.closeModal}
              >
                Cancel
              </button>

              <button
                className={cn("button control is-primary", {
                  disabled: loading,
                  "is-loading": loading,
                })}
                id="new-rating-submit-btn"
                onClick={submit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NewReviewModalProps {
  visible: boolean;
  productId: string;
  closeModal: () => void;
}
