import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { coffeeShopController } from "./controllers/coffee-shop-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/admin", config: adminController.showLogin },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcoffeeshop", config: dashboardController.addCoffeeShop },

  { method: "GET", path: "/coffeeshop/{id}", config: coffeeShopController.index },
  { method: "POST", path: "/coffeeshop/{id}/addinfo", config: coffeeShopController.addInfo },

  { method: "GET", path: "/coffeeshop/{id}/updateinfo/{infoid}/{placeName}/{description}/{latitude}/{longitude}", config: coffeeShopController.editInfo },

  { method: "POST", path: "/coffeeshop/{id}/updateinfo/{infoid}", config: coffeeShopController.updateInfo },

  { method: "GET", path: "/dashboard/deletecoffeeshop/{id}", config: dashboardController.deleteCoffeeShop },
  { method: "GET", path: "/coffeeshop/{id}/deleteinfo/{infoid}", config: coffeeShopController.deleteInfo },

  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: adminController.deleteUser },

  { method: "POST", path: "/adminauthenticate", config: adminController.login },

  { method: "GET", path: "/settings", config: accountsController.showSettings },
  { method: "POST", path: "/updateuser", config: accountsController.updateUser },
];
