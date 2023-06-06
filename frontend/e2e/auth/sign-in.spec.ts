import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("Sign In", () => {
  test("it should throw an error, when the credentials are invalid", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/sign-in");
    await page.fill('input[name="email"]', "alain.delon@exemple.fr");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });

  test("it should redirect to the home page, when the credentials are valid", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/sign-in");
    await page.fill('input[name="email"]', "alain.delon@exemple.fr");
    await page.fill('input[name="password"]', "machinchose");
    await page.click('button[type="submit"]');
    // expect(page.url()).toBe("http://localhost:3000/");
    // wait for the page to be redirected
    await page.waitForURL("http://localhost:3000/");

    expect(page.url()).toBe("http://localhost:3000/");
  });
});
