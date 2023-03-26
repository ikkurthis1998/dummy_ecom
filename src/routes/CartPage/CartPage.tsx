import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../../components/Counter/Counter";
import { CartContext, CartItem } from "../../contexts/CartContext";
import "./CartPage.css"; // import the CSS file

const CartPage: React.FC = () => {
	const { items, removeItem, clearCart } = useContext(CartContext);

	const navigate = useNavigate();

	const totalPrice: number = items.reduce((acc: number, item: CartItem) => {
		return acc + item.product.price * item.quantity;
	}, 0);

	const handleRemoveItem = (itemId: number): void => {
		removeItem(itemId);
	};

	const handleClearCart = (): void => {
		clearCart();
	};

	return (
		<div>
			<h1>Cart</h1>
			{items.length === 0 ? (
				<>
					<button
						onClick={() => navigate("/")}
						className="action-buttons-button"
					>
						Go to Home
					</button>
					<p>Your cart is empty</p>
				</>
			) : (
				<>
					<button
						onClick={() => navigate("/")}
						className="action-buttons-button"
					>
						Go to Home
					</button>
					<div className="cart-item cart-header">
						<div className="cart-item-details">Product</div>
						{/* <div className="cart-item-details">Quantity</div> */}
						<div className="cart-item-details">Image</div>
						<div className="cart-item-details">Price</div>
						<div className="cart-item-details"></div>
					</div>
					{items.map((item: CartItem) => (
						<div
							className="cart-item"
							key={item.product.id}
						>
							<div className="cart-item-details">{item.product.title}</div>
							{/* <div className="cart-item-details">{item.quantity}</div> */}
							<div className="cart-item-details">
								<img
									className="cart-item-image"
									src={item.product.image}
									alt={item.product.title}
									width="50"
									height="50"
								/>
							</div>
							<div className="cart-item-details">
								${item.product.price.toFixed(2)}
							</div>
							<div className="cart-item-details">
								<Counter
									product={item.product}
									initialValue={item.quantity}
								/>
							</div>
						</div>
					))}
					<div className="cart-item cart-footer">
						<div className="cart-item-details"></div>
						<div className="cart-item-details"></div>
						<div className="cart-item-details"></div>
						<div className="cart-item-details">Total: ${totalPrice.toFixed(2)}</div>
						<div className="cart-item-details">
							<button
								onClick={handleClearCart}
								className="action-buttons-button"
							>
								Clear Cart
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CartPage;
