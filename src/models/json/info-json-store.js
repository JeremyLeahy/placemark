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
  /*
  async updateInfo(existingInfo, updatedInfo) {
    const index = db.data.details.findIndex((info) => info === existingInfo);
    // console.log(updatedInfo);
    console.log(index);
    db.data.details[index].placeName = updatedInfo.placeName;
    db.data.details[index].description = updatedInfo.firstName;
    db.data.details[index].latitude = updatedInfo.latitude;
    db.data.details[index].longitude = updatedInfo.longitude;
    // db.data.details[index] = updatedInfo;
    await db.write();
  },
*/

  async updateInfo(info, updatedInfo) {
    info.placeName = updatedInfo.placeName;
    info.description = updatedInfo.description;
    info.latitude = updatedInfo.latitude;
    info.longitude = updatedInfo.longitude;
    await db.write();
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
