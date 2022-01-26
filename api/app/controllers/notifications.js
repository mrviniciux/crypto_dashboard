import { NotificationType, Payment, Notification, expenses } from '../models';
import { httpRejection, httpSuccess, isRequestValid } from './base';
//const db = require('../models');

export const findAll = async (req, res, model, returnName) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const fetchNotificationList = async () => await model.findAll({include: [{
                                                      model: NotificationType, 
                                                      as: 'notification_type',
                                                  }, {
                                                    model: Payment, 
                                                    as: 'payment',
                                                  }], where: condition });
  
  try {
    if(!model || !model.findAll){
      return httpRejection(res, "Model is not defined or don't have method findAll", 400);
    }

    if(!isRequestValid({name: name}, {}, res, returnName)){
      return;
    }

    return httpSuccess(res, returnName, fetchNotificationList());
  } catch(err){
    return httpRejection(res, err.message, 500);
  }
};

export const findOne = async (req, res, model, returnName) => {
  const id = req.params.id;

  if(!model || !model.findOne){
    return httpRejection(res, "Model is not defined or don't have method findOne", 400);
  }

  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const find = await model.findByPk(id);
    return httpSuccess(res, returnName, find);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};
