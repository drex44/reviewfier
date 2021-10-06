import React from "react";
import ReactDOM from "react-dom";
import { ProductService } from "../../service/productService";
import { ProductList } from "../components/homePage/productList";
import { ProductDto } from "../components/types/product";

export const HomePage = (props: HomePageProps) => {
  return (
    <section className="section page visible" id="home">
      <ProductList products={props.products} />
    </section>
  );
};

interface HomePageProps {
  products: ProductDto[]
}

export const renderHomePage = () => {
  // need to call this from router to trigger force re-render
  ProductService.getAllProducts({ page: 0, pageSize: 0 }).then(products => {
    ReactDOM.render(<HomePage products={products} />, document.getElementById("home-page"));
  });
};
