const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Comment = createDB.define(
  "comments",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Comment;
