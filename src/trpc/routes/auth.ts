import { number, z } from "zod";
import { publicProcedure, router } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { TRPCError } from "@trpc/server";
export const Schema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be 8 or more character")
		.max(35)
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Require uppercase
		.regex(/\d/, "Password must contain at least one number"),
});
export const authRouter = router({
	createPayloadUser: publicProcedure
		.input(Schema)
		.mutation(async ({ input }) => {
			const { email, password } = input;
			const payload = await getPayloadClient();

			// check if user already exist
			const { docs: users } = await payload.find({
				collection: "users",
				where: {
					email: {
						equals: email,
					},
				},
			});
			if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

			await payload.create({
				collection: "users",
				data: {
					email,
					password,
					role: "user",
				},
			});
			return { suceess: true, sendToemail: email };
		}),
});
