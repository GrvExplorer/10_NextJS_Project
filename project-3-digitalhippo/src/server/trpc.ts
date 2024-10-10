import { initTRPC } from '@trpc/server';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import superjson from "superjson";

export const createTRPCContext = async (opts: { headers: Headers; req: NextRequest }) => {
  return {
    ...opts,
  };
};;
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;