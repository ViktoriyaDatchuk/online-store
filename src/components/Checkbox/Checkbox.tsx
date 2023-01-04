import { FormEvent } from "react";
import "./Checkbox.css";

interface CheckboxProps {
  category: string;
  name: string;
  addFilter: (n: string, e: string) => void;
  removeFilter: (n: string, e: string) => void;
  filtersArray: string[];
}

export function Checkbox({
  category,
  name,
  addFilter,
  removeFilter,
  filtersArray,
}: CheckboxProps) {
  const checkboxClickHandler = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      addFilter(event.currentTarget.name, event.currentTarget.value);
    } else {
      removeFilter(event.currentTarget.name, event.currentTarget.value);
    }
  };

  return (
    <label className="checkboxItem">
      <input
        className="checkboxInput"
        type="checkbox"
        id={category}
        name={name}
        value={category}
        checked={filtersArray.includes(category)}
        onChange={checkboxClickHandler}
      />
      {category}
    </label>
  );
}
