




# JavaScript Iterators and Generators
> Based on Stanimira Vlaeva's course on Coursera (Modern JavaScript: Iterators and Generators).



### In ES6, all basic data types were made iterable

```JavaScript
const easy = 'abc';

for (point of easy) {
    console.log(point)
}
```



### An Iterator object provides a next() method

```JavaScript
const primaryColors = ['blue', 'yellow', 'red']
    , itPC = primaryColors[Symbol.iterator]()
    ;

let color = itPC.next();

while (!color.done) {
    console.log(color.value);
    color = itPC.next()
}
```



### A function returning an Iterator

```JavaScript
function countIterator() {
    let count = 1;
    return {
        next: () => {
            return { value: count++, done: false }
        }
    }
}


const itC = countIterator();

console.log(itC.next().value);
console.log(itC.next().value);
console.log(itC.next().value);
```



### Generators are Iterator factories

```JavaScript
function* countGenerator() {
    let count = 1;
    while (true) {
        yield count++
    }
}


const genC = countGenerator();

console.log(genC.next().value);
console.log(genC.next().value);
console.log(genC.next().value);
```



### The yield operator pauses and resumes a Generator function

```JavaScript
function* classicalElementsGenerator() {
    yield 'earth';
    yield 'water';
    yield 'air';
    yield 'fire'
}


const genCE = classicalElementsGenerator();

let element = genCE.next();
while (!element.done) {
    console.log(element.value);
    element = genCE.next()
}
```



### Custom Generator

```JavaScript
class Human {

    constructor(...senses) {
        this.senses = senses
    }

    *[Symbol.iterator]() {
        for (const one of this.senses) {
            yield one
        }
    }

}


const being = new Human('sight', 'hearing', 'smell', 'touch', 'taste');

for (sense of being) {
    console.log(sense)
}
```



### Lazy sequence generation using destructuring assignment syntax

```JavaScript
function* fibonacciGenerator() {
    let a = 0
      , b = 1
      ;
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}


const genF = fibonacciGenerator();

console.log(genF.next().value);
console.log(genF.next().value);
console.log(genF.next().value);
console.log(genF.next().value);
console.log(genF.next().value);
console.log(genF.next().value);
console.log(genF.next().value);
```



### Generator with parameters

```JavaScript
function* intervalGenerator(start = 0, end = Infinity) {
    for (let i = start; i < end; i++) {
        yield i   
    }
}


const genI = intervalGenerator(2, 4);

console.log(genI.next());
console.log(genI.next());
console.log(genI.next());
```



### Generator as observer

```JavaScript
function* observerGenerator() {
    const value = yield;
    if (value === 'truth') {
        yield 'authenticity'
    } else {
        yield 'unreachable'
    }
}


const genO = observerGenerator();

console.log(genO.next('myth'));
console.log(genO.next('truth'));
console.log(genO.next('tale'));
```



### Notable behavior of an observer

```JavaScript
function* omittingGenerator() {
    while (true) {
        console.log(`Value: ${yield}`)
    }
}


const genT = omittingGenerator();

genT.next('omitted');
genT.next('present');
genT.next('existing');
```



### Delegating execution

```JavaScript
function* skyGenerator() {
    yield* ['sun', 'moon', 'stars']
}

function* happinessGenerator() {
    yield 'surfboard'
    yield* ['ocean', 'sand'];
    yield* skyGenerator()
}


const genH = happinessGenerator();

let enjoy = genH.next();
while (!enjoy.done) {
    console.log(enjoy.value);
    enjoy = genH.next()
}
````
