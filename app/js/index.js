import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import style from "../scss/style.scss";
import { Router } from "./router";


$(function () {
  Router.renderPage();
  Router.initApp();
  $(".homeBtn").off().on("click", function (e) {
    Router.render("/");
  });
});
