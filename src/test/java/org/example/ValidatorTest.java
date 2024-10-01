package org.example;

import java.util.Objects;
import java.util.function.Predicate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ValidatorTest {

    @Test
    void givenInvalidUser_whenValidatorValidate_thenReturnErrors() {
        User user = new User("", 90, null, "foobar.com");
        var result = Validator.of(user)
                .validate(User::name, Objects::isNull, "name is null")
                .validate(User::name, String::isEmpty, "name is empty")
                .validate(User::gender, Objects::isNull, "gender is null")
                .validate(User::email, email -> !email.contains("@"), "email doesn't contains '@'")
                .validate(User::age, age -> !(age > 20 && age < 30), "age isn't between...")
                .get();
        result.forEach(System.out::println);
        Assertions.assertFalse(result.isEmpty());
    }

    @Test
    void givenValidUser_whenValidate_thenReturnNoErrors() {
        User user = new User("", 90, null, "foobar.com");
        var result = Validator.of(user)
                .validate(Objects::isNull, "user is null")
                .validate(user1 -> user1.email() == null, "email is null")
                .get();
        result.forEach(System.out::println);
        Assertions.assertTrue(result.isEmpty());
    }

    @Test
    void givenInvalidUser_whenPredicateTest_thenReturnFalse() {
        User user = new User("", 90, null, "foobar.com");
        Predicate<User> predicate = Validator.validate((User u) -> u.age(), age -> age > 20 && age < 30);
        var result = predicate.test(user);
        Assertions.assertFalse(result);
    }

    @Test
    void givenValidUser_whenPredicateTest_thenReturnTrue() {
        User user = new User("", 90, null, "foobar.com");
        Predicate<User> predicate = Validator.isEqual((User u) -> u.age(), 90);
        var result = predicate.test(user);
        Assertions.assertTrue(result);
    }

}