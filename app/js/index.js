import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import style from "../scss/style.scss";
import { Router } from "./router";
import * as ReactComponents from "../react";
import { WebSocketClient } from "../service/subscription";

$(function () {
  Router.renderPage();
  Router.initApp();
  $("#error .homeBtn").off().on("click", function (e) {
    Router.render("/");
  });
  WebSocketClient.getInstance().connect();
});
