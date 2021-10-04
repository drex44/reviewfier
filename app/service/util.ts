export const getCall = (url: string) => {
  return callUsingFetch(url);
};

export const postCall = (url: string, body: object) => {
  return callUsingFetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const callUsingFetch = (url: string, otherParams: any = {}) => {
  return fetch(url, otherParams)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }
      return response.json();
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
};

export const getApiUrl = () => {
  const devMode = process.env.NODE_ENV !== "production";
  let host = "https://reviewfier.herokuapp.com";

  if (devMode) {
    host = "http://localhost:8080";
  }

  return host;
};
