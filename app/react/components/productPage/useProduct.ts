import { useEffect, useState } from "react";
import { ProductService } from "../../../service/productService";
import { ProductDto } from "../types/product";

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<ProductDto>(null);

  useEffect(() => {
    if (productId) {
      ProductService.subscribeProduct(productId, (resp: ProductDto) => {
        if (resp) {
          setProduct(resp);
        }
      });
    }

    return () => setProduct(null);
  }, [productId]);

  return { product };
};
