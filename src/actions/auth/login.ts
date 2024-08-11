"use server";

import { signIn } from "@/auth";
import credentials from "next-auth/providers/credentials";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") {
      return "CredentialsSignIn";
    }

    return "UnknownError";
  }
}

export const login = async(email: string, password: string) => {

  try {
    await signIn('credentials', {email, password});
    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al iniciar sesión'
    }
  }
}
