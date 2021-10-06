import React from "react";
import { RatingStars } from "../ratingStars";
import { ProductDto } from "../types/product";

export const ProductList = (props: ProductListProps) => {
  const openProductPage = (id: string) => {
    window.location.hash = "product/" + id;
  };

  const {products = []} = props;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="card product-details" key={product.id}>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{product.name}</p>
                <p className="subtitle is-6">
                  <RatingStars stars={product.avgStars} leftText={product.avgStars} />
                </p>
              </div>
            </div>
            <div className="content">{product.description}</div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <a onClick={() => openProductPage(product.id)}>Reviews</a>
              <span></span>
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
};

interface ProductListProps {
  products: ProductDto[]
}