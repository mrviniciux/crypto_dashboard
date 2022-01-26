import express from 'express';
const multer = require('multer');
const multerConfig = require('../config/multer');

import { upload, updateUpload, findAll } 
      from'../controllers/attachments.js';

import { findOne, deleteOne } 
      from'../controllers/base.js';
      
const model = require("../models").Attachment;
const router = express.Router();
const one = "attachment";
const other = "attachments";

router.post("/",      multer(multerConfig).single('file'), (req, res) => upload(req, res));
router.get("/",       (req, res) => findAll(req, res, model, other));
router.get("/:id",    (req, res) => findOne(req, res, model, one));
router.put("/:id",    multer(multerConfig).single('file'), (req, res) => updateUpload(req, res));
router.delete("/:id", (req, res) => deleteOne(req, res, model, one, "Anexo"));

export default router;