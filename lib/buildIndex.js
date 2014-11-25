/**
 * Created by Andriy on 25.11.2014.
 */
var fb2 = require('node-fb2');
var path = require('path');
var fs = require('fs');
var filesForEach = require('./filesForEach');

/**
 * Reads book information with contains
 * @param file_name
 * @param callback
 */
function readBookInfo(file_name, callback) {
    fb2.parse(file_name, function(err, bookMeta) {
        if(err) return callback(err);

        var result = {
            author: bookMeta.firstName + " " + bookMeta.lastName,
            title: bookMeta.bookTitle,
            annotation: bookMeta.annotation,
            content: bookMeta.content
        };

        callback(null, result);
    });
}

/**
 * Processes dir
 * @param index
 * @param dir
 * @param callback
 */
function processBookFiles(index, dir, callback) {

    function processBookFile(file_name, callback) {
        var doc_id = path.basename(file_name);
        console.log(doc_id);
        readBookInfo(file_name, function(err, meta){
            if(err) return callback(err);

            index.addDocument(doc_id, meta);

            callback(null);
        });
    }

    filesForEach.filesForEach(dir, 10, processBookFile, callback);
}


exports.processBookFiles = processBookFiles;
