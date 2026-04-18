import { DishModel } from "./models.js";

const DEFAULT_PRICE = 700;

export const dishData = [
  "Buttered Chicken",
  "Cordon Blue",
  "Buttered Shrimp",
  "Porksteak",
  "Humba",
  "Bam-e",
  "Calamares",
  "Fish Fillet",
  "Sweet and Sour Fish",
  "Sweet and Sour Chicken",
  "Sweet and Sour Pork",
  "Pork Caldereta",
  "Chicken Afritada",
  "Menudo",
  "Lumpia",
  "Sinugbang Isda",
  "Chop Suey",
  "Buffalo Chicken",
  "Pork Afritada",
  "Tempura Shrimp",
  "Escabeche",
  "Kinilaw",
  "Porkchop",
  "Pancit Guisado",
];

// convert → class objects with default price
export const dishProducts = dishData.map(
  (name) => new DishModel(name, DEFAULT_PRICE)
);

console.log("Dishes: ", dishProducts);