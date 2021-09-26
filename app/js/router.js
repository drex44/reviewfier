import { renderErrorPage } from "./pages/error";
import { renderHomePage } from "./pages/home";
import { renderProductPage } from "./pages/product";

export function renderPage() {
  $(window).off().on("hashchange", function () {
    // On every hash change the render function is called with the new hash.
    // This is how the navigation of our app happens.
    render(decodeURI(window.location.hash));
  });
}

export class Router {

  static initApp() {
    $(window).trigger('hashchange');
  }

  static renderPage() {
    $(window).off().on("hashchange", function () {
      // On every hash change the render function is called with the new hash.
      // This is how the navigation of our app happens.
      Router.render(decodeURI(window.location.hash));
    });
  }

  static render(url) {
    // Get the keyword from the url.
    var temp = url.split("/")[0];

    const routes = Router.getRoutes();
    if (routes[temp]) {
      routes[temp]();
    } else {
      renderErrorPage();
    }
  }

  static getRoutes() {
    return {
      '': renderHomePage,
      '#product': renderProductPage,
      '#error': renderErrorPage,
    }
  }
}
