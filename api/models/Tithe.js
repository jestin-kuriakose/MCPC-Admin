import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";

const Tithe = sequelize.define('tithes', {
    member: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATEONLY    
    },
    amount: {
        type: Sequelize.FLOAT
    }
})

export default Tithe