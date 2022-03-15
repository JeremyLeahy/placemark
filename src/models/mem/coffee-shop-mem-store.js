import { v4 } from "uuid";

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
    return coffeeShops.find((coffeeShop) => coffeeShop._id === id);
  },

  async deleteCoffeeShopById(id) {
    const index = coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    coffeeShops.splice(index, 1);
  },

  async deleteAllCoffeeShops() {
    coffeeShops = [];
  },
};
