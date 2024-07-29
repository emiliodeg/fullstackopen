const { test, describe, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const assert = require("node:assert");
const User = require("../models/user");

const api = supertest(app);

describe("users api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("create users fails without username", async () => {
    const response = await api
      .post("/api/users")
      .send({
        name: "John Smith",
        password: "123456",
      })
      .expect(400);

    assert.match(response.body.error, /username/);
    assert.match(response.body.error, /required/);
  });

  test("create users fails with username less than 3 characters", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "js",
        name: "John Smith",
        password: "123456",
      })
      .expect(400);

    assert.match(response.body.error, /username/);
    assert.match(response.body.error, /is shorter than/);
  });

  test("create users fails without password", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "jsmith",
        name: "John Smith",
      })
      .expect(400);

    assert.match(response.body.error, /password/);
    assert.match(response.body.error, /required/);
  });

  test("create users fails with password less than 3 characters", async () => {
    const response = await api
      .post("/api/users")
      .send({
        username: "jsmith",
        name: "John Smith",
        password: "pw",
      })
      .expect(400);

    assert.match(response.body.error, /password/);
    assert.match(response.body.error, /\d+ characters long/);
  });

  test("create user fails with duplicate username", async () => {
    const newUser = {
      username: "jsmith",
      name: "John Smith",
      password: "password123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.post("/api/users").send(newUser).expect(400);

    assert.match(response.body.error, /already exists/);
  });

  test("create user succeeds", async () => {
    const newUser = {
      username: "jsmith",
      name: "John Smith",
    };

    const response = await api
      .post("/api/users")
      .send({ ...newUser, password: "password123" })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert(response.body.id);
    assert.equal(response.body.username, newUser.username);
    assert.equal(response.body.name, newUser.name);
    assert.equal(response.body.password, undefined);

    const users = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.equal(users.body.length, 1);
    assert.equal(users.body[0].username, newUser.username);
    assert.equal(users.body[0].name, newUser.name);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
