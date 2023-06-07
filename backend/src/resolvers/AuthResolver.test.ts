import { faker } from "@faker-js/faker";
import { User } from "../models/User";
import createTestDataSource from "../utils/createTestDataSource";
import { callGraphQL } from "../utils/callGraphQL";

describe("AuthResolver", () => {
  beforeAll(async () => {
    await createTestDataSource(true).initialize();
  });

  describe("signUp", () => {
    it("should throw error, if email is already used", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await User.create({ email, password }).save();

      const response = await callGraphQL({
        query: `
            mutation Mutation($password: String!, $email: String!) {
                signUp(password: $password, email: $email)
            }
        `,
        variables: { email, password },
      });

      expect(response.errors).toBeTruthy();
      expect(response.errors?.length).toBeGreaterThanOrEqual(1);
      expect(response.errors![0]).toHaveProperty("message");
      expect(response.errors![0].message).toContain("UNIQUE constraint");

      expect(response.data).not.toBeTruthy();
    });

    it("should return a valid token, after a successful registration", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const response = await callGraphQL({
        query: `
            mutation Mutation($password: String!, $email: String!) {
                signUp(password: $password, email: $email)
            }
        `,
        variables: { email, password },
      });

      expect(response.errors).not.toBeTruthy();

      expect(response.data).toBeTruthy();
      expect(response.data).toHaveProperty("signUp");

      // Test a JWT token is returned
      expect(typeof response.data!.signUp).toBe("string");
      expect(response.data!.signUp.length).toBeGreaterThan(10);
      expect(response.data!.signUp.split(".").length).toBe(3);
    });
  });

  describe("signIn", () => {
    it("should throw error, if credentials are invalid", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const badPassword = faker.internet.password();

      await User.create({ email, password }).save();

      const response = await callGraphQL({
        query: `
          query Query($password: String!, $email: String!) {
            signIn(password: $password, email: $email)
          }        
        `,
        variables: { email, password: badPassword },
      });

      expect(response.errors).toBeTruthy();
      expect(response.errors!.length).toBeGreaterThanOrEqual(1);
      expect(response.errors![0]).toHaveProperty("message");
      expect(response.errors![0].message).toBe("Invalid credentials");

      expect(response.data).not.toBeTruthy();
    });

    it("should return token, if credentials are valid", async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await User.create({ email, password }).save();

      const response = await callGraphQL({
        query: `
          query Query($password: String!, $email: String!) {
            signIn(password: $password, email: $email)
          }        
        `,
        variables: { email, password },
      });

      expect(response.errors).not.toBeTruthy();

      expect(response.data).toBeTruthy();
      expect(response.data).toHaveProperty("signIn");

      // Test a JWT token is returned
      expect(typeof response.data!.signIn).toBe("string");
      expect(response.data!.signIn.length).toBeGreaterThan(10);
      expect(response.data!.signIn.split(".").length).toBe(3);
    });
  });
});
