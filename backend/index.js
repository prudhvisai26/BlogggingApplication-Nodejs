const express = require("express");
const { connectToDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const setupAssociations = require("./models/association");

const PORT = 8001;

const app = express();

require("./models/userModel");
require("./models/postModel");
require("./models/commentModel");
require("./models/replyModel");
require("./models/connectionModel");
require("./models/likeModel");
setupAssociations();
connectToDB();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
express.static("uploads");

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.listen(PORT, () => {
  console.log("Server Started Successfully at:", PORT);
});
