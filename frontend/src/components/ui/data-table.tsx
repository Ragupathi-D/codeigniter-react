import { Fragment, useMemo, useState } from "react"
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	flexRender,
	type ColumnDef,
	type RowData,
	type ColumnFiltersState,
} from "@tanstack/react-table"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<TData>[]
	data: TData[]
}

export function DataTable<TData extends RowData>({
	columns,
	data,
}: DataTableProps<TData>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		state: { columnFilters },
	})

	const hasColumnFilters = useMemo(
		() => table.getAllColumns().some((col) => col.getCanFilter()),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[columns]
	)

	const rows = table.getRowModel().rows

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<Fragment key={headerGroup.id}>
						<TableRow>
							{headerGroup.headers.map((header, i) => (
								<TableHead
									key={header.id}
									className={i === 0 ? "w-12 pl-6" : ""}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							))}
						</TableRow>

						{hasColumnFilters && (
							<TableRow
								key={`${headerGroup.id}-filters`}
								className="hover:bg-transparent"
							>
								{headerGroup.headers.map((header, i) => (
									<TableHead
										key={`${header.id}-filter`}
										className={`py-1.5 ${i === 0 ? "pl-6" : ""}`}
									>
										{header.column.getCanFilter() ? (
											<input
												value={(header.column.getFilterValue() as string) ?? ""}
												onChange={(e) =>
													header.column.setFilterValue(e.target.value)
												}
												placeholder="Filter…"
												className="h-7 w-full rounded border border-input bg-background px-2 text-xs font-normal text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
											/>
										) : null}
									</TableHead>
								))}
							</TableRow>
						)}
					</Fragment>
				))}
			</TableHeader>
			<TableBody>
				{rows.length ? (
					rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell, i) => (
								<TableCell key={cell.id} className={i === 0 ? "pl-6" : ""}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center text-muted-foreground"
						>
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
