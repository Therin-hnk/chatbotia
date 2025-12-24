import { test } from "@japa/runner";
import { prisma } from "../src/app/lib/prisma";
import bcrypt from "bcrypt";
import { truncateAllTables } from "./utils/truncate_all_table";
import { Assert } from "@japa/assert";
import { ApiClient } from "@japa/api-client";

const BASE_URL = `/api`;
const VALID_APP_TOKEN = process.env.API_KEY;

test.group("Register", (group) => {
  group.each.setup(async () => {
    await truncateAllTables();
  });

  // a. Tentative d'inscription sans token d'application
  test("register attempt without application token", async ({
    assert,
    client,
  }: {
    assert: Assert;
    client: ApiClient;
  }) => {
    console.log("stat");
    const response = await client.post(`${BASE_URL}/auth/registration`).json({
      name: "newuser",
      email: "newuser@example.com",
      password: "Password123!",
    });

    response.assertStatus(401);
    const responseBody = JSON.parse(response.text());
    assert.equal(responseBody.message, "Unauthorized");
  }).timeout(60000);

  // b. Tentative d'inscription avec un token d'application invalide
  test("register attempt with invalid application token", async ({
    assert,
    client,
  }: {
    assert: Assert;
    client: ApiClient;
  }) => {
    const response = await client
      .post(`${BASE_URL}/auth/registration`)
      .headers({
        Authorization: "Bearer INVALID_APP_TOKEN",
      })
      .json({
        name: "newuser",
        email: "newuser@example.com",
        password: "Password123!",
      });

    response.assertStatus(401);
    const responseBody = JSON.parse(response.text());
    assert.equal(responseBody.message, "Unauthorized");
  }).timeout(60000);

  // c. Inscription réussie avec un token d'application valide
  test("successful registration with valid application token", async ({
    assert,
    client,
  }: {
    assert: Assert;
    client: ApiClient;
  }) => {
    const response = await client
      .post(`${BASE_URL}/auth/registration`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        name: "newuser",
        email: "newuser@example.com",
        password: "Password123!",
      });

    response.assertStatus(201);
    const responseBody = JSON.parse(response.text());
    assert.equal(responseBody.message, "User created successfully");

    // Verify user in database
    const user = await prisma.user.findUnique({
      where: { email: "newuser@example.com" },
    });

    assert.exists(user, "User should be saved in the database");
    assert.equal(user!.email, "newuser@example.com", "Email should match");
  }).timeout(60000);

  // e. Tentative d'inscription avec un email déjà utilisé
  test("register attempt with existing email", async ({
    assert,
    client,
  }: {
    assert: Assert;
    client: ApiClient;
  }) => {
    // Create user with an existing email address
    await prisma.user.create({
      data: {
        name: "user1",
        email: "existing@example.com",
        password: await bcrypt.hash("Password123!", 10),

      },
    });

    const response = await client
      .post(`${BASE_URL}/auth/registration`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        name: "newuser2",
        email: "existing@example.com",
        password: "Password123!",
      });

    response.assertStatus(409);
    const responseBody = JSON.parse(response.text());
    assert.equal(responseBody.message, "Email already in use");
  }).timeout(60000);
});
