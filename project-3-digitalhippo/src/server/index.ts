import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { userRouter } from "@/server/api/routers/user.router";
import { router } from "./trpc";
import { webhookRouter } from './api/routers/webhook.router';
import { sellerRouter } from './api/routers/seller.router';
export const appRouter = router({
  user: userRouter,
  seller: sellerRouter,
  webhooks: webhookRouter,
});
export type AppRouter = typeof appRouter;
