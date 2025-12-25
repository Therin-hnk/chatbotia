/**
 * test for this is in tests/login.spec.ts
 */
export const runtime = "nodejs";

import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginValidator } from "./loginValidator";
import {
  catchResponseFunction,
  tryResponseFunction,
} from "@/app/lib/response_function";

import { convertJwtExpirationToSeconds } from "@/app/lib/jwtUtils";
import { ZodError } from 'zod';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // Validation des données d'entrée
    const { email, password } = await loginValidator.parseAsync(body);

    // Recherche de l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Vérification de l'utilisateur et du mot de passe
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return tryResponseFunction(
        { message: "Les identifiants fournis (nom d'utilisateur, email ou mot de passe) sont incorrects." },
        401
      );
    }

    // Vérification des variables d'environnement pour JWT
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiration = process.env.JWT_EXPIRATION;

    if (!jwtSecret || !jwtExpiration) {
      console.error("Variables d'environnement manquantes : JWT_SECRET ou JWT_EXPIRATION non défini.");
      throw new Error("Erreur de configuration du serveur.");
    }

    if (typeof jwtSecret !== 'string') {
      console.error("JWT_SECRET doit être une chaîne de caractères.");
      throw new Error("Erreur de configuration du serveur.");
    }

    if (typeof jwtExpiration !== 'string') {
      console.error("JWT_EXPIRATION doit être une chaîne de caractères.");
      throw new Error("Erreur de configuration du serveur.");
    }

    // Conversion de la durée d'expiration
    const expiresInSeconds = convertJwtExpirationToSeconds(jwtExpiration) || "1h";

    // Génération du JWT
    const token = jwt.sign(
      { userId: user.id },
      jwtSecret,
      { expiresIn: expiresInSeconds }
    );

    console.log(`Token is : ${token}`);

    // Réponse de succès
    return tryResponseFunction(
      { token, id: user.id, message: "Connexion réussie." },
      200
    );
  } catch (error) {
    // Gestion des erreurs spécifiques
    if (error instanceof ZodError) {
      const errorMessage = error.message;
      console.error(`Erreur de validation lors de la connexion : ${errorMessage}`);
      return catchResponseFunction(
        error,
        `Erreur de validation : ${errorMessage}`
      );
    }

    if (error instanceof Error) {
      if (error.message === "Erreur de configuration du serveur.") {
        console.error(`Erreur de configuration : ${error.message}`);
        return catchResponseFunction(
          error,
          "Une erreur interne est survenue. Veuillez réessayer plus tard."
        );
      }
      console.error(`Erreur inattendue lors de la connexion : ${error.message}`);
      return catchResponseFunction(
        error,
        "Une erreur est survenue lors de la connexion. Veuillez vérifier vos informations et réessayer."
      );
    }
    // Cas improbable où l'erreur n'est pas une instance d'Error
    console.error("Erreur inconnue lors de la connexion :", error);
    return catchResponseFunction(
      null,
      "Une erreur inattendue est survenue. Veuillez réessayer plus tard."
    );
  }
}