import { db } from "../models/db.js";
import { InfoSpec } from "../models/joi-schemas.js";

let coffeeShop;
export const coffeeShopController = {
  index: {
    handler: async function (request, h) {
      coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      const countCoffee = await db.infoStore.getNumberByCoffeeShopId(request.params.id);
      const viewData = {
        title: "Coffee Shop",
        coffeeShop: coffeeShop,
        countCoffee: countCoffee,
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
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.infoStore.addInfo(coffeeShop._id, newInfo);
      // console.log(newInfo);
      return h.redirect(`/coffeeshop/${coffeeShop._id}`);
    },
  },

  editInfo: {
    handler: async function (request, h) {
      const currentInfo = await db.infoStore.getInfoById(request.params.infoid);
      coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);

      const infoEdit = {
        placeName: request.params.placeName,
        description: request.params.description,
        latitude: request.params.latitude,
        longitude: request.params.longitude,
        id: request.params.infoid,
      };
      console.log("in info");
      console.log(infoEdit);
      await db.infoStore.updateInfo(currentInfo, infoEdit);

      console.log(infoEdit);

      const viewData = {
        title: "Coffee Spot Details",
        coffeeShop: coffeeShop,
        info: currentInfo,
      };
      console.log("update view");
      return h.view("update-info-view", viewData);
    },
  },

  updateInfo: {
    handler: async function (request, h) {
      console.log("payload");
      console.log(request.payload);
      const newInfo = {
        placeName: request.payload.placeName,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        _id: request.payload._id,
      };
      const currentInfo = await db.infoStore.getInfoById(newInfo._id);

      await db.infoStore.updateInfo(currentInfo, newInfo);

      const viewData = {
        title: "Coffee Spot Details",
        coffeeShop: coffeeShop,
        info: currentInfo,
      };
      // return h.redirect(`/coffeeshop/${coffeeShop._id}`);
      // return h.view("update-info-view", viewData);
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
