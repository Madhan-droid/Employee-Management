# Employee-Management

This project uses Node.js, Express.js, React.js and AWS DynamoDB database

This code consists of client and routes folder.
Server.js file present outside these two folders.

1.To install dependancies run:
 > npm install

Configure createtable.js file in routes folder and start your local instance of dynamoDB.

2.Command to start dynamoDB local instance:
 > java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar -sharedD

Run server.js in separate terminal.

3.Command to run server.js file:
 > node server.js

Go to client folder and run the react files.

4.Command to run react files:
 > npm start

DynamoDB local instance runs on *http://localhost:8000*

Server.js file runs on *http://localhost:3000*

React files runs on *http://localhost:5000*

