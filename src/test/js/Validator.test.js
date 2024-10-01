const R = require('ramda')
const _ = require('lodash')
const {User} = require("../../main/js/User")
const {Validator, pipe, compose} = require("../../main/js/Validator")
const Gender = require("../../main/js/Gender")

describe('Validator Test', function () {

    test("validation", function () {

        let user = new User("", 90, null, "foobar.com")

        const result = Validator.of(user)
            .mapAndValidate(user => user._name, name => name == null, "name is null")
            .mapAndValidate(user => user._name, name => name == null || name.length === 0, "name is empty")
            .mapAndValidate(user => user._age, age => !(age > 20 && age < 30), "age isn't between...")
            .mapAndValidate(user => user._gender, gender => gender == null, "gender is null")
            .mapAndValidate(user => user._email, email => !email.includes("@"), "email doesn't contains '@'")
            .get()

        result.forEach(it => console.log(it))
    })

    test("fun", function () {
        let user = new User("John", 24, Gender.MALE, "foobar.com")
        let name = user => user._name
        console.log(name(user))
    })

    test("pipe", function () {
        let user = new User("John", 24, Gender.MALE, "foobar.com")
        let name = user => user._name;
        let czyEmpty = s => s != null && !s.isEmpty
        console.log(pipe(name, czyEmpty)(user))
    })

    test("compose", function () {
        let user = new User("John", 24, Gender.MALE, "foobar.com")
        let name = user => user._name;
        let czyEmpty = s => s != null && !s.isEmpty
        console.log(compose(czyEmpty, name)(user))
    })

})



