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
    { username: "Shiva", password: "132" },
    { username: "Rudra", password: "132" },
    { username: "Hanuman", password: "132" },
    { username: "Ram", password: "132" },
    { username: "Krishna", password: "132" },
    { username: "Arjuna", password: "132" },
  ]);
  console.log("Alluser created!!");
} catch (error) {
  console.log("Not Created", error);
}

// const allUser = await Users.findAll(); //? Select * from users;
// const allUser = await Users.findAll({ attributes: ["username", "password"] }); //? Select username , password from users;
// const allUser = await Users.findAll({
//   attributes: ["username", ["password", "pwd"]],
// }); //? Select username , password as pwd from users;

/*
const userCount = await Users.findAll({
  attributes: [[sequelize.fn("COUNT", sequelize.col("username")), "users"]],
}); //? select count(username)

console.log(userCount[0].get("users")); 
*/

// const allUser = await Users.findAll({ where: { username: "Shiva" } }); //? Select * from users ;
const allUser = await Users.findAll({
  where: { username: { [Op.eq]: "Rudra" } },
}); //? Select * from users ;

allUser.forEach((user) => {
  console.log(user.toJSON());
});
