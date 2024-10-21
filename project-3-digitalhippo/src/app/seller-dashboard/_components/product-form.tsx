"use client";

import { useCurrentUser } from "@/app/_hooks/auth.hooks";
import { addKitSchema } from "@/schemas";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ProductForm({ mode }: { mode: "add" | "update" }) {
  const user = useCurrentUser();

  const { mutateAsync: submitDetails, data } = trpc.seller.addKit.useMutation();

  const form = useForm<z.infer<typeof addKitSchema>>({
    resolver: zodResolver(addKitSchema),
    defaultValues: {
      sellerId: user?.sellerId || "",
      toPublish: true,
    },
  });

  const onSubmit = (data: z.infer<typeof addKitSchema>) => {
    submitDetails(data);
    form.reset({
      productName: "",
      features: [],
      description: "",
      price: "",
      images: [],
      category: "",
      tags: [],
      toPublish: true,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <FormField
          control={form.control}
          name="sellerId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Kit Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name you product"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="enter description of product"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="h-10"
                  placeholder="enter the price of product"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Upload Images</FormLabel>
              <FormControl>{/* upload preview pictures here */}</FormControl>
              <FormDescription>
                This is your public display picture of product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Add Category</FormLabel>
              <FormControl>{/* option to add category */}</FormControl>
              <FormDescription>
                Add category your product belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Add Tags</FormLabel>
              <FormControl>{/* option to add tags */}</FormControl>
              <FormDescription>
                tags your product it belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toPublish"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Publish to public</FormLabel>
              <FormControl>{/* option to on & off */}</FormControl>
              <FormDescription>
                If option is selected, your product will be visible to all
                users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSuccess message={data?.message} />
        <FormError message={data?.error} />

        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
