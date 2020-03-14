const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Users', {
      hashKey  : 'username',
      schema : {
        username  : Joi.string(),
        email : Joi.string(),
        password  : Joi.string(),
        active: Joi.string(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        affiliation: Joi.string(),
        interests: Joi.array().items(Joi.string()),
        birthday: Joi.string(),
        status: Joi.string()
      },
      tableName: "facebookUsers"
    });
}
