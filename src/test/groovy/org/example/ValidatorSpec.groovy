package org.example

import spock.lang.Specification

import java.util.function.Predicate

class ValidatorSpec extends Specification {

    void givenInvalidUser_whenValidatorValidate_thenReturnErrors() {
        given:
        User user = new User("", 90, null, "foobar.com")
        when:
        def result = Validator.of(user)
                .validate(User::name, Objects::isNull, "name is null")
                .validate(User::name, String::isEmpty, "name is empty")
                .validate(User::gender, Objects::isNull, "gender is null")
                .validate(User::email, email -> !email.contains("@"), "email doesn't contains '@'")
                .validate(User::age, age -> !(age > 20 && age < 30), "age isn't between...")
                .get()
        then:
        result.each { println "ERROR: ${it} ${user}"}
        result.size() > 0
    }

    def "givenValidUser_whenValidate_thenReturnNoErrors"() {
        given:
        User user = new User("", 90, null, "foobar.com")
        when:
        def result = Validator.of(user)
                .validate(Objects::isNull, "user is null")
                .validate(u -> u.email() == null, "email is null")
                .get()
        then:
        result.size() == 0
    }

    void givenInvalidUser_whenPredicateTest_thenReturnFalse() {
        given:
        User user = new User("", 90, null, "foobar.com");
        Predicate<User> predicate = Validator.validate((User u) -> u.age(), age -> age > 20 && age < 30)
        var result = predicate.test(user)
        expect:
        !result
    }

    void givenValidUser_whenPredicateTest_thenReturnTrue() {
        given:
        User user = new User("", 90, null, "foobar.com");
        when:
        Predicate<User> predicate = Validator.isEqual((User u) -> u.age(), 90)
        var result = predicate.test(user)
        then:
        result
    }

}