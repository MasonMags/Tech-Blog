const express = require("express");
const session = require('express-session');
const sequelize = require('./config/connection');
const routes = require('./controllers/index.js')
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;