const User = require("./userModel");
const Post = require("./postModel");
const Comment = require("./commentModel");
const Reply = require("./replyModel");
const Connection = require("./connectionModel");
const Like = require("./likeModel");

const setupAssociations = () => {
  // User associations
  User.hasMany(Post, { foreignKey: "userId" });
  User.hasMany(Comment, { foreignKey: "userId" });
  User.hasMany(Reply, { foreignKey: "userId" });

  // User-to-User connections
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

  Post.belongsTo(User, { foreignKey: "userId" });
  Comment.belongsTo(User, { foreignKey: "userId" });
  Reply.belongsTo(User, { foreignKey: "userId" });

  // Post associations
  Comment.belongsTo(Post, { foreignKey: "postId" });
  Post.hasMany(Comment, { foreignKey: "postId" });

  // Comment associations
  Reply.belongsTo(Comment, { foreignKey: "commentId" });
  Comment.hasMany(Reply, { foreignKey: "commentId" });

  // Like associations
  Like.belongsTo(User, { foreignKey: "userId" });
  Like.belongsTo(Post, { foreignKey: "postId" });
  Like.belongsTo(Comment, { foreignKey: "commentId" });
  Like.belongsTo(Reply, { foreignKey: "replyId" });

  console.log("Associations setup complete.");
};

module.exports = setupAssociations;
