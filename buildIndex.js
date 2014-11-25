/**
 * Created by Andriy on 25.11.2014.
 */
var buildIndex = require('./lib/buildIndex');
var FullIndex = require('./lib/FullIndex').FullIndex;
var fs = require('fs');
var dir = process.argv[2];
var output = process.argv[3];

if(dir) {
    console.log("Building index for dir", dir);

    var index = new FullIndex();
    index.setZonesWeights({
        annotation: 0.1,
        content: 0.05,
        title: 0.5,
        author: 0.35
    });

    buildIndex.processBookFiles(index, dir, function(err){
        if(err) {
            console.error("Failed", err);
        } else {
            fs.writeFileSync(output, JSON.stringify(index.saveToJSON()));
            console.log("Finished successfully");
        }
    });
} else {
    console.log("Wrong dir", dir);
}