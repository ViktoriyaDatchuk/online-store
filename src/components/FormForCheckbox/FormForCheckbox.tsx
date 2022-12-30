import { Checkbox } from "../Checkbox/Checkbox";
import "./FormForCheckbox.css";

interface FormForCheckboxProps {
  type: Set<string>;
  name: string;
  addFilter: (n: string, e: string) => void;
  removeFilter: (n: string, e: string) => void;
  filtersArray: string[];
}

export function FormForCheckbox(props: FormForCheckboxProps) {
  return (
    <form className="filterForm">
      {Array.from(props.type).map((item) => (
        <Checkbox
          key={item}
          category={item}
          name={props.name}
          // filterFunction={props.filterFunction}
          addFilter={props.addFilter}
          removeFilter={props.removeFilter}
          filtersArray={props.filtersArray}
        />
      ))}
    </form>
  );
}
