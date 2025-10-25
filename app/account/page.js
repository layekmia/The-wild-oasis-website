import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function page() {
  const { user } = await auth();
  const firstName = user.name.split(" ").at(0);

  return (
    <div>
      <h2
        className="font-semibold text-2xl text-accent-400
      mb-7"
      >
        Welcome, {firstName}
      </h2>
    </div>
  );
}
