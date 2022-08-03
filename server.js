const express = require("express");
const session = require('express-session');
const sequelize = require('./config/connection');
const routes = require('./controllers/index.js')
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }
  
  app.use(session(sess));
  
  const hbs = exphbs.create({})
  
  app.engine("handlebars",hbs.engine);
  app.set('view engine', 'handlebars');
  
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(express.static(path.join(__dirname,  'public'))); 
  
  app.use(routes)
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });