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
email: {
    type: DataTypes.STRING
},
password: {
    type: DataTypes.STRING
},
clearanceLevel: {
    type: DataTypes.INTEGER
}
});

export default User;