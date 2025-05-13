/** Reusable Dropdown Component */
export function Dropdown({
  options,
  value,
  onChange,
  error,
  label,
  isRequired = false,
  dropdownBorderRadius = "rounded-xl 2xl:rounded-[0.75vw]",
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  label?: string;
  isRequired?: boolean;
  dropdownBorderRadius?: string;
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full appearance-none 2xl:text-[1vw] border ${
            error ? "border-red-500" : "border-gray-300"
          } ${dropdownBorderRadius} px-4 2xl:px-[1vw] py-3 2xl:py-[0.7vw] pr-10 2xl:pr-[2.5vw] focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-primary"
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option, index) => (
            <option
              className="2xl:text-[1vw] hover:bg-primary"
              key={index}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 2xl:right-[0.75vw] flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1 2xl:text-[0.9vw] 2xl:mt-[0.25vw]">
          {error}
        </p>
      )}
    </div>
  );
}
