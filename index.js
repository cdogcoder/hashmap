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
test.set('cobra', '')
test.set('cobr', '')
test.set('cob', '')
test.set('co', '')
test.set('appl', 'green');
test.set('app', 'green');
test.set('ap', 'green');
test.set('a', 'green');
test.set('ice crea', 'white')
test.set('ice cre', 'white')
test.set('ice cr', 'white')
test.set('ice c', 'white')
test.set('ice ', 'pink')


console.log(test.buckets)
console.log(test.length())