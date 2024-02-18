import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";
import nodemailer from "nodemailer";
import { config } from "./settings";

console.log(config);
const transporter = nodemailer.createTransport({
	host: "smtp.resend.com",
	secure: true,
	port: 465,
	auth: {
		user: "resend",
		pass: config.RESEND_API_KEY,
	},
});

let cached = (global as any).payload;

if (!cached) {
	cached = (global as any).payload = {
		client: null,
		promise: null,
	};
}
interface Args {
	initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
	initOptions,
}: Args = {}): Promise<Payload> => {
	if (!config.PAYLOAD_SECRET) {
		throw new Error("PAYLOAD_SECRET is missing");
	}
	if (cached.client) {
		return cached.client;
	}
	if (!cached.promise) {
		cached.promise = payload.init({
			email: {
				transport: transporter,
				fromAddress: "onboarding@resend.dev",
				fromName: "DigitalHippo",
			},
			secret: config.PAYLOAD_SECRET,
			local: initOptions?.express ? false : true,
			...(initOptions || {}),
		});
	}
	try {
		cached.client = await cached.promise;
	} catch (e: unknown) {
		cached.client = null;
		throw e;
	}
	return cached.client;
};
