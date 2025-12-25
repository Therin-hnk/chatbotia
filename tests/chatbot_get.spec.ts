// tests/chatbot_get.spec.ts

import { test } from "@japa/runner";
import { prisma } from "../src/app/lib/prisma";
import { truncateAllTables } from "./utils/truncate_all_table";

const BASE_URL = "/api";

test.group("Get Chatbot Info - GET /api/chatbots/[apiKey]", (group) => {
  let validApiKey: string;
  let chatbotWithCustomizationApiKey: string;

  group.each.setup(async () => {
    await truncateAllTables();

    // Créer un utilisateur de base
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testget@example.com",
        password: "hashed",
      },
    });

    // Chatbot 1 : sans personnalisation (styles par défaut)
    const basicChatbot = await prisma.chatbot.create({
      data: {
        userId: user.id,
        name: "Basic Bot",
        apiKey: "11111111-1111-1111-1111-111111111111", // UUID fixe pour test
        basePrompt: "Tu es un assistant basique.",
      },
    });
    validApiKey = basicChatbot.apiKey;

    // Chatbot 2 : avec personnalisation
    const customizedChatbot = await prisma.chatbot.create({
      data: {
        userId: user.id,
        name: "Custom Bot",
        apiKey: "22222222-2222-2222-2222-222222222222",
        basePrompt: "Tu es un assistant stylé.",
        customization: {
          create: {
            primaryColor: "#FF5733",
            textColor: "#FFFFFF",
            backgroundColor: "#eefc33ff",
            botMessageColor: "#6c6ee4ff",
            userMessageColor: "#FF5733",
            fontFamily: "Roboto, sans-serif",
            borderRadius: "20",
            position: "bottom-left",
            welcomeMessage: "Salut ! Prêt à discuter ?",
            logoUrl: "https://example.com/logo.png",
          },
        },
      },
      include: {
        customization: true,
      },
    });
    chatbotWithCustomizationApiKey = customizedChatbot.apiKey;
  });

  // a. Échec : apiKey invalide
  test("returns 404 for invalid apiKey", async ({ client }) => {
    const response = await client.get(`${BASE_URL}/chatbots/invalid-uuid-123`);

    response.assertStatus(404);
  });

  // b. Succès : apiKey valide sans personnalisation → styles par défaut
  test("returns default styles when no customization exists", async ({ client, assert }) => {
    const response = await client.get(`${BASE_URL}/chatbots/${validApiKey}`);

    response.assertStatus(200);
    const body = response.body();

    assert.equal(body.name, "Basic Bot");
    assert.exists(body.styles);

    // Vérification des valeurs par défaut
    assert.equal(body.styles.primaryColor, "#3B82F6");
    assert.equal(body.styles.textColor, "#000000");
    assert.equal(body.styles.backgroundColor, "#FFFFFF");
    assert.equal(body.styles.botMessageColor, "#F3F4F6");
    assert.equal(body.styles.userMessageColor, "#E0E7FF");
    assert.equal(body.styles.fontFamily, "Inter, sans-serif");
    assert.equal(body.styles.borderRadius, "12");
    assert.equal(body.styles.position, "bottom-right");
    assert.equal(body.styles.welcomeMessage, "Bonjour ! Comment puis-je vous aider ?");
    assert.isNull(body.styles.logoUrl);
  });

  // c. Succès : apiKey valide avec personnalisation → styles personnalisés
  test("returns custom styles when customization exists", async ({ client, assert }) => {
    const response = await client.get(`${BASE_URL}/chatbots/${chatbotWithCustomizationApiKey}`);

    response.assertStatus(200);
    const body = response.body();

    assert.equal(body.name, "Custom Bot");
    assert.exists(body.styles);

    // Vérification des valeurs personnalisées
    assert.equal(body.styles.primaryColor, "#FF5733");
    assert.equal(body.styles.textColor, "#FFFFFF");
    assert.equal(body.styles.backgroundColor, "#eefc33ff");
    assert.equal(body.styles.botMessageColor, "#6c6ee4ff");
    assert.equal(body.styles.userMessageColor, "#FF5733");
    assert.equal(body.styles.fontFamily, "Roboto, sans-serif");
    assert.equal(body.styles.borderRadius, "20");
    assert.equal(body.styles.position, "bottom-left");
    assert.equal(body.styles.welcomeMessage, "Salut ! Prêt à discuter ?");
    assert.equal(body.styles.logoUrl, "https://example.com/logo.png");
  });
});