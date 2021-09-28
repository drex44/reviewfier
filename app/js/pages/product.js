import { showPage } from "./pageUtils";
import { ProductService } from "../service";
import { allReviewsHTML } from "../components/productReview";
import { getFormData } from "../formUtils";
import { renderProductInfo } from "../../react/components/productPage/productInfo";

export function renderProductPage() {
  showPage('product');
  const url = window.location.hash;
  var id = url.split("/")[1];
  
  renderProductInfo(id);
  ProductService.getAllRatings(id).then(resp => generateProductReviewsHTML(id, resp));
}

const submitButtonSelector = '#product #new-rating-submit-btn';
const formSelector = '#product #new-rating-form';

function generateProductReviewsHTML(productId, reviews = []) {
  const reviewsHTML = allReviewsHTML(reviews);
  $("#product #reviews").empty();
  $("#product #reviews").append(reviewsHTML);

  initializeEventHandlers(productId);
}

function initializeEventHandlers(productId) {
  $("#product .new-review-btn").off().on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(formSelector).trigger("reset");
    $(`${formSelector} #product-id`).val(productId);
    openNewReviewModal();
  });
  $("#product #new-rating-close-btn").off().on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeNewReviewModal();
  });

  $(submitButtonSelector).off().on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    addLoading(submitButtonSelector);
    const newRating = getFormData(formSelector);
    ProductService.addNewRating(newRating).then(function(resp) {
      $("#page_navigation1").attr("id","page_navigation1");
      removeLoading(submitButtonSelector);
      closeNewReviewModal();
      renderProductPage();
    });
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