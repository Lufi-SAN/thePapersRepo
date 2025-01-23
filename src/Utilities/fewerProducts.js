export default function fewerProducts(arr) {
    let set = new Set()
    while(set.size < 4) {
        set.add(Math.floor(Math.random() * arr.length))
    }

    return Array.from(set).map(index => arr[index]);
}