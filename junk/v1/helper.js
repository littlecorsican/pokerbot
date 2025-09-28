function sortArrayByValue(array) {
    array.sort((a, b) => (a.value > b.value) ? 1 : -1)
}

function getMaxInArray(array) {
    return Math.max.apply(Math, array.map(function(o) { return o.value; }))
}

function getMinInArray(array) {
    return Math.min.apply(Math, array.map(function(o) { return o.value; }))
}