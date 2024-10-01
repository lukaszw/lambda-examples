/*
* */
import {Grnder} from "./Grnder";

export class User {

    name: string | null;
    age: number;
    gender: Grnder | null;
    email: string;

    constructor(name: string | null, age: number, gender: Grnder | null, email: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
    }

}