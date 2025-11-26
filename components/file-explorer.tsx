"use client";

import {
	ChevronDownIcon,
	DocumentIcon,
	FolderIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileNode {
	name: string;
	type: "file" | "folder";
	children?: FileNode[];
	description?: string;
}

interface FileExplorerProps {
	data: FileNode[];
	className?: string;
	title?: string;
}

interface FileTreeItemProps {
	node: FileNode;
	level: number;
}

const FileTreeItem = ({ node, level }: FileTreeItemProps) => {
	const [isExpanded, setIsExpanded] = useState(level === 0); // Root level starts expanded
	const hasChildren = node.children && node.children.length > 0;

	return (
		<div>
			<div
				className={cn(
					"flex items-center py-2 px-3 text-sm font-mono transition-colors",
					"hover:bg-gray-50 dark:hover:bg-gray-800/50",
					hasChildren ? "cursor-pointer" : "cursor-default",
					"group",
				)}
				style={{ paddingLeft: level * 20 + 12 }}
				onClick={() => hasChildren && setIsExpanded(!isExpanded)}
				role={hasChildren ? "button" : undefined}
				tabIndex={hasChildren ? 0 : undefined}
				onKeyDown={(e) => {
					if (hasChildren && (e.key === "Enter" || e.key === " ")) {
						e.preventDefault();
						setIsExpanded(!isExpanded);
					}
				}}
			>
				<div className="flex items-center flex-1 min-w-0">
					{hasChildren ? (
						<div
							className={cn(
								"flex items-center mr-2 transition-transform duration-200",
								isExpanded ? "rotate-0" : "-rotate-90",
							)}
						>
							<ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
						</div>
					) : (
						<div className="w-6" />
					)}

					{node.type === "folder" ? (
						<FolderIcon
							className={cn(
								"w-4 h-4 mr-3 transition-colors",
								isExpanded
									? "text-blue-600 dark:text-blue-400"
									: "text-blue-500 dark:text-blue-500",
							)}
						/>
					) : (
						<DocumentIcon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
					)}

					<span
						className={cn(
							"font-medium truncate",
							node.type === "folder"
								? "text-gray-900 dark:text-gray-100"
								: "text-gray-700 dark:text-gray-300",
						)}
					>
						{node.name}
					</span>

					<div className="flex-1"></div>

					{node.description && (
						<span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-sans truncate">
							{node.description}
						</span>
					)}
				</div>
			</div>

			{hasChildren && isExpanded && (
				<div className="animate-in slide-in-from-top-1 duration-200">
					{node.children!.map((child, index) => (
						<FileTreeItem
							key={`${child.name}-${index}`}
							node={child}
							level={level + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const FileExplorer = ({
	data,
	className = "",
	title = "File Explorer",
}: FileExplorerProps) => {
	return (
		<Card
			className={cn(
				"shadow-xs border-gray-200 dark:border-gray-800",
				className,
			)}
		>
			<CardHeader className="p-4! pb-0">
				<CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0 pb-1 px-0!">
				<div className="">
					{data.map((node, index) => (
						<FileTreeItem key={`${node.name}-${index}`} node={node} level={0} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

// Predefined data for the CLI structure
export const BUTTONDOWN_CLI_STRUCTURE: FileNode[] = [
	{
		name: "buttondown/",
		type: "folder",
		description: "Project root directory",
		children: [
			{
				name: ".buttondown.json",
				type: "file",
				description: "Configuration and sync tracking",
			},
			{
				name: "emails/",
				type: "folder",
				description: "Newsletter content as Markdown",
				children: [
					{
						name: "welcome-to-my-newsletter.md",
						type: "file",
						description: "Draft email",
					},
					{
						name: "weekly-update-2025-01-15.md",
						type: "file",
						description: "Published email",
					},
					{
						name: "product-launch-announcement.md",
						type: "file",
						description: "Scheduled email",
					},
				],
			},
			{
				name: "media/",
				type: "folder",
				description: "Images and attachments",
				children: [
					{
						name: "logo.png",
						type: "file",
						description: "Brand image",
					},
					{
						name: "product-screenshot.jpg",
						type: "file",
						description: "Marketing asset",
					},
					{
						name: "whitepaper.pdf",
						type: "file",
						description: "Email attachment",
					},
				],
			},
		],
	},
];
