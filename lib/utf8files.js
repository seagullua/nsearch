/**
 * Created by Andriy on 25.11.2014.
 */
var Buffer = require('buffer').Buffer;
var Iconv  = require('iconv').Iconv;
var fs = require('fs');
var iconv = new Iconv('WINDOWS-1251', 'UTF-8');
var filesForEach = require('./filesForEach');

function processFile(path, callback) {
    fs.readFile(path, function(err, data){
        if(err) return callback(err);

        var header = data.toString("utf-8", 0, 100).toLowerCase();
        if(header.split("windows-1251").length > 1) {
            //Should change encoding
            data = iconv.convert(data).toString("utf-8");

            data = data.split("windows-1251").join("utf-8");

            fs.writeFile(path, data, callback);
        } else {
            callback(null);
        }
    });
}

function processDir(dir, callback) {
    filesForEach.filesForEach(dir, 1, processFile, callback);
}

exports.processDir = processDir;