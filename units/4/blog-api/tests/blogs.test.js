const { test, describe, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const assert = require("node:assert");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogEntry = new Blog(initialBlogs[0]);
  await blogEntry.save();
  blogEntry = new Blog(initialBlogs[1]);
  await blogEntry.save();
});
// ...

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 saved blogs", async () => {
  const result = await api.get("/api/blogs");

  assert.strictEqual(result.body.length, 2);
});

test("there is a ID property", async () => {
  const result = await api.get("/api/blogs");

  result.body.forEach((blog) => assert(blog.id));
});

test("a valid blog can be added", async () => {
  const newBlog = initialBlogs[2];

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await api.get("/api/blogs");
  const titles = result.body.map(({ title }) => title);

  assert.strictEqual(result.body.length, 3);
  assert.strictEqual(titles.includes(newBlog.title), true);
});

test("a blog without likes defaults to 0", async () => {
  const newBlog = initialBlogs[3];
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201);

  const result = await api.get("/api/blogs");

  assert.strictEqual(result.body[2].likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});