import React, { createContext, PropsWithChildren, useEffect, useState } from "react";

interface CartContextType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (itemId: number) => void;
	handleItemQuantity: (itemId: number, quantity: number) => void;
	clearCart: () => void;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
}

export const CartContext = createContext<CartContextType>({
	items: [],
	addItem: () => {},
	removeItem: () => {},
	handleItemQuantity: () => {},
	clearCart: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const storedItems = localStorage.getItem("items");
	const parsedItems = storedItems && JSON.parse(storedItems);

	const [items, setItems] = useState<CartItem[]>(parsedItems || []);

	const addItem = (item: CartItem) => {
		setItems((prevItems) => {
			const itemIndex = prevItems.findIndex((i) => i.product.id === item.product.id);

			if (itemIndex !== -1) {
				const newItems = [...prevItems];
				newItems[itemIndex].quantity += item.quantity;
				return newItems;
			} else {
				return [...prevItems, item];
			}
		});
	};

	const removeItem = (itemId: number) => {
		setItems((prevItems) => {
			const itemIndex = prevItems.findIndex((i) => i.product.id === itemId);

			if (itemIndex !== -1) {
				const newItems = [...prevItems];
				if (newItems[itemIndex].quantity > 1) {
					newItems[itemIndex].quantity -= 1;
				} else {
					newItems.splice(itemIndex, 1);
				}
				return newItems;
			} else {
				return [...prevItems];
			}
		});
	};

	const handleItemQuantity = (itemId: number, quantity: number) => {
		setItems((prevItems) => {
			const itemIndex = prevItems.findIndex((i) => i.product.id === itemId);

			if (itemIndex !== -1) {
				const newItems = [...prevItems];
				if (quantity === 0) {
					newItems.splice(itemIndex, 1);
				} else {
					newItems[itemIndex].quantity = quantity;
				}
				return newItems;
			} else {
				return [...prevItems];
			}
		});
	};

	const clearCart = () => {
		setItems([]);
	};

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const cartContextValue: CartContextType = {
		items,
		addItem,
		removeItem,
		handleItemQuantity,
		clearCart,
	};

	return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
