import { Sequelize } from "sequelize";

const db = new Sequelize ('auth_db','admin1','123456',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
