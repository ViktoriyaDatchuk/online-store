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
  const [filtersCat, setFiltersCat] = useState<string[]>([]);
  const [filtersBrand, setFiltersBrand] = useState<string[]>([]);
  const [sortProd, setsortProd] = useState<ProductResponse[]>(props.prods);
  const [minValuePrice, setMinValuePrice] = useState<number>(getMinPrice(props.prods));
	const [maxValuePrice, setMaxValuePrice] = useState<number>(getMaxPrice(props.prods));
  const [minValueStock, setMinValueStock] = useState<number>(getMinStock(props.prods));
	const [maxValueStock, setMaxValueStock] = useState<number>(getMaxStock(props.prods));

  const filterProd = (name: string, value: string) => {
    if (name === "categories") {
      setFiltersCat([...filtersCat, value]);
    } else {
      setFiltersBrand([...filtersBrand, value]);
    }
  };

  const removeFilter = (name: string, value: string) => {
    setsortProd(props.prods);
    if (name === "categories") {
      setFiltersCat(filtersCat.filter((item) => item !== value));
    } else {
      setFiltersBrand(filtersBrand.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    setsortProd(filterFunc());
  }, [filtersCat, filtersBrand]);

  useEffect(() => {
    setsortProd(filterRange());
  }, [maxValuePrice, minValuePrice, maxValueStock, minValueStock]);

  const filterFunc = () => {
    return sortProd
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

  const filterRange = () => {
    return sortProd
    .filter((item) => {
      return item.price >= minValuePrice && item.price <= maxValuePrice;
    })
    .filter((item) => {
      return item.stock >= minValueStock && item.stock <= maxValueStock;
    })

  }

  const resetFilters = () => {
    setsortProd(props.prods);
    setFiltersBrand([]);
    setFiltersCat([]);
  };

  function getMaxPrice(products: ProductResponse[]) {
    let max = products[0].price;
    products.forEach(elem => {
      if (elem.price > max) {
        max = elem.price;
      }
    })
    return max;
  }

  function getMinPrice(products: ProductResponse[]) {
    let min = products[0].price;
    products.forEach(elem => {
      if (elem.price < min) {
        min = elem.price;
      }
    })
    return min;
  }

  function getMaxStock(products: ProductResponse[]) {
    let max = products[0].stock;
    products.forEach(elem => {
      if (elem.stock > max) {
        max = elem.stock;
      }
    })
    return max;
  }

  function getMinStock(products: ProductResponse[]) {
    let min = products[0].stock;
    products.forEach(elem => {
      if (elem.stock < min) {
        min = elem.stock;
      }
    })
    return min;
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
          <div className="sliderContainer">
            <h4 className="sliderTitle">Price</h4>
            <MultiRangeSlider
              min={getMinPrice(props.prods)}
              max={getMaxPrice(props.prods)}
              step={1}
              minValue={getMinPrice(sortProd)}
              maxValue={getMaxPrice(sortProd)}
              ruler="false"
              barInnerColor="#e70"
              onInput={(e: ChangeResult) => {
                setMinValuePrice(e.minValue);
                setMaxValuePrice(e.maxValue);
              }}
            ></MultiRangeSlider>
          </div>
          <div className="sliderContainer">
            <h4 className="sliderTitle">Stock</h4>
            <MultiRangeSlider
              min={getMinStock(props.prods)}
              max={getMaxStock(props.prods)}
              step={1}
              minValue={getMinStock(sortProd)}
              maxValue={getMaxStock(sortProd)}
              ruler="false"
              barInnerColor="#e70"
              onInput={(e: ChangeResult) => {
                setMinValueStock(e.minValue);
                setMaxValueStock(e.maxValue);
              }}
            ></MultiRangeSlider>
          </div>
          <div className="total">{sortProd.length} products found</div>
          <button className="resetFilters" onClick={resetFilters}>
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
