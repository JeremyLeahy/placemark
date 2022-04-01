import Mongoose from "mongoose";

const { Schema } = Mongoose;

const infoSchema = new Schema({
  placeName: String,
  description: String,
  latitude: String,
  longitude: String,

  coffeeshopid: {
    type: Schema.Types.ObjectId,
    ref: "coffeeShop",
  },
});

export const Track = Mongoose.model("Info", infoSchema);
