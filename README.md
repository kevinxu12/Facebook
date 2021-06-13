# Facebook Replica
## This is a full-functioning facebook replica.
The following features have been implemented
- login page
- smart search page
- sign up page
- news feed page
- chatting between two users
- chatting between multiple users
- sending and receiving friend requests
- visualizing friend requests, offering friend recommendations
- updating a users profile
- adding posts and comments
- receiving notifications.
## Tech Stack
The project uses a Dynamo DB, heroku, node.js, socket.js, and react stack. I did not use React hooks

## Live Demos
### Chat
See chatting here [here!](https://www.loom.com/share/37271551c28147629ac3db3757e23f17?sharedAppSource=personal_library)
### Feed
See news feed here [here!](https://www.loom.com/share/2009ee22d4694e58a79449d7e24fb755?sharedAppSource=personal_library)
## How to run
### Local Testing
- Go to your AWS console and "Security Credentials." Find your "accessKey" and "accessKeySecret" and fill in the credentials.json file with these values.
- Run `npm install` in both the root and `/client` directories. 
- Run `npm start` and go to localhost:8080 and play around!
### Production
- This is currently not supported, as we've taken down the heroku service.
