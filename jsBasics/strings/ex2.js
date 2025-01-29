function removeIndex(str, n){
    if(n >= str.lenght) {return str}
    return str.substring(0, n) + str.substring(n + 1, str.lenght)
}

console.log(removeIndex("hotrtrla", 0))
console.log(removeIndex("miau", 2))