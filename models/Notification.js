const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Notifications', {
      hashKey  : 'username',
      rangeKey : 'date',
      schema : {
        username  : Joi.string(),
        date: Joi.string(),
        notification: Joi.string()
      },
      tableName: "facebookNotifications"
    });
}
