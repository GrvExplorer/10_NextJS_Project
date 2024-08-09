import { fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {

  return (
    <div>
      <h1 className="head-text">Home</h1>
    </div>
  );
}
