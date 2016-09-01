/**
 * Created by Aman on 19.07.16.
 */

var express = require('express');
var router = express.Router();

var us = require('../../services/api/UserService');
var sha256 = require('sha256');

/* GET home page. */
router.get('/', function(req, res, next) {
    us.all(function(error, users){
        if (users != null){
            res.status(200).send(users);
        } else {
            res.status(400).send(error);
        }
    });
});

router.get('/:username', function(req, res, next) {
    var username = req.params.username;
    if( !username){
        res.status(404).send("Invalid user id");
        return;
    }
    us.get(username, function(error, user){
        if (user != null){
            res.status(200).send(user);
        } else {
            res.status(404).send(error);
        }
    });
});

router.delete('/:username', function(req, res, next) {
    var me = req.session.me;
    if ( me.admin !== true ){
        res.status(401).send("Only admin can delete a user");
        return;
    }

    var username = req.params.username;
    if( !username){
        res.status(400).send("Invalid user id");
        return;
    }

    if( username == 'administrator'){
        res.status(400).send("administrator user cannot be deleted");
        return;
    }

    us.del(username, function(error, user){
        if (user != null){
            res.status(200).send(user);
        } else {
            res.status(400).send(error);
        }
    });
});

router.post('/', function(req, res, next) {
    var user = req.body;
    if( typeof user['username'] != 'string'){
        res.status(400).send("Invalid user name");
        return;
    }

    if( typeof user['username'] == 'string' && user['username'].length < 3){
        res.status(400).send("Invalid user name, must be at least 3 characters");
        return;
    }

    if( typeof user['password'] == 'string' && user['password'].length < 8){
        res.status(400).send("Invalid password, must be at least 8 characters");
        return;
    }

    if( typeof user['name'] == 'string' && user['name'].length < 3){
        res.status(400).send("Invalid name, must be at least 3 characters");
        return;
    }

    user["password"] = sha256.x2(user["password"]);
    user["admin"] = false;
    user["passwordChangeNeeded"] = true;

    us.add(user, function(error, success){
        if (success === true){
            res.status(200).send("user added");
        } else {
            res.status(400).send(error);
        }
    });
});

router.put('/:username', function(req, res, next) {
    var user = req.body;

    var username = req.params.username;
    if( !username){
        res.status(404).send("Invalid user id");
    }

    var me = req.session.me;
    if ( !(me.username == username || me.admin === true) ){
        res.status(401).send("You can change only your information, call admin");
        return;
    }
    if (user.password){
        user.password = sha256.x2(user.password);
        if (me.username != username){ // admin is resetting others password
            user["passwordChangeNeeded"] = true;
        } else { // user is changing his password
            user["passwordChangeNeeded"] = false;
        }
    }

    if (username == 'administrator'){ // 'administrator' username cannot be changed
        user['username'] = 'administrator';
    }

    us.update(username, user,  function(error, user){
        if (user != null){
            res.status(200).send(user);
        } else {
            res.status(404).send(error);
        }
    });
});



module.exports = router;