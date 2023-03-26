import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProductItem from "./components/ProductItem/ProductItem";
import Search from "./components/Search/Search";
import "./Root.css";

export interface Product {
	id: number;
	image: string;
	title: string;
	price: number;
	description: string;
	rating: {
		rate: number;
		count: number;
	};
}

const Root: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchResults, setSearchResults] = useState<Product[]>([]);

	const navigate = useNavigate();

	const fetchProducts = async () => {
		const response = await fetch("https://fakestoreapi.com/products");
		const data: Product[] = await response.json();
		setProducts(data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="App">
			<h1>Products</h1>
			<button
				onClick={() => navigate("/cart")}
				className="action-buttons-button"
			>
				Go to Cart
			</button>
			<Search
				products={products}
				setSearchResults={setSearchResults}
			/>
			<div className="container">
				{(searchResults.length ? searchResults : products).map((product: any) => {
					if (product.id === 0) {
						return (
							<div key={product.id}>
								<h3>{product.title}</h3>
							</div>
						);
					}
					return (
						<ProductItem
							key={product.id}
							item={product}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Root;
