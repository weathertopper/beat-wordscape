// console.log("HELLO WORLD");

const fs = require("fs");

const readParamLettersAsString = () => {
    const letters = process.argv[2];
    return letters;
}

const readFileToArray = (file_name) => {
    const text = fs.readFileSync(file_name, "utf-8");
    const word_array = text.split("\n");
    return word_array;
}

const removeLetterFromWord = (word, letter) => {
    const index = word.indexOf(letter);
    if (index == 0){
        return word.substr(1); // skip first char if it's letter
    }
    if (index == word.length-1){
        return word.substr(0, word.length-1) // only take first word.length-1 characters
    }
    const first_half = word.substring(0, index);
    const second_half = word.substring(index+1);
    return first_half + second_half;
}

//  returns boolean. letters or subset of letters .
const lettersMatch = (word, letters) => {
    let word_copy = word;
    for (let i = 0; i < letters.length; i++){
        let char = letters.charAt(i);
        if ( word_copy.includes(char) ){
            word_copy = removeLetterFromWord(word_copy, char);
            if (word_copy.trim().length == 0){
                return true; // subset of letters matched
            }
        }
    }
    return (word_copy.trim().length == 0); // true all letters matched, false elsewise
}

const thinWords = (word_array, letters) => {
    let thinned_words = [];
    for (let i = 0; i < word_array.length; i++){
        let word = word_array[i].trim();
        if (word.length > letters.length){ // skip words too long
            continue;
        }
        if (lettersMatch(word, letters)){
            thinned_words.push(word);
        }
    }
    return thinned_words;
}

const sortLongToShort = (word_array) => {
    word_array.sort(function(a, b){
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return b.length - a.length;
    });
    return word_array;
}

const printWordArray = (array) => {
    array.forEach( (word) => {
        console.log(word);
    })
}

const driver = () => {
    let letters = readParamLettersAsString();
    if (!letters){
        throw "Missing string parameter"
    }
    let word_array = readFileToArray("./words.txt");
    let thinned_words = thinWords(word_array, letters);
    let sorted_words = sortLongToShort(thinned_words);
    printWordArray(sorted_words);
}

driver();