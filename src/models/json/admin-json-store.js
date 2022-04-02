import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

// const db = new Low(new JSONFile("./src/models/json/users.json"));
// db.data = { users: [] };

const db = new Low(new JSONFile("./src/models/json/admin.json, ./src/models/json/users.json"));

db.data = { adminUsers: [], users: [] };

export const adminJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async getAdminUser() {
    await db.read();
    return db.data.adminUsers;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getAdminUserByEmail(email) {
    await db.read();
    let u = db.data.adminUsers.find((adminUser) => adminUser.email === email);
    if (u === undefined) u = null;
    return u;
  },
  /*
    async getAdminUserByEmail(email) {
      await db.read();
      return db.data.adminUsers.find((adminUser) => adminUser.email === email);
    },
  */
  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },
};
