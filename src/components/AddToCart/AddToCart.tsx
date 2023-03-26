import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Product } from "../../routes/Root/Root";
import Counter from "../Counter/Counter";
import "./AddToCart.css";

interface AddToCartProps {
	product: {
		id: number;
		title: string;
		price: number;
		image: string;
	};
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
	const [quantity, setQuantity] = useState(0);

	const { items, addItem } = useContext(CartContext);

	const item = items.find((i) => i.product.id === product.id);

	const handleAddToCart = () => {
		setQuantity(1);
		addItem({
			product: {
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.image,
			},
			quantity: 1,
		});
	};

	useEffect(() => {
		if (item) {
			setQuantity(item.quantity);
		}
	}, [item]);

	if (quantity) {
		return (
			<Counter
				initialValue={quantity}
				product={product}
				onChange={setQuantity}
			/>
		);
	} else {
		return (
			<button
				onClick={handleAddToCart}
				className="add-to-cart-button"
			>
				Add to Cart
			</button>
		);
	}
};

export default AddToCart;
