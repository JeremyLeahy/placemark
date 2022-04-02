import { Info } from "./info.js";

export const infoMongoStore = {
  async getAllInfo() {
    const details = await Info.find().lean();
    return details;
  },

  async addInfo(coffeeShopId, info) {
    info.coffeeshopid = coffeeShopId;
    const newInfo = new Info(info);
    const infoObj = await newInfo.save();
    return this.getInfoById(infoObj._id);
  },

  async getInfoByCoffeeShopId(id) {
    const details = await Info.find({ coffeeshopid: id }).lean();
    return details;
  },

  // mongo //////
  /*
  async getNumberByCoffeeShopId(id) {
    // const number =

       if ( await Info.find({coffeeshopid: id }).lean() >= 0);
    // if ((number) >= 0);
      return 1;
      return 0;
    }
  },
*/

  async updateInfo(existingInfo, updatedInfo) {
    const index = db.data.details.findIndex((info) => info._id === existingInfo._id);
    console.log(existingInfo);
    console.log(index);

    updatedInfo._id = existingInfo._id;
    updatedInfo.coffeeShopid = existingInfo.coffeeShopid;
    db.data.details[index] = updatedInfo;
    await db.write();
  },

  // mongo
  async deleteInfo(id) {
    try {
      await Info.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllInfo() {
    await Info.deleteMany({});
  },
};
