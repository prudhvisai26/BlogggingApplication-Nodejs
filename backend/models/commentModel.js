const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");
const User = require("./userModel");
const Post = require("./postModel");
const Reply = require("./replyModel");
const Like = require("./likeModel");

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

//Associations
Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });
Comment.hasMany(Reply, { foreignKey: "commentId" });
Comment.hasMany(Like, { foreignKey: "commentId" });

module.exports = Comment;
