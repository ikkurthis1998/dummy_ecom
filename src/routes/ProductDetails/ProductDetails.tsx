import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddToCart from "../../components/AddToCart/AddToCart";
import { Product } from "../Root/Root";
import "./ProductDetails.css";

const ProductDetails: React.FC = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState<Product>();

	const navigate = useNavigate();

	if (!productId) return <Navigate to="/" />;

	const fetchProductDetails = async ({ productId }: { productId: string }) => {
		const response = await fetch("https://fakestoreapi.com/products/" + productId);
		const data: Product = await response.json();
		setProduct(data);
	};

	useEffect(() => {
		fetchProductDetails({ productId });
	}, [productId]);

	return product ? (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<button
					onClick={() => navigate("/")}
					className="action-buttons-button"
				>
					Go to Home
				</button>
				<button
					onClick={() => navigate("/cart")}
					className="action-buttons-button"
				>
					Go to Cart
				</button>
			</div>
			<div className="product-details-container">
				<div className="product-image-container">
					<img
						src={product.image}
						alt={product.title}
						className="product-image"
					/>
				</div>
				<div className="product-info-container">
					<h1>{product.title}</h1>
					<p className="product-description">{product.description}</p>
					<p className="product-price">${product.price}</p>
					<p className="product-rating">
						Rating: {product.rating.rate} ({product.rating.count} reviews)
					</p>
					<AddToCart product={product} />
				</div>
			</div>
		</>
	) : (
		<div>Loading...</div>
	);
};

export default ProductDetails;
