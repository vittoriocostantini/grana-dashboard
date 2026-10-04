export interface ButtonMemberProps {
  expanded?: boolean;
}

export function ButtonMember({ expanded = false }: ButtonMemberProps) {
  return (
    <button
      type="button"
      aria-label="Member"
      aria-expanded={expanded}
      className="grid size-8 cursor-pointer place-items-center rounded-lg bg-black transition-all duration-300 hover:scale-105"
    >
      <img src="/icons/member-star-logo.svg" alt="" className="size-4" />
    </button>
  );
}
