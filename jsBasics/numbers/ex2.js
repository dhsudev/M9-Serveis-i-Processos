function multiply(n1, n2){
    let result = 0;
    while (n2 > 0){
        result += n1
        n2--;
    }
    return result
}

console.log(multiply(1, 2))
console.log(multiply(2, 3))
console.log(multiply(100, 90))