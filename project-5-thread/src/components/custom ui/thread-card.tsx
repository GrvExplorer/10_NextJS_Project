"use client";
import { deleteThread } from "@/actions/user.actions";
import { IThread } from "@/db/models/thread.model";
import { IUser } from "@/db/models/user.model";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

function ThreadCard({
  thread,
  user,
}: {
  thread: IThread;
  user: IUser | undefined;
}) {
  // FIXME: add delete functionality

  const session = useUser();

  async function handelDelete(id: string) {
    await deleteThread(id);
  }

  if (!session) return null;

  const isAuthor = session?.user?.id === user?.id;

  return (
    <Card className="bg-dark-3 py-4 px-8">
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                <Image
                  src="/assets/profile.svg"
                  alt="profile_icon"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </AvatarFallback>
            </Avatar>

            <div className="thread-card_bar ml-5 bg-dark-4 h-20" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="">
              <h1 className="text-light-1">{user?.name}</h1>
              <p className="text-light-2 text-small-regular">{thread.text}</p>
            </div>
            <div className="space-x-2 flex">
              <div className="">
                <Link href={`/thread/${thread.id}`}>
                  <Image
                    src={"/assets/heart-gray.svg"}
                    alt="heart_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread.id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    alt="reply_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread.id}`}>
                  <Image
                    src={"/assets/share.svg"}
                    alt="share_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread.id}`}>
                  <Image
                    src={"/assets/tag.svg"}
                    alt="tag_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isAuthor && (
          <Image
            onClick={() => handelDelete(thread.id)}
            src={"/assets/delete.svg"}
            alt="reply_icon"
            width={24}
            height={24}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        {/* FIXME: add number of replies */}
        <p className="text-base-regular text-light-3">1 reply</p>

        {/* FIXME: add timestamp FORM database */}
        <p className="text-base-regular text-light-3">1 day ago</p>
      </div>
    </Card>
  );
}

export default ThreadCard;
