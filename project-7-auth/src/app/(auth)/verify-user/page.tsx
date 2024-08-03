import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { notFound } from "next/navigation";
import { verifyEmail } from "../../../actions/auth-actions";
import Card from "./card-verify-user";
import CardSuccess from "./card-verify-user";

export default async function VerifyUser({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  if (!searchParams.token) {
    return notFound();
  }

  const verifyUserEmail = await verifyEmail(searchParams.token);
  console.log("🚀 ~ file: page.tsx:16 ~ verifyUserEmail:", verifyUserEmail);

  if (!verifyUserEmail.success) {
    return notFound();
  }
  if (!verifyUserEmail.user) {
    return notFound();
  }

  if (verifyUserEmail.success) {
    // FIXME: auto login after user verified using JWT strategy ( understand how it works under the hood also the database strategy)

    // FIXME: create a client component ( card Wrapper ) show a success message and errors
    return (
      <div className="flex-col font-bold flex justify-center items-center h-screen space-y-4">
        <CardSuccess
          user={verifyUserEmail.user}
        />
        <FormSuccess message={verifyUserEmail.message} />
        {!verifyUserEmail.success && (
          <FormError message={verifyUserEmail.message} />
        )}
      </div>
    );
  }

  return notFound();
}
