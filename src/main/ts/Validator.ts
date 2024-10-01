/*
* */
import {compose, pipe} from "ramda"

export class Validator<T> {

    exceptions: Array<string>;
    obj: T;

    private constructor(obj: T) {
        this.exceptions = new Array<string>();
        this.obj = obj;
    }

    static of<T>(t: T) {
        return new Validator(t);
    }

    public mapAndValidate(projection: (item: T) => any, validation: (obj: any) => boolean, message: string) {
        return this.validate(pipe(projection, validation), message);
    }

    public validate(validation: (item: T) => boolean, message: string): Validator<T> {
        if (validation(this.obj)) {
            this.exceptions.push(message);
        }
        return this;
    }

    public get() {
        if (this.exceptions.length === 0) {
            return this.obj;
        }
        return this.exceptions;
    }

}

