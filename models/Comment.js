const Joi = require('joi');

module.exports = dynamo => {
	return dynamo.define('Facebook Comments', {
		hashKey : 'postID',
		rangeKey : 'postDate',
		schema : {
			postID: Joi.string(),
			postDate: Joi.string(),
			creator: Joi.string(),
			date: Joi.string(),
			content: Joi.string()
		},
		tableName: "facebookComments"
	});
}