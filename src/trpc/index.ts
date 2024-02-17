import { Type } from "lucide-react";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	apiKey: publicProcedure.query(() => {
		return "hello world";
	}),
});

export type AppRouter = typeof appRouter;
