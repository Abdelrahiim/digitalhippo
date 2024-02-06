"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
	const [activeIndex, setActivaIndex] = useState<null | number>();
	const navRef = useRef<HTMLDivElement | null>(null);
	useOnClickOutside(navRef, () => setActivaIndex(null));
	const isAnyOpen = activeIndex !== null;

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActivaIndex(null);
			}
		};
		document.addEventListener("keydown", handler);
		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, []);
	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, index) => {
				const handleOpen = () => {
					if (activeIndex === index) {
						setActivaIndex(null);
					} else {
						setActivaIndex(index);
					}
				};
				const isOpen = activeIndex === index;

				return (
					<NavItem
						key={index}
						category={category}
						handleOpen={handleOpen}
						isOpen={isOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
};

export default NavItems;
