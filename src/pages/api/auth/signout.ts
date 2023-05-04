import type { APIRoute } from "astro";

export const get: APIRoute = ({ redirect, cookies }) => {
  cookies.delete("session", {
    path: "/",
  });
  return redirect("/signin");
};
