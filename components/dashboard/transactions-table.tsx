import type { InvoiceRow } from "@/lib/dashboard";

const columns = [
  "Account",
  "Date",
  "Industry",
  "State",
  "Amount",
  "Currency",
  "Type",
] as const;

export interface TransactionsTableProps {
  rows: InvoiceRow[];
}

export function TransactionsTable({ rows }: TransactionsTableProps) {
  return (
    <div className="mt-3 min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-160 border-collapse text-left text-[13px]">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr className="border-b border-line text-md text-ink ">
            {columns.map((heading) => (
              <th key={heading} className="px-2 py-2 font-semibold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-2 py-8 text-center text-quiet">
                No invoices for this filter.
              </td>
            </tr>
          ) : (
            rows.map((invoice) => (
              <tr key={invoice.id} className="border-b border-line">
                <td className="px-2 py-2.5 font-medium">{invoice.account}</td>
                <td className="px-2 py-2.5 text-[#8a8a8a]">{invoice.date}</td>
                <td className="px-2 py-2.5 text-[#8a8a8a]">{invoice.industry}</td>
                <td className="px-2 py-2.5">{invoice.state}</td>
                <td className="px-2 py-2.5 tabular-nums font-medium">
                  {invoice.amount}
                </td>
                <td className="px-2 py-2.5 text-[#8a8a8a]">{invoice.currency}</td>
                <td className="px-2 py-2.5">{invoice.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
