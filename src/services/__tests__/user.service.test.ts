import * as faker from "faker";
import validator from "validator";

import { create } from "../user.service";

import { IUser } from "../../models/user.model";
import store from "../../store";

describe("user.service", () => {
    describe("create()", () => {
        const existingUser: IUser = {
            email: faker.internet.email(),
            id: faker.random.uuid(),
            password: faker.internet.password(),
        };

        beforeEach(() => {
            store.users = [existingUser];
        });

        describe("when no other user with same email exists", () => {
            it("should create the user", () => {
                const newUser: IUser = {
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                };

                const newUserId = create(newUser);

                expect(store.users).toHaveLength(2);
                expect(store.users).toMatchObject([
                    existingUser,
                    newUser,
                ]);
                expect(validator.isUUID(newUserId)).toBeTruthy();
            });
        });

        describe("when a user with same email exists", () => {
            it("should not create the user", () => {
                const newUser: IUser = {
                    email: existingUser.email,
                    password: faker.internet.password(),
                };

                const createFn = () => { create(newUser); };

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);
                expect(store.users).toMatchObject([existingUser]);
            });
        });

        describe("when user email is invalid", () => {
            it("should not create the user", () => {
                const newUser: IUser = {
                    email: "invalid@email",
                    password: faker.internet.password(),
                };

                const createFn = () => { create(newUser); };

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);
                expect(store.users).toMatchObject([existingUser]);
            });
        });

        describe("when user has no email", () => {
            it("should not create the user", () => {
                const newUser: IUser = {
                    email: undefined,
                    password: faker.internet.password(),
                };

                const createFn = () => { create(newUser); };

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);

                newUser.email = "";

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);
                expect(store.users).toMatchObject([existingUser]);
            });
        });

        describe("when user has no password", () => {
            it("should not create the user", () => {
                const newUser: IUser = {
                    email: faker.internet.email(),
                    password: undefined,
                };

                const createFn = () => { create(newUser); };

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);

                newUser.password = "";

                expect(createFn).toThrowError();
                expect(store.users).toHaveLength(1);
                expect(store.users).toMatchObject([existingUser]);
            });
        });
    });
});
