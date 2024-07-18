import { Sequelize } from "sequelize";
require("dotenv").config();
export default new Sequelize(process.env.DB_URL!);
