import { v4 as uuid } from "uuid";
import validator from "validator";

import { IUser } from "../models/user.model";
import store from "../store";

export const create: (user: IUser) => string = (user) => {
    const isEmailValid = validator.isEmail(user.email);
    if (!isEmailValid) {
        throw new Error("Email is invalid");
    }

    const isPasswordProvided = !!user.password;
    if (!isPasswordProvided) {
        throw new Error("Password is missing");
    }

    const alreadyExists = store.users.find((u) => u.email === user.email);
    if (alreadyExists) {
        throw new Error("User with same email already exists");
    }

    user.id = uuid();

    store.users.push(user);

    return user.id;
};
