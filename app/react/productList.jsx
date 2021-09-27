import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ProductService } from "../js/service";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts({ page: 0, pageSize: 0 }).then(setProducts);
  }, []);

  const openProductPage = (id) => {
    window.location.hash = "product/" + id;
  };

  return (
    <section className="section page visible" id="home">
      <div className="product-list">
        {products.map((product) => (
          <div className="card product-details" data-id={product.id}>
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
    </section>
  );
};

ReactDOM.render(<ProductList />, document.getElementById("product-list"));
