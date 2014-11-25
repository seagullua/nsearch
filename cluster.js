/**
 * Created by Andriy on 25.11.2014.
 */
var cluster = require('./lib/clusterisation');
var FullIndex = require('./lib/FullIndex');

var index = FullIndex.indexFromFileSync(process.argv[2]);

var cluster = (cluster.clusterizeIndex(index));

cluster.forEach(function(cluster){
    console.log("---------------------------------");
    console.log("Inside: ", cluster.attached.length);
    console.log("Lead:", cluster.lead);
    console.log("****");

    cluster.attached.forEach(function(doc){
        console.log(Math.round(doc.diff*100)/100, doc.document.author, doc.document.title);
    });
});