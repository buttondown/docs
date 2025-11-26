export default function Video({ src }: { src: string }) {
	// biome-ignore lint/a11y/useMediaCaption: No captions
	return <video src={src} controls className="bg-gray-100 rounded-lg" />;
}
