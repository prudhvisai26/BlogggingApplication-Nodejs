const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Connection = createDB.define(
  "connections",
  {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Connection;
