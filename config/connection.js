require('dotenv').config();
const Sequelize = require('sequelize');

let sequilize;

if(process.env.JAWSDB_URL){
    sequilize = new Sequelize(process.env.JAWSDB_URL);
}else{
    sequilize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequilize;