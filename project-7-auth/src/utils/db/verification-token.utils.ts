import { db } from "@/db";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expiryData = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await getVerificationTokenWByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email: email,
      token,
      expires: expiryData,
    },
  });

  return verificationToken;
};

export const getVerificationTokenWByEmail = async (email: string) => {
  // we can't use findUnique as it will return error if there is no record
  // findFirst will return null if there is no record
  return await db.verificationToken.findFirst({
    where: {
      email,
    },
  });
};

export const getVerificationTokenByToken = async (token: string) => {
  return await db.verificationToken.findUnique({
    where: {
      token,
    },
  });
};

interface generateProps {
  email: string;
  password: string;
}

export const generateVerificationTokenByJWT = async ({
  email,
  password,
}: generateProps) => {
  const jwtToken = jwt.sign(
    {
      email,
      password,
    },
    process.env.AUTH_SECRET!,
    {
      expiresIn: "60m",
    }
  );

  return jwtToken;
};
