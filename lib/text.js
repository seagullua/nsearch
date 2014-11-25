/**
 * Created by Andriy on 25.11.2014.
 */
var natural = require('natural');
var _ = require('underscore');

/**
 * Removes special character with respect to UTF-8
 * @param str
 * @returns {string}
 */
function removeSpecials(str) {
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    var res = "";
    for(var i=0; i<lower.length; ++i) {
        if(lower[i] != upper[i] || lower[i].trim() === '')
            res += str[i];
    }
    return res;
}

/**
 * English and russian stemmer
 * @param word
 */
function termStemming(word) {
    var english = natural.PorterStemmer.stem(word);
    var russian = natural.PorterStemmerRu.stem(word);

    if(english && english != word) {
        return english;
    }

    return russian;
}

/**
 * Processes given text into terms using stemming
 * @param text
 */
function textToTerms(text) {
    var text = removeSpecials(text);

    //Split into tokens http://blog.tompawlak.org/split-string-into-tokens-javascript
    var array = text.match(/\S+/g);

    array = array ? array : [];

    //Stem the words
    array = array.map(termStemming);

    //Make unique
    array = _.uniq(array);

    return array;
}

exports.textToTerms = textToTerms;