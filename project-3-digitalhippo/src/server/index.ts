import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { userRouter } from "@/server/api/routers/users.router";
import { router } from "./trpc";
import { webhooksRouter } from './api/routers/webhooks.router';
export const appRouter = router({
  user: userRouter,
  webhooks: webhooksRouter,
});
export type AppRouter = typeof appRouter;
