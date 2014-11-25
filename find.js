/**
 * Created by Andriy on 25.11.2014.
 */
var FullIndex = require('./lib/FullIndex').FullIndex;
var fs = require('fs');

var index = new FullIndex();

var index_file = process.argv[2];
var query = process.argv.slice(3).join(' ');

var json = JSON.parse(fs.readFileSync(index_file, "utf-8"));
index.loadFromJSON(json);

console.log(JSON.stringify(index.findRanked(query).slice(0, 3), null, 4));