module.exports = () => {
    const clients = new Map();

    addClient = (client) => {
        clients.set(client.id, {client} );
    }

    removeClient = (client) => {
        clients.delete(client.id);
    }

    return {
        addClient,
        removeClient
    }
}