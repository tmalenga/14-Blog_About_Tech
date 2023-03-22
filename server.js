const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.listen(PORT, () => console.log('Now listening'));

