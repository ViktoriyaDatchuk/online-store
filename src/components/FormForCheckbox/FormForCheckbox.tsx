import { Checkbox } from "../Checkbox/Checkbox";
import "./FormForCheckbox.css";

interface FormForCheckboxProps {
  type: Set<string>;
  name: string;
  filters: (e: string, n: string) => void;
  removeFilter: (e: string, n: string) => void;
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
          filters={props.filters}
          removeFilter={props.removeFilter}
          filtersArray={props.filtersArray}
        />
      ))}
    </form>
  );
}
