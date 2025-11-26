const Chat = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-6 h-6"
	>
		<title>Chat</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
		/>
	</svg>
);

const Book = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="!size-4"
	>
		<title>Book icon</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
		/>
	</svg>
);

const Code = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="!size-4"
	>
		<title>Code icon</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
		/>
	</svg>
);

const Search = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="h-4 w-4"
	>
		<title>Search icon</title>
		<path
			fillRule="evenodd"
			d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
			clipRule="evenodd"
		/>
	</svg>
);

const Document = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="!size-4"
	>
		<title>Document icon</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
		/>
	</svg>
);

const Warn = () => (
	<svg
		viewBox="0 0 512 512"
		width="20"
		height="20"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		aria-hidden="true"
	>
		<title>Warning icon</title>
		<path
			d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="40"
			fill="none"
			stroke="currentColor"
		/>
		<path
			d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="40"
			stroke="currentColor"
		/>
		<path
			d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z"
			strokeWidth="12"
			stroke="currentColor"
		/>
	</svg>
);

const Info = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		height="20"
		width="20"
		aria-hidden="true"
	>
		<title>Info icon</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			stroke="currentColor"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

const Icon = {
	Chat,
	Book,
	Document,
	Search,
	Code,
	Warn,
	Info,
};

export default Icon;
