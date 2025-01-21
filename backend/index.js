const express = require("express");
const { connectToDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const PORT = 8001;

const app = express();
connectToDB();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
express.static("uploads");

//Routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server Started Successfully at:", PORT);
});
