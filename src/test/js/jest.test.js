
const R = require('ramda');
const _ = require('lodash');

const add = (a, b) => a + b

describe('examples', function () {

    test("Auto currying", function () {
        const r = R.add(1, 2)
        console.log(r)

        const increment = R.add(1)
        const s = increment(2)
        console.log(s)
    });

    test("currying", function () {
        const r = add(1, 2);
        // const t = add(1)(2)
        let curriedAdd = R.curry(add)
        let x = curriedAdd(1, 2)
        let y = curriedAdd(1)(2)
        console.log(`${x},  ${y}`)
    });

    test("currying one more", () => {
        const bev = {name: 'Bev', gender: 'female'}
        const rich = {name: 'Rich', gender: 'male'}
        const addTitle = (title, name) => `${title}. ${name}`
        const curriedAddTitle = R.curry(addTitle)
        const addMs = curriedAddTitle('Ms')
        const addMr = curriedAddTitle('Mr')
        console.log(addMs(bev.name))
        console.log(addMr(rich.name))
    });

    const increment = (x) => x + 1
    const double = (x) => x * 2
    const square = (x) => x * x
    const halve = (x) => x / 2

    test('', () => {
        const doublePlusOne = (x) => increment(double(x))
        console.log(doublePlusOne(10)) // 21
        const calculateThings = (x) => halve(square(increment(double(x))))
        console.log(calculateThings(10)) // 220.5
    })

    test('pipe', () => {
        const calculateThings
            = R.pipe(double, increment, square, halve)
        console.log(calculateThings(10)) // 220.5
    })

    test('mathPipe', () => {
        const mathPipe = R.pipe(
            R.multiply(4),
            R.add(2),
            R.divide(2)
        )
        console.log(mathPipe(10))
    })

    test('map', () => {
        const people = ['James', 'Hadley', 'Terry', 'Trev', 'Szab']
        const addTitle = R.curry((title, name) => `${title}. ${name}`)
        R.map(addTitle('Mr'), people) // ['Mr. James', 'Mr. Hadley', 'Mr. Terry', 'Mr. Trev', 'Mr. Szab']
        R.map(addTitle('Dr'), people) //['Dr.  James', 'Dr.  Hadley', 'Dr. Terry', 'Dr. Trev', 'Dr. Szab']
    })

    test('game', () => {
        const game = {
            name: 'Keep Talking and Nobody Explodes',
            genres: ['Puzzle', 'VR'],
            publisher: {
                name: 'Steel Crate Games',
                location: 'Ottawa, Canada'
            }
        }
        const name = R.lensProp('name')
        R.view(name, game) // 'Keep Talking and Nobody Explodes'
        const first = R.lensIndex(0)
        R.view(first, game.genres) // 'Puzzle'
        const publisherName = R.lensPath(['publisher', 'name'])
        R.view(publisherName, game) // 'Steel Crate Games'
        // You can also reference indexes with lensPath
        const firstGenre = R.lensPath(['genre', 0])
        R.view(firstGenre, game) // 'Puzzle'
    })

    test("chain", function () {

        let names = ['alonzo church', 'Haskell curry', 'stephen_kleene', 'John Von Neumann', 'stephen_kleene'];

        const isEmpty = s => !s || !s.trim();
        const isValid = val => !_.isUndefined(val) && !_.isNull(val);
        const trim = str => str.replace(/^\s*|\s*$/g, '');
        const normalize = str => str.replace(/\-/g, '');

        let result = _.chain(names)
            .filter(isValid)
            .map(s => s.replace(/_/, ' '))
            .uniq()
            .map(_.startCase)
            .sort()
            .value();

        console.log(result)

    });

});

