function media(data){
    let result = 0
    for(let i = 2; i < data.length; i++){
        result += parseInt(data[i])
    }
    result /= data.length - 2
    return result.toFixed(1)
}

function orderData(data){
    data.unshift(data.pop())
    data.push(media(data))
    return data
}

console.log(orderData(["Rodriguez", "8", 9, '5',4, 'Clara']))
console.log(orderData(["Rodriguez", "8", 9, '5',4, 8, 'Clara']))