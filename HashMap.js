import LinkedList from "./LinkedList.js"

function createHashMap() {
    let capacity = 16;
    const loadFactor = .75;
    let buckets = new Array(capacity);
    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%capacity;
        }
        return hashCode;
    } 
    const set = (key, value) => {
        const hashedKey = hash(key);
        const bucket = buckets[hashedKey];
        const pair = {}
        pair[key] = value;
        if (bucket) {
            let tmp = bucket.head;
            let tmpKey = Object.keys(tmp.data)[0];
            if (key == tmpKey) {
                tmp.data = pair;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = Object.keys(tmp.data)[0];
                    if (key == tmpKey) {
                        tmp.data = pair;
                        return;
                    }
                }
                bucket.append(pair);
            }
            
        } else {
            buckets[hashedKey] = new LinkedList();
            buckets[hashedKey].append(pair)
        }
    }
    return {hash, set, buckets}
}

const h = createHashMap();

h.set("Fred", "Weasley");
h.set("F", "h");
h.set("h", "");
h.set("Frd", "hi")
h.set("dreF", "hallo");

console.log(h.buckets)

