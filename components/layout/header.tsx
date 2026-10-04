import { Card } from "@/components/ui/card";
import { FilterSelect } from "@/components/ui/filter-select";
import { summary } from "@/lib/invoices";

export function Header() {
  return (
    <header className="flex shrink-0 flex-col gap-5 px-5 pt-5 pb-5 sm:px-6 sm:pt-6 rounded-lg  mb-1">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Good morning, Barbara <span aria-hidden>👋</span>
      </h1>

      <Card plain>
        <div className="flex items-center justify-between gap-6">
          <div className="shrink-0">
            <Card.Label size="md">Total earning</Card.Label>

            <Card.Value size="xl" className="mt-1">
              {summary.earning}
            </Card.Value>
          </div>

          <FilterSelect />
        </div>
      </Card>
    </header>
  );
}
