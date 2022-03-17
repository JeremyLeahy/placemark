import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const coffeeShops = await db.coffeeShopStore.getUserCoffeeShops(loggedInUser._id);
      const viewData = {
        title: "Coffee Spot Dashboard",
        user: loggedInUser,
        coffeeShops: coffeeShops,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCoffeeShop: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCoffeeShop = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.coffeeShopStore.addCoffeeShop(newCoffeeShop);
      return h.redirect("/dashboard");
    },
  },
};
