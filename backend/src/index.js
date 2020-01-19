const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('../src/routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://arthurdevfull:nSCZvBuRRntOKV6t@cluster0-6khyq.mongodb.net/wadev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

app.use(cors());
// Essa linha faz com que o express entenda o formato JSON
app.use(express.json());
app.use(routes);


server.listen(3333);