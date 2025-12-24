import {prisma} from "../../src/app/lib/prisma";


// Fonction pour tronquer toutes les tables sauf spatial_ref_sys
export async function truncateAllTables() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  try {
    // Tronquer toutes les tables sauf spatial_ref_sys
    for (const { tablename } of tablenames) {
      if (tablename !== "spatial_ref_sys") {
        // Exclure la table spatial_ref_sys
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      }
    }
    console.log("All tables truncated, except spatial_ref_sys.");
    await recreatePostGISTables();
  } catch (error) {
    console.error("Error truncating tables:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Fonction pour vérifier et recréer l'extension PostGIS si nécessaire
async function recreatePostGISTables() {
  try {
    // Vérifier si PostGIS est déjà installé
    const result: Array<{ extname: string }> = await prisma.$queryRaw`
      SELECT extname 
      FROM pg_extension 
      WHERE extname = 'postgis';
    `;

    if (result.length === 0) {
      // Si PostGIS n'existe pas, créer l'extension
      await prisma.$executeRawUnsafe(`CREATE EXTENSION postgis;`);
      console.log("PostGIS extension reinstalled.");
    } else {
      console.log("PostGIS extension already exists, skipping creation.");
    }
  } catch (error) {
    if ((error as any).code === "23505") {
      // Gestion d'erreur spécifique pour les erreurs liées à l'extension PostGIS
      console.error(
        "Error: PostGIS extension already exists. Skipping creation."
      );
    } else {
      // Gestion des autres erreurs
      console.error("Error recreating PostGIS tables:", error);
    }
  }
}
