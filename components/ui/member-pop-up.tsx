export function MemberPopUp({ open = true }: { open?: boolean }) {
  return (
    <div
      role="dialog"
      aria-label="Upgrade to Pro"
      aria-hidden={!open}
      inert={!open}
      className="w-80 rounded-[28px] bg-black bg-[radial-gradient(ellipse_at_100%_0%,#d4ef4a_0%,#6d7c14_24%,#000_60%)] p-6 text-white shadow-2xl"
    >
      <h2 className="text-xl font-semibold tracking-tight">Upgrade to Pro</h2>
      <p className="mt-4 text-[15px] leading-6 text-white">
        Get unlimited access to all professional tools, priority support, and
        extended storage.
      </p>
      <button
        type="button"
        className="cursor-pointer hover:bg-white hover:text-black transition-all duration-300 mt-8 w-full rounded-2xl border border-white/20 bg-[#3a3a3a] py-3.5 text-lg text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
      >
        Upgrade now
      </button>
    </div>
  );
}
