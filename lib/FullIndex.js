/**
 * Created by Andriy on 25.11.2014.
 */
var InvertedIndex = require('./InvertedIndex').InvertedIndex;
var text = require('./text');
var _ = require('underscore');

/**
 * Creates default snippet for book json
 * @param full_json
 * @returns {{}}
 */
function bookDefaultSnippet(full_json) {
    var snippet = {};
    for(var key in full_json) {
        if(key != 'content')
            snippet[key] = full_json[key];
    }
    return snippet;
}


/**
 *
 * @param options list of options
 * @param options.snippet_maker function to create snippet of the document optional
 * @param options.tokenizer function to create list of tokens from text
 * @constructor
 */
function FullIndex(options) {
    options = options ? options : {};
    var snippet_maker = options.snippet_maker ? options.snippet_maker : bookDefaultSnippet;
    var tokenizer = options.tokenizer ? options.tokenizer : text.textToTerms;

    var _zones = {};
    var _documents = {};
    var _zones_indexes = {};

    var self = this;

    this.documents = _documents;
    this.indexes = _zones_indexes;

    /**
     * Adds document to the index
     * @param doc_id
     * @param doc_json
     */
    this.addDocument = function(doc_id, doc_json) {
        for(var zone_id in _zones_indexes) {
            var index = _zones_indexes[zone_id];

            if(zone_id in doc_json) {
                index.addToIndex(doc_id, tokenizer(doc_json[zone_id]));
            }
        }

        var snippet = snippet_maker(doc_json);
        snippet.id = doc_id;
        _documents[doc_id] = snippet;
    };

    /**
     * Return the list of documents which satisfies query
     * @param zone_id
     * @param query_terms
     */
    function getDocumentsForQuery(zone_id, query_terms) {
        var list = [];

        var index = _zones_indexes[zone_id];

        query_terms.forEach(function(term){
            list = _.union(list, index.findTerm(term));
        });

        return list;
    }

    /**
     * Returns the list of documents ordered by rank
     * @param query
     */
    this.findRanked = function(query) {
        var ranks = {};

        var query_terms = tokenizer(query);

        //Find query in each zone and calculate score for each document
        for(var zone_id in _zones) {
            var documents = getDocumentsForQuery(zone_id, query_terms);
            var rank = _zones[zone_id];

            documents.forEach(function(doc_id){
                if(doc_id in ranks) {
                    ranks[doc_id] += rank;
                } else {
                    ranks[doc_id] = rank;
                }
            });
        }

        var result = [];

        //Load snippets for each document
        for(var doc_id in ranks) {
            result.push({
                rank: ranks[doc_id],
                document: _documents[doc_id]
            });
        }

        //Sort by rank
        return _.sortBy(result, function(obj) {
            return -obj.rank;
        });

    };

    /**
     *
     * @param fields_weights JSON of weights of different fields
     * {
     *      title: 0.2,
     *      content: 0.8
     * }
     */
    this.setZonesWeights = function(fields_weights) {
        _zones = fields_weights;

        //Init indexes
        for(var key in _zones) {
            _zones_indexes[key] = new InvertedIndex();
        }
        self.indexes = _zones_indexes;
    };

    /**
     * Saves inverted index to JSON object
     */
    this.saveToJSON = function() {
        var indexes = {};
        for(var key in _zones_indexes) {
            indexes[key] = _zones_indexes[key].saveToJSON();
        }

        return {
            zones: _zones,
            documents: _documents,
            indexes: indexes
        };
    };

    /**
     * Reads inverted index from JSON object
     * @param json
     */
    this.loadFromJSON = function(json) {
        self.setZonesWeights(json.zones);

        _documents = json.documents;
        self.documents = _documents;
        for(var key in json.indexes) {
            _zones_indexes[key].loadFromJSON(json.indexes[key]);
        }
    };
}

exports.bookDefaultSnippet = bookDefaultSnippet;
exports.FullIndex = FullIndex;