function cube(n) {return n * n * n};


function checkForArmstrong(){
    let arr = new Array
    for(i = 0; i <= 10000; i ++){
        let str = i.toString();
        let result = 0;
        for(j = 0; j < str.length; j ++){
            result += cube(parseInt(str[j]))
        }
        if(result == i){arr.push(i)}
    }
    return arr
}

console.log(checkForArmstrong())