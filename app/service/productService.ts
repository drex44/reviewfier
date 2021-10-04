import { ProductDto, RatingDto, WSUpdate } from "../react/components/types/product";
import { WebSocketClient } from "./subscription";
import Stomp from "stompjs";
import { getApiUrl, postCall } from "./util";

const host = getApiUrl();

export class ProductService {

  static lastRatingSubscription: Stomp.Subscription;
  static lastProductSubscription: Stomp.Subscription;

  static getAllProducts(req: {page: number, pageSize: number}) {
    return postCall(`${host}/product/query`, req);
  }

  static subscribeProduct(id: string, callback = (product: ProductDto) => {}) {
    if (ProductService.lastProductSubscription) {
      ProductService.lastProductSubscription.unsubscribe();
    }
    const productTopic = `topic/product/${id}`;
    ProductService.lastProductSubscription = WebSocketClient.getInstance().subscribe(productTopic, callback);
    WebSocketClient.getInstance().send(productTopic);
  }

  static subscribeRatings(productId: string, callback = (resp: WSUpdate<RatingDto>) => {}) {
    if (ProductService.lastRatingSubscription) {
      ProductService.lastRatingSubscription.unsubscribe();
    }
    const ratingTopic = `topic/product/${productId}/ratings`;
    ProductService.lastRatingSubscription = WebSocketClient.getInstance().subscribe(ratingTopic, callback);
    WebSocketClient.getInstance().send(ratingTopic);
  }

  static addNewRating(rating: RatingDto) {
    return postCall(`${host}/product/newRating`, rating);
  }
}

