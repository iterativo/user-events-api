import { v4 as uuid } from "uuid";
import validator from "validator";

import { IUser } from "../models/user.model";
import store from "../store";

const validPhoneFormat = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

export const create: (user: IUser) => string = (user) => {
    const isEmailValid: boolean = validator.isEmail(user.email);
    if (!isEmailValid) {
        throw new Error("Email is invalid");
    }

    const isPasswordProvided: boolean = !!user.password;
    if (!isPasswordProvided) {
        throw new Error("Password is missing");
    }

    const alreadyExists: object | undefined = store.users.find((u) => u.email === user.email);
    if (alreadyExists) {
        throw new Error("User with same email already exists");
    }

    const phoneIsInvalid: boolean = !!user.phone && !validPhoneFormat.test(user.phone);
    if (phoneIsInvalid) {
        throw new Error("Phone format is invalid - it should be ###-###-####");
    }

    user.id = uuid();

    store.users.push(user);

    return user.id;
};
