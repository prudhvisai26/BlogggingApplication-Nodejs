const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");
const Post = require("./postModel");
const Comment = require("./commentModel");
const Reply = require("./replyModel");
const Like = require("./likeModel");
const Connection = require("./connectionModel");

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

// Associations
User.hasMany(Post, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });
User.hasMany(Reply, { foreignKey: "userId" });
User.hasMany(Like, { foreignKey: "userId" });

User.belongsToMany(User, {
  as: "Followers",
  through: Connection,
  foreignKey: "followingId",
  otherKey: "followerId",
});
User.belongsToMany(User, {
  as: "Following",
  through: Connection,
  foreignKey: "followerId",
  otherKey: "followingId",
});

module.exports = User;
