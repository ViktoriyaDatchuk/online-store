import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { useState, useEffect } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Filters } from "../Filters/Filters";
import { Product } from "../product/Product";

interface ContentProps {
  prods: ProductResponse[];
}

export function Content(props: ContentProps) {
  const [filtersCategory, setFiltersCategory] = useState<string[]>([]);
  const [filtersBrand, setFiltersBrand] = useState<string[]>([]);
  const [sortProducts, setsortProducts] = useState<ProductResponse[]>(
    props.prods
  );
  const [minValuePrice, setMinValuePrice] = useState<number>(
    getMinPrice(props.prods)
  );
  const [maxValuePrice, setMaxValuePrice] = useState<number>(
    getMaxPrice(props.prods)
  );
  const [minValueStock, setMinValueStock] = useState<number>(
    getMinStock(props.prods)
  );
  const [maxValueStock, setMaxValueStock] = useState<number>(
    getMaxStock(props.prods)
  );

  const addFilter = (name: string, value: string) => {
    if (name === "categories") {
      setFiltersCategory([...filtersCategory, value]);
    } else {
      setFiltersBrand([...filtersBrand, value]);
    }
  };

  const removeFilter = (name: string, value: string) => {
    setsortProducts(props.prods);
    if (name === "categories") {
      setFiltersCategory(filtersCategory.filter((item) => item !== value));
    } else {
      setFiltersBrand(filtersBrand.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    filterFunction();
  }, [filtersCategory, filtersBrand]);

  const filterFunction = () => {
    setsortProducts(
      props.prods
        .filter((item) => {
          if (filtersCategory.length) {
            return filtersCategory.includes(item.category);
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
        })
        .filter((item) => {
          return item.price >= minValuePrice && item.price <= maxValuePrice;
        })
        .filter((item) => {
          return item.stock >= minValueStock && item.stock <= maxValueStock;
        })
    );
  };

  const resetFilters = () => {
    setsortProducts(props.prods);
    setFiltersBrand([]);
    setFiltersCategory([]);
    setMinValuePrice(getMinPrice(props.prods));
    setMaxValuePrice(getMaxPrice(props.prods));
    setMinValueStock(getMinStock(props.prods));
    setMaxValueStock(getMaxStock(props.prods));
  };

  function getMaxPrice(products: ProductResponse[]) {
    let max = products[0].price;
    products.forEach((elem) => {
      if (elem.price > max) {
        max = elem.price;
      }
    });
    return max;
  }

  function getMinPrice(products: ProductResponse[]) {
    let min = products[0].price;
    products.forEach((elem) => {
      if (elem.price < min) {
        min = elem.price;
      }
    });
    return min;
  }

  function getMaxStock(products: ProductResponse[]) {
    let max = products[0].stock;
    products.forEach((elem) => {
      if (elem.stock > max) {
        max = elem.stock;
      }
    });
    return max;
  }

  function getMinStock(products: ProductResponse[]) {
    let min = products[0].stock;
    products.forEach((elem) => {
      if (elem.stock < min) {
        min = elem.stock;
      }
    });
    return min;
  }

  return (
    <main>
      <div className="mainContainer">
        <div className="filtersSpace">
          <Filters
            product={props.prods}
            addFilter={addFilter}
            removeFilter={removeFilter}
            filtersCategory={filtersCategory}
            filtersBrand={filtersBrand}
          />
          <div className="sliderContainer">
            <h4 className="sliderTitle">Price</h4>
            <MultiRangeSlider
              min={getMinPrice(props.prods)}
              max={getMaxPrice(props.prods)}
              step={1}
              minValue={minValuePrice}
              maxValue={maxValuePrice}
              ruler="false"
              barInnerColor="#e70"
              onInput={(e: ChangeResult) => {
                setMinValuePrice(e.minValue);
                setMaxValuePrice(e.maxValue);
                filterFunction();
              }}
            ></MultiRangeSlider>
          </div>
          <div className="sliderContainer">
            <h4 className="sliderTitle">Stock</h4>
            <MultiRangeSlider
              min={getMinStock(props.prods)}
              max={getMaxStock(props.prods)}
              step={1}
              minValue={minValueStock}
              maxValue={maxValueStock}
              ruler="false"
              barInnerColor="#e70"
              onInput={(e: ChangeResult) => {
                setMinValueStock(e.minValue);
                setMaxValueStock(e.maxValue);
                filterFunction();
              }}
            ></MultiRangeSlider>
          </div>
          <div className="total">{sortProducts.length} products found</div>
          <button className="resetFilters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        <div className="products">
          {sortProducts.length ? (
            sortProducts.map((prod) => <Product key={prod.id} product={prod} />)
          ) : (
            <div className="notFound">Products not found</div>
          )}
        </div>
      </div>
    </main>
  );
}
