const Chatroom = require('./Chatroom.js');

module.exports = () => {
    const chatrooms = new Map();

    removeClient = (client) => {
        chatrooms.forEach(c => c.removeUser(client));
    }

    chatroomExists = (chatroomName) => {
        return chatrooms.has(chatroomName);
    }

    getChatroomByName = (chatroomName) => {
        if (!chatrooms.has(chatroomName)) {
            chatrooms.set(chatroomName, Chatroom(chatroomName));
        }
        return chatrooms.get(chatroomName)
    }

    getAvailableChatrooms = () => {
        return chatrooms.keys;
    }

    serializeChatrooms = () => {
        return Array.from(chatrooms.values()).map(c => c.serialize())
    }

    return {
        removeClient,
        chatroomExists,
        getChatroomByName,
        serializeChatrooms,
        getAvailableChatrooms
    }
}