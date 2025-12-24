import { NextResponse } from "next/server";

export async function middleware(req: any) {
  console.log("Middleware called for:", req.nextUrl.pathname);
  const app_key = req.headers.get("authorization") || req.headers.get("Authorization") as string;

  // Gérer les requêtes OPTIONS pour les vérifications CORS
  if (req.method === "OPTIONS") {
    return handleOptions();
  }

  try {
    // Gestion des routes
    console.log(`Bearer ${process.env.API_KEY}`);
    if (app_key !== `Bearer ${process.env.API_KEY}`) {
      return unauthorizedResponse("Unauthorized");
    }
    return NextResponse.next();

  } catch (e) {
    console.error("Error on authorization", e);
    return unauthorizedResponse("Unauthorized");
  }
}

// Réponse d'autorisation refusée avec CORS
function unauthorizedResponse(message: string) {
  return NextResponse.json(
    { message, success: false },
    {
      status: 401,
      headers: corsHeaders(),
    }
  );
}

// Gérer les requêtes OPTIONS pour CORS
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// En-têtes CORS communs
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-token",
  };
}

// Limiter le middleware aux chemins commençant par `/api/`
export const config = {
  matcher: "/api/:path*",
};
