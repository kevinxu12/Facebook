var dynamo = require('dynamodb');
const Chat = require('../models/Chat')(dynamo);
const Chatroom = require('../models/Chatroom')(dynamo)

// gets existing chats
const getChats = async (chatroomID, timestamp) => {
    return await new Promise((resolve, reject) => {
        Chat.query(chatroomID).where('timestamp').lt(timestamp).descending().limit(2).exec((err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const chat = response.Items.map((c) => c.attrs.content);
                resolve(chat);
            }
        })
    })
}


//adds a chat
const addChat = async (chatroomID, timestamp, content) => {
    const chat = new Chat({ chatroomID, timestamp, content });
    try {
        await chat.save();
        console.log('Added chat msg "' + content + '" to ' + chatroomID);
    } catch (e) {
        throw e;
    }
}

//gets chatroom
const getChatrooms = async (username) => {
    return await new Promise((resolve, reject) => {
        Chatroom.query(username).exec((err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('WE MADE IT HERE');
                let chatRooms = response.Items.filter((c) => c.attrs.active === 'true');
                chatRooms = chatRooms.sort((a,b) => (a.attrs.timestamp > b.attrs.timestamp) ? -1 : 1).map((c) => {
                    return {chatroomID: c.attrs.chatroomID, new: c.attrs.new}
                });
                resolve(chatRooms);
            }
        })
    })
}

//adds a chatroom
const addChatroom = async (username, chatroomID) => {
    try {
        const acc = new Chatroom ({username, chatroomID, timestamp:new Date().getTime(), active : 'true', new: 'false'});
        await acc.save();
    } catch (e) {
        throw e;
    }
}

//updates existing chat room
const updateChatroom = async (username, chatroomID) => {
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, timestamp:new Date().getTime()}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                resolve(acc);
            }
        })
    })
}

// views a chatroom
const viewChatroom = async(username, chatroomID) => {
    console.log('view Chat called!!!')
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, new:'false'}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                console.log(acc);
                resolve(acc);
            }
        })
    })
}

// makes a new chatroom
const makeChatroomNew = async (username, chatroomID) => {
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, new:'true'}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                resolve(acc);
            }
        })
    })
}

// deletes a chatroom
const deleteChatroom = async (username, chatroomID) => {
    return await new Promise((resolve, reject) => {
        Chatroom.update({username, chatroomID, active:'false'}, (err, acc) => {
            if (err) {
                reject(err);
            } else {
                resolve(acc);
            }
        })
    })
}

module.exports = {
    getChats,
    addChat,
    getChatrooms,
    addChatroom,
    updateChatroom,
    viewChatroom,
    makeChatroomNew,
    deleteChatroom
}