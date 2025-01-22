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

// Associations
Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Post, { foreignKey: "postId" });
Like.belongsTo(Comment, { foreignKey: "commentId" });
Like.belongsTo(Reply, { foreignKey: "replyId" });

module.exports = Like;
