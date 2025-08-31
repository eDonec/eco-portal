import { FC } from "react";
import OptionButton from "../OptionButton";

interface IOptionsListProps {
  options: string[];
  labelFor: (raw: string) => string;
  selected: string | null;
  onSelect: (value: string | null) => void;
}
const OptionsList: FC<IOptionsListProps> = ({
  options,
  labelFor,
  selected,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option) => (
        <OptionButton
          key={option}
          option={option}
          labelFor={labelFor}
          isSelected={selected === option}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default OptionsList;
