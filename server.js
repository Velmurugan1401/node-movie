const express = require('express') // import express framework
const app = express()
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB is offers a variety of hooks, model validation
const bodyParser = require('body-parser')
const conf = require('./config') // import conf js to access datas inside of config.js
const apiroute = require('./routes/movie')
Port = process.env.PORT || 5000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


mongoose.connect(conf.DB, function (err, success) { //connect mongodb using mongoose(ODM) ,it connect the db if connection true or false send response
    if (err) {
        console.error(err)
    } else {
        console.log('DB Connected successfully!')
    }
})

app.use('/', apiroute) // is use to execute any specific query at intilization process


app.listen(Port, function (err) {  //Listen connect host or port , This method is identical to Node’s http.Server.listen()
    if (err) return res.json({ status: false, result: "error in list port" })  // if connect failed it return this respose
    else console.log('http://localhost:' + conf.PORTNUMBER)
})
