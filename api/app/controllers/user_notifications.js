import { Notification, UserNotification, UserNotificationNoVirtual } from '../models';
import { doNotificationConsistency } from './notifications';
import { sqlByUsername } from './user';
import { httpRejection, httpSuccess, isRequestValid } from './base';
import moment from 'moment';
import notification from '../models/database1/notification';
const db = require('../models');

/*
* return id_notification_type, id_payment, id_expense, title
*        path,  description
*/

const doUserNotificationConsistency = async user => {
  const notifications = await Notification.findAll({where: {active: true}, raw: true});
  const userNotifications = await UserNotification.findAll({where: {id_user: user.id, active: true}, raw: true});
  
  const idUserNotifications = userNotifications.map(not => not.id_notification);
  const idNotifications = notifications.map(not => not.id);

  const arrMissingIdsNotification = idNotifications.filter(id => !idUserNotifications.includes(id));

  if(arrMissingIdsNotification.length > 0){
    await UserNotification.bulkCreate(
      arrMissingIdsNotification.map(id => {
        return {
          id_notification: id,
          id_user: user.id,
          is_read: false,
          dt_read: null
        }
      })
    )
  }

}

export const findAll = async (req, res, model, returnName) => {
  const user = await sqlByUsername(req.headers.username);
  var condition =  { id_user:  user[0].id, active: true };
  const transaction = await db['database1'].transaction();
  try {
    if(!model || !model.findAll){
      return httpRejection(res, "Model is not defined or don't have method findAll", 400);
    }

    if(!isRequestValid({name: user}, {}, res, returnName)){
      return;
    }

    await doNotificationConsistency();
    await doUserNotificationConsistency(user[0] || {});


    const user_notification = await model.findAll({include: [{
                                                      model: Notification, 
                                                      as: 'notification',
                                                  }], where: condition, order: [
                                                              ['createdAt', 'DESC'],
                                                          ]});

    
    transaction.commit();
    return httpSuccess(res, returnName, user_notification);
  } catch(err){
    transaction.rollback();
    return httpRejection(res, err.message, 500);
  }
};


export const read = async (req, res, model, returnName) => {
  const id = req.params.id;

  if(!model || !model.update){
    return httpRejection(res, "Model is not defined or don't have method update", 400);
  }

  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const upd = await UserNotificationNoVirtual.update({dt_read: new Date(), is_read: true}, { where: { id: id } });
    const user_notification = await UserNotification.findOne({ include: [{
                                                      model: Notification, 
                                                      as: 'notification',
                                                  }],  where: {id: id} });
    httpSuccess(res, returnName, user_notification);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};


export const inactivate = async (req, res, model, returnName) => {
  const id = req.params.id;

  if(!model || !model.update){
    return httpRejection(res, "Model is not defined or don't have method update", 400);
  }

  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const upd = await model.update({active: false}, { where: { id: id } });
    const user_notification = await model.findOne({ include: [{
                                                        model: Notification, 
                                                        as: 'notification',
                                                    }],  where: {id: id} });

    httpSuccess(res, returnName, upd);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};