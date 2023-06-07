import { test, expect } from "@playwright/test";

test("throw an error when credentials are invalid", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await page
    .getByPlaceholder("alain.delon@exemple.fr")
    .fill("invalide@invalide.fr");
  await page.getByPlaceholder("••••••••••").fill("trucmuche");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Je vérifie que je trouve un message d'erreur (il doit contenir "Invalid credentials")
  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("redirect to home page when credentials are valid", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  await page
    .getByPlaceholder("alain.delon@exemple.fr")
    .fill("alain.delon@exemple.fr");
  await page.getByPlaceholder("••••••••••").fill("machinchose");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("http://localhost:3000/");

  expect(page.url()).toBe("http://localhost:3000/");
});
