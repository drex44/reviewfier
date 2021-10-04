import React, { useEffect, useState } from "react";
import { ProductService } from "../../../service/productService";
import { ProductDto } from "../types/product";

export const ProductList = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    ProductService.getAllProducts({ page: 0, pageSize: 0 }).then(setProducts);
  }, []);

  const openProductPage = (id: string) => {
    window.location.hash = "product/" + id;
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="card product-details" key={product.id}>
          <div className="card-content">
            <p className="title">{product.name}</p>
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
