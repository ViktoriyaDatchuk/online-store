import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searcParams, setSearchParams] = useSearchParams();
  const [isChecked, setIschecked] = useState(
    searcParams.get(name)?.includes(category)
  );
  const params = name === "categories" ? "brands" : "categories";
  const addParams = searcParams.get(params) || "";

  useEffect(() => {
    if (isChecked) {
      addFilter(name, category);
    }
  }, []);

  const checkboxClickHandler = (event: FormEvent<HTMLInputElement>) => {
    setIschecked(!isChecked);
    if (event.currentTarget.checked) {
      addFilter(event.currentTarget.name, event.currentTarget.value);
      setSearchParams({
        [params]: addParams,
        [name]: (searcParams.get(name) || "") + ";" + category,
      });
    } else {
      removeFilter(event.currentTarget.name, event.currentTarget.value);
      setSearchParams({
        [params]: addParams,
        [name]: (searcParams.get(name) || "").replace(";" + category, ""),
      });
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
