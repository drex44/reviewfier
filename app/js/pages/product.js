import { showPage } from "./pageUtils";
import { renderProductInfo } from "../../react/components/productPage/productInfo";
import { renderProductRatings } from "../../react/components/productPage/productRatings";

export function renderProductPage() {
  showPage('product');
  const url = window.location.hash;
  var id = url.split("/")[1];
  
  renderProductInfo(id);
  renderProductRatings(id);
}