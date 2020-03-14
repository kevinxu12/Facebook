const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Friend Requests', {
      hashKey  : 'username',
      rangeKey :  'sender',
      schema : {
        username  : Joi.string(),
        sender: Joi.string()
      },
      tableName: "facebookFriendRequests"
    });
}