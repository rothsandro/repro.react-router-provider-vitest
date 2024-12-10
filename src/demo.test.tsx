import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router";
import { RouterProvider as RouterProviderDOM } from "react-router/dom";
import userEvent from "@testing-library/user-event";

test("react-router/dom", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter([
    { index: true, element: <Home /> },
    { path: "foo", element: <Foo /> },
  ]);

  render(<RouterProviderDOM router={router} />);

  await user.click(screen.getByRole("button", { name: "Navigate" }));
  await screen.findByRole("heading", { name: "Foo" });
});

test("react-router", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter([
    { index: true, element: <Home /> },
    { path: "foo", element: <Foo /> },
  ]);

  render(<RouterProvider router={router} />);

  await user.click(screen.getByRole("button", { name: "Navigate" }));
  await screen.findByRole("heading", { name: "Foo" });
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/foo", { flushSync: true })}>
      Navigate
    </button>
  );
};

const Foo = () => <h1>Foo</h1>;
