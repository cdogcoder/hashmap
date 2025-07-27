import LinkedList from "./LinkedList.js"

function createHashMap() {
    let capacity = 16;
    const loadFactor = .75;
    let buckets = [];
    for (let i = 0; i < capacity; i++) {
        buckets[i] = null;
    }
    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%capacity;
        }
        return hashCode;
    } 
    const set = (key, value) => {
        const hmlength = length();
        if (hmlength >= capacity*loadFactor) {
            rehash()
        }
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
    const clear = () => {
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = null;
        }
    }

    const keys = () => {
        let arr = [];
        for (const bucket of buckets) {
            if (bucket) {
                let tmp = bucket.head;
                arr.push(Object.keys(tmp.data)[0]);
                while (tmp.next) {
                    tmp = tmp.next;
                    arr.push(Object.keys(tmp.data)[0]);
                }
            }
        }
        return arr;
    }

    const values = () => {
        let arr = [];
        for (const bucket of buckets) {
            if (bucket) {
                let tmp = bucket.head;
                arr.push(Object.values(tmp.data)[0]);
                while (tmp.next) {
                    tmp = tmp.next;
                    arr.push(Object.values(tmp.data)[0]);
                }
            }
        }
        return arr;
    }

    const entries = () => {
        let arr = [];
        let hmkeys = keys();
        let hmvalues = values();
        for (let i = 0; i < hmkeys.length; i++) {
            arr.push([hmkeys[i], hmvalues[i]]);
        }
        return arr;
    }

    const rehash = () => {
        capacity *= 2;
        let hmentries = entries();
        for (let i = 0; i < capacity; i++) {
            buckets[i] = null;
        }
        for (let entry of hmentries) {
            set(entry[0], entry[1])
        }
    }
    return {hash, set, has, remove, length, clear, keys, values, entries, buckets}
}

const h = createHashMap();

h.set("Fred", "Weasley");
h.set("F", "h");
h.set("h", "");
h.set("Frd", "hi")
h.set("dreF", "hallo");
h.set("Fre", "Weasley");
h.set("j", "h");
h.set("u", " ");
h.set("jdskaf", "hi");
h.set("w", "hallo");
h.set("jdskf", "hi")
h.set("a", "hallo");
// h.set("b", "who")


// console.log(h.length());
// console.log(h.keys())
// console.log(h.values())
// console.log(h.entries())
console.log(h.buckets)

