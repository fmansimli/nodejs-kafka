import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../src/app";

const COLL = {
  title: "Collection 1",
  description: "Collection 1 desc",
};

const UPDATED = {
  title: "Collection 11",
  description: "Collection 1 desc 1",
};

let accessToken: string;
let collectionId: string;
let userId: string;

beforeAll(async () => {
  process.env.DB_NAME = "mooveTest";

  const resp = await request(app).post("/api/auth/register").send({
    email: "fm_test@test.com",
    password: "12345",
    username: "fm_test",
  });

  accessToken = resp.body.body.tokens.accessToken;
  userId = resp.body.body.user._id;
});

afterAll(async () => {
  try {
    await request(app)
      .delete("/api/users/" + userId)
      .set("authorization", "Bearer " + accessToken);

    await request(app)
      .post("/api/admiin/drop-collection")
      .send({ name: "collections" })
      .set("authorization", "Bearer " + accessToken);
  } catch (error) {
    console.error(error);
  } finally {
    process.env.DB_NAME = "moove";
  }
});

describe(" *POST* enpoint tests ...", () => {
  it("should create a collection through posted data..", async () => {
    const resp = await request(app)
      .post("/api/collections")
      .send(COLL)
      .set("authorization", "Bearer " + accessToken);

    collectionId = resp.body.body.collection._id;

    expect(resp.statusCode).toBe(201);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.collection).toBeDefined();
    expect(resp.body.body.collection).toHaveProperty("_id");
    expect(resp.body.body.collection.title).toBe(COLL.title);
    expect(resp.body.body.collection.description).toBe(COLL.description);
  });
});

describe(" *GET* enpoint tests ...", () => {
  it("should return all collections by pagination...", async () => {
    const resp = await request(app)
      .get("/api/collections")
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.pagination).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body.collections.length).toBeDefined();
    expect(resp.body.pagination.currentPage).toBe(1);
  });

  it("should return a collection by given id", async () => {
    const resp = await request(app)
      .get("/api/collections/" + collectionId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.collection).toBeDefined();
    expect(resp.body.body.collection._id).toBe(collectionId);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
  });
});

describe(" *PUT && PATCH* enpoint tests ...", () => {
  it("should update (PUT) a collection by given id..", async () => {
    const resp = await request(app)
      .put("/api/collections/" + collectionId)
      .send(UPDATED)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.collection).toBeDefined();
    expect(resp.body.body.collection).toHaveProperty("_id");
    expect(resp.body.body.collection.title).toBe(UPDATED.title);
  });
});

describe(" *DELETE* enpoint tests ...", () => {
  it("should delete a collection by given id", async () => {
    const resp = await request(app)
      .delete("/api/collections/" + collectionId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
  });
});
