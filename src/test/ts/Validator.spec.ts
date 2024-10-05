import {compose, pipe} from "ramda"

import {User} from '../../main/ts/User';
import {Validator} from '../../main/ts/Validator';
import {Gender} from '../../main/ts/Gender';

describe('Validator Test', () => {

    test("validation", () => {

        let user = new User(null, 90,null, "foobar.com");

        const result = Validator.of(user)
            .mapAndValidate(user => user.name, name => name == null, "name is null")
            .mapAndValidate(user => user.name, name => name == null || name.length === 0, "name is empty")
            .mapAndValidate(user => user.age, age => !(age > 20 && age < 30), "age isn't between...")
            .mapAndValidate(user => user.gender, gender => gender == null, "gender is null")
            .mapAndValidate(user => user.email, email => !email.includes("@"), "email doesn't contains '@'")
            .get();

        if (!(result instanceof User)) {
            result.forEach(it => console.log(it));
        }

        expect((result as []).length).toBe(5);
    })

    test("mapAndValidate", () => {
        let user = new User("", 24, Gender.MALE, "foobar.com")
        let validator = Validator.of(user)
        let result = validator.mapAndValidate((user: User) => user.name, (s: string) => s == null || s.length == 0, "name is null or empty ")
        console.log(result.get())
    })

    test("fun", () => {
        let user = new User("John", 24, Gender.MALE, "foobar.com")
        let name = (user: User) => user.name
        console.log(name(user))
    })

    it("compose", () => {
        let user = new User("John", 24, Gender.MALE, "foobar.com")
        let name = (user: User) => user.name;
        let isEmpty = (s: string | null) => s == null || s.length == 0
        console.log(compose(isEmpty, name)(user))
    });

    it("pipe", () => {
        let user = new User("", 24, Gender.MALE, "foobar.com")
        let name = (user: User) => user.name;
        let isEmpty = (s: string | null) => s == null || s.length == 0
        console.log(pipe(name, isEmpty)(user))
    });

})



