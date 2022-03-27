import { userMemStore } from "./mem/user-mem-store.js";
import { coffeeShopMemStore } from "./mem/coffee-shop-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { coffeeShopJsonStore } from "./json/coffeeshop-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";

export const db = {
  userStore: null,
  coffeeShopStore: null,
  infoStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.coffeeShopStore = coffeeShopJsonStore;
        this.infoStore = infoJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.coffeeShopStore = coffeeShopMemStore;
        this.infoStore = infoMemStore;
    }
  },
};
