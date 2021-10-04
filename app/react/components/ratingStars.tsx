import React from "react";
import cn from "classnames";

export const RatingStars = (props: RatingStarsProps) => {
  return <span className="icon-text rating-star">
      <span>{props.text}</span>
      {new Array(5).fill(0).map((_, i)=><Star key={i} checked={i<props.stars} />)}
    </span>
  ;
}

interface RatingStarsProps {
  stars: number,
  text?: string
}

const Star = (props: StarProps) => {
  const {checked, editable = false} = props;
  return <span className={cn("icon star", {checked, editable})}>
      <i className="fas fa-star"></i>
    </span>
  ;
}

interface StarProps {
  checked?: boolean,
  editable?: boolean
}