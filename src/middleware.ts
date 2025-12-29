import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/api/chat", "/api/chatbots/[apiKey]"]; // routes accessibles publiquement
const API_KEY = process.env.API_KEY;

export async function middleware(request: NextRequest) {
  console.log("Middleware called for:", request.nextUrl.pathname);

  // CORS preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
  }

  // Routes publiques (widget client, récupération info chatbot)
  if (PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Récupérer la clé API
  const authHeader = request.headers.get("authorization") ?? request.headers.get("Authorization");

  // Exception : si la requête vient du même domaine → on laisse passer (confiance interne)
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  console.log("Origin:", origin, "Host:", host);
  const isSameOrigin = origin === null || origin?.includes(host || "");

  if (isSameOrigin) {
    console.log("Requête interne (même origine) → autorisée sans clé API");
    return NextResponse.next();
  }

  // Sinon : vérification stricte de la clé API
  if (!API_KEY || authHeader !== `Bearer ${API_KEY}`) {
    return NextResponse.json(
      { message: "Accès non autorisé", success: false },
      { status: 401, headers: corsHeaders() }
    );
  }

  return NextResponse.next();
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-token",
  };
}

export const config = {
  matcher: "/api/:path*",
};