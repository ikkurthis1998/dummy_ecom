import React, { useState } from "react";
import { Product } from "../../Root";
import "./Search.css";

interface Props {
	products: Product[];
	setSearchResults: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Search: React.FC<Props> = ({ products, setSearchResults }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);
		if (searchTerm) {
			const words = searchTerm.split(/\s+/).map((word) => `(?=.*${word})`);
			const pattern = new RegExp(words.join(""), "i");
			const results = products.filter((product) => pattern.test(product.title));
			if (searchTerm !== "" && results.length === 0) {
				setSearchResults([
					{
						id: 0,
						title: "No results found",
						price: 0,
						description: "",
						image: "",
						rating: {
							rate: 0,
							count: 0,
						},
					},
				]);
				return;
			}
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	return (
		<div className="search-container">
			<input
				className="search-input"
				type="text"
				placeholder="Search products..."
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	);
};

export default Search;
