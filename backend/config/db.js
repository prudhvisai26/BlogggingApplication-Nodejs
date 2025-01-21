const Sequelize = require("sequelize");

//parameters used by squelize is dbname,username,passwordname

const createDB = new Sequelize("blog", "user", "pass", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

const connectToDB = () => {
  createDB
    .sync()
    .then((res) => {
      console.log("Successfully connected to database");
    })
    .catch((err) => console.log("Cannot connect to database due to:", err));
};

module.exports = { createDB, connectToDB };
