import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Coffee Time" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Coffee Time" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      console.log(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Coffee Time" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      console.log(user);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showSettings: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);

      const viewData = {
        title: "User Settings",
        user: user,
      };
      return h.view("user-settings-view", viewData);
    },
  },
  /*
  updateUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const user = await db.userStore.getUserById(loggedInUser._id);
      // const coffeeShops = await db.coffeeShopStore.getUserCoffeeShops(loggedInUser._id);
      // const userUpdate = request.payload;
      user.firstName = request.payload.firstName;
      user.lastName = request.payload.lastName;
      user.email = request.payload.email;
      user.password = request.payload.password;
      await db.userStore.updateUser(user);
      console.log(user);

      const viewData = {
        title: "Coffee Spot Dashboard",
        user: loggedInUser,
      };

      return h.view("dashboard-view");
    },
  },
*/
  updateUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const userUpdate = request.payload;

      // user.firstName = request.payload.firstName;
      // user.lastName = request.payload.lastName;
      // user.email = request.payload.email;
      // user.password = request.payload.password;
      // const coffeeShops = await db.coffeeShopStore.getUserCoffeeShops(loggedInUser._id);
      await db.userStore.updateUser(user, userUpdate);
      console.log(userUpdate);

      const viewData = {
        title: "Coffee Spot Dashboard",
        user: loggedInUser,
        // coffeeShops: coffeeShops,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  /*
  updateUser: {
    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;
      const userUpdate = request.payload;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const coffeeShops = await db.coffeeShopStore.getUserCoffeeShops(loggedInUser._id);

      await db.userStore.updateUser( user, userUpdate);

      const viewData = {
        title: "Coffee Spot Dashboard",
        user: loggedInUser,
        coffeeShops: coffeeShops,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  */

  /*
  updateUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      // user.firstName = request.payload.firstName;
      // user.lastName = request.payload.lastName;
      // user.email = request.payload.email;
      // user.password = request.payload.password;

      const user = request.payload;
      await db.userStore.updateUser(loggedInUser._id, user);

      return h.view("dashboard-view");
    },
  },
*/

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
