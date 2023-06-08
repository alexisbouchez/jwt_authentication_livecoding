import app from "../app";
import testDataSource from "../utils/testDataSource";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { User } from "../models/User";

describe("AuthController", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  describe("signUp", () => {
    it("should throw an error, if email already used", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await User.create({ email, password }).save();

      const response = await supertest(app)
        .post("/api/auth/sign-up")
        .send({ email, password })
        .set("Accept", "application/json");

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Email already in use");
    });

    it("should return json web token, if email is free", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const response = await supertest(app)
        .post("/api/auth/sign-up")
        .send({ email, password })
        .set("Accept", "application/json");

      expect(response.status).toEqual(200);
      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(10);
      expect(response.body.token.split(".").length).toBe(3);
    });
  });

  describe("signIn", () => {
    it("should throw an error, if credentials are invalid", async () => {
      const email = faker.internet.email();
      const correctPassword = faker.internet.password();
      const badPassword = faker.internet.password();

      await User.create({ email, password: correctPassword }).save();

      const response = await supertest(app)
        .post("/api/auth/sign-in")
        .send({ email, password: badPassword })
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body.error).toEqual("Invalid credentials");
    });

    it("should return json web token, if credentials are valid", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await User.create({ email, password }).save();

      const response = await supertest(app)
        .post("/api/auth/sign-in")
        .send({ email, password })
        .set("Accept", "application/json");

      expect(response.status).toEqual(200);
      expect(typeof response.body.token).toBe("string");
      expect(response.body.token.length).toBeGreaterThan(10);
      expect(response.body.token.split(".").length).toBe(3);
    });
  });

  describe("getProfile", () => {
    it("should throw an error, if user is not authenticated", async () => {
      const response = await supertest(app).get("/api/auth/profile");

      expect(response.status).toEqual(401);
      expect(response.body.error).toBe("Not authenticated");
    });

    it("should return email, if user is authenticated", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await User.create({ email, password }).save();

      const signInResponse = await supertest(app)
        .post("/api/auth/sign-in")
        .send({ email, password })
        .set("Accept", "application/json");

      const response = await supertest(app)
        .get("/api/auth/profile")
        .set("Authorization", "Bearer " + signInResponse.body.token);

      expect(response.status).toEqual(200);
      expect(response.body.email).toBe(email);
    });
  });
});
