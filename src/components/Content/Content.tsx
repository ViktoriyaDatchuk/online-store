import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { useState, useEffect } from "react";
import { Filters } from "../Filters/Filters";
import { Product } from "../product/Product";

interface ContentProps {
  prods: ProductResponse[];
}

export function Content(props: ContentProps) {
  const [filtersCat, setFiltersCat] = useState<string[]>([]);
  const [filtersBrand, setFiltersBrand] = useState<string[]>([]);
  const [sortProd, setsortProd] = useState<ProductResponse[]>(props.prods);

  const filterProd = (name: string, value: string) => {
    if (name === "categories") {
      setFiltersCat([...filtersCat, value]);
    } else {
      setFiltersBrand([...filtersBrand, value]);
    }
  };

  const removeFilter = (name: string, value: string) => {
    if (name === "categories") {
      setFiltersCat(filtersCat.filter((item) => item !== value));
    } else {
      setFiltersBrand(filtersBrand.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    setsortProd(filterFunc());
  }, [filtersCat, filtersBrand]);

  const filterFunc = () => {
    return props.prods
      .filter((item) => {
        if (filtersCat.length) {
          return filtersCat.includes(item.category);
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (filtersBrand.length) {
          return filtersBrand.includes(item.brand);
        } else {
          return true;
        }
      });
  };

  const resetFilters = () => {
    setFiltersBrand([]);
    setFiltersCat([]);
  }

  return (
    <main>
      <div className="mainContainer">
        <div className="filtersSpace">
          <Filters
            product={props.prods}
            filters={filterProd}
            removeFilter={removeFilter}
            filtersCat={filtersCat}
            filtersBrand={filtersBrand}
          />
          <div className="total">{sortProd.length} products found</div>
          <button
            className="resetFilters"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
        <div className="products">
          {sortProd.length ? (
            sortProd.map((prod) => <Product key={prod.id} product={prod} />)
          ) : (
            <div className="notFound">Products not found</div>
          )}
        </div>
      </div>
    </main>
  );
}
