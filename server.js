const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db.js');

const app = express();

const port = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, (err, client) => {
    if(err) return console.log(err);
    const db = client.db('notable');
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('test ' +port);
    })
})