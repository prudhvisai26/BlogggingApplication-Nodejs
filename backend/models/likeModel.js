const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Like = createDB.define(
  "likes",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true, // One of postId/commentId/replyId will be non-null
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Like;
