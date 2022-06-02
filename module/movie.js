
const Tables = require('./table');
const conf = require('../config');
const mongoose = require('mongoose');

//this is the object modal 
var movie = function () {
    this.table = Tables;
}

movie.prototype.perforam = function (req, res) {  //prototype is an object that is associated with every functions and objects by default ,Prototype is the mechanism by which Js objects inherit features from one another
    var expression = req.params.action // is getting params values in url
    switch (expression) {
        case 'add':
            this.Insert(req, res)
            break;
        case 'update':
            this.update(req, res)
            break;
        case 'list':
            this.listall(req, res)
            break;
        case 'delete':
            this.delete(req, res)
            break;
        default:
            res.json({ status: false, result: "error" })
    }

}



movie.prototype.Insert = async function (req, res) {

    var reqObj = req.body
    if (reqObj && reqObj.name && reqObj.rating && reqObj.genre) {
        try {
            const movies = new this.table(reqObj);
            const addmovie = await movies.save().then(data => {  //store data from db 
                res.json({ status: true, result: data });
            })

        } catch (error) {
            res.status(400).json({ error });
        }

        // }


    } else {
        res.json({ status: false, result: 'please file required filed!' })
    }
}


movie.prototype.update = async function (req, res) {
    var updateobj = req.body
    var _id = updateobj._id
    delete updateobj._id
    if (req.body_id) {
        try {
            this.table.findOneAndUpdate({ _id: _id }, { $set: updateobj }, { new: true }, function (err, rawResponse) {

                if (err) return res.status(404).json({ "status": false, 'result': err })
                else res.json({ status: true, result: rawResponse })
            })

        } catch (error) {
            res.status(400).json({ "status": false, 'error': error });
        }

    } else {
        res.json({ ststus: false, result: "Somethings is wrong please check the filed" })
    }

}


movie.prototype.delete = function (req, res) {
    if (req.body._id) {
        this.table.deleteOne(req.body._id, function (err, result) {
            if (err) return res.json({ status: false, result: result })
            else res.json({ status: true, result: "Movie deleted successfully!" })
        })
    } else {
        res.json({ status: false, error: "Somethings is wrong" })
    }

}


movie.prototype.listall = function (req, res) {
    this.table.find({}, function (err, users) {
        if (err) return res.status(404).json({ "status": false, 'result': err })
        else res.json({ status: true, result: users })
    });
}

module.exports = movie