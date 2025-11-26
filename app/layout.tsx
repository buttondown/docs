import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/lib/constants";

import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
	metadataBase: new URL("https://docs.buttondown.com"),
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: TITLE,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				{children}
				<Analytics />
				<SpeedInsights />
				<Script id="mermaid-fix" strategy="beforeInteractive">
					{`
            // Fix a bug with mermaid block diagrams in react.
            //
            // relates to:
            // https://github.com/facebook/react/issues/24360
            // https://github.com/mermaid-js/mermaid/issues/5530
            (HTMLElement.prototype).toJSON = () => "";
          `}
				</Script>
			</body>
		</html>
	);
}
