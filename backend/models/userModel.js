const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const User = createDB.define(
  "users",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    profileImage: {
      type: DataTypes.STRING,
      default: "/uploads/default.png",
    },
  },
  {
    createdAt: "created_at",
  }
);

module.exports = User;
