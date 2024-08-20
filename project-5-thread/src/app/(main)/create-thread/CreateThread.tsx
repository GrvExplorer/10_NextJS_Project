"use client";
import { createThread } from "@/actions/thread.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { fetchUserById } from "@/db/data";
import { ThreadValidation } from "@/validation/form.validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CreateThread() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log(values);

    let userDB = await fetchUserById(user.id);
    userDB = JSON.parse(userDB);

    if (!userDB || !userDB._id) {
      toast({
        title: "Error",
        description: "Not able to post the thread due to no found _id in user",
        variant: "destructive",
      });
      return null;
    }

    const createdThread = await createThread({
      author: userDB?._id,
      content: values.thread,
    });

    if (!createdThread.success) {
      toast({
        title: "Error",
        description: `Not able to post the thread ${createdThread.error}`,
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Success",
      description: "Thread created successfully",
    });
    form.reset({});

    router.push('/feed')

    return createThread;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="account-form_input"
                    rows={12}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500 w-full">
            Post Thread
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateThread;
