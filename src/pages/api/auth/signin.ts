import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      JSON.stringify({
        error: "No token found",
      }),
      { status: 401 }
    );
  }

  /* Verify the token */
  const decodedToken = await auth.verifyIdToken(idToken).catch(() => null);

  if (!decodedToken) {
    return new Response(
      JSON.stringify({
        error: "Invalid token",
      }),
      { status: 401 }
    );
  }

  const fiveDays = 60 * 60 * 24 * 5 * 1000;

  /* Create and set session cookie */
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("session", sessionCookie, {
    path: "/",
    // more options
  });

  return redirect("/dashboard");
};
