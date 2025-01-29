function nCub(n)
{
    if(typeof(n) !== "number"){
        window.alert("This is not a number")
        return
    }
    return n * n * n
}

console.log(nCub(10))