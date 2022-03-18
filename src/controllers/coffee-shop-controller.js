import { db } from "../models/db.js";

export const coffeeShopController = {
  index: {
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      const viewData = {
        title: "Coffee Shop",
        coffeeShop: coffeeShop,
      };
      return h.view("coffee-shop-view", viewData);
    },
  },

  addInfo: {
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      const newInfo = {
        title: request.payload.title,
      };
      await db.infoStore.addInfo(coffeeShop._id, newInfo);
      return h.redirect(`/coffeeshop/${coffeeShop._id}`);
    },
  },
  deleteInfo: {
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      await db.infoStore.deleteInfo(request.params.infoid);
      return h.redirect(`/coffeeshop/${coffeeShop._id}`);
    },
  },
};
