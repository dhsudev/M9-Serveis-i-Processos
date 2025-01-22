function multiply(n1, n2){
    let result = 0;
    while (n2 > 0){
        result += n1
        n2--;
    }
    return result
}

function multiply3(n1, n2, n3){
    let result = multiply(n1, n2)
    result = multiply(result, n3)
    return result
}

console.log(multiply3(1,2,3))
console.log(multiply3(100,2,3))
console.log(multiply3(11,2,2))