import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root/Root";
import ProductDetails from "./routes/ProductDetails/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./routes/CartPage/CartPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/product/:productId",
		element: <ProductDetails />,
	},
	{
		path: "/cart",
		element: <CartPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<CartProvider>
		<RouterProvider router={router} />
	</CartProvider>
	// </React.StrictMode>
);
