/**
 * Created by Andriy on 25.11.2014.
 */
var cluster = require('./lib/clusterisation');

console.log(cluster.cosineDifference(
   ["word1", "word2", "ccc", "aa"],
    ["word1", "word2", "aa", "bbb"]
));