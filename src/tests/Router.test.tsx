import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Cart } from "../pages/Cart/Cart";
import { Main } from "../pages/Main/Main";
import { store } from "../redux/store";

describe("ROUTER TESTS", () => {
  test("Main page test", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const mainLink = screen.getByTestId("main-link");
    userEvent.click(mainLink);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("Cart page test", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const cartLink = screen.getByTestId("cart-link");
    userEvent.click(cartLink);
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
