const {string, number} = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Chat', {
        hashKey : 'chatroomID',
        rangeKey: 'timestamp',
        schema : {
            chatroomID: string(),
            timestamp: number(),
            content: dynamo.types.stringSet(),
        },
        tableName: 'facebookChats'
    })
}