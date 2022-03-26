import { db } from "../models/db.js";
import { CoffeeShopSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: CoffeeShopSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Coffee Shop error", errors: error.details }).takeover().code(400);
      },
    },
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

  deleteCoffeeShop: {
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      await db.coffeeShopStore.deleteCoffeeShopById(coffeeShop._id);
      return h.redirect("/dashboard");
    },
  },
};
