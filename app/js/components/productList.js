export function productListHTML(products) {
  return products.map(productHTML).join("");
}

function productHTML(product) {
  const { name, description, avgStars, id } = product;
  return `
    <div class="card product-details" data-id="${id}">
    <div class="card-content">
      <p class="title">
        ${name}
      </p>
      <div class="content">
        ${description}
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <a href="#">Reviews</a>
        <span>
        </span>
      </p>
    </footer>
  </div>
  `;
}
