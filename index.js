import createHashMap from "./HashMap.js";

const test = createHashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'black');
test.set('kite', 'blue');
test.set('apple', 'green');
test.set('jacket', 's')
test.set('moon', 'silver')
test.set('moon', 'black')
console.log(test.get('jacket'))
console.log(test.get('apple'))
console.log(test.has('moon'))
console.log(test.has('apples'))
console.log(test.remove('apple'))
console.log(test.remove('a'))
console.log(test.remove('kite'))
console.log(test.length())
console.log(test.clear())


console.log(test.buckets)
// console.log(test.length())