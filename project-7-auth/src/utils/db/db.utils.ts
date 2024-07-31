import { db } from "@/db";

export const getCurrentUser = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserAccounts = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      accounts: true,
    },
  });

  return user?.accounts || [];
};
