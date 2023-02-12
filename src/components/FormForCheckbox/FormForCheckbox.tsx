import { Checkbox } from "../Checkbox/Checkbox";
import "./FormForCheckbox.css";

interface FormForCheckboxProps {
  type: Set<string>;
  name: string;
  addFilter: (n: string, e: string) => void;
  removeFilter: (n: string, e: string) => void;
  filtersArray: string[];
}

export function FormForCheckbox({
  type,
  name,
  addFilter,
  removeFilter,
  filtersArray,
}: FormForCheckboxProps) {
  return (
    <form className="filterForm">
      {Array.from(type).map((item) => (
        <Checkbox
          key={item}
          category={item}
          name={name}
          addFilter={addFilter}
          removeFilter={removeFilter}
          filtersArray={filtersArray}
        />
      ))}
    </form>
  );
}
