import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { infoJsonStore } from "./info-json-store.js";
import { infoMemStore } from "../mem/info-mem-store.js";

const db = new Low(new JSONFile("./src/models/json/coffeeshops.json"));
db.data = { coffeeShops: [] };

export const coffeeShopJsonStore = {
  async getAllCoffeeShops() {
    await db.read();
    return db.data.coffeeShops;
  },

  async addCoffeeShop(coffeeShop) {
    await db.read();
    coffeeShop._id = v4();
    db.data.coffeeShops.push(coffeeShop);
    await db.write();
    return coffeeShop;
  },

  async getCoffeeShopById(id) {
    await db.read();
    const list = db.data.coffeeShops.find((coffeeShop) => coffeeShop._id === id);
    list.details = await infoJsonStore.getInfoByCoffeeShopId(list._id);
    return list;
  },

  async getUserCoffeeShops(userid) {
    await db.read();
    return db.data.coffeeShops.filter((coffeeShop) => coffeeShop.userid === userid);
  },

  async deleteCoffeeShopById(id) {
    await db.read();
    const index = db.data.coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    db.data.coffeeShops.splice(index, 1);
    await db.write();
  },

  async deleteAllCoffeeShops() {
    db.data.coffeeShops = [];
    await db.write();
  },
};
