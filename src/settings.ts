import dotenv from "dotenv";
import path from "path";

interface Config {
	PORT: number;
	NEXT_PUBLIC_SERVER_URL: string;
	PAYLOAD_SECRET: string;
	MONGODB_URL: string;
	RESEND_API_KEY: string;
}

dotenv.config({
	path: path.resolve(__dirname, "../.env"),
});

export const config: Config = {
	NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
	PAYLOAD_SECRET: process.env.PAYLOAD_SECRET as string,
	MONGODB_URL: process.env.MONGODB_URL as string,
	PORT: Number(process.env.PORT) || 3000,
	RESEND_API_KEY: process.env.RESEND_API_KEY as string,
};
