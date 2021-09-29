import { useEffect, useState } from "react";
import { ProductService } from "../../../js/service";
import { Product } from "../types/product";

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product>(null);

  useEffect(() => {
    if (productId) {
      ProductService.getProduct(productId).then((resp) => {
        if (resp) {
          setProduct(resp);
        }
      });
    }
    return () => setProduct(null);
  }, [productId]);

  return { product };
};
