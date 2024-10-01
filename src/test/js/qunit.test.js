function add (a, b) {
    return a + b;
}

const R = require('ramda');
const _ = require('lodash');

QUnit.module('add', hooks => {

    QUnit.test('two numbers', assert => {
        QUnit.assert.equal(add(1, 2), 3);
    });

    QUnit.test("chain", hooks => {

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

        QUnit.assert.equal(result.length, 4);
    });

});
