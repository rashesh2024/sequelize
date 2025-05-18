// const Sequelize = require("sequelize"); //? Sequelize is ORM so here we have created a Constructor of the sequqlize
import { Sequelize, DataTypes } from "sequelize";

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

// sequelize.sync().then(() => {
//   console.log("Sync Success");
// }); //? To Sync multiple tables at the same time rather than syncing each and every model

// sequelize.drop({ match: /_test$/ }); //? Drop all the table which ends with test

// Create a table using define() method of sequelize
const Users = sequelize.define(
  "users",
  {
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
  }
  /*{
    // The lets table name to be unchaged
    // where sequelize makes the table nam plural from the singuler
    freezeTable: true,
  }*/
);

//Users.drop(); //? Dropt the table if its created

try {
  await Users.sync({ alter: true });
  // await Users.sync({ force: true });
  // await Users.sync();
  console.log("Sync Success");
} catch (err) {
  console.log("Sync Failed", err);
}

// Creating Instance
const rashesh = await Users.create({
  username: "Rashesh",
  password: "123",
  age: 24,
  dob: "2001-08-08",
});

const sparky = await Users.create({
  username: "sparky",
  password: "1234",
  age: 24,
  dob: "2000-04-08",
});

const sam = await Users.create({
  username: "sam",
  password: "123",
  age: 24,
  dob: "2001-08-08",
});

sparky.decrement("age", { by: 5 });
await sparky.reload();
console.log(sparky.age);

// save() method to change the value in instance and in memory and later on on DB
sparky.age = 34;
sparky.username = "rasjesj";
sparky.save({ fields: ["age"] }); //? This will only update the speciic age filed in update
// sparky.save(); //? This will change all the value which is changed in the instance and in memory and then it will update the value in thr DB

//? The .reload() method re-fetches the instance from the database, updating the in-memory object with the latest values from the DB.
await sparky.reload();
console.log("User updated");
console.log(await sparky.toJSON());

// const allUser = await Users.findAll();
// allUser.forEach((user) => {
//   console.log(user.toJSON());
// });

// The update method will directly update the values on database level not at instance level
await rashesh.update({ username: "Rasiyo" });
console.log("User updated");
console.log(rashesh.toJSON());

//? we can remove the instace by usgin destroy() method
await rashesh.destroy();
console.log("User removed");
