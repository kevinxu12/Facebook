const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Posts', {
      hashKey  : 'creator',
      rangeKey : 'postID',
      schema : {
        creator  : Joi.string(),
        postID: dynamo.types.uuid(),
        date : Joi.string(),
        recipient : Joi.string(),
        content : Joi.string()
      },
      tableName: "facebookPosts"
    });
}