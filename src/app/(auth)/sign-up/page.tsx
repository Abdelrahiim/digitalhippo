"use client";
import Icons from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { trpc } from "@/trpc/client";

const Page = () => {
	const { mutate, isLoading, data } = trpc.auth.createPayloadUser.useMutation();
	console.log(data);
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			mutate(value, {
				onError: (error) => {
					console.log(error.message);
				},
			});
		},
		validatorAdapter: zodValidator,
	});
	return (
		<>
			<div className="container flex pt-20 relative flex-col justify-center items-center lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-20 w-20" />
						<h1 className="font-2xl font-bold">Create an account</h1>
						<Link
							className={buttonVariants({
								variant: "link",
								className: "gap-2",
							})}
							href={"/sign-in"}
						>
							Already have an account? Sign In
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-6">
						<form.Provider>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									void form.handleSubmit();
								}}
							>
								<div className="grid gap-2">
									<div className="grid gap-1 py-2">
										<form.Field
											name="email"
											validators={{
												onChange: z.string().email(),
											}}
										>
											{(field) => (
												<>
													<Label htmlFor={field.name}>Email</Label>
													<Input
														type="email"
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														placeholder="you@examble.com"
														className={cn({
															"focus-visible:ring-red-500":
																field.state.meta.errors.length,
														})}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{field.state.meta.touchedErrors && (
														<p className="text-red-500">
															{field.state.meta.touchedErrors}
														</p>
													)}
												</>
											)}
										</form.Field>
									</div>
									<div className="grid gap-1 py-2">
										<form.Field
											name="password"
											validators={{
												onChange: z
													.string()
													.min(8, "Password must be 8 or more character")
													.max(35)
													.regex(
														/[A-Z]/,
														"Password must contain at least one uppercase letter"
													) // Require uppercase
													.regex(
														/\d/,
														"Password must contain at least one number"
													),
											}}
										>
											{(field) => (
												<>
													<Label htmlFor={field.name}>Password</Label>
													<Input
														type="password"
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														placeholder="Password"
														className={cn({
															"focus-visible:ring-red-500":
																field.state.meta.errors.length,
														})}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{field.state.meta.touchedErrors && (
														<p className="text-red-500">
															{field.state.meta.touchedErrors}
														</p>
													)}
												</>
											)}
										</form.Field>
									</div>
									<form.Subscribe
										selector={(state) => [
											state.canSubmit,
											state.isSubmitting,
											state.errors,
										]}
									>
										{([canSubmit, isSubmitting]) => (
											<Button type="submit" disabled={!canSubmit}>
												{isSubmitting || isLoading ? (
													<>
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
														Signing up
													</>
												) : (
													"Sign Up"
												)}
											</Button>
										)}
									</form.Subscribe>
								</div>
							</form>
						</form.Provider>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
