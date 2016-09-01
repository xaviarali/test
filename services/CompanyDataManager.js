/**
 * Created by Aman on 29.06.16.
 */


module.exports = {
    companyNames:function(user, callback){
        var filePath = './data/company.rbanwait';
        var fs = require('fs');
        fs.readFile(filePath, function(err, data) {
            if(err) return callback(err, null);

            var tmp = data.toString().split("\n");
            if(tmp.length < 2){
                return callback(null, []);
            }

            tmp = tmp.slice(0);

            var names = [];
            var len = tmp.length;
            for( var i = 0; i< len; i++){
                var name = tmp[i];
                if (/\S/.test(name)) {
                    names.push(name);
                }
            }

            if(names.length > 0){
                return callback(null, names.slice(1));
            }

            return callback(null, []);
        });
    }
};