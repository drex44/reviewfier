import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ProductService } from "../../../js/service";
import { showError } from "../../utils/commonUtils";
import { renderProductPage } from "../../../js/pages/product";

export const NewReviewModal = (props: NewReviewModalProps) => {
  const { visible } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const submit = () => {
    setLoading(true);
    if ((stars === 0 && review) || stars > 0) {
      ProductService.addNewRating({ review, productId: props.productId, stars })
        .then((resp) => {
          if (resp.id) {
            props.closeModal();
            renderProductPage();
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

  const onStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(Number(event.target.value));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  }

  useEffect(() => {
    setReview("");
    setStars(0);
  }, [props.visible]);

  return (
    <div className={cn("modal new-rating-form", { "is-active": visible })}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">What's your rating?</p>
          <div className="is-full-mobile is-half-tablet is-three-fifths">
            <div className="field">
              <label className="label">Rating</label>
              <div className="control">
                <span className="icon-text rating-star">
                  {new Array(5).fill(0).map((_, i) => {
                    const value = 5 - i;
                    return (
                      <StarRadioButton
                        checked={stars === value}
                        value={value}
                        onChange={onStarsChange}
                      />
                    );
                  })}
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
                  onChange={event => setReview(event.target.value)}
                  onKeyPress={handleKeyPress}
                ></textarea>
              </div>
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

const StarRadioButton = (props: StarRadioButtonProps) => {
  return (
    <>
      <input
        type="radio"
        name="stars"
        id={`rating-${props.value}`}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={`rating-${props.value}`} className="icon editable">
        <i className="fas fa-star"></i>
      </label>
    </>
  );
};

interface StarRadioButtonProps {
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}
