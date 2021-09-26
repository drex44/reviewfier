import { ProductService } from "../service";
import { showPage } from "./pageUtils";
import { productListHTML } from "../components/productList";

export function renderHomePage() {
  window.location.hash = "";
  showPage("home");
  ProductService.getAllProducts({ page: 0, pageSize: 0 }).then(generateAllProductsHTML);
}

function generateAllProductsHTML(data) {
  var list = $("#home .product-list");
  list.empty();
  list.append(productListHTML(data));

  list.find(".product-details").off().on("click", function (e) {
    e.preventDefault();
    var productIndex = $(this).data("id");
    window.location.hash = "product/" + productIndex;
  });
}
