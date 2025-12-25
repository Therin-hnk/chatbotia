import { prisma } from "../../src/app/lib/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export default class UserFactory {

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async create(overrides = {}) {
    const password = faker.internet.password();
    const hashedPassword = await this.hashPassword(password);

    const defaultData = {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: hashedPassword,
    };

    // Fusion des données par défaut avec les données personnalisées (overrides)
    const userData = { ...defaultData, ...overrides };

    // Création de l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: userData,
    });

    // Retourne l'utilisateur créé avec le mot de passe utilisé pour la création
    return {
      user,
      password, // Return the password for later use
    };
  }
}
