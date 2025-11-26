"use client";

import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { TITLE } from "@/lib/constants";
import type { ContentArray } from "@/lib/search/server";
import Footer from "./footer";
import type { NavData } from "./lib";
import Nav from "./nav";
import Search from "./search";

const Sidebar = ({
	slug,
	nav,
	contentArray,
}: {
	slug: string;
	nav: NavData;
	contentArray: ContentArray;
}) => {
	const [openOnMobile, setOpenOnMobile] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	// Determine current navigation group from slug
	let currentNavigationGroup: keyof NavData | null = null;
	let currentFolderName: string | null = null;

	for (const [navigationGroup, folders] of Object.entries(nav)) {
		for (const folder of folders) {
			for (const page of folder.items) {
				if (
					(page.type === "page" || page.type === "hidden_page") &&
					page.slug === slug
				) {
					currentNavigationGroup = navigationGroup as keyof NavData;
					currentFolderName = folder.name;
				}
			}
		}
	}

	if (!currentNavigationGroup || !currentFolderName) {
		throw new Error(
			`Can't find current navigation group and/or folder name for "${slug}". (Has it been added to the navigation hierarchy in 'navigation.json'?) `,
		);
	}

	const [activeNavigationGroup, setActiveNavigationGroup] = useState<
		keyof NavData
	>(currentNavigationGroup);
	const searchDefaultCategory =
		activeNavigationGroup === "api" ? "api" : "general";

	return (
		<>
			<div className="sticky top-0 inset-x-0 lg:hidden p-4 bg-gray-100 flex items-center gap-x-2 z-30">
				<button
					className="p-1"
					onClick={() => setOpenOnMobile(true)}
					type="button"
				>
					<Bars3Icon className="h-4 w-4" />
				</button>
				<p className="text font-extrabold text-gray-800 flex-1">{TITLE}</p>
				<button
					className="p-1"
					onClick={() => setSearchOpen(true)}
					type="button"
				>
					<MagnifyingGlassIcon className="h-4 w-4" />
				</button>
			</div>

			<div className="lg:w-[320px] order-last lg:order-first">
				<div
					className={clsx(
						"fixed top-0 left-0",
						"h-screen w-full lg:w-[320px] grid grid-rows-[max-content_max-content_1fr]",
						"px-5 py-4 border-r border-gray-200 bg-gray-50 display transition-all",
						openOnMobile && "z-40",
						!openOnMobile && "max-lg:-ml-[100vw]",
					)}
				>
					<div className="flex items-center">
						<p className="text font-bold text-gray-800 flex-1">{TITLE}</p>
						<button
							className="p-1 lg:hidden"
							onClick={() => setOpenOnMobile(false)}
							type="button"
						>
							<XMarkIcon className="h-5 w-5 text-gray-400" />
						</button>
					</div>

					<div className="mt-4">
						<Search
							open={searchOpen}
							setOpen={setSearchOpen}
							contentArray={contentArray}
							defaultCategory={searchDefaultCategory}
						/>
					</div>

					<div className="mt-4 overflow-hidden transition-opacity">
						<Nav
							data={nav}
							slug={slug}
							currentNavigationGroup={activeNavigationGroup}
							currentFolderName={currentFolderName}
							onNavigationGroupChange={setActiveNavigationGroup}
						/>
					</div>

					<div className="border-t border-gray-200 pt-3">
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
