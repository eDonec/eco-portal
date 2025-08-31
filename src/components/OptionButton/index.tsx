import { FC } from "react";

interface IOptionButtonProps {
  option: string;
  labelFor: (raw: string) => string;
  isSelected: boolean;
  onSelect: (value: string | null) => void;
}

const OptionButton: FC<IOptionButtonProps> = ({
  option,
  isSelected,
  labelFor,
  onSelect,
}) => (
  <button
    type="button"
    key={option}
    onClick={() => onSelect(option)}
    className={[
      "p-4 text-left rounded-lg transition-colors",
      isSelected
        ? "border-2 border-blue-400 ring-2 ring-blue-200 bg-blue-50"
        : "border border-gray-300 hover:bg-gray-50",
    ].join(" ")}
  >
    <span className="font-medium">{labelFor(option)}</span>
  </button>
);

export default OptionButton;
