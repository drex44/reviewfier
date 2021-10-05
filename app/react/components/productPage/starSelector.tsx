import React, { useState } from "react";
import { Star } from "../ratingStars";

export const StarSelector = (props: StarSelectorProps) => {
  const [rating, setRating] = useState<number>(0);
  const [tmpRating, setTmpRating] = useState<number>(0);

  const handleMouseover = (newRating: number) => {
    setTmpRating(rating);
    setRating(newRating);
  };

  const handleMouseout = () => {
    setRating(tmpRating);
  };

  const rate = (newRating: number) => {
    handleMouseover(newRating);
    props.onChange(newRating / 2);
  };

  let stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <Star
        key={i}
        checked={rating >= i && rating !== null}
        style={{}}
        onMouseOver={() => handleMouseover(i)}
        onClick={() => rate(i)}
        onMouseOut={() => handleMouseout()}
      />
    );
  }
  return <>{stars}</>;
};

interface StarSelectorProps {
  onChange: (rating: number) => void;
  value: number;
}
