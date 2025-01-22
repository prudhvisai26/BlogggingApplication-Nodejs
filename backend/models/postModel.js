const { DataTypes } = require("sequelize");
const createDB = require("../config/db");
const User = require("./userModel");
const Comment = require("./commentModel");

const Post = createDB.define(
  "posts",
  {
    content: DataTypes.STRING,
    media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: "created_at",
  }
);

//Associations...
Post.belongsTo(User, { foreignKey: "userid" });
Post.hasMany(Comment, { foreignKey: "postId" });
Post.hasMany(Like, { foreignKey: "postId" });

module.exports = Post;
