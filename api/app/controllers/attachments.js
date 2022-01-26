import { httpSuccess, httpRejection, isRequestValid } from './base';
import { Attachment } from '../models';
const returnName = 'attachment';

export const upload = async (req, res) => {
  const objBody = req.body;

  if(!req.file){
    httpRejection(res, 'File is mandatory', 400);
  }

  if(!isRequestValid(objBody, {blocked:[],required:[]}, res, returnName)){
    return;
  }

  objBody['createdAt'] = new Date();
  objBody['updatedAt'] = new Date();
  objBody['name'] = req.file.originalname;
  objBody['type'] = req.file.mimetype;
  objBody['path'] = 'static/'+req.file.filename;
  objBody['size'] = req.file.size;
  objBody['description'] = objBody['description'];

  const createAtt = await Attachment.create(objBody);

  return httpSuccess(res, 'attachment', createAtt, 'Anexo enviado com sucesso.');
};


export const updateUpload = async (req, res) => {
  const id = req.params.id;
  const objBody = req.body;

  if(!id) httpRejection(res, 'ID is not defined', 500);

  if(!isRequestValid(objBody, {blocked:[],required:[]}, res, returnName)){
    return;
  }

  if(req.file && req.file.originalname){
    objBody['name'] = req.file.originalname;
    objBody['type'] = req.file.mimetype;
    objBody['path'] = 'static/'+req.file.filename;
    objBody['size'] = req.file.size;
  }

  objBody['updatedAt'] = new Date();

  const createAtt = await Attachment.update(objBody, { where: {id: id} });

  return httpSuccess(res, 'attachment', createAtt, 'Anexo atualizado com sucesso.');
};


export const findAll = async (req, res, model, returnName) => {
  const attachmentable_id = req.query.attachmentable_id;
  var condition = attachmentable_id ? { attachmentable_id: attachmentable_id } : null;

  if(!model || !model.findAll){
    return httpRejection(res, "Model is not defined or don't have method findAll", 400);
  }

  if(!isRequestValid({attachmentable_id: attachmentable_id}, {}, res, returnName)){
    return;
  }

  try {
    const findAll = await model.findAll({ where: condition });
    return httpSuccess(res, returnName, findAll);
  } catch(err){
    return httpRejection(res, err.message, 500);
  }
};