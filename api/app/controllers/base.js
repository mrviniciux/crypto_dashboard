

export const httpRejection = (res, message, code) => {
  const isAuth = code !== 401;
  return res.status(code).send({
    error: {message: message || "Request error please contact tecnical support."}, auth: isAuth     
  });
}

export const httpSuccess = (res, returnName, obj, message) => {
  if(message){
    const data = returnName && obj ? {[returnName]: obj} : {data: null};
    return res.status(200).send({success: { message: message }, ...data});
  }

  if(obj instanceof Array){
    return res.status(200).send({count: obj.length, [returnName]: obj});
  } else {
    return res.status(200).send({[returnName]: obj});
  }

  
  
}

export const isRequestValid = (objBody, objFields, res, returnName) => {
  
  if(!returnName){
    res.status(400).send({
      error: {message: "Return name is not defined!"},
      success: false
    });
    return;
  }
  // Validate request
  if (!objBody || !Object.entries(objBody)) {
    res.status(400).send({[returnName]:{
      error: {message: "Content can not be empty!"},
      success: false
    }});
    return;
  }

  if(objFields.required && objFields.required.length > 0){
    const isBodyFieldsMissing = objFields.required.filter(field => !objBody[field]).length > 0;
    if(isBodyFieldsMissing){
      res.status(400).send({[returnName]: {
        error: {message: `Fields required missing. Check again the fields: ${objFields.required.join(',')}`},
        success: false
      }}); 
      return;
    }
  }

  if(objFields.blocked && objFields.blocked.length > 0){
    const isFieldsNotAllowedFilled = objFields.blocked.filter(field => objBody[field] !== null && 
                                                                       objBody[field] !== '' &&
                                                                       objBody[field] !== undefined).length > 0;

    if(isFieldsNotAllowedFilled){
      res.status(400).send({
        error: {message: `You don't have permission to inform some fields: ${objFields.blocked.join(',')}`},
        success: false
      }); 
      return;
    }
  }

  return true;
}

export const create = async (req, res, model, returnName, entity) => {

  if(!model || !model.create){
    return httpRejection(res, "Model is not defined or don't have method create", 400);
  }

  const objBody = returnName ? req.body[returnName] : req.body;

  if(!isRequestValid(objBody, {}, res, returnName)){
    return;
  }

  objBody['createdAt'] = new Date();
  objBody['updatedAt'] = new Date();

  try {
    const create = await model.create(objBody);
    return httpSuccess(res, returnName, create, `${entity} criado com sucesso`);
  } catch(err){
    return httpRejection(res, err.message, 500);
  }
};


export const findAll = async (req, res, model, returnName) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  if(!model || !model.findAll){
    return httpRejection(res, "Model is not defined or don't have method findAll", 400);
  }

  if(!isRequestValid({name: name}, {}, res, returnName)){
    return;
  }

  try {
    const findAll = await model.findAll({ where: condition });
    return httpSuccess(res, returnName, findAll);
  } catch(err){
    return httpRejection(res, err.message, 500);
  }
};

export const findOne = async (req, res, model, returnName) => {
 
  if(!model || !model.findOne){
    return httpRejection(res, "Model is not defined or don't have method findOne", 400);
  }

  const id = req.params.id;

  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const find = await model.findByPk(id);
    httpSuccess(res, returnName, find);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};

export const update = async (req, res, model, returnName) => {
  const id = req.params.id;
  const objBody = returnName ? req.body[returnName] : req.body;

  if(!model || !model.update){
    return httpRejection(res, "Model is not defined or don't have method update", 400);
  }

  if(!isRequestValid(objBody, {}, res, returnName)){
    return;
  }

  try{
    const upd = await model.update(objBody, { where: { id: id } })
    httpSuccess(res, returnName, upd);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};


export const deleteOne = async (req, res, model, returnName, entity) => {
  const id = req.params.id;
  
  if(!model || !model.destroy){
    return httpRejection(res, "Model is not defined or don't have method destroy", 400);
  }

  
  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const destroy = await model.destroy({ where: { id: id } });
    httpSuccess(res, returnName, destroy, `${entity} excluido com sucesso`);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};

export const deleteAll = async (req, res, model, returnName, entity) => {
   
  if(!model || !model.deleteAll){
    return httpRejection(res, "Model is not defined or don't have method deleteAll", 400);
  }

  if(!isRequestValid({id: id}, {}, res, returnName)){
    return;
  }

  try{
    const destroyAll = await   model.destroy({ where: {}, truncate: false })
    httpSuccess(res, returnName, destroyAll,  `${entity} excluidos com sucesso`);
  } catch(err) {
    return httpRejection(res, err.message, 500);
  }
};