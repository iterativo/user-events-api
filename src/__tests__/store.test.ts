import store from "../store";

describe("store", () => {
    it("should initialize events", () => {
        expect(store.events).toEqual([]);
    });

    it("should initialize users", () => {
        expect(store.users).toEqual([]);
    });
});
