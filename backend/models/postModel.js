const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Post = createDB.define(
  "posts",
  {
    content: DataTypes.STRING,
    media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    createdAt: "created_at",
  }
);

module.exports = Post;
