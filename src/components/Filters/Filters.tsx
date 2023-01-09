import ProductResponse from "../../interfaces/ProductResponse";
import { FormForCheckbox } from "../FormForCheckbox/FormForCheckbox";
import "./Filters.css";

interface FiltersProps {
  products: ProductResponse[];
  addFilter: (n: string, e: string) => void;
  removeFilter: (n: string, e: string) => void;
  filtersCategory: string[];
  filtersBrand: string[];
}

export const Filters = ({
  products,
  addFilter,
  removeFilter,
  filtersCategory,
  filtersBrand,
}: FiltersProps) => {
  const categories = new Set<string>();
  const brands = new Set<string>();
  [...products]
    .sort((a, b) => a.id - b.id)
    .map((product) => {
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
          addFilter={addFilter}
          removeFilter={removeFilter}
          filtersArray={filtersCategory}
        />
      </div>
      <div className="filterItem">
        <h4 className="filterTitle">Brand</h4>
        <FormForCheckbox
          type={brands}
          name="brands"
          addFilter={addFilter}
          removeFilter={removeFilter}
          filtersArray={filtersBrand}
        />
      </div>
    </div>
  );
};
