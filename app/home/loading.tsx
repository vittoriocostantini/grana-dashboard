export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="relative z-40 m-2 h-14 shrink-0 animate-pulse rounded-2xl bg-[#e4e7ec] sm:m-3 lg:h-auto lg:w-15" />
      <div className="m-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] sm:m-3 lg:my-3 lg:mr-3 lg:ml-0 lg:h-[calc(100dvh-1.5rem)]">
        <header className="mb-1 min-h-40 shrink-0 animate-pulse rounded-lg bg-[#eceef2]" />
        <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg bg-white lg:flex-row">
          <section className="min-h-96 flex-1 animate-pulse rounded-3xl bg-[#eceef2] lg:h-full lg:w-[44%] lg:flex-none" />
          <section className="min-h-96 flex-1 animate-pulse rounded-3xl bg-[#eceef2] lg:min-h-0" />
        </div>
      </div>
    </div>
  );
}
