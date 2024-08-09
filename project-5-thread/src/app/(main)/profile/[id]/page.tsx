import UserProfile from "@/components/custom ui/user-profile";
import { fetchUserById } from "@/db/data";
import { IUser } from "@/db/models/user.model";

export default async function Page({params}: {params: {id: string}}) {

  const userId = params.id

  if (!userId) return <></>

  let user = await fetchUserById(userId)

  if (!user) return <></>

  user = JSON.parse(user)

  return (
    <div className="">
      {/* @ts-ignore  */}
      <UserProfile user={user} />
    </div>
  );
}