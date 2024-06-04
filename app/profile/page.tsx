import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const displayName = user.user_metadata.full_name || "Anon";
  const avatarUrl =
    user.user_metadata.avatar_url || "https://github.com/shadcn.png";

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user 🏋️
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="w-full">
        <h2 className="font-bold text-center text-5xl mb-4">Profile</h2>
        <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="flex flex-col items-center gap-4">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-center">
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              BOSS Manager
            </Badge>
          </div>
          <div className="max-w-md space-y-4 text-center">
            <p className="text-gray-500 dark:text-gray-400">DAMN. THis COOL</p>
          </div>
        </div>
      </main>
    </div>
  );
}
