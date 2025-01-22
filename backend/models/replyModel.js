const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");
const Comment = require("./commentModel");
const Like = require("./likeModel");
const User = require("./userModel");

const Reply = createDB.define(
  "replies",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timeStamps: true,
  }
);

// Associations
Reply.belongsTo(User, { foreignKey: "userId" });
Reply.belongsTo(Comment, { foreignKey: "commentId" });
Reply.belongsTo(Reply, { as: "ParentReply", foreignKey: "replyId" });
Reply.hasMany(Reply, { as: "Replies", foreignKey: "replyId" });
Reply.hasMany(Like, { foreignKey: "replyId" });

module.exports = Reply;
