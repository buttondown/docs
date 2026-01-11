"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

type HeadingItem = {
	id: string;
	text: string;
	level: number;
};

export default function HeadingsMinimap() {
	const [headings, setHeadings] = useState<HeadingItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");
	const activeRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const extractHeadings = () => {
			const elements = document.querySelectorAll("h2[id], h3[id]");
			const items: HeadingItem[] = [];

			elements.forEach((el) => {
				const id = el.getAttribute("id");
				const text = el.textContent?.trim() || "";
				const level = el.tagName === "H2" ? 2 : 3;

				if (id && text) {
					items.push({ id, text, level });
				}
			});

			setHeadings(items);

			if (items.length > 0 && !activeId) {
				setActiveId(items[0].id);
			}
		};

		extractHeadings();

		const observer = new MutationObserver(extractHeadings);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, [activeId]);

	useEffect(() => {
		if (headings.length === 0) return;

		const handleScroll = () => {
			const headerOffset = 100;
			const hash = window.location.hash.slice(1);

			let currentId = headings[0]?.id || "";

			for (const { id } of headings) {
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= headerOffset) {
						currentId = id;
					}
				}
			}

			// If hash matches a heading and it's visible in the upper half, prioritize it
			if (hash && headings.some((h) => h.id === hash)) {
				const hashEl = document.getElementById(hash);
				if (hashEl) {
					const rect = hashEl.getBoundingClientRect();
					const inUpperHalf = rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
					if (inUpperHalf) {
						currentId = hash;
					}
				}
			}

			setActiveId(currentId);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("hashchange", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("hashchange", handleScroll);
		};
	}, [headings]);

	useEffect(() => {
		if (activeRef.current) {
			activeRef.current.scrollIntoView({
				block: "nearest",
				behavior: "smooth",
			});
		}
	}, [activeId]);

	if (headings.length < 2) return null;

	return (
		<nav
			className="fixed right-8 top-[90px] w-[180px] max-h-[calc(100vh-150px)] overflow-y-auto no-scrollbar"
			aria-label="Table of contents"
		>
			<ul className="border-l border-gray-200">
				{headings.map(({ id, text, level }) => {
					const isActive = activeId === id;
					return (
						<li key={id}>
							<a
								ref={isActive ? activeRef : null}
								href={`#${id}`}
								className={cn(
									"block py-1.5 pl-4 text-[13px] leading-snug transition-all duration-150 -ml-px border-l",
									level === 3 && "pl-6",
									isActive
										? "border-gray-500 font-medium text-gray-700"
										: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
								)}
							>
								{text}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
