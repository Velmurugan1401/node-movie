const mongoose = require('mongoose');  //import mongoose Mongoose is an Object Data Modeling (ODM) library for MongoDB

const movieschema = new mongoose.Schema({    //schema object
    name: {  
      type: String, //datatype
      required: true,
      max: 255,
    },
    rating: {
      type: Number,
      required: true,
      max: 255,
    },
    cast: {
      type: String,
      required: false,
      max: 1024,
    },
    genre: {
        type: String,
        required: true,
        max: 1024, 
    },
    realeshdate: {
        type: Date,
        default: Date.now,
      },
  });
  
  module.exports = mongoose.model("Movie", movieschema);  