import React from "react";
import ReactDOM from "react-dom";
import { ProductList } from "../components/productList";

export const HomePage = () => {
  return (
    <section className="section page visible" id="home">
      <ProductList />
    </section>
  );
};

ReactDOM.render(<HomePage />, document.getElementById("home-page"));
