import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

// Define a model for the database table
const User = sequelize.define('user', {
firstName: {
    type: DataTypes.STRING,
},
lastName: {
    type: DataTypes.STRING,
},
username: {
    type: DataTypes.STRING
},
email: {
    type: DataTypes.STRING
},
password: {
    type: DataTypes.STRING
},
roles: {
    type: DataTypes.NUMBER
},
refreshToken: {
    type: DataTypes.STRING
},
});

export default User;