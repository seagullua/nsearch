/**
 * Created by Andriy on 25.11.2014.
 */
var FullIndex = require('./lib/FullIndex');
var fs = require('fs');



var index_file = process.argv[2];
var query = process.argv.slice(3).join(' ');

var index = FullIndex.indexFromFileSync(index_file);

console.log(JSON.stringify(index.findRanked(query).slice(0, 3), null, 4));