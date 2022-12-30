import ProductResponse from "../../interfaces/ProductResponse";
import { FormForCheckbox } from "../FormForCheckbox/FormForCheckbox";
import "./Filters.css";

interface FiltersProps {
  product: ProductResponse[];
  addFilter: (n: string, e: string) => void;
  removeFilter: (n: string, e: string) => void;
  filtersCategory: string[];
  filtersBrand: string[];
}

export function Filters(props: FiltersProps) {
  const categories = new Set<string>();
  const brands = new Set<string>();
  props.product.map((product) => {
    categories.add(product.category);
    brands.add(product.brand);
  });

  return (
    <div className="filtersContainer">
      <div className="filterItem">
        <h4 className="filterTitle">Category</h4>
        <FormForCheckbox
          type={categories}
          name="categories"
          addFilter={props.addFilter}
          removeFilter={props.removeFilter}
          filtersArray={props.filtersCategory}
        />
      </div>
      <div className="filterItem">
        <h4 className="filterTitle">Brand</h4>
        <FormForCheckbox
          type={brands}
          name="brands"
          addFilter={props.addFilter}
          removeFilter={props.removeFilter}
          filtersArray={props.filtersBrand}
        />
      </div>
    </div>
  );
}
