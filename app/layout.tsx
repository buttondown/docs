import type { Metadata } from "next";
import Script from "next/script";
import { DESCRIPTION, TITLE } from "@/lib/constants";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/400-italic.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/500-italic.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/600-italic.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/ibm-plex-mono/700-italic.css";
import "./globals.css";

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
				<Script
					src="https://cdn.seline.com/seline.js"
					data-token="fa13d3d8a7aeb56"
					strategy="afterInteractive"
				/>
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
