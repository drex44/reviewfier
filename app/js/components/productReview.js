import { starIcons } from "./stars";

export function reviewItem(rating) {
  return `
  <div class="review">
    ${starIcons(Number(rating.stars))}
    <strong class="review-stars">${rating.stars}</strong>
    ${rating.review}
  </div>
  `;
}
export function allReviewsHTML(reviews) {
  return `
  <div id="all-reviews">
    ${reviews.map(reviewItem).join("")}
  </div>
  `;
}
