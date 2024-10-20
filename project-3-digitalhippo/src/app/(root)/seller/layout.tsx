import { currentUser } from "@/utils/auth.util";
import { notFound } from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {

  const user = await currentUser()

  if (!user) notFound()

  if (user.isSeller === false) notFound()

  return (
    <section>
      {children}
    </section>
  );
}