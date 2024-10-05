/*
* */
import {Gender} from "./Gender";

export class User {

    name: string | null;
    age: number;
    gender: Gender | null;
    email: string;

    constructor(name: string | null, age: number, gender: Gender | null, email: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
    }

}