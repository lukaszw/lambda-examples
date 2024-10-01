package org.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Predicate;

public class Validator<T> {

    private final T obj;
    private final List<String> exceptions = new ArrayList<>();

    private Validator(T obj) {
        this.obj = obj;
    }

    public static <T> Validator<T> of(T t) {
        return new Validator<>(Objects.requireNonNull(t));
    }

    public <U> Validator<T> validate(Function<? super T, ? extends U> projection,
                                     Predicate<? super U> validation,
                                     String message) {
        return validate(projection.andThen(validation::test)::apply, message);
    }

    public Validator<T> validate(Predicate<? super T> validation, String message) {
        if (validation.test(obj)) {
            exceptions.add(message);
        }
        return this;
    }

    public List<String> get() {
        if (exceptions.isEmpty()) {
            return List.of();
        }
        return exceptions;
    }

    public static <T, R> Predicate<T> isEqual(Function<? super T, ? extends R> f, R value) {
        return f.andThen(Predicate.isEqual(value)::test)::apply;
    }

    public static <T, R> Predicate<T> validate(Function<? super T, ? extends R> f, Predicate<? super R> p) {
        return f.andThen(p::test)::apply;
    }

}
