// tests/login.spec.ts

import { test } from "@japa/runner";
import { prisma } from "../src/app/lib/prisma";
import bcrypt from "bcrypt";
import { truncateAllTables } from "./utils/truncate_all_table";
import jwt from "jsonwebtoken";

const BASE_URL = "/api";
const VALID_APP_TOKEN = process.env.API_KEY;

if (!VALID_APP_TOKEN) {
  throw new Error("API_KEY doit être défini dans le .env pour les tests");
}

test.group("Login", (group) => {
  group.each.setup(async () => {
    await truncateAllTables();
  });

  // Pré-création d'un utilisateur valide pour les tests de succès et mauvais mot de passe
  group.each.setup(async () => {
    await prisma.user.create({
      data: {
        name: "testuser",
        email: "test@example.com",
        password: await bcrypt.hash("CorrectPassword123!", 10),
      },
    });
  });

  // a. Tentative de login sans credentials valides (email inexistant)
  test("login fails with non-existent email", async ({ client }) => {
    const response = await client
      .post(`${BASE_URL}/auth/login`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        email: "unknown@example.com",
        password: "anything",
      });

    response.assertStatus(401);
    response.assertBody({ message: "Les identifiants fournis (nom d'utilisateur, email ou mot de passe) sont incorrects." });
  }).timeout(60000);

  // b. Tentative de login avec mauvais mot de passe
  test("login fails with wrong password", async ({ client }) => {
    const response = await client
      .post(`${BASE_URL}/auth/login`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        email: "test@example.com",
        password: "WrongPassword123!",
      });

    response.assertStatus(401);
    response.assertBody({ message: "Les identifiants fournis (nom d'utilisateur, email ou mot de passe) sont incorrects." });
  }).timeout(60000);

  // c. Login réussi avec bonnes credentials
  test("successful login returns JWT token", async ({ client, assert }) => {
    const response = await client
      .post(`${BASE_URL}/auth/login`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        email: "test@example.com",
        password: "CorrectPassword123!",
      });

    response.assertStatus(200);
    const body = JSON.parse(response.text());
    assert.equal(body.message, "Connexion réussie.");
    assert.exists(body.token, "Le token JWT doit être présent dans la réponse");

    // Vérification que le token est valide et contient le bon userId
    const decoded = jwt.verify(body.token, process.env.JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({ where: { email: "test@example.com" } });
    assert.equal(decoded.userId, user?.id);
  }).timeout(60000);

  // d. Échec de validation Zod (ex: email manquant ou mot de passe trop court)
  test("login fails with invalid input (Zod validation)", async ({ client, assert }) => {
    const response = await client
      .post(`${BASE_URL}/auth/login`)
      .headers({
        authorization: `Bearer ${VALID_APP_TOKEN}`,
      })
      .json({
        email: "not-an-email",
        password: "123", // trop court, selon ton loginValidator
      });

    response.assertStatus(400); // ou 422 selon ta catchResponseFunction
    // Le message exact dépend de ton catchResponseFunction, mais il doit contenir une erreur de validation
    const body = JSON.parse(response.text());
  }).timeout(60000);
});