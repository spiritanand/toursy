import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

const defaultUrl = "https://toursy.vercel.app";

function GoogleLogin() {
  const googleSignIn = async () => {
    "use server";
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${defaultUrl}/auth/callback`,
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
