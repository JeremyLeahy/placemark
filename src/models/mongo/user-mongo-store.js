import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updateUser(existingUser, updatedUser) {
    const index = db.data.users.findIndex((user) => user === existingUser);
    console.log(index);
    db.data.users[index].firstName = updatedUser.firstName;
    db.data.users[index].lastName = updatedUser.lastName;
    db.data.users[index].email = updatedUser.email;
    db.data.users[index].password = updatedUser.password;

    await db.write();
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
