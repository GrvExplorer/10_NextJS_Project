import Users from "@/components/shared/Users";
import { trpc } from "@/trpc/server";

export default async function Home() {
  void trpc.user.userList.prefetch();

  return (
    <main>
    </main>
  );
}
