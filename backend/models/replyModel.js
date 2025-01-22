const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Reply = createDB.define(
  "replies",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Reply;
