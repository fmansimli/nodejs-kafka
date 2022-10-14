import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../src/app";

const PLACE = {
  name: "Test Cotta Warrior 1",
  address: "2555 Judah St",
  location: {
    type: "Point",
    coordinates: [-122.48960214215857, 37.76124914574683],
  },
  city: "dsdskjdsdjsdskdsds",
  imageUrl: "im_url",
  score: 4,
};

const UPDATED_PLACE = {
  name: "Test Cotta Warrior 11",
};

const point = { lat: 37.761249145456, long: -122.48960214456 };

let accessToken: string;
let userId: string;
let placeId: string;

beforeAll(async () => {
  process.env.DB_NAME = "mooveTest";

  const resp = await request(app).post("/api/auth/register").send({
    email: "fm_test@test.com",
    password: "12345",
    username: "fm_test",
  });

  accessToken = resp.body.body.tokens.accessToken;
  userId = resp.body.body.user._id;

  await request(app)
    .post("/api/admiin/create-index")
    .send({ location: "2dsphere", collection: "places" })
    .set("authorization", "Bearer " + accessToken);
});

afterAll(async () => {
  try {
    await request(app)
      .delete("/api/users/" + userId)
      .set("authorization", "Bearer " + accessToken);

    await request(app)
      .post("/api/admiin/drop-collection")
      .send({ name: "places" })
      .set("authorization", "Bearer " + accessToken);
  } catch (error) {
    console.error(error);
  } finally {
    process.env.DB_NAME = "moove";
  }
});

describe(" *POST* enpoint tests ...", () => {
  it("should create a place through posted data..", async () => {
    const resp = await request(app)
      .post("/api/places")
      .send(PLACE)
      .set("authorization", "Bearer " + accessToken);

    placeId = resp.body.body.place._id;

    expect(resp.statusCode).toBe(201);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body).toHaveProperty("place");
    expect(resp.body.body.place).toHaveProperty("_id");
    expect(resp.body.body.place.name).toBe(PLACE.name);
    expect(resp.body.body.place.city).toBe(PLACE.city);
  });
});

describe(" *GET* enpoint tests ...", () => {
  it("should return all places by pagination...", async () => {
    const resp = await request(app)
      .get("/api/places")
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.pagination).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body.places.length).toBeDefined();
    expect(resp.body.pagination.currentPage).toBe(1);
  });

  it("should return a place by given id", async () => {
    const resp = await request(app)
      .get("/api/places/" + placeId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.place).toBeDefined();
    expect(resp.body.body.place).toHaveProperty("_id");
    expect(resp.body.body.place._id).toBe(placeId);
    expect(resp.body.body.place.name).toBe(PLACE.name);
    expect(resp.body.body.place.city).toBe(PLACE.city);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
  });

  it("should return places where name of place includes given keyword", async () => {
    const resp = await request(app)
      .get("/api/places/search?name=" + "cotta")
      .set("authorization", "Bearer " + accessToken);

    const place1 = resp.body.body.places[0];

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body.places.length).toBeDefined();
    expect(place1._id).toBe(placeId);
  });

  it("should return places near you by given lat,long and distance", async () => {
    const resp = await request(app)
      .get(`/api/places/nearby/0/1000/?lat=${point.lat}&long=${point.long}`)
      .set("authorization", "Bearer " + accessToken);

    const place1 = resp.body.body.places[0];

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body.places.length).toBeDefined();
    expect(place1.name).toBe(PLACE.name);
    expect(place1._id).toBe(placeId);
  });
});

describe(" *PUT && PATCH* enpoint tests ...", () => {
  it("should update (PUT) a place by given id..", async () => {
    const resp = await request(app)
      .put("/api/places/" + placeId)
      .send(UPDATED_PLACE)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
    expect(resp.body.body.place).toBeDefined();
    expect(resp.body.body.place).toHaveProperty("_id");
    expect(resp.body.body.place.name).toBe(UPDATED_PLACE.name);
  });
});

describe(" *DELETE* enpoint tests ...", () => {
  it("should delete a place by given id", async () => {
    const resp = await request(app)
      .delete("/api/places/" + placeId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
  });
});
