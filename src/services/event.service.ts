import uuid from "uuid";
import validator from "validator";

import { IEvent } from "../models/event.model";
import store from "../store";

export interface IEventListOptions {
    limitToLastDay?: boolean;
    userId?: string;
}

export const list: (options?: IEventListOptions) => IEvent[] = (options = {}) => {
    let events = store.events;
    if (options.limitToLastDay) {
        const lastDate = new Date(Date.now());
        events = events.filter((e: IEvent) => {
            const createdDate = new Date(e.created);
            return createdDate.getDay() === lastDate.getDay()
                && createdDate.getMonth() === lastDate.getMonth()
                && createdDate.getFullYear() === lastDate.getFullYear();
        });
    }

    if (options.userId) {
        events = events.filter((e: IEvent) => e.userId === options.userId);
    }

    return events;
};

export const create: (event: IEvent) => string = (event) => {
    if (!event.type) {
        throw new Error("Type must be provided");
    }

    if (!validator.isUUID(event.userId)) {
        throw new Error("Invalid userId");
    }

    event.id = uuid();
    store.events.push(event);
    return event.id;
};
