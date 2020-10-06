import Joi from 'joi';


const registerSchemaValidator = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required(),

    repeatPassword: Joi.ref('password'),


    mail: Joi.string()
        .required(),

    name: Joi.string()
        .required(),

    surname: Joi.string()
        .required(),

  });

  await schema.validateAsync(req.body);

  next();
};

export {
  registerSchemaValidator,
};
