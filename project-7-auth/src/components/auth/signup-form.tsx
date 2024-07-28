"use client";
import { signup } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/ui/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(() => {
      signup(data).then((data) => {
        if (data?.success) {
          setSuccessMessage(data?.message);
        } else {
          setErrorMessage(data?.message);
        }
      });
    });
  };

  return (
    <CardWrapper
      title="🔐Auth JS"
      subTitle="create your account and start using Auth JS"
      backButtonLabel={{
        label: "already have an account?",
        hrefText: "Login",
      }}
      backButtonHref={process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in"}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: coming in animation / good transitions */}
          <FormSuccess message={successMessage} />
          <FormError message={errorMessage} />

          <Button type="submit" disabled={isPending}>
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
