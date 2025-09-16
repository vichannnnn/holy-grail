import type { DataTableProps } from "./types";

export function DataTable<T = Record<string, unknown>>({
	data,
	columns,
	renderEditAction,
}: DataTableProps<T>) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead className="bg-gray-50 dark:bg-gray-800">
					<tr>
						{columns.map((col) => (
							<th
								key={col}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
							>
								{col}
							</th>
						))}
						{renderEditAction && (
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
					{data.map((item, index) => {
						const itemWithId = item as Record<string, unknown>;
						const key = (itemWithId.id as number | string)?.toString() || `item-${index}`;
						return (
							<tr key={key}>
								{columns.map((col) => (
									<td
										key={col}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
									>
										{renderCellValue(itemWithId[col])}
									</td>
								))}
								{renderEditAction && (
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										{renderEditAction(item)}
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function renderCellValue(value: unknown): string {
	if (value === null || value === undefined) {
		return "";
	}

	if (typeof value === "object" && value !== null) {
		// Handle nested objects like category in SubjectType
		const obj = value as Record<string, unknown>;
		if ("name" in obj && typeof obj.name === "string") {
			return obj.name;
		}
		return JSON.stringify(value);
	}

	return String(value);
}
