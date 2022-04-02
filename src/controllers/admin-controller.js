import { db } from "../models/db.js";

import { adminUserCredentialsSpec } from "../models/joi-schemas.js";

// missing info
export const adminController = {
  index: {
    // auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },
  /*
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
  */

  showLogin: {
    auth: false,
    handler: function (request, h) {
      // needs changing
      return h.view("admin-login-view", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: adminUserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("admin-login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const { email, password } = request.payload;
      const adminUser = await db.adminStore.getAdminUserByEmail(email);
      console.log(adminUser);
      if (!adminUser || adminUser.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/admin-dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      return h.redirect("/");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin-dashboard");
    },
  },
};
