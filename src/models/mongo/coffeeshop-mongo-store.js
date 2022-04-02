import { infoMongoStore } from "./info-mongo-store.js";
import { CoffeeShop } from "./coffeeshop.js";

export const coffeeShopMongoStore = {
  async getAllCoffeeShops() {
    const details = await CoffeeShop.find().lean();
    return details;
  },

  async getCoffeeShopById(id) {
    if (id) {
      const coffeeShop = await CoffeeShop.findOne({ _id: id }).lean();
      if (coffeeShop) {
        coffeeShop.details = await infoMongoStore.getInfoByCoffeeShopId(coffeeShop._id);
      }
      return coffeeShop;
    }
    return null;
  },

  async addCoffeeShop(coffeeShop) {
    const newCoffeeShop = new CoffeeShop(coffeeShop);
    const coffeeShopObj = await newCoffeeShop.save();
    return this.getCoffeeShopById(coffeeShopObj._id);
  },

  async getUserCoffeeShops(id) {
    const coffeeShop = await CoffeeShop.find({ userid: id }).lean();
    return coffeeShop;
  },

  async deleteCoffeeShopById(id) {
    try {
      await CoffeeShop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCoffeeShops() {
    await CoffeeShop.deleteMany({});
  },
};
