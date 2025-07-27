import LinkedList from "./LinkedList.js"

export default function createHashMap() {
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
        const hmlength = length();
        if (hmlength > capacity*loadFactor) {
            rehash(true)
        }
    }

    const get = (key) => {
        const hashedKey = hash(key);
        const bucket = buckets[hashedKey];
        if (bucket) {
            let tmp = bucket.head;
            let tmpKey = Object.keys(tmp.data)[0];
            if (key == tmpKey) {
                return tmp.data[key];
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = Object.keys(tmp.data)[0];
                    if (key == tmpKey) {
                        return tmp.data[key];
                    }
                }
                return null;
            }
        }
        return null;
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
                if (bucket.size() == 0) buckets[hashedKey] = null;
                if (length() == (capacity/2)*loadFactor) rehash(false)
                return true;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    count++;
                    tmpKey = Object.keys(tmp.data)[0];
                    if (key == tmpKey) {
                        bucket.removeAt(count);
                        if (bucket.size() == 0) buckets[hashedKey] = null;
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
        capacity = 16;
        for (let i = 0; i < capacity; i++) {
            buckets[i] = null;
        }
        buckets.length = capacity
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

    const rehash = (bool) => {
        let hmentries = entries();
        if (bool) {
            capacity *= 2;
            for (let i = 0; i < capacity; i++) {
                buckets[i] = null;
            }
            for (let entry of hmentries) {
                set(entry[0], entry[1])
            }
        } else {
            capacity /= 2;
            buckets.length = capacity;
            for (let i = 0; i < capacity; i++) {
                buckets[i] = null;
            }
            for (let entry of hmentries) {
                set(entry[0], entry[1])
            }
        }
    }
    return {hash, set, get, has, remove, length, clear, keys, values, entries, buckets}
}


