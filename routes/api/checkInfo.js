var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var checkInfo = require('../../models/checkInfo.js');

/* GET ALL Report */

router.post("/saveInfo", (req, res) => {
    const newInfo = new checkInfo(req.body);
    newInfo
        .save()
        .then(info => res.json(info))
        .catch(err => console.log(err));
});

router.post("/getbyid", (req, res) => {
    checkInfo.find({"_id" : req.body.id}).then(info => {
        res.json(info);
    })
    .catch(err => {
        res.json(err);
    })
});

router.post("/updateinfo", (req, res) => {
    // checkInfo.findOneAndUpdate({_id: req.body._id})
    checkInfo.findById(req.body._id).then(info => {
        info.firstname = req.body.firstname;
        info.lastname = req.body.lastname;
        info.email = req.body.email;
        info.address = req.body.address;
        info.city = req.body.city;
        info.state = req.body.state;
        info.country = req.body.country;
        info.zipecode = req.body.zipecode;
        info
            .save()
            .then(savedInfo => { res.json(savedInfo)})
            .catch(err => console.log(err));
    })
    .catch(err => {
        res.json(err);
    })
});

router.get("/getall", (req, res) => {
    checkInfo.find({}).then(users => {
        res.json(users);
    })
});

module.exports = router;