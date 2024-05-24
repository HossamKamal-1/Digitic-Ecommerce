import "./FilterCheckbox.scss";
import { ChangeEventHandler } from "react";

type FilterCheckboxProps = {
  text: string;
  count: number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
function FilterCheckbox({ text, count, ...rest }: FilterCheckboxProps) {
  return (
    <label className="filter-checkbox-wrapper">
      <input type="checkbox" {...rest} />
      <span>
        {text} ({count})
      </span>
    </label>
  );
}

export default FilterCheckbox;
