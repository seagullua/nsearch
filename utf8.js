/**
 * Created by Andriy on 25.11.2014.
 */
/**
 * Created by Andriy on 25.11.2014.
 */
var utf8files = require('./lib/utf8files');

var dir = process.argv[2];

if(dir) {
    console.log("Dir", dir);
    utf8files.processDir(dir, function(err){
        if(err) {
            console.error("Failed", err);
        } else {
            console.log("Finished successfully");
        }
    });
} else {
    console.log("Wrong dir", dir);
}