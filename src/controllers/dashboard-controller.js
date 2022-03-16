import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
      const viewData = {
        title: "Coffee Spot Dashboard",
        coffeeShops: coffeeShops,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCoffeeShop: {
    handler: async function (request, h) {
      const newCoffeeShop = {
        title: request.payload.title,
      };
      await db.coffeeShopStore.addCoffeeShop(newCoffeeShop);
      return h.redirect("/dashboard");
    },
  },
};
