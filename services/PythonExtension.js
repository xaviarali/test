/**
 * Created by Aman on 09.06.16.
 */


var PythonShell = require('python-shell');

module.exports = {
    sumOfPrice:function(jsonArray, callback){
        var pyshell = new PythonShell('./ext/sumofprice.py', {
            mode: 'text'
        });

        var output = '';
        pyshell.send(JSON.stringify(jsonArray));
        pyshell.on('message', function (data) {
            output += data;
        });


        pyshell.end(function (err) {
            console.log(err)
            console.log('finished');
            console.log(output);
            callback(null, output)
        });
    }
};