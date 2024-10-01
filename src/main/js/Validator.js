/*
* */
exports.Validator = class Validator {

    constructor(value) {
        this._exceptions = [];
        this._value = value;
    }

    static of(a) {
        return new Validator(a);
    }

    mapAndValidate(projection, validation, message) {
        return this.validate(pipe(projection, validation), message);
    }

    validate(validation, message) {
        if (validation(this._value)) {
            this._exceptions.push(message);
        }
        return this;
    }

    get() {
        if (this._exceptions.length === 0) {
            return this._value;
        }
        return this._exceptions
    }

}

exports.compose = compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args)
exports.pipe = pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);
