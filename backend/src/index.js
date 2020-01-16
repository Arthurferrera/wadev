const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');

const app = express();

mongoose.connect('mongodb+srv://arthurdevfull:nSCZvBuRRntOKV6t@cluster0-6khyq.mongodb.net/wadev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

// Essa linha faz com que o express entenda o formato JSON
app.use(express.json());
app.use(routes);


app.listen(3333);