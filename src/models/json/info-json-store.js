import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/details.json"));
db.data = { details: [] };

export const infoJsonStore = {
  async getAllInfo() {
    await db.read();
    return db.data.details;
  },

  async addInfo(coffeeShopId, info) {
    await db.read();
    info._id = v4();
    info.coffeeShopid = coffeeShopId;
    db.data.details.push(info);
    await db.write();
    return info;
  },

  async getInfoByCoffeeShopId(id) {
    await db.read();
    return db.data.details.filter((info) => info.coffeeShopid === id);
  },

  async getInfoById(id) {
    await db.read();
    return db.data.details.find((info) => info._id === id);
  },

  async deleteInfo(id) {
    await db.read();
    const index = db.data.details.findIndex((info) => info._id === id);
    db.data.details.splice(index, 1);
    await db.write();
  },

  async deleteAllInfo() {
    db.data.details = [];
    await db.write();
  },
};
