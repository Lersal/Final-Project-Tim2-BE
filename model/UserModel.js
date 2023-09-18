import { Sequelize } from "sequelize";
import db from "../config/Databases.js";


const { DataTypes } = Sequelize;

const Users = db.define('Users',{
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    phone_number: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.ENUM('M','F')
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
});

export default Users;