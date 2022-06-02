const express = require('express') // import express framework
const app = express()
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB is offers a variety of hooks, model validation
const bodyParser = require('body-parser')
const conf = require('./config') // import conf js to access datas inside of config.js
const apiroute = require('./routes/movie')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const Table = require("./module/table")
const table = new Table()
app.use(bodyParser.urlencoded({ extended: false }))
require("dotenv").config()
Port = process.env.PORT || 5000
const mongodb_url = process.env.MONGODB_URL
console.log(mongodb_url)
app.use(bodyParser.json())
app.use(cookieParser())
var USERS ={"ADMIN":"ADMIN123"}
mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true},function (err, success) { //connect mongodb using mongoose(ODM) ,it connect the db if connection true or false send response
    if (err) {
        console.error(err)
    } else {
        console.log('DB Connected successfully!')
    }
})

// app.use('/', apiroute) // is use to execute any specific query at intilization process

app.post('/login', (req, res) => {
    const username = req.body.username; // getting username from the client parsed data
    const password = USERS[username]
    const token = jwt.sign({ username: req.body.username, password:req.body.password}, "MV1425");
    if (password === req.body.password){
      res.cookie('SESSION_ID', token); // storing username after passwords validity
      res.send({status:true,message:"Log in successfully!"}); // response after
    }
    else{
      res.send('Failed to log in!');  // if password checks fail
    }
  
})

app.post('/logout', (req, res) => {
    // clearing the stored cookies sessionId
    res.clearCookie('SESSION_ID');
    res.send({status:true,message:"Logout successfully"})
})

app.post('/movie/list', (req, res) => {
    Table.find({}, function (err, users) {
        if (err) return res.status(404).json({ "status": false, 'result': err })
        else res.json({ status: true, result: users })
    });
})

app.listen(Port, function (err) {  //Listen connect host or port , This method is identical to Node’s http.Server.listen()
    if (err) return res.json({ status: false, result: "error in list port" })  // if connect failed it return this respose
    else console.log('http://localhost:' + Port)
})
