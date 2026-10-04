export interface SelectFieldProps {
  label: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="relative inline-flex shrink-0">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-lg border border-[#e4e4e4] bg-white pr-8 pl-3 text-sm text-ink outline-none hover:border-[#c8c8c8] focus-visible:border-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img
        src="/icons/chevron.svg"
        alt=""
        className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2"
      />
    </label>
  );
}
