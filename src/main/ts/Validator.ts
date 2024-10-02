/*
* */
import {compose, pipe} from "ramda"

export class Validator<T> {

    private readonly exceptions: Array<string>;
    private readonly obj: T;

    private constructor(obj: T) {
        this.exceptions = new Array<string>();
        this.obj = obj;
    }

    static of<T>(t: T): Validator<T> {
        return new Validator(t);
    }

    public mapAndValidate(projection: <T, R> (item: T) => R, validation: <R> (obj: R) => boolean, message: string): Validator<T> {
        return this.validate(pipe(projection, validation), message);
    }

    public validate(validation: (item: T) => boolean, message: string): Validator<T> {
        if (validation(this.obj)) {
            this.exceptions.push(message);
        }
        return this;
    }

    public get(): T | Array<string> {
        if (this.exceptions.length === 0) {
            return this.obj;
        }
        return this.exceptions;
    }

}

