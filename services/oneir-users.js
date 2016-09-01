/**
 * Created by Aman on 18.07.16.
 */

// var dir = require('node-dir');
var fs = require('fs'),
    path = require('path');

var reader = require('./reader');

module.exports = function(root, callback){
    function getSyspaswdFiles(basedir) {

        function getSubDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter(function (file) {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        }

        var subdirs = getSubDirectories(basedir);
        var subdirsContainingSyspaswdFile = subdirs.filter(function (dir) {
            try {
                fs.statSync(basedir + "/" + dir + "/data/syspaswd.rnd")
                return true
            } catch (e) {
                return false;
            }
        });
        var syspaswdFiles = subdirsContainingSyspaswdFile.map(function (dir) {
            return basedir + "/" + dir + "/data/syspaswd.rnd";
        });
        console.log("\n\n>>> syspaswd files:\n");
        console.log(syspaswdFiles);
        console.log("\n\n");
        return syspaswdFiles;
    }

    function getUsersFromSysFile(filePath, callback){
        fs.readFile(filePath, function (err,tmp) {
            console.log('data found!')
            if (err) {
                return console.log(err);
            }

            var headerLength = 62;
            var rowLength = headerLength;

            var len = reader.cvl(tmp, 0);
            len = 4;
            console.log("len = " + len);

            var data = Buffer.from(tmp.slice(headerLength));

            var records = [];
            while(true){
                var rowData = Buffer.from(data.slice(0, rowLength));
                var start = 12;
                var bitLen = 25;
                var val = reader.cvt(rowData, start, bitLen);
                val = val.trim().replace(/\u0000/g, '')
                records.push(val.trim());
                if (data.length > rowLength){
                    data = Buffer.from(data.slice(rowLength));
                } else {
                    break;
                }
            }
            callback(null, records);
        });
    }

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    var files = getSyspaswdFiles(root);
    var users = [];

    var count = 0;
    files.forEach(function (item) {
        getUsersFromSysFile(item, function(err, records){

            users = users.concat(records);
            count++;
            if (count == files.length){
                console.log(typeof users)
                callback(arrayUnique(users));
                // callback(users);
            }
        });
    });

}