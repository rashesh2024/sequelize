# **Sequelize-ORM**

**ORM** : Object Relational Mapping

**Sequelized is a promise based Node JS ORM**

[Official Docuement](https://sequelize.org/docs/v6/)

#### Some Basic commands to start with it

## **Requirements**

```
npm install sequlize
npm install mysql2 // To work with mysql
```

or

```
npm install pg ph-hoster // To Work with Postgres
```

## **DB Connections**

To connect Sequelize with the database we need to create instance of the Sequelize and pass the db_configs in the Sequelize constructor

```
const Sequelize = require("sequelize"); // Sequelize is ORM so here we have created a Constructor of the sequqlize

// Here we have passed DB schema, username , password and db-server-configs into the Sequelize constructer as parameters
const sequelize = new Sequelize("my_db", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});
```

Now to check the connection to th databases is successfully done or not, we use the sequelize method call `sequelize.authenticate()`.

```
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((error) => {
    console.log("Error : ", error);
  });
```

## **Models/Tables**

**Model** : It nothing but just table in our databse schema.
To create model in sequelize we have to use the `sequelize.define()` method.

```
sequelize.define(modelName, attributes, options);
```

### Example:

Users model :

```
const Users = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Creating object of table attribute
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 21,
    },

    dob: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
  }
  /*{
    // The lets table name to be unchaged
    // where sequelize makes the table nam plural from the singuler
    freezeTable: true,
  }*/
);
```

### Enforcing the table name to be equal to the model name

You can stop the auto-pluralization performed by Sequelize using the freezeTableName: true option. This way, Sequelize will infer the table name to be equal to the model name, without any modifications:

```
sequelize.define(
  'User',
  {
    // ... (attributes)
  },
  {
    freezeTableName: true,
  },
);
```

The example above will create a model named User pointing to a table also named User.

This behavior can also be defined globally for the sequelize instance, when it is created:

```
const sequelize = new Sequelize('sqlite::memory:', {
  define: {
    freezeTableName: true,
  },
});
```

This way, all tables will use the same name as the model name.

### Providing the table name directly

You can simply tell Sequelize the name of the table directly as well:

```
sequelize.define(
  'User',
  {
    // ... (attributes)
  },
  {
    tableName: 'Employees',
  },
);
```

## Model Syncronzation

- `User.sync()` - This creates the table if it doesn't exist (and does nothing if it already exists)
- `User.sync({ force: true })` - This creates the table, dropping it first if it already existed
- `User.sync({ alter: true })` - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

Example :

```
await User.sync({ force: true });
console.log('The table for the User model was just (re)created!');
```

## Syncronize all medel at once

You can use `sequelize.sync()` to automatically synchronize all models. Example:

```
await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
```

## Dropping tables

To drop the table related to a model:

```
await User.drop();
console.log('User table dropped!');
```

To drop all tables:

```
await sequelize.drop();
console.log('All tables dropped!');
```

---
