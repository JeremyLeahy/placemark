import { userMemStore } from "./mem/user-mem-store.js";
import { coffeeShopMemStore } from "./mem/coffee-shop-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { coffeeShopJsonStore } from "./json/coffeeshop-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";
import { adminJsonStore } from "./json/admin-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { coffeeShopMongoStore } from "./mongo/coffeeshop-mongo-store.js";
import { infoMongoStore } from "./mongo/info-mongo-store.js";

export const db = {
  userStore: null,
  coffeeShopStore: null,
  infoStore: null,
  // adminStore: { adminUsers: [] },
  adminStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.coffeeShopStore = coffeeShopJsonStore;
        this.infoStore = infoJsonStore;
        this.adminStore = adminJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.coffeeShopStore = coffeeShopMongoStore;
        this.infoStore = infoMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.coffeeShopStore = coffeeShopMemStore;
        this.infoStore = infoMemStore;
    }
  },
};
