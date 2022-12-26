import "./Checkbox.css";

interface CheckboxProps {
  category: string;
  name: string;
  filters: (e: string, n: string) => void;
  removeFilter: (e: string, n: string) => void;
  filtersArray: string[];
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label className="checkboxItem">
      <input
        className="checkboxInput"
        type="checkbox"
        id={props.category}
        name={props.name}
        value={props.category}
        checked={props.filtersArray.includes(props.category)}
        onChange={(e) => {
          if (e.target.checked) {
            props.filters(e.target.name, e.target.value);
          } else {
            props.removeFilter(e.target.name, e.target.value);
          }
        }}
      />
      {props.category}
    </label>
  );
}
