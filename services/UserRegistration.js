/**
 * Created by Aman on 21.06.16.
 */

var r = require('rethinkdb');
var uuid = require('uuid');
var sha256 = require('sha256');


function getStringValue(obj,key){
    return "" + (typeof obj[key] == 'undefined' ? '' : obj[key]);
}

module.exports  = function(){
    return {
        login:function(json, callback){
            r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
                if (err) {
                    callback("failed to connect database", null);
                    return;
                }
                var username =  ""+json["username"];
                var password = ""+json["password"];
                password = sha256.x2(password)

                r.db("oneir").table("users").getAll([username, password], {index: "login"}).coerceTo('array').run(conn, function(error, users){
                    if (err) {
                        callback("Database error", null);
                        return;
                    }

                    if(users.length != 1){
                        callback("Login failed", null);
                        return;
                    }

                    callback(null, users[0]);
                });
            });
        },
        findByUserName:function(username, callback){
            r.connect( {host: 'localhost', db:'oneir'}, function(err, conn) {
                if (err) {
                    callback("failed to connect database", null);
                    return;
                }

                username = "" + username;

                r.db("oneir").table("users").getAll(username, {index: "username"}).coerceTo('array').run(conn, function(error, users){
                    if (err) {
                        callback("Database error", null);
                        return;
                    }
                        callback(null, users);
                });
            });
        },
        register:function(user, callback){

            r.connect( {host: 'localhost'}, function(err, conn) {
                if (err) {
                    callback("failed to connect database", null);
                    return
                }

                var username = getStringValue(user, 'username')
                var password = getStringValue(user, 'password')
                var name = getStringValue(user, 'name')

                if (username.length == 0){
                    callback("username cannot be empty----", null);
                    return;
                }

                if (password.length <8 ){
                    callback("password should be at least 8 characters", null);
                    return;
                }

                if (name.length < 3){
                    callback("Name should be at least 3 characters", null);
                    return;
                }

                user["username"] = username;
                user["name"] = name;
                user["password"] = sha256.x2("" + user["password"]);

                r.db("oneir").table("users").insert(user).run(conn, function(err, result){
                    if (err) {
                        callback("failed to register user: " + err, null)
                        return;
                    }

                    callback(null, result);
                });
            });
        }
    }
}();