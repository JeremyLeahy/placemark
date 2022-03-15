import { userMemStore } from "./mem/user-mem-store.js";
import { coffeeShopMemStore } from "./mem/coffee-shop-mem-store.js";

export const db = {
  userStore: null,
  coffeeShopStore: null,

  init() {
    this.userStore = userMemStore;
    this.coffeeShopStore = coffeeShopMemStore;
  },
};
