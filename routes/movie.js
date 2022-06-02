const express = require('express')
const router = express.Router()  // it is a framwork help to create the router handler extend this routing to handle validation, handle 404 or other errors etc
const movie = router
const Movie = require('../module/movie')
const conf = require('../config')  //import config modal to access the datas of config modal

const movies = new Movie()

//perform all the crud option
movie.post('/movie/:action',function(req,res){ //sessioncheck goto the function check the session true execute the function
    movies.perforam(req,res)
})

module.exports = movie // export modue to access other files inside