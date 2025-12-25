// tests/chat.spec.ts

import { test } from "@japa/runner";
import { prisma } from "../src/app/lib/prisma";
import { truncateAllTables } from "./utils/truncate_all_table";

const BASE_URL = "/api";

test.group("Chat Route /api/chat", (group) => {
  let validApiKey: string;
  const basePrompt = "Tu es un assistant virtuel poli, professionnel et concis. Tu réponds toujours en français avec un ton amical.";

  // Setup : créer un utilisateur, un chatbot avec une apiKey valide
  group.each.setup(async () => {
    await truncateAllTables();

    // Créer un utilisateur (pas besoin de login ici car on teste directement avec apiKey)
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testchat@example.com",
        password: "hashedpassword", // pas besoin du vrai hash pour ce test
      },
    });

    // Créer un chatbot avec basePrompt
    const chatbot = await prisma.chatbot.create({
      data: {
        userId: user.id,
        name: "Chat Test",
        apiKey: "550e8400-e29b-41d4-a716-446655440000",
        basePrompt,
      },
    });

    validApiKey = chatbot.apiKey;
  });

  // a. Échec : apiKey manquante
  test("fails when apiKey is missing", async ({ client }) => {
    const response = await client.post(`${BASE_URL}/chat`).json({
      messages: [{ role: "user", content: "Bonjour" }],
    });

    response.assertStatus(400);
  }).timeout(60000);

  // b. Échec : apiKey invalide
  test("fails with invalid apiKey", async ({ client }) => {
    const response = await client.post(`${BASE_URL}/chat`).json({
      apiKey: "550e8400-e29b-41d4-a716-446655440001",
      messages: [{ role: "user", content: "Bonjour" }],
    });
    response.assertStatus(401);
  }).timeout(60000);

  // c. Échec : messages mal formés (rôle invalide)
  test("fails with invalid message format (wrong role)", async ({ client }) => {
    const response = await client.post(`${BASE_URL}/chat`).json({
      apiKey: validApiKey,
      messages: [{ role: "admin", content: "Hello" }],
    });

    response.assertStatus(400);
  }).timeout(60000);

  // d. Échec : message trop long
  test("fails with too long message", async ({ client }) => {
    const longMessage = "a".repeat(3000);

    const response = await client.post(`${BASE_URL}/chat`).json({
      apiKey: validApiKey,
      messages: [{ role: "user", content: longMessage }],
    });

    response.assertStatus(400);
  }).timeout(60000);

  // e. Succès : premier message
  test("successfully responds to first message", async ({ client, assert }) => {
    const userMessage = "Bonjour, comment ça va ?";

    const response = await client.post(`${BASE_URL}/chat`).json({
      apiKey: validApiKey,
      messages: [{ role: "user", content: userMessage }],
    });

    response.assertStatus(200);
    const body = response.body();
    assert.exists(body.response);
    assert.isString(body.response);
    assert.isAbove(body.response.length, 5);
  }).timeout(60000);

  // f. Succès : conversation avec historique
  test("maintains context with message history", async ({ client, assert }) => {
    const messages = [
      { role: "user", content: "Je m'appelle Paul." },
      { role: "assistant", content: "Enchanté Paul ! Comment puis-je t'aider ?" },
      { role: "user", content: "Rappelle-moi mon prénom stp ?" },
    ];

    const response = await client.post(`${BASE_URL}/chat`).json({
      apiKey: validApiKey,
      messages,
    });

    response.assertStatus(200);
    const body = response.body();
    
    assert.exists(body.response);
    // L'IA devrait se souvenir du prénom grâce au contexte
    assert.isTrue(
      body.response.toLowerCase().includes("paul")
    );
  }).timeout(60000);
});