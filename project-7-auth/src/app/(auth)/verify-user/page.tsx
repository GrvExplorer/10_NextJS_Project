import { notFound, redirect } from "next/navigation";
import React from "react";
import { verifyEmail } from "../../../actions/auth-actions";

export default async function VerifyUser({
  searchParams,
}: {
  searchParams: { token: string };
}) {

  if (!searchParams.token) {
    return notFound();
  }

  const verifyUserEmail = await verifyEmail(searchParams.token);
  console.log("🚀 ~ file: page.tsx:17 ~ verifyUserEmail:", verifyUserEmail)

  if (!verifyUserEmail?.success) {
    return notFound();
  }


  if (verifyUserEmail?.success) {

    redirect("/dashboard");
    // FIXME: auto login after user verified using JWT strategy ( understand how it works under the hood also the database strategy)

    // FIXME: create a client component ( card Wrapper ) show a success message and errors 
    return (
      <div>
        <h1 className="text-4xl font-bold flex justify-center items-center h-screen">
          Account Verified
        </h1>
      </div>
    );
  }

  return notFound();
}
