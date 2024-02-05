import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOption);

  if(session?.user) {
    return (
      <h2 className="text-2xl">
        Admin Page - welcome back {session?.user.username}
      </h2>
    );
  }

  return <h2 className="text-2xl">please login to see this admin page</h2>;
};

export default page;
