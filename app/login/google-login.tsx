import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

function GoogleLogin() {
  const googleSignIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (data.url) {
      redirect(data.url);
    }
  };

  return (
    <form className="w-max mx-auto mt-5">
      <Button type="submit" formAction={googleSignIn}>
        Sign In With Google
      </Button>
    </form>
  );
}

export default GoogleLogin;
