/**
 * Created by Aman on 12.06.16.
 */

module.exports = {
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
