import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const adminUserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const InfoSpec = {
  placeName: Joi.string().required(),
  description: Joi.string().required(),
  latitude: Joi.string().optional(),
  longitude: Joi.string().optional(),
};

export const CoffeeShopSpec = {
  title: Joi.string().required(),
};
