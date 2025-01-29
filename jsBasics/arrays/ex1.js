function addPairs(arr)
{
    let sum = 0
    for(let n of arr) {
        if(n%2 == 0) {sum += n}
    }
    return (sum)
}


console.log(addPairs([1, 2, 3, 4, 5, 6]))
console.log(addPairs([1, 3, 5, 6]))
console.log(addPairs([1, 2, 3, 4, 5]))