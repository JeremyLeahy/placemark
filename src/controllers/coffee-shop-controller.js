import { db } from "../models/db.js";
import { InfoSpec } from "../models/joi-schemas.js";

let coffeeShop;
export const coffeeShopController = {
  index: {
    handler: async function (request, h) {
      coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      const viewData = {
        title: "Coffee Shop",
        coffeeShop: coffeeShop,
      };
      return h.view("coffee-shop-view", viewData);
    },
  },

  addInfo: {
    validate: {
      payload: InfoSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const viewData = {
          title: "Add info error",
          errors: error.details,
          coffeeShop: coffeeShop,
        };
        return h.view("coffee-shop-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      const newInfo = {
        placeName: request.payload.placeName,
        description: request.payload.description,
      };
      await db.infoStore.addInfo(coffeeShop._id, newInfo);
      return h.redirect(`/coffeeshop/${coffeeShop._id}`);
    },
  },

  deleteInfo: {
    handler: async function (request, h) {
      coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      await db.infoStore.deleteInfo(request.params.infoid);
      return h.redirect(`/coffeeshop/${coffeeShop._id}`);
    },
  },
};
