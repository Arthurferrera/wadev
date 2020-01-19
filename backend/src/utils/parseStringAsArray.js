module.exports = function parseStringAsArray(arrayAsString) {
    console.log(arrayAsString);
    
    return arrayAsString.toLowerCase().split(',').map(tech => tech.trim());
}
