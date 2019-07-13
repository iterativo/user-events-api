# Simple REST API using `Node`/`Express`/`TypeScript`

For more info on the requirements, [see these instructions](https://github.com/ns8inc/ns8-tech-assessment).

## To run locally

### 1. Start server

```bash
npm ci
npm run dev
```

### 2. Load postman test script

On [postman](https://www.getpostman.com/), import the `user-events-api.postman-collection.json` file.

#### Happy path

Run the requests in the collection in this order:

- `Add User` (copy the `userId` returned)
- `Add User Event` (setup: paste the previous `userId` into `Params/Path Variables :id`)
- `List User Events` (setup: paste the previous `userId` into `Params/Path Variables :id`)
- `Return all Events for All Users`
- `Return all Events for the last day`

#### Exploratory testing

- Run `Add User` multiple times with the same user email, different user emails, etc. You may want to keep track of the returned `userId` values for successful responses.
- Paste any of the previously copied `userId` values into the `Params/Path Variables: id` fields for any of the requests in the collection's `/users/{id}/events` subdir and perform the requests.
- Perform the rest of the requests at the root level of the collection.

## Dev Notes

### Assumptions

- Endpoints don't need to be secured.
- No endpoint needed for `GET: /users`.
- Don't need to filter `Event`s by `date` except for last day.
- Last day is assumed to mean *current day*.
- No [hateoas](https://restfulapi.net/hateoas/) support needed.
- Requests body is `json`.

### TODOs

- [ ] Proper logging for debugging
- [ ] Provide config files for other envs
- [ ] Encrypt passwords
- [ ] Implement custom Errors
- [ ] Improve event.service.test.js when testing for limitToLastDay (need to test for same day in previous months/years).
- [ ] Cross-validate events with users; i.e., when an event is POSTed, the userId must correspond to a stored user.
- [ ] Add API unit tests
- [ ] Add `git` commit/push hooks
- [ ] Refactor index.ts: abstract out route declarations
- [ ] Add authorization/authentication
- [ ] Add express middleware for logging, error handling, etc.
- [ ] Enable absolute routes around central resources (e.g., models, services, etc.) to eliminate relative paths where applicable.
- [ ] Improve validation on services to return all invalid fields in error message at once.
- [ ] Return 200 on “user with same email” error instead of 500
