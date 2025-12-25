// tests/chatbot_create.spec.ts

import { test } from "@japa/runner";
import { prisma } from "../src/app/lib/prisma";
import { truncateAllTables } from "./utils/truncate_all_table";

import { login_user } from "./utils/login_user";

const BASE_URL = "/api";
const VALID_APP_TOKEN = process.env.API_KEY;

if (!VALID_APP_TOKEN) {
  throw new Error("API_KEY doit être défini dans .env pour les tests");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET doit être défini pour générer des tokens dans les tests");
}


test.group("Chatbot Creation", (group) => {
  let validToken: string;

  // Setup commun : créer un utilisateur + se connecter pour avoir un token
  group.each.setup(async () => {
    await truncateAllTables();
  });

  // a. Échec : pas de token JWT
  test("fails without JWT token", async ({ client }) => {
    const response = await client.post(`${BASE_URL}/chatbots/create`)
    .headers({
        Authorization: `Bearer ${VALID_APP_TOKEN}`
    })
    .json({
      name: "Mon Bot",
      basePrompt: "Tu es un assistant sympa.",
    });

    response.assertStatus(401);
    response.assertBody({ message: "Token manquant ou invalide" });
  }).timeout(60000);

  // b. Échec : token JWT invalide
  test("fails with invalid JWT token", async ({ client }) => {
    const response = await client
      .post(`${BASE_URL}/chatbots/create`)
      .headers({
        Authorization: `Bearer ${VALID_APP_TOKEN}`,
        "x-api-token": `invalid_app_token`,
    })
      .json({
        basePrompt: "Tu es un assistant.",
      });

    response.assertStatus(401);
    response.assertBody({ message: "Token invalide ou expiré" });
  }).timeout(60000);

  // c. Échec : données invalides (prompt trop court)
  test("fails with invalid data (short prompt)", async ({ client }) => {
    const loginUser = await login_user(client);
    const response = await client
        .post(`${BASE_URL}/chatbots/create`)
        .headers({
            Authorization: `Bearer ${VALID_APP_TOKEN}`,
            "x-api-token": loginUser.token,
        })
        .json({
            basePrompt: "court",
        });

    response.assertStatus(400);
  }).timeout(60000);

  // d. Échec : prompt manquant
  test("fails when basePrompt is missing", async ({ client }) => {
    const loginUser = await login_user(client);
    const response = await client
      .post(`${BASE_URL}/chatbots/create`)
      .headers({
            Authorization: `Bearer ${VALID_APP_TOKEN}`,
            "x-api-token": loginUser.token,
        })
      .json({
        name: "Sans prompt",
      });

    response.assertStatus(400);
  }).timeout(60000);

  // e. Succès : création d'un chatbot
  test("successfully creates a chatbot with valid token and data", async ({ client, assert }) => {
    const loginUser = await login_user(client);
    const chatbotName = "Assistant Support";
    const basePrompt = "Tu es un assistant virtuel professionnel et courtois. Tu réponds toujours en français et tu aides les clients avec leurs questions sur les produits.";

    const response = await client
        .post(`${BASE_URL}/chatbots/create`)
        .headers({
                Authorization: `Bearer ${VALID_APP_TOKEN}`,
                "x-api-token": loginUser.token,
            })
        .json({
            name: chatbotName,
            basePrompt,
        });

    response.assertStatus(201);
    const body = response.body();
    assert.equal(body.message, "Chatbot créé avec succès !");
    assert.exists(body.chatbot.id);
    assert.exists(body.chatbot.apiKey);
    assert.equal(body.chatbot.name, chatbotName);
    assert.isString(body.chatbot.apiKey);
    assert.match(body.chatbot.apiKey, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/); // Format UUID

    // Vérification en base de données
    const user = await prisma.user.findUnique({
      where: { email: loginUser.email },
      include: { chatbots: true },
    });

    assert.exists(user!);
    assert.equal(user!.chatbots.length, 1);
    assert.equal(user!.chatbots[0].name, chatbotName);
    assert.equal(user!.chatbots[0].basePrompt, basePrompt);
    assert.equal(user!.chatbots[0].apiKey, body.chatbot.apiKey);
    assert.equal(user!.chatbots[0].userId, user!.id);
  }).timeout(60000);

  // f. Bonus : plusieurs chatbots pour le même utilisateur
  test("user can create multiple chatbots", async ({ client, assert }) => {
    const loginUser = await login_user(client);
    // Premier chatbot
    const response1 = await client
        .post(`${BASE_URL}/chatbots/create`)
        .headers({
                    Authorization: `Bearer ${VALID_APP_TOKEN}`,
                    "x-api-token": loginUser.token,
                })
        .json({
            name: "Bot 1",
            basePrompt: "Tu es un assistant virtuel professionnel et courtois. Tu réponds toujours en français et tu aides les clients avec leurs questions sur les produits.",
        });

    response1.assertStatus(201);

    // Deuxième chatbot
    const response2 = await client
        .post(`${BASE_URL}/chatbots/create`)
        .headers({
                    Authorization: `Bearer ${VALID_APP_TOKEN}`,
                    "x-api-token": loginUser.token,
                })
        .json({
            name: "Bot 2",
            basePrompt: "Tu es un assistant virtuel professionnel et courtois. Tu réponds toujours en français et tu aides les clients avec leurs questions sur les produits.",
        });

    response2.assertStatus(201);

    // Vérification : 2 chatbots pour l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: loginUser.email },
      include: { chatbots: true },
    });

    assert.equal(user!.chatbots.length, 2);
    assert.containSubset(user!.chatbots.map(c => c.name), ["Bot 1", "Bot 2"]);
  }).timeout(60000);
});