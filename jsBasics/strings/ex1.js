function startsWithAS(str){
    if(str.toLowerCase().startsWith("as")) {
        return "A" + str.toLowerCase().substr(1, str.length -1)
    }
    return "As" + str.toLowerCase();
}

console.log(startsWithAS("Hola"))
console.log(startsWithAS("teroide"))
console.log(startsWithAS("aSteriscO"))
console.log(startsWithAS("ASterisco"))