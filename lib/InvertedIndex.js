/**
 * Created by Andriy on 25.11.2014.
 */

/**
 * Inverted index instance
 * @constructor
 */
function InvertedIndex() {

    var _index = {

    };
    var _words = {

    };

    /**
     * Adds the given word to index
     * @param doc_id
     * @param terms_array
     */
    this.addToIndex = function(doc_id, terms_array) {
        _words[doc_id] = terms_array;

        terms_array.forEach(function(term){
            if(_index.hasOwnProperty(term)) {
                _index[term].push(doc_id);
            } else {
                _index[term] = [doc_id];
            }
        });
    };

    /**
     * Returns the array of doc_ids which has this term
     * @param term
     */
    this.findTerm = function(term) {
        if(term in _index) {
            return _index[term];
        }
        return [];
    };

    /**
     * Saves inverted index to JSON object
     */
    this.saveToJSON = function() {
        return {
            index: _index,
            words: _words
        };
    };

    /**
     * Reads inverted index from JSON object
     * @param json
     */
    this.loadFromJSON = function(json) {
        _index = json.index;
        _words = json.words;
    };
}

exports.InvertedIndex = InvertedIndex;