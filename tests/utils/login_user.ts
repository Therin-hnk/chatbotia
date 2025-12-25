import { ApiClient } from "@japa/api-client";
import UserFactory from "../factory/user_factory";
import dotenv from "dotenv";
dotenv.config();

export async function login_user(client: ApiClient): Promise<{
  token: string;
  userId: number;
  email: string;
  password: string;
}> {
  try {
    const userFactory = new UserFactory();
    const { user, password } = await userFactory.create();

    const loginResponse = await client
      .post(`api/auth/login`)
      .headers({
        Authorization: `Bearer ${process.env.API_KEY}`,
      })
      .json({
        name: user.name,
        email: user.email,
        password: password,
      });

    loginResponse.assertStatus(200);
    const responseBody = JSON.parse(loginResponse.text());
    const token = responseBody.token;
    const userId = user?.id;

    return { token, userId: Number(userId), email: user.email ?? '', password };
  } catch (e) {
    console.error("Error in login_user", e);
    throw e;
  }
}
