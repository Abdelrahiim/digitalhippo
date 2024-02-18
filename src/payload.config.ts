import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { config } from "./settings";
import { Users } from "./collections/users";

export default buildConfig({
	serverURL: config.NEXT_PUBLIC_SERVER_URL || "",
	collections: [Users],
	routes: {
		admin: "/sell",
	},
	admin: {
		user: "users",
		bundler: webpackBundler(),
		meta: {
			titleSuffix: "- DigitalHippo",
			favicon: "/favicon.ico",
			ogImage: "/thumbnail.jpg",
		},
	},
	rateLimit: {
		max: 2000,
	},
	editor: slateEditor({}),
	db: mongooseAdapter({
		url: config.MONGODB_URL,
	}),
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
});
