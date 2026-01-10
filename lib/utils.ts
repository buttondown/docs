import { twMerge } from "tailwind-merge";

type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| ClassValue[]
	| { [key: string]: unknown };

export function clsx(...inputs: ClassValue[]): string {
	const classes: string[] = [];

	for (const input of inputs) {
		if (!input) continue;

		if (typeof input === "string" || typeof input === "number") {
			classes.push(String(input));
		} else if (Array.isArray(input)) {
			const inner = clsx(...input);
			if (inner) classes.push(inner);
		} else if (typeof input === "object") {
			for (const [key, value] of Object.entries(input)) {
				if (value) classes.push(key);
			}
		}
	}

	return classes.join(" ");
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}
