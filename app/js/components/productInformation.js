import { starIcons } from "./stars";

export function productInfoHTML(product) {
  return `
    <div class="product-info">
      <h1 class="title">${product.name}</h1>
      <div class="columns is-vcentered">
      <div class="column is-four-fifths">
      ${starsHTML(product.avgStars)}
      </div>
      <div class="column is-right">
      <button class="button new-review-btn">Add Review</button>
      </div>
      </div>
      <hr></hr>
    </div>
  `;
}

function starsHTML(avgStars) {
  const fixedStars = parseFloat(avgStars).toFixed(2);
  const icons = starIcons(fixedStars, fixedStars);
  return `
    <span class="title avg-stars">
      ${icons}
    </span>
  `;
}
