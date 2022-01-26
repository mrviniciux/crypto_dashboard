import { ExpiredToken } from '../models';
import { httpRejection } from './base';
const jwt = require('jsonwebtoken');

const db = require('../models');
const dbName = 'database2';


export const isExpiredToken = (receivedToken, list) => {
  return list.filter(item => item.token === receivedToken).length > 0;
}

export const verifyJWT = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const expiredTokens = await ExpiredToken.findAll();

  if (!token) {
     return httpRejection(res, 'No token provided', 401); 
  }
  
  if(isExpiredToken(token, expiredTokens)){
    return httpRejection(res, 'Token is not valid anymore... Redirecting to login', 401); 
  }

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

export const signIn = async (req, res) => {
  const arrUserSelect = await db[dbName].query('SELECT * FROM users where username = ? and password = ?', 
               { replacements: [req.body.username, req.body.pwd],
                type: db[dbName].QueryTypes.SELECT } );
   
  if(arrUserSelect.length > 0) {
    const id = arrUserSelect[0].id;
    const token = jwt.sign({ id }, process.env.SECRET, {});
    res.status(200).json({ data: {auth: true, token: token, username: arrUserSelect[0].username, is_read_only: arrUserSelect[0].is_read_only} });
  } else {
    return httpRejection(res, 'Login inválido', 401);
  }
};

export const signOut = async (req, res) => {
  const token = req.get('x-access-token');
  const username = req.get('username');
  
  try{
    if(token){
      const insertToken = await ExpiredToken.create({
        token: token,
        username: username
      });

      return res.status(200).send({ auth: false, token: null, bannedToken: insertToken.token });
    }
  } catch(err){
    return httpRejection(res, 'Fail in logout', 500);
  }

}