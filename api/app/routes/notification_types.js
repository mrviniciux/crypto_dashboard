import express from 'express';

import { create, findAll, findOne, update, deleteOne } 
      from'../controllers/base.js';

const router = express.Router();
const model = require("../models").NotificationType;
const one = "notification_type";
const other = "notification_types";

const required = ['name'];
const blocked = [];
const objFields = { required, blocked }; 

router.post("/",      (req, res) => create(req, res, model, one, objFields));
router.get("/",       (req, res) => findAll(req, res, model, other));
router.get("/:id",    (req, res) => findOne(req, res, model, one));
router.put("/:id",    (req, res) => update(req, res, model, one));
router.delete("/:id", (req, res) => deleteOne(req, res, model));

export default router;