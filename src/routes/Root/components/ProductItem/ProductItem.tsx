import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCart from "../../../../components/AddToCart/AddToCart";
import "./ProductItem.css";

interface Rating {
	rate: number;
	count: number;
}

interface Item {
	id: number;
	image: string;
	title: string;
	// description: string;
	price: number;
	rating: Rating;
}

interface Props {
	item: Item;
}

const ProductItem: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	return (
		<div className="product-item">
			<img
				src={item.image}
				alt={item.title}
			/>
			<h3>{item.title}</h3>
			{/* <p>{item.description}</p> */}
			<span>${item.price}</span>

			{/* Add the rating container */}
			<div className="rating">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						d="M0 0h24v24H0z"
					/>
					<path d="M12 16.53l-5.03 3.44 1.91-5.58L3.94 9.03l5.64-.25L12 3l2.42 5.78 5.64.25-4.54 3.36 1.91 5.58L12 16.53z" />
				</svg>
				<span>{item.rating.rate}</span>
				<span>({item.rating.count})</span>
			</div>

			{/* Add the action button container */}
			<div className="action-buttons">
				<AddToCart product={item} />
				<button
					onClick={() => navigate("/product/" + item.id)}
					className={"action-buttons-button"}
				>
					More Info
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
