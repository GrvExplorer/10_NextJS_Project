"use client";
import { login } from "@/actions/auth-actions";
import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/custom ui/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(() => {
      login(data).then((data) => {
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
      subTitle="Login to your account"
      backButtonLabel={{
        label: "don't have an account?",
        hrefText: "Sign up",
      }}
      backButtonHref={process.env.NEXT_PUBLIC_SIGN_UP_URL || "/sign-up"}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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

          {/* TODO: coming in animation / good transitions */}
          <FormSuccess message={successMessage} />
          <FormError message={errorMessage} />

          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
