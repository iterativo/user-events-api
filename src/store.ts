import { IEvent } from "./models/event.model";
import { IUser } from "./models/user.model";

const store: {
    events: IEvent[];
    users: IUser[];
} = {
    events: [],
    users: [],
};

export default store;
