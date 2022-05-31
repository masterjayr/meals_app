import { createContext, useState } from "react";

export const FavoritesContext = createContext({
	ids: [],
	addFavorites: (id) => {},
	removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
	const [favoriteMealIds, setFavoriteMealsId] = useState([]);

	function addFavorite(id) {
		setFavoriteMealsId((currentFavId) => [...currentFavId, id]);
	}

	function removeFavorite(id) {
		setFavoriteMealsId((currentFavIds) =>
			currentFavIds.filter((mealId) => mealId !== id)
		);
	}

	const value = {
		ids: favoriteMealIds,
		addFavorite: addFavorite,
		removeFavorite: removeFavorite,
	};
	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
}

export default FavoritesContextProvider;
