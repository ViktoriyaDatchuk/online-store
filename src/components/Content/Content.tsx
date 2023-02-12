import ProductResponse from "../../interfaces/ProductResponse";
import "../Content/Content.css";
import { useState, useEffect, ChangeEvent } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Filters } from "../Filters/Filters";
import { Product } from "../product/Product";
import listImg from "../../assets/img/listview.png";
import cardImg from "../../assets/img/tileview.png";
import { useSearchParams } from "react-router-dom";

export const Content = ({ products }: { products: ProductResponse[] }) => {
  const [searcParams, setSearchParams] = useSearchParams();
  const [filtersCategory, setFiltersCategory] = useState<string[]>([]);
  const [filtersBrand, setFiltersBrand] = useState<string[]>([]);
  const [sortProducts, setsortProducts] = useState<ProductResponse[]>(products);
  const [minValuePrice, setMinValuePrice] = useState<number>(
    Math.min.apply(
      null,
      products.map((item) => item.price)
    )
  );
  const [maxValuePrice, setMaxValuePrice] = useState<number>(
    Math.max.apply(
      null,
      products.map((item) => item.price)
    )
  );
  const [minValueStock, setMinValueStock] = useState<number>(
    Math.min.apply(
      null,
      products.map((item) => item.stock)
    )
  );
  const [maxValueStock, setMaxValueStock] = useState<number>(
    Math.max.apply(
      null,
      products.map((item) => item.stock)
    )
  );
  const [value, setValue] = useState("");
  const [isList, setIsList] = useState(searcParams.get("view") === "list");
  const [selectedSort, setSelectedSort] = useState("");

  const addFilter = (name: string, value: string) => {
    if (name === "categories") {
      setFiltersCategory([...filtersCategory, value]);
    } else if (name === "brands") {
      setFiltersBrand([...filtersBrand, value]);
    }
  };

  const removeFilter = (name: string, value: string) => {
    setsortProducts(products);
    if (name === "categories") {
      setFiltersCategory(filtersCategory.filter((item) => item !== value));
    } else if (name === "brands") {
      setFiltersBrand(filtersBrand.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    filterFunction();
  }, [filtersCategory, filtersBrand]);

  const filterFunction = () => {
    setsortProducts(
      products
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
    setsortProducts(products);
    setSearchParams({});
    setFiltersBrand([]);
    setFiltersCategory([]);
    setMinValuePrice(
      Math.min.apply(
        null,
        products.map((item) => item.price)
      )
    );
    setMaxValuePrice(
      Math.max.apply(
        null,
        products.map((item) => item.price)
      )
    );
    setMinValueStock(
      Math.min.apply(
        null,
        products.map((item) => item.stock)
      )
    );
    setMaxValueStock(
      Math.max.apply(
        null,
        products.map((item) => item.stock)
      )
    );
  };

  const sortProductFunction = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    const [name, direction] = event.target.value.split(" ");
    if (direction === "desc") {
      setsortProducts(
        products.sort(
          (a, b) =>
            (b[name as keyof ProductResponse] as number) -
            (a[name as keyof ProductResponse] as number)
        )
      );
    } else {
      setsortProducts(
        products.sort(
          (a, b) =>
            (a[name as keyof ProductResponse] as number) -
            (b[name as keyof ProductResponse] as number)
        )
      );
    }
  };

  return (
    <main>
      <div className="mainContainer">
        <div className="filtersSpace">
          <Filters
            products={products}
            addFilter={addFilter}
            removeFilter={removeFilter}
            filtersCategory={filtersCategory}
            filtersBrand={filtersBrand}
          />
          <div className="sliderContainer">
            <h4 className="sliderTitle">Price</h4>
            <MultiRangeSlider
              min={Math.min.apply(
                null,
                products.map((item) => item.price)
              )}
              max={Math.max.apply(
                null,
                products.map((item) => item.price)
              )}
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
              min={Math.min.apply(
                null,
                products.map((item) => item.stock)
              )}
              max={Math.max.apply(
                null,
                products.map((item) => item.stock)
              )}
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
          <div className="total">
            {
              sortProducts.filter((product) => {
                return (
                  product.title.toLowerCase().includes(value.toLowerCase()) ||
                  product.category.toLowerCase().includes(value.toLowerCase())
                );
              }).length
            }{" "}
            products found
          </div>
          <button className="resetFilters" onClick={resetFilters}>
            Reset Filters
          </button>
          <button className="copyLink" onClick={resetFilters}>
            Copy Link
          </button>
        </div>
        <div className="products">
          <div className="controls">
            <input
              type="search"
              onChange={(event) => setValue(event.target.value)}
              className="products__search-field"
              placeholder="Search product"
            />
            <div className="sortViewContainer">
              <div className="sort">
                <select
                  className="sortSelect"
                  value={selectedSort}
                  onChange={sortProductFunction}
                >
                  <option disabled value="">
                    Sort:
                  </option>
                  <option value="rating desc">Popular first</option>
                  <option value="rating asc">Unpopular first</option>
                  <option value="price desc">Expensive first</option>
                  <option value="price asc">Cheap first</option>
                </select>
              </div>
              <button
                className="controls__view-button"
                onClick={() => {
                  setIsList(!isList);
                  setSearchParams({ view: isList ? "block" : "list" });
                }}
              >
                <img src={isList ? cardImg : listImg} alt="view" />
              </button>
            </div>
          </div>
          {sortProducts.length ? (
            sortProducts
              .filter((product) => {
                return (
                  product.title.toLowerCase().includes(value.toLowerCase()) ||
                  product.category.toLowerCase().includes(value.toLowerCase())
                );
              })
              .map((product) => (
                <Product key={product.id} product={product} isList={isList} />
              ))
          ) : (
            <div className="notFound">Products not found</div>
          )}
        </div>
      </div>
    </main>
  );
};
