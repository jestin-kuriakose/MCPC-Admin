import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Tithe from "./Tithe.js";

const Member = sequelize.define("members",{
    firstName: {
        type: DataTypes.STRING
    },
    middleName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    address1: {
        type: DataTypes.STRING
    },
    address2: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    province: {
        type: DataTypes.STRING
    },
    postalCode: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    email1: {
        type: DataTypes.STRING
    },
    email2: {
        type: DataTypes.STRING
    },
    phone1: {
        type: DataTypes.STRING
    },
    phone2: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN
    },
    sex: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.DATEONLY
    },
    doj: {
        type: DataTypes.DATEONLY
    },
    spouse: {
        type: DataTypes.INTEGER
    },
    children1: {
        type: DataTypes.INTEGER
    },
    children2: {
        type: DataTypes.INTEGER
    },
    children3: {
        type: DataTypes.INTEGER  
    },
    children4: {
        type: DataTypes.INTEGER
    },
})

Member.hasMany(Tithe);
Tithe.belongsTo(Member);

export default Member