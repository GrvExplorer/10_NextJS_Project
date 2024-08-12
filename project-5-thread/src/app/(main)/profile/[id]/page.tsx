import ThreadCard from "@/components/custom ui/thread-card";
import UserProfile from "@/components/custom ui/user-profile";
import UserProfileSections from "@/components/custom ui/user-profile-sections";
import { fetchAllThreadsOfUser, fetchUserById } from "@/db/data";

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return <></>;

  let user = await fetchUserById(userId);
  if (!user) return <></>;
  user = JSON.parse(user);
  console.log("🚀 ~ file: page.tsx:13 ~ Page ~ user:", user?._id)


  let thread = await fetchAllThreadsOfUser(user?._id);
  if (!thread) return <></>;
  thread = JSON.parse(thread);

  return (
    <div className="space-y-8">
      {/* @ts-ignore  */}
      <UserProfile user={user} />

      <UserProfileSections />

      {/* @ts-ignore */}
      {thread.map((thread, i) => {
      {/* @ts-ignore */}
        return <ThreadCard key={i} thread={thread} />;
      })}

    </div>
  );
}
