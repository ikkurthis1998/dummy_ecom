import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./Counter.css";

interface CounterProps {
	initialValue?: number;
	onChange?: (value: number) => void;
	product: {
		id: number;
		title: string;
		price: number;
		image: string;
	};
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, product, onChange }) => {
	const [count, setCount] = useState(initialValue);

	const { items, handleItemQuantity } = useContext(CartContext);

	const item = items.find((i) => i.product.id === product.id);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
		onChange && onChange(count + 1);
		handleItemQuantity && handleItemQuantity(product.id, count + 1);
	};

	const handleDecrement = () => {
		setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
		onChange && onChange(count - 1);
		handleItemQuantity && handleItemQuantity(product.id, count - 1);
	};

	return (
		<div className="counter">
			<button
				onClick={handleDecrement}
				className="counter-button"
			>
				-
			</button>
			<span>{count}</span>
			<button
				onClick={handleIncrement}
				className="counter-button"
			>
				+
			</button>
		</div>
	);
};

export default Counter;
