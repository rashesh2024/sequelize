// const Sequelize = require("sequelize"); //? Sequelize is ORM so here we have created a Constructor of the sequqlize
import { Sequelize, DataTypes, Op } from "sequelize";

//? Here we have passed DB schema, username , password and db-server-configs into the Sequelize constructer as parameters
const sequelize = new Sequelize("my_db", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

// Check database connection is succesfull or not.

try {
  // await sequelize.authenticate();
  console.log("Connection Successful!");
} catch (error) {
  console.log("Connection Failed! \n", error);
}

// sequelize.drop({ match: /_test$/ }); //? Drop all the table which ends with test

// Create a table using define() method of sequelize
const Users = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Creating object of table attribute
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 21,
  },

  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// sequelize.sync().then(() => {
await sequelize.sync({ force: true }).then(() => {
  console.log("Sync Success");
}); //? To Sync multiple tables at the same time rather than syncing each and every model

try {
  const multiple_user = await Users.bulkCreate([
    { username: "Shiva", password: "132", age: 32 },
    { username: "Rudra", password: "132", age: 24 },
    { username: "Hanuman", password: "132", age: 55 },
    { username: "Ram", password: "132", age: 84 },
    { username: "Krishna", password: "132", age: 26 },
    { username: "Arjuna", password: "132", age: 30 },
  ]);
  console.log("Alluser created!!");
} catch (error) {
  console.log("Not Created", error);
}

//! Basic Selection
// const allUser = await Users.findAll(); //? Select * from users;
// const allUser = await Users.findAll({ attributes: ["username", "password"] }); //? Select username , password from users;
// const allUser = await Users.findAll({
//   attributes: ["username", ["password", "pwd"]],
// }); //? Select username , password as pwd from users;

//! Aggrigation
/*
const userCount = await Users.findAll({
  attributes: [[sequelize.fn("COUNT", sequelize.col("username")), "users"]],
}); //? select count(username)

console.log(userCount[0].get("users")); 
*/

//! Where Clause
/*
const allUser = await Users.findAll({ where: { username: "Shiva" } }); //? Select * from users where name = Shiva;
const allUser = await Users.findAll({ where: { username: "Shiva", age: 21 } }); //? Select * from users where name = Shiva;
const allUser = await Users.findAll({
  where: { username: { [Op.eq]: "Rudra" } },
}); //? Select * from users ;
*/

//! Limit and Offset
// const allUser = await Users.findAll({ limit: 3, offset: 2 });

//! Order By
/*
const allUser = await Users.findAll({
  attributes: ["username", "age"],
  order: [["age", "DESC"]], // ASC , DESC
});*/

//! Group By

const allUser = await Users.findAll({
  attributes: [
    "username",
    [sequelize.fn("SUM", sequelize.col("age")), "ageSum"],
  ],
  group: "username",
});

allUser.forEach((user) => {
  console.log(user.toJSON());
});
