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

  let thread = await fetchAllThreadsOfUser("66b4c27595050d965a8d455a");
  if (!thread) return <></>;
  thread = JSON.parse(thread);

  return (
    <div className="space-y-8">
      {/* @ts-ignore  */}
      <UserProfile user={user} />

      <UserProfileSections />

      {/* @ts-ignore */}
      {thread.map((thread: any) => {
      {/* @ts-ignore */}
        return <ThreadCard user={user} thread={thread} />;
      })}

      {/* @ts-ignore  */}
      {/* <ThreadCard user={user} thread={thread} /> */}
    </div>
  );
}
