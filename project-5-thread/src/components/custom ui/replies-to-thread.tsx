"use client";
import { replyToThread } from "@/actions/thread.actions";
import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import ProfilePhoto from "../ui/profile-photo";
import { useToast } from "../ui/use-toast";

function RepliesToThread({
  parentId,
  authorId,
  userImage,
}: {
  parentId: string;
  authorId: string;
  userImage: string;
}) {
  const [reply, setReply] = useState("");
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const replyRes = await replyToThread({ authorId, text: reply, parentId });

    if (replyRes.success) {
      toast({ title: "Reply added", description: "Your reply has been added" });
      setReply("");
    }

    console.log(replyRes);
    toast({
      title: "Error",
      description: replyRes.error,
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-4">
      <DropdownMenuSeparator className="bg-dark-4" />
      <form onSubmit={onSubmit} className="text-light-1 flex gap-4 ">
        <ProfilePhoto userImage={userImage} className="w-10 h-10" />
        <Input type="text" onChange={(e) => setReply(e.target.value)} />
        <Button className="bg-primary-500" type="submit">
          Reply
        </Button>
      </form>
      <DropdownMenuSeparator className="bg-dark-4 " />
    </div>
  );
}

export default RepliesToThread;
