import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";
import { store } from "../redux/store";

describe("MODAL TESTS", () => {
  test("Name validation correct", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const nameInput = screen.getByTestId("name-input");
    const button = screen.getByTestId("button");
    fireEvent.input(nameInput, {
      target: { value: "Sam Davidson" },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("name-messsage")).toBeNull();
  });

  test("Name validation incorrect", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const nameInput = screen.getByTestId("name-input");
    const button = screen.getByTestId("button");
    fireEvent.input(nameInput, {
      target: { value: "123123" },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("name-messsage")).toBeInTheDocument();
  });

  test("Phone number validation correct", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const phoneInput = screen.getByTestId("phone-input");
    const button = screen.getByTestId("button");
    fireEvent.input(phoneInput, {
      target: { value: "+111111111" },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("phone-messsage")).toBeNull();
  });

  test("Phone number validation incorrect", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const phoneInput = screen.getByTestId("phone-input");
    const button = screen.getByTestId("button");
    fireEvent.input(phoneInput, {
      target: { value: "hello!" },
    });
    fireEvent.click(button);
    screen.debug();
    expect(screen.queryByTestId("phone-messsage")).toBeInTheDocument();
  });

  test("Card date validation correct", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const cardDateInput = screen.getByTestId("cardDate-input");
    const button = screen.getByTestId("button");
    fireEvent.input(cardDateInput, {
      target: { value: "1125" },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("cardDate-message")).toBeNull();
  });

  test("Card date validation incorrect", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const cardDateInput = screen.getByTestId("cardDate-input");
    const button = screen.getByTestId("button");
    fireEvent.input(cardDateInput, {
      target: { value: "1327" },
    });
    fireEvent.click(button);
    expect(screen.queryByTestId("cardDate-message")).toBeInTheDocument();
  });
});
