import Mongoose from "mongoose";

const { Schema } = Mongoose;

const coffeeShopSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const CoffeeShop = Mongoose.model("Coffee Shop", coffeeShopSchema);
