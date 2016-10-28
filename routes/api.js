 /**
 * Created by Aman on 24.06.16.
 */




var express = require('express');
var router = express.Router();
var r = require('rethinkdb');
var md5 = require('md5');
var uuid = require('uuid');



var userservice = require('../services/UserRegistration');
var usermodel = require('../services/api/UserService');

var cdm = require('../services/CompanyDataManager');

exports.oneirusers = function(req, res, next){

    var getusers = require('../services/oneir-users');
    getusers(("/var/vigilant"), function(legacyUserNames){
        if (req.query['unfiltered'] === 'true' || req.query['unfiltered'] === 1 ){
            res.status(200).send(legacyUserNames);
            return;
        }
        usermodel.all(function(error, dbusers){
            if (error){
                res.status(200).send(legacyUserNames);
            } else {
                var names = dbusers.map(function(obj){
                    return obj['name'];
                });
                var unusedNames = legacyUserNames.filter(function(x) { return names.indexOf(x) < 0 });
                res.status(200).send(unusedNames);
            }

        });
    });

};

exports.data = function(req, res, next){
    cdm.companyNames(req.param.user, function(error, names){
        if (error){
            res.status(400).send(error)
            return;
        }

        res.status(200).send(names);
    });
};

/* GET home page. */
exports.login = function(req, res, next) {
    userservice.login(req.body, function(err, user){
        if (err) {
            res.status(400).send(err)
            return;
        }
		if (typeof localStorage === "undefined" || localStorage === null) {
          var LocalStorage = require('node-localstorage').LocalStorage;
          localStorage = new LocalStorage('./telnetID');
         }
		 if(!localStorage.getItem(req.body["username"]))
		 {
			 res.status(400).send("TelnetID is not Set.");
            return;
		 }
		 
        req.session.me = user;
        req.session.username = req.body["username"];
        req.session.tab_id = 1;
		req.session.telnetId = localStorage.getItem(req.body["username"]);
        res.status(200).send({"token":uuid.v4(), "user":user});
    });
};

exports.logout = function(req, res, next) {
    req.session = null;
    res.status(200).send("Logged out!");
};


exports.register =  function(req, res, next) {

    userservice.findByUserName(req.body["username"], function(err, users){
        if (err) {
            res.status(400).send(err)
            return;
        }

        if(users.length > 0){
            res.status(400).send("Username already exists")
            return;
        }

        userservice.register(req.body, function(err, user){
            if (err) {
                res.status(400).send(err)
                return;
            }

            userservice.findByUserName(req.body["username"], function(err, users){
                if (err) {
                    res.status(400).send(err)
                    return;
                }
                res.status(201).send({"token":uuid.v4(), "user":users[0]});
            });
        });

    });
};

