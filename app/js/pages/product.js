import { showPage } from "./pageUtils";
import { ProductService } from "../service";
import { productInfoHTML } from "../components/productInformation";
import { renderProductRatings } from "../../react/components/productPage/productRatings";
import { getFormData } from "../formUtils";

export function renderProductPage() {
  showPage('product');
  const url = window.location.hash;
  var id = url.split("/")[1];
  Promise.all([
    ProductService.getProduct(id),
    ProductService.getAllRatings(id)
  ]).then(resp => generateProductsHTML(resp[0], resp[1]));
}

const submitButtonSelector = '#product #new-rating-submit-btn';
const formSelector = '#product #new-rating-form';

function generateProductsHTML(product, reviews = []) {
  const productHTML = productInfoHTML(product);
  $("#product .product-info").empty();
  $("#product .product-info").append(productHTML);
  renderProductRatings(reviews);

  initializeEventHandlers(product);
}

function initializeEventHandlers(product) {
  $("#product .new-review-btn").off().on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(formSelector).trigger("reset");
    $(`${formSelector} #product-id`).val(product.id);
    openNewReviewModal();
  });
  $("#product #new-rating-close-btn").off().on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeNewReviewModal();
  });

  $("#product #new-rating-form #review-textarea").off().keypress(function(e) {
    // enter keypress
    if (e.keyCode === 13) {
      submitNewRating();
    } 
  });

  $(submitButtonSelector).off().on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    submitNewRating();
  });
}

function submitNewRating() {
  addLoading(submitButtonSelector);
  const newRating = getFormData(formSelector);
  ProductService.addNewRating(newRating).then(function(resp) {
    if (resp) {
      closeNewReviewModal();
      renderProductPage();
    } else {
      showError("Error while adding a new rating. Copy your review for now and please try again later.");
    }
    removeLoading(submitButtonSelector);
  });
}

function addLoading(selector) {
  $(selector).attr("disabled");
  $(selector).addClass("is-loading");
}

function removeLoading(selector) {
  $(selector).removeAttr("disabled");
  $(selector).removeClass("is-loading");
}

function closeNewReviewModal() {
  $("#product .new-rating-form").removeClass("is-active");
}

function openNewReviewModal() {
  $("#product .new-rating-form").addClass("is-active");
}
