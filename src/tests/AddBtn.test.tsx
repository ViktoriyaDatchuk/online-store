import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AddBtn } from "../components/AddBtn/AddBtn";
import { CartMain } from "../components/CartMain/CartMain";
import { Product } from "../components/product/Product";
import { store } from "../redux/store";

test("AddBtn click test", () => {
  const product = {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
  };
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Product product={product} isList={true} />
        <AddBtn product={product} />
        <CartMain />
      </MemoryRouter>
    </Provider>
  );
  const button = screen.getAllByTestId("test-button");
  userEvent.click(button[0]);
  expect(screen.getByTestId("cart-products")).toBeInTheDocument();
});
