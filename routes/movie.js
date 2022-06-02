const express = require('express')
const router = express.Router()  // it is a framwork help to create the router handler extend this routing to handle validation, handle 404 or other errors etc
const movie = router
const Movie = require('../module/movie')
const jwt = require('jsonwebtoken');
const movies = new Movie()


var Sessioncheck =async function (req, res, next) {
    var sessionObj = req.cookies['SESSION_ID']  //get data from sessionobj it present or not
        if (sessionObj && req.cookies['SESSION_ID']) {
            jwt.verify(sessionObj, "MV1425", function (err, decoded){ //verify the session token its true than execute once session expeired it execute
                if (err){
                    res.status(401).json({
                        status: false,
                        message: 'Token expired'
                    })
                } else {
                    next(); //it is also same as return function 
    
                }
            });
           
        } else {
            res.status(401).json({
                status: false,
                message: 'Unauthorized Access'
            })
        }
};


movie.post('/movie/:action',Sessioncheck,function(req,res){ //sessioncheck goto the function check the session true execute the function
    movies.perforam(req,res)
})

module.exports = movie // export modue to access other files inside