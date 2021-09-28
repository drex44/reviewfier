import { showPage } from "./pageUtils";
import { ProductService } from "../service";
import { allReviewsHTML } from "../components/productReview";
import { renderProductInfo } from "../../react/components/productPage/productInfo";

export function renderProductPage() {
  showPage('product');
  const url = window.location.hash;
  var id = url.split("/")[1];
  
  renderProductInfo(id);
  ProductService.getAllRatings(id).then(resp => generateProductReviewsHTML(id, resp));
}

function generateProductReviewsHTML(productId, reviews = []) {
  const reviewsHTML = allReviewsHTML(reviews);
  $("#product #reviews").empty();
  $("#product #reviews").append(reviewsHTML);
}