/**
 * Created by Andriy on 25.11.2014.
 */
var async = require('async');
var fs = require('fs');
var path = require('path');

function filesForEach(dir, max_simultaneous, async_function, callback) {
    fs.readdir(dir, function(err, files){
        if(err) return callback(err);

        async.eachLimit(files, max_simultaneous, function(file, callback){
            async_function(path.join(dir, file), callback);
        }, callback);
    });
}

exports.filesForEach = filesForEach;