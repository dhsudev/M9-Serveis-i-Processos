function filterWords(words){
    const filteredData = []
    for(let word of words){
        if (word[0] != "Z")
            filteredData.push(word)
    }
    return filteredData
}

console.log(filterWords(["Bob", "Alex", "Zoello"]));
console.log(filterWords(["León", "Zebra", "Gacela"]));
console.log(filterWords(["Mercedes", "Bmw", "Audi", "Porche"]));