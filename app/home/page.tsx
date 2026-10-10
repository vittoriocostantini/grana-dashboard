import { Dashboard } from "@/components/layout/dashboard";
import { parseDashboardFilters } from "@/lib/dashboard-filters";
import { buildDashboard } from "@/lib/dashboard";
import { getTransactions } from "@/lib/get-transactions";

export default async function HomePage({ searchParams }: PageProps<"/home">) {
  const filters = parseDashboardFilters(await searchParams);
  const transactions = await getTransactions();
  const data = buildDashboard(transactions, filters);

  return <Dashboard data={data} />;
}
