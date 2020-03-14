const {string, number} = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Chatroom', {
        hashKey : 'username',
        rangeKey: 'chatroomID',
        schema : {
            username: string(),
            chatroomID: string(),
            timestamp: number(),
            active: string(),
            new: string(),
        },
        tableName: 'facebookChatRooms'
    })
}