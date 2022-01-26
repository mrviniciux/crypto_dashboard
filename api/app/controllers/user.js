import { httpSuccess } from './base';

const db = require('../models');
const dbName = 'database2';

export const sqlOne = (id, arrAttributes) => {
  const attrs = arrAttributes && arrAttributes.length > 0 ? arrAttributes.join(',') : '*';
 return db[dbName].query(`SELECT ${attrs} FROM users where id = ?`, 
                          { replacements: [id],
                            type: db[dbName].QueryTypes.SELECT } );
}

export const sqlAll = () => {
  return db[dbName].query('SELECT id, username, email FROM users', {type: db[dbName].QueryTypes.SELECT});
}

export const sqlByUsername = username => {
  return db[dbName].query('SELECT id, username, email FROM users where username = ?', {replacements: [username], type: db[dbName].QueryTypes.SELECT});
}

export const findAll = async (req, res) => {
  const data = await sqlAll();
  return httpSuccess(res, 'users', data);
}

export const findOne = async (req, res) => {
  const id = req.params.id;
  const data = await sqlOne(id);

  return httpSuccess(res, 'user', data[0] || {});
}