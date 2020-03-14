const chatsDb = require('../db/chatsdb')

module.exports = (name) => {

    const members = new Map();
    let currTimeStamp = new Date().getTime();
    let currChatHistory = [];
    let allChatHistory = [];
    let initialized = false;

    initialize = async () => {
        try {
            console.log('we are here');
            for (const folk of name.split(',').map((c) => c.trim())) {
                console.log(folk);
                await chatsDb.addChatroom(folk, name, new Date().getTime());
            }
            const data = await chatsDb.getChats(name, new Date().getTime());
            if (data.length > 0) {
                console.log(data);
                currChatHistory = data[0].map((c) => JSON.parse(c));
                allChatHistory = data.flat().map((c) => JSON.parse(c));
                currTimeStamp = parseInt(currChatHistory[0].timestamp);
            }
            initialized = true;
        } catch (e) {
            console.log(e)
        }
    }

    broadcastMessage = async (message, sender) => {
        for (const folk of name.split(',').map((c) => c.trim())) {
            await chatsDb.updateChatroom(folk, name);
            if (folk !== sender) {
                await chatsDb.makeChatroomNew(folk, name);
            }
        }
        members.forEach(m => {
            console.log('message sent from server')
            m.emit('message', message)
        });
    }

    addEntry = async (entry) => {
        console.log('addentry called');
        if (currChatHistory.length >= 10) {
            const content = currChatHistory.map((c) => JSON.stringify(c));
            try {
                await chatsDb.addChat(name, currTimeStamp, content);
                currChatHistory = [];
            } catch (e) {
                console.log(e);
            }
        }
        currChatHistory = currChatHistory.concat(entry);
        allChatHistory = allChatHistory.concat(entry);
    }

    getChatHistory = async () => {
        if (!initialized) await initialize();
        return allChatHistory.slice();
    }

    addClient = (client) => {
        members.set(client.id, client);
    }

    removeClient = (client) => {
        members.delete(client.id);
    }

    serialize = () => {
        return {
            name, 
            image,
            numMembers: members.size
        }
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addClient,
        removeClient,
        serialize
    }
}