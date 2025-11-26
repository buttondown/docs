"use client";

import useButtondownCookie, {
	USERNAME_COOKIE,
} from "@/hooks/useButtondownCookie";

export default function AccountButtons() {
	const currentUsername = useButtondownCookie(USERNAME_COOKIE);

	if (currentUsername === undefined) {
		return;
	}

	return (
		<div className="max-md:hidden absolute top-4 right-4 flex space-x-1 items-center">
			{currentUsername ? (
				<a
					href="https://buttondown.com/emails"
					target="_blank"
					className="flex space-x-2 items-center bg-buttondown text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
					rel="noreferrer"
				>
					<div>Dashboard&nbsp;&nbsp;↗</div>
				</a>
			) : (
				<>
					<a
						href="https://buttondown.com/login"
						target="_blank"
						className="block text-sm px-3 py-1 rounded-full hover:bg-neutral-100 transition-colors"
						rel="noreferrer"
					>
						Log in
					</a>
					<a
						href="https://buttondown.com/register"
						className="flex space-x-2 items-center bg-buttondown text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
					>
						Sign up&nbsp;&nbsp;↗
					</a>
				</>
			)}
		</div>
	);
}
