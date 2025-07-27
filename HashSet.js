import LinkedList from "./LinkedList.js"

export default function createHashSet() {
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
    const set = (key) => {
        const hashedKey = hash(key);
        const bucket = buckets[hashedKey];
        if (bucket) {
            let tmp = bucket.head;
            let tmpKey = tmp.data;
            if (key == tmpKey) {
                tmp.data = key;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = tmp.data;
                    if (key == tmpKey) {
                        tmp.data = key;
                        return;
                    }
                }
                bucket.append(key);
            }
            
        } else {
            buckets[hashedKey] = new LinkedList();
            buckets[hashedKey].append(key)
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
            let tmpKey = tmp.data;
            if (key == tmpKey) {
                return key;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = tmp.data;
                    if (key == tmpKey) {
                        return key;
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
            let tmpKey = tmp.data;
            if (key == tmpKey) {
                return true;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    tmpKey = tmp.data;
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
            let tmpKey = tmp.data;
            if (key == tmpKey) {
                bucket.removeAt(count);
                if (bucket.size() == 0) buckets[hashedKey] = null;
                if (length() == (capacity/2)*loadFactor) rehash(false)
                return true;
            } else {
                while (tmp.next) {
                    tmp = tmp.next;
                    count++;
                    tmpKey = tmp.data;
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
                arr.push(tmp.data);
                while (tmp.next) {
                    tmp = tmp.next;
                    arr.push(tmp.data);
                }
            }
        }
        return arr;
    }

    const entries = () => {
        let arr = [];
        let hmkeys = keys();
        for (let i = 0; i < hmkeys.length; i++) {
            arr.push(hmkeys[i]);
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
    return {hash, set, get, has, remove, length, clear, keys, entries, buckets}
}


