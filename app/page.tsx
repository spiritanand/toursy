import AuthButton from "../components/AuthButton";

export default async function Index() {
  return (
    <main className="flex flex-col my-32 items-center gap-10">
      <h2 className="font-bold text-4xl">Welcome to the Tour App</h2>
      <AuthButton />
    </main>
  );
}
