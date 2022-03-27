import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCoffeeShops, testCoffeeShop } from "./fixtures.js";

suite("Coffee Shop Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.coffeeShopStore.deleteAllCoffeeShops();
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCoffeeShops[i] = await db.coffeeShopStore.addCoffeeShop(testCoffeeShops[i]);
    }
  });

  test("create a coffee shop", async () => {
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(testCoffeeShop);
    assert.equal(testCoffeeShop, coffeeShop);
    assert.isDefined(coffeeShop._id);
  });

  test("delete all coffee shops", async () => {
    let returnedCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, 3);
    await db.coffeeShopStore.deleteAllCoffeeShops();
    returnedCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, 0);
  });

  test("get a coffee shop - success", async () => {
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(testCoffeeShop);
    const returnedCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(coffeeShop._id);
    assert.equal(testCoffeeShop, coffeeShop);
  });

  test("delete One Coffee Shop - success", async () => {
    const id = testCoffeeShops[0]._id;
    await db.coffeeShopStore.deleteCoffeeShopById(id);
    const returnedCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, testCoffeeShops.length - 1);
    const deletedCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(id);
    assert.isNull(deletedCoffeeShop);
  });

  test("get a coffee shop - bad params", async () => {
    assert.isNull(await db.coffeeShopStore.getCoffeeShopById(""));
    assert.isNull(await db.coffeeShopStore.getCoffeeShopById());
  });

  test("delete One Coffee Shop - fail", async () => {
    await db.coffeeShopStore.deleteCoffeeShopById("bad-id");
    const allCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(testCoffeeShops.length, allCoffeeShops.length);
  });
});
