import React, { useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
function MealDetailScreen({ route, navigation }) {
	// const favoriteMealsCtx = useContext(FavoritesContext);
	const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
	const dispatch = useDispatch();

	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	const mealIsFavorite = favoriteMealIds.includes(mealId);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						onPress={changeFavoritesHandler}
						icon={mealIsFavorite ? "star" : "star-outline"}
						color="white"
					/>
				);
			},
		});
	}, [navigation, changeFavoritesHandler]);

	function changeFavoritesHandler() {
		if (mealIsFavorite) {
			dispatch(addFavorite(mealId));
		} else {
			dispatch(removeFavorite(mealId));
		}
	}
	return (
		<ScrollView style={styles.rootContainer}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<MealDetails
				duration={selectedMeal.duration}
				affordability={selectedMeal.affordability}
				complexity={selectedMeal.complexity}
				textStyle={styles.detailText}
			/>
			<View style={styles.listOutterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients} />

					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 2,
	},
	image: {
		height: 350,
		width: "100%",
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
		margin: 8,
		textAlign: "center",
		color: "white",
	},
	detailText: {
		color: "white",
	},
	listContainer: {
		maxWidth: "80%",
	},
	listOutterContainer: {
		alignItems: "center",
	},
});
