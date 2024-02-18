import { config } from "@/settings";
import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		verify: {
			generateEmailHTML: ({ token }) => {
				return `<a href="${config.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Account</a>`;
			},
		},
	},
	access: {
		read: () => true,
		create: () => true,
	},
	fields: [
		{
			name: "role",
			type: "select",
			defaultValue: "user",
			required: true,
			admin: {
				condition: () => false,
			},
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "User", value: "user" },
			],
		},
	],
};
