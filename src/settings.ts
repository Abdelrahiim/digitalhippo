interface Config {
	NEXT_PUBLIC_SERVER_URL: string;
	PAYLOAD_SECRET: string;
	MONGODB_URL: string;
}

export const config: Config = {
	NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
	PAYLOAD_SECRET: process.env.PAYLOAD_SECRET as string,
	MONGODB_URL: process.env.MONGODB_URL as string,
};
