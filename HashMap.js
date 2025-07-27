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

    const has = (key) => {
        const hashedKey = hash(key);
        const bucket = buckets[hashedKey];
        if (bucket) {
            let tmp = bucket.head;
            let tmpKey = Object.keys(tmp.data)[0];
            if (key == tmpKey) {
                return true;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = Object.keys(tmp.data)[0];
                    if (key == tmpKey) {
                        return true;
                    }
                }
                return false;
            }
        } 
        return false;
    }

    const remove = (key) => {
        if (has(key)) {
            let count = 0;
            const hashedKey = hash(key);
            const bucket = buckets[hashedKey];
            let tmp = bucket.head;
            let tmpKey = Object.keys(tmp.data)[0];
            if (key == tmpKey) {
                bucket.removeAt(count);
                return true;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    count++;
                    tmpKey = Object.keys(tmp.data)[0];
                    if (key == tmpKey) {
                        bucket.removeAt(count);
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    }

    const length = () => {
        let count = 0;
        for (const bucket of buckets) {
            if (bucket) {
                let tmp = bucket.head;
                count++;
                while (tmp.next) {
                    tmp = tmp.next;
                    count++;
                }
            }
        }
        return count;
    }

    return {hash, set, has, remove, length, buckets}
}

const h = createHashMap();

h.set("Fred", "Weasley");
h.set("F", "h");
h.set("h", "");
h.set("Frd", "hi")
h.set("dreF", "hallo");
console.log(h.has("h"));
console.log(h.remove("Frd"))
console.log(h.length())

console.log(h.buckets)

