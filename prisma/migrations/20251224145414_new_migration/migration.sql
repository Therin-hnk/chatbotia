-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbots" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT,
    "basePrompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatbots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_customizations" (
    "id" TEXT NOT NULL,
    "chatbotId" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL DEFAULT '#3B82F6',
    "secondaryColor" TEXT NOT NULL DEFAULT '#1E293B',
    "backgroundColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "textColor" TEXT NOT NULL DEFAULT '#000000',
    "userMessageColor" TEXT NOT NULL DEFAULT '#E0E7FF',
    "botMessageColor" TEXT NOT NULL DEFAULT '#F3F4F6',
    "fontFamily" TEXT NOT NULL DEFAULT 'Inter',
    "fontSize" TEXT NOT NULL DEFAULT '16',
    "borderRadius" TEXT NOT NULL DEFAULT '12',
    "showLogo" BOOLEAN NOT NULL DEFAULT true,
    "logoUrl" TEXT,
    "welcomeMessage" TEXT DEFAULT 'Bonjour ! Comment puis-je vous aider ?',
    "position" TEXT NOT NULL DEFAULT 'bottom-right',
    "placeholder" TEXT NOT NULL DEFAULT 'Écrivez votre message...',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatbot_customizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chatbots_apiKey_key" ON "chatbots"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "chatbot_customizations_chatbotId_key" ON "chatbot_customizations"("chatbotId");

-- AddForeignKey
ALTER TABLE "chatbots" ADD CONSTRAINT "chatbots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatbot_customizations" ADD CONSTRAINT "chatbot_customizations_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "chatbots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
