export const isProductPage = (url) => {
  const urlParts = url.split("/");

  return urlParts.length > 0 && urlParts[0] === ALL_ROUTES.product
}

export const ALL_ROUTES = {
  product: "#product"
}