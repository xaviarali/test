/**
 * Created by Aman on 19.07.16.
 */

var r = require('rethinkdb');
var md5 = require('md5');
var uuid = require('uuid');

function getStringValue(obj,key){
    return "" + (typeof obj[key] == 'undefined' ? '' : obj[key]);
}

module.exports  = {
    all:function(callback){
        r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
            if (err) {
                callback("failed to connect database", null);
                return;
            }

            r.db("oneir").table("users").coerceTo('array').run(conn, function(error, users){
                if (err) {
                    callback("Database error", null);
                    return;
                }
                callback(null, users);
            });
        });
    }
    , get:function(username, callback){
        r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
            if (err) {
                callback("failed to connect database", null);
                return;
            }

            r.db("oneir").table("users").get(username).run(conn, function(error, user){
                if (err) {
                    callback("Database error", null);
                    return;
                }
                callback(null, user);
            });
        });
    }
    , del:function(username, callback){
        r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
            if (err) {
                callback("failed to connect database", false);
                return;
            }
            r.db("oneir").table("users").get(username).delete().run(conn, function(err, result){
                if (err) {
                    callback("failed to delete user: " + err, false)
                    return;
                }
                if (result['deleted'] > 0){
                    callback(null, true);
                } else {
                    callback("User not found", false);
                }
            });
        });
    }
    , add:function(user, callback){
        r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
            if (err) {
                callback("failed to connect database", false);
                return;
            }
            r.db("oneir").table("users").insert(user).run(conn, function(err, result){
                if (err) {
                    callback("failed to add user: " + err, false)
                    return;
                }
                if (result['inserted'] > 0){
                    callback(null, true);
                } else {
                    callback("No user inserted", false);
                }
            });
        });
    }
    , update:function(username, user, callback){
        r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
            if (err) {
                callback("failed to connect database", false);
                return;
            }
            console.log("Updateing " + username);
            console.log(user);
            r.db("oneir").table("users").get(username).update(user).run(conn, function(err, result){
                if (err) {
                    callback("failed to update user: " + err, false)
                    return;
                }

                if (result['replaced'] > 0 ){
                    callback(null, true);
                } else {
                    callback("No user updated", false);
                }
            });
        });
    }
}