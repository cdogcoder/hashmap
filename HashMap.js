import LinkedList from "./LinkedList.js"

function createHashMap() {
    let capacity = 16;
    const loadFactor = .75;
    let buckets = new Array(capacity).fill(new LinkedList());
    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
        }
        return hashCode;
    } 
    return {hash}
}

console.log(createHashMap().hash("string"))