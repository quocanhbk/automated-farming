let obj = {
    "a": 1,
    "b": 2,
    "c": 3
}
let res = [88, 22, 33]

let value = Object.entries(obj).map((o, idx) => {
    o[1] = res[idx]
    return o
})
let newValue = Object.fromEntries(value)
console.log(newValue)