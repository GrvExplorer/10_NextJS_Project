"use client";

import { login } from "@/app/_actions/auth.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function CardSuccess({ user }: any) {
  useEffect(() => {
    login({
      email: user.email,
      password: user.password,
    });
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Verification</CardTitle>
        <CardDescription>
          You will be redirected to the login page...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    </Card>
  );
}

export default CardSuccess;
