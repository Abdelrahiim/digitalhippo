import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Icons from "../Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "@/components/ui/button";
import Cart from "@/components/Cart";

const Navbar = () => {
	const user = null;
	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							{/** TODO  Mobile Nav */}

							<div className="ml-4 flex lg:ml-0">
								<Link href={"/"}>
									<Icons.logo className="h-10 w-10" />
								</Link>
							</div>
							<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>
							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{!user && (
										<>
											<Link
												href={"/sign-in"}
												className={buttonVariants({ variant: "ghost" })}
											>
												Sign In
											</Link>
											<span
												aria-hidden="true"
												className="h-6 w-px bg-gray-200"
											/>
											<Link
												href={"/sign-up"}
												className={buttonVariants({ variant: "ghost" })}
											>
												Create Account
											</Link>
										</>
									)}

									{user && (
										<div className="flex lg:ml-6">
											<span
												aria-hidden="true"
												className="h-6 w-px bg-gray-200"
											/>
										</div>
									)}
									<div className="ml-4 flow-root lg:ml-6">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};

export default Navbar;
