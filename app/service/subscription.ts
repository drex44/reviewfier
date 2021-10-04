import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getApiUrl } from "./util";

const host = getApiUrl();

export class WebSocketClient {
  socket: WebSocket;
  stompClient: Stomp.Client;
  private static webSocketClient = new WebSocketClient();

  static getInstance = () => {
    return WebSocketClient.webSocketClient;
  };

  pendingSubscriptions = new Array();
  pendingSendRequests = new Array();
  isConnected = false;

  connect = async (connectCallback: Function = () => {}) => {
    const url = `${host}/subscribe`;

    this.socket = new SockJS(url);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, () => {
      this.isConnected = true;
      this.pendingSubscriptions.forEach((request) => {
        this.subscribe(request.route, request.handler);
      });
      this.pendingSendRequests.forEach(req => {
        this.send(req.route, req.body);
      });
      this.pendingSubscriptions = [];
      connectCallback();
    });
  };

  subscribe = (route: string, handler: Function = () => {}): Stomp.Subscription => {
    if (this.isConnected && this.stompClient.connected) {
      return this.stompClient.subscribe(`/${route}`, function (messageOutput) {
        if (messageOutput.body) {
          handler(JSON.parse(messageOutput.body));
        }
      });
    } else {
      this.pendingSubscriptions.push({ route, handler });
    }
  };

  unSubscribe = async (route: string) => {
    if (this.stompClient.connected) {
      this.stompClient.unsubscribe(route);
    }
  };

  disconnect = async () => {
    if (this.stompClient.connected) {
      this.stompClient.disconnect(() => console.log("Disconnected"));
    }
  };

  send = async (route: string, body?: object) => {
    if (this.isConnected && this.stompClient.connected) {
      this.stompClient.send(`/${route}`, {}, JSON.stringify(body));
    } else {
      this.pendingSendRequests.push({ route, body });
    }
  };
}
