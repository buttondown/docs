"use client";

import { useEffect, useRef } from "react";
import useButtondownCookie, {
	USERNAME_COOKIE,
} from "@/hooks/useButtondownCookie";

// Assume the default 8px margin on a body tag.
const GUTTER = 40;

const resizeIframe = (iframe: HTMLIFrameElement) => {
	iframe.style.height = `${
		(iframe.contentWindow?.document.body?.scrollHeight || 0) + GUTTER
	}px`;
};

const SelfResizingIframe = ({ srcDoc }: { srcDoc: string }) => {
	const username = useButtondownCookie(USERNAME_COOKIE);
	srcDoc = srcDoc.replace("{username}", username ?? "buttondown");

	const iframeRef = useRef<HTMLIFrameElement>(null);

	// When the iFrame finishes loading, adjust its height to match its content.
	// This is a bit of a hack, but it works well enough.
	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) {
			return;
		}
		resizeIframe(iframe);
	}, []);

	return (
		<iframe
			srcDoc={srcDoc}
			ref={iframeRef}
			className="w-full h-48"
			title="Live code block"
		/>
	);
};

export default SelfResizingIframe;
