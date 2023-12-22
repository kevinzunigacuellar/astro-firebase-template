import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  if (!email || !password || !name) {
    return new Response(
      JSON.stringify({
        error: "Missing data",
      }),
      { status: 400 }
    );
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: "Could not create user",
      }),
      { status: 400 }
    );
  }
  return redirect("/signin");
};
