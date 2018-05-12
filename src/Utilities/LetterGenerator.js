const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z"];
const vowels = ["a","e","i","o","u","y"];
const allLetters = consonants.concat(vowels);

function getRandomVowel(){
    return vowels[Math.floor(Math.random() * vowels.length)];
}

function getRandomConsonant() {
    return consonants[Math.floor(Math.random() * consonants.length)];
}

function getRandomLetter(){
    return allLetters[Math.floor(Math.random() * allLetters.length)];
}

/*
 * Shuffles array in place.
 * from: https://stackoverflow.com/questions/6274339/
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function getRandomLetters(){
    var letters = [];
    for(var i = 0; i < 2; i++){
        letters.push(getRandomVowel());
    }

    for(i = 0; i < 2; i++){
        letters.push(getRandomConsonant());
    }

    for(i = 0; i < 5; i++){
        letters.push(getRandomLetter());
    }

    return shuffle(letters);
}