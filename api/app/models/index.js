'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../db/config/config.js')[env];
const db = {};

let sequelize;
//Extract the database information into an array
const databases = Object.keys(config.databases);

//Loop over the array and create a new Sequelize instance for every database from config.js
for(let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = config.databases[database];
    //Store the database connection in our db object
    db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, {host: dbPath.host, dialect: dbPath.dialect} );
}

//Add models from database1 folder
fs
    .readdirSync(__dirname + '/database1')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = db['database1'].import(path.join(__dirname + '/database1', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
