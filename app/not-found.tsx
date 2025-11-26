import Link from "next/link";
import AccountButtons from "../components/layout/account-buttons";
import "./globals.css";

export default function NotFound() {
	return (
		<html lang="en">
			<body>
				<div className="mb-8">
					<AccountButtons />
				</div>
				<div className="container mx-auto p-8 flex items-center flex-col space-y-8 h-screen">
					<div className="my-16 sm:my-32 text-center text-9xl">Alas!</div>

					<div className="text-center space-y-4 m-auto">
						<p className="inline-block text-base text-gray-500 bg-gray-200 px-2 py-1 rounded-md w-max">
							404
						</p>
						<h1 className="text-xl sm:text-3xl font-extrabold text-gray-800 mb-8">
							{" "}
							Page not found
						</h1>
						<p className="text-base sm:text-lg">
							Ruh roh, this page doesn’t exist.{" "}
							<Link href="/" className="underline underline-offset-1">
								Head home
							</Link>
							.
						</p>
					</div>
				</div>
			</body>
		</html>
	);
}
