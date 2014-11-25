/**
 * Created by Andriy on 25.11.2014.
 */
var _ = require('underscore');


function cosineDifference(words_a, words_b) {
    var same = _.intersection(words_a, words_b).length;
    var a_only = _.difference(words_a, words_b).length;
    var b_only = _.difference(words_b, words_a).length;

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

    not_classified.forEach(function(doc_id){

    });
}

exports.cosineDifference = cosineDifference;