import { v4 } from "uuid";
import { infoMemStore } from "./info-mem-store.js";

let coffeeShops = [];

export const coffeeShopMemStore = {
  async getAllCoffeeShops() {
    return coffeeShops;
  },

  async addCoffeeShop(coffeeShop) {
    coffeeShop._id = v4();
    coffeeShops.push(coffeeShop);
    return coffeeShop;
  },

  async getCoffeeShopById(id) {
    const list = coffeeShops.find((coffeeShop) => coffeeShop._id === id);
    list.details = await infoMemStore.getInfoByCoffeeShopId(list._id);
    return list;
  },

  async deleteCoffeeShopById(id) {
    const index = coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    coffeeShops.splice(index, 1);
  },

  async deleteAllCoffeeShops() {
    coffeeShops = [];
  },
};
