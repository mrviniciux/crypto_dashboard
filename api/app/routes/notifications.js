import express from 'express';


import { findAll, findOne } 
      from'../controllers/notifications.js';

import { create, update, deleteOne } 
      from'../controllers/base.js';

const router = express.Router();
const model = require("../models").Notification;
const one = "notification";
const other = "notifications";

const required = ['title', 'description', 'id_notification_type'];
const blocked = [];
const objFields = { required, blocked }; 

router.post("/",      (req, res) => create(req, res, model, one, objFields));
router.get("/",       (req, res) => findAll(req, res, model, other));
router.get("/:id",    (req, res) => findOne(req, res, model, one));
router.put("/:id",    (req, res) => update(req, res, model, one));
router.delete("/:id", (req, res) => deleteOne(req, res, model, one));

export default router;