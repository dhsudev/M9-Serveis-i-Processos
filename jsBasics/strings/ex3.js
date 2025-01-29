function swapLetters(str) {
    if (str.length < 2) {
        return str;
    }
    return (
        str.charAt(str.length - 1) +
        str.substring(1, str.length - 1) +
        str.charAt(0)
    );
}

console.log(swapLetters("AbbbbbbbbbbbbbbbbbbbbbZ"));
console.log(swapLetters("Hola"));
console.log(swapLetters("miau"));
console.log(swapLetters("BA"));
