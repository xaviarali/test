/**
 * Created by Aman on 12.06.16.
 */

module.exports = {
    // double, 8 bytes
    mkd:function(data, start){
        return data.readDoubleLE(start);
    },

    // long, 4 bytes
    mkl:function(data, start){
        return data.readInt32LE(start)
    },

    // float, 4 bytes
    mks:function(data, start){
        return data.readFloatLE(start)
    },

    // Int, 2 bytes
    mki:function(data, start){
        return data.readInt16LE(start)
    },

    // byte, 1 bytes
    mkb:function(data, start){
        return data.readInt8(start)
    },

    // string n bytes
    mkt:function(data, start, len){
        return data.toString('ascii', start, start+len)
    }
}