import 'dotenv/config';  // Charge les variables d'environnement depuis .env
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',  // Chemin vers ton schema (adapte si nécessaire)
  datasource: {
    url: env('DATABASE_URL'),  // Utilise ta variable d'environnement
  },
});