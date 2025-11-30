import { signIn } from "@/lib/auth";

export default function GoogleSignInForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirectTo: "/",
        });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
