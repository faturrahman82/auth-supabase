import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOption);
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link href="/admin" className={buttonVariants()}>
        {" "}
        open My Admin
      </Link>

      <h2>Client Session</h2>
      <User />
      <h2>Client Session</h2>
      {JSON.stringify(session)}
    </div>
  );
}
