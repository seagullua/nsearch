/**
 * Created by Andriy on 25.11.2014.
 */
var _ = require('underscore');

function sameCount(words_a, words_b) {
    var cache = {};
    words_a.forEach(function(elem){
        cache[elem] = true;
    });

    var same = 0;
    words_b.forEach(function(elem){
        if(elem in cache)
            same++;
    });
    return same;
}

function cosineDifference(words_a, words_b) {

    var same = sameCount(words_a, words_b);
    var a_only = words_a.length - same;
    var b_only = words_b.length - same;

    //only 1x1 == 1 so the dot product is number of ones in same
    var dot_product = same;
    var a_length = Math.sqrt(same + a_only);
    var b_length = Math.sqrt(same + b_only);

    return dot_product / a_length / b_length;
}

/**
 * Clusterize index
 * @param full_index
 * @return object of clusters
 */
function clusterizeIndex(full_index) {
    var documents = full_index.documents;
    var index = full_index.indexes["content"];

    var doc_ids = Object.keys(documents);
    var leads = Math.round(Math.sqrt(doc_ids.length));

    doc_ids = _.shuffle(doc_ids);

    var lead_ids = doc_ids.slice(0, leads);
    var not_classified = doc_ids.slice(leads);

    var clusters = [];

    lead_ids.forEach(function(id){
        clusters.push({
            lead: documents[id],
            attached: []
        });
    });

    not_classified.forEach(function(doc_id, i){
        var words = index.words[doc_id];
        var max = -5;
        var max_cluster = null;

        clusters.forEach(function(cluster){
            var lead_words = index.words[cluster.lead.id];
            var diff = cosineDifference(words, lead_words);

            //console.log(cluster.lead.id, diff);
            if(diff > max) {
                max = diff;
                max_cluster = cluster;
            }
        });

        max_cluster.attached.push(
            {
                diff: max,
                document: documents[doc_id]
            });
    });

    return clusters;
}

exports.cosineDifference = cosineDifference;
exports.clusterizeIndex = clusterizeIndex;