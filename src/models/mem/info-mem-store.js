import { v4 } from "uuid";

let details = [];

export const infoMemStore = {
  async getAllInfo() {
    return details;
  },

  async addInfo(coffeeShopId, info) {
    info._id = v4();
    info.coffeeShopid = coffeeShopId;
    details.push(info);
    return info;
  },

  async getInfoByCoffeeShopId(id) {
    return details.filter((info) => info.coffeeShopid === id);
  },

  async getInfoById(id) {
    return details.find((info) => info._id === id);
  },

  async getCoffeeShopInfo(coffeeShopId) {
    return details.filter((info) => info.coffeeShopid === coffeeShopId);
  },

  async deleteInfo(id) {
    const index = details.findIndex((info) => info._id === id);
    details.splice(index, 1);
  },

  async deleteAllInfo() {
    details = [];
  },

  async updateInfo(info, updatedInfo) {
    info.title = updatedInfo.title;
  },
};
