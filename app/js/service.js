const host = "https://reviewfier.herokuapp.com";

export class ProductService {
  static getAllProducts(req) {
    return postCall(`${host}/product/query`, req);
  }

  static getProduct(id) {
    return getCall(`${host}/product/${id}`);
  }

  static getAllRatings(id) {
    return getCall(`${host}/product/${id}/ratings`);
  }

  static addNewRating(rating) {
    return postCall(`${host}/product/newRating`, rating);
  }
}

function getCall(url) {
  return fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function postCall(url, body) {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
