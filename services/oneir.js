/**
 * Created by Aman on 04.06.16.
 */

var fs = require('fs');
var readline = require('readline');
var reader = require('./reader');

module.exports  = function(){
     var reader = {
        // double, 8 bytes
        cvd:function(data, start){
            return data.readDoubleLE(start);
        },

        // long, 4 bytes
        cvl:function(data, start){
            return data.readInt32LE(start)
        },

        // float, 4 bytes
        cvs:function(data, start){
            return data.readFloatLE(start)
        },

        // Int, 2 bytes
        cvi:function(data, start){
            return data.readInt16LE(start)
        },

        // byte, 1 bytes
        cvb:function(data, start){
            return data.readInt8(start)
        },

        // string n bytes
        cvt:function(data, start, len){
            return data.toString('ascii', start, start+len)
        }
    }
	
     return {
        updateInventoryPrice:function(index, price, callback){
            var filePath = './data/inventho.rnd';
            var rowLength = 256;
            var rowOffset = rowLength*index; // index is 1 based, so header is avoided automatically
            var priceLocation = 71 - 1; // this one based, according to the screen shot shared by raj
            var priceOffset = rowOffset + priceLocation;
            fs.readFile(filePath, function (err,tmp) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return false;
                }
                tmp.writeDoubleLE(price, priceOffset);
                fs.writeFile(filePath, tmp, 0 ,function(err, result){
                    callback(err, result)
                });
                return true;
            });

        },

        parse: function(filePath, format, callback){

            var formats = [];
            readline.createInterface({
                input: fs.createReadStream(format),
                terminal: false
            }).on('line', function(line) {
                if(typeof line == 'string'){
                    if (line.charAt(0) != '#' && line.length > 0){
                        formats.push(line)
                    }
                }
            }).on('close', function(){
                var headerLength = +formats[0];
                var rowLength = headerLength;
                var fieldDefinition = formats.slice(1);
                fs.readFile(filePath, function (err,tmp) {
                    console.log('data found!')
                    if (err) {
                        return console.log(err);
                    }

                    var len = reader.cvl(tmp, 0);

                    var data = Buffer.from(tmp.slice(headerLength));

                    var records = [];
                    for(var i =0; i<len; i++){
                        var row = {}
                        var rowData = Buffer.from(data.slice(0, rowLength));

                        var defLen = fieldDefinition.length;
                        var start = 0;
                        for(var j = 0; j<defLen; j++){
                            var def = fieldDefinition[j].split(' ');
                            var instruction = def[0];
                            var bitLen = +def[1];
                            //console.log(instruction+':'+start + ':'+ bitLen + '=', rowData.toString('ascii', start, bitLen));
                            var val = reader[instruction](rowData, start, bitLen);

                            var key = def.length > 2 ? def[2] : ('FIELD-'+(j +1));
                            row[key] = val;
                            start += bitLen;
                        }
                        records.push(row);
                        data = Buffer.from(data.slice(rowLength));
                        //break;
                    }
                    callback(null, records);
                });
            });
        }
    }
}()



