import faker from "faker";
import validator from "validator";

import {
    create,
    IEventListOptions,
    list,
 } from "../event.service";

import { IEvent } from "../../models/event.model";
import store from "../../store";

describe("event.service", () => {
    beforeEach(() => {
        store.events = [];
    });

    describe("list()", () => {
        it("should list all events in the store", () => {
            const mockEvents: IEvent[] = [
                { type: "FOO", userId: faker.random.uuid() },
                { type: "BAR", userId: faker.random.uuid() },
            ];
            store.events = mockEvents;

            expect(list()).toMatchObject(mockEvents);
        });

        it("should list all events for the last day", () => {
            const today = Date.now();
            const yesterday = new Date(Date.now() - 86400000).getTime();
            const todayEvent = { type: "BAR", userId: faker.random.uuid(), created: today };
            const yesterdayEvent = { type: "FOO", userId: faker.random.uuid(), created: yesterday };
            const mockEvents: IEvent[] = [
                yesterdayEvent,
                todayEvent,
            ];
            store.events = mockEvents;

            const options: IEventListOptions = {
                limitToLastDay: true,
            };

            const events = list(options);

            expect(events).toHaveLength(1);
            expect(events[0]).toMatchObject(todayEvent);
        });

        it("should list all events for a determined user", () => {
            const today = Date.now();
            const yesterday = new Date(Date.now() - 86400000).getTime();

            const userId = faker.random.uuid();
            const userEvent1 = { type: "BAR_1", userId, created: today };
            const userEvent2 = { type: "BAR_2", userId, created: yesterday };
            const otherUserEvent = { type: "FOO", userId: faker.random.uuid(), created: today };
            const mockEvents: IEvent[] = [
                userEvent1,
                userEvent2,
                otherUserEvent,
            ];
            store.events = mockEvents;

            const options: IEventListOptions = {
                userId,
            };

            const events = list(options);

            expect(events).toHaveLength(2);
            expect(events).toMatchObject([userEvent1, userEvent2]);
        });
    });

    describe("create()", () => {
        describe("when the event type is empty", () => {
            it("should not create the event", () => {
                const event = {
                    type: "",
                    userId: faker.random.uuid(),
                };

                expect(() => create(event)).toThrowError();
            });
        });

        describe("when userId is invalid", () => {
            it("should not create the event", () => {
                const event = {
                    type: "FOO",
                    userId: `${faker.random.uuid()}-12345`,
                };

                expect(() => create(event)).toThrowError();
            });
        });

        describe("when the event type is provided", () => {
            it("should create the event", () => {
                const userId1 = faker.random.uuid();
                const userId2 = faker.random.uuid();

                const user1Event1: IEvent = {
                    type: "FOO",
                    userId: userId1,
                };

                // First event creation
                let newEventId = create(user1Event1);

                expect(validator.isUUID(newEventId)).toBeTruthy();
                expect(store.events).toHaveLength(1);
                expect(store.events).toMatchObject([user1Event1]);

                const user1Event2: IEvent = {
                    type: user1Event1.type,
                    userId: userId1,
                };

                // Second event creation: Another event of same type for same user
                newEventId = create(user1Event2);

                expect(validator.isUUID(newEventId)).toBeTruthy();
                expect(store.events).toHaveLength(2);
                expect(store.events).toMatchObject([user1Event1, user1Event2]);

                const user2Event: IEvent = {
                    type: "BAR",
                    userId: userId2,
                };

                // Third event creation: new event type for another user
                newEventId = create(user2Event);

                expect(validator.isUUID(newEventId)).toBeTruthy();
                expect(store.events).toHaveLength(3);
                expect(store.events).toMatchObject([user1Event1, user1Event2, user2Event]);
            });
        });
    });
});
