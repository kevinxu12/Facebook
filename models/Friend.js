const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Friends', {
      hashKey  : 'username',
      rangeKey :  'friendUsername',
      schema : {
        username  : Joi.string(),
        friendUsername : Joi.string()
      },
      tableName: "facebookFriends"
    });
}

