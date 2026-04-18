import { BellyPackageModel } from "./models.js";

const bellyPackageData = [
  {
    productName: "Belly - 1 (4kg)",
    amount: 4790,
    promoAmount: "-500",
    NoOfDishes: 3,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
  {
    productName: "Belly - 2 (4kg)",
    amount: 5400,
    promoAmount: "-500",
    NoOfDishes: 4,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
  {
    productName: "Belly - 4 (4kg)",
    amount: 6590,
    promoAmount: "-500",
    NoOfDishes: 6,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
  {
    productName: "Big Belly A (6kg - 7kg)",
    amount: 6300,
    promoAmount: "-500",
    NoOfDishes: 4,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
  {
    productName: "Big Belly B (6kg - 7kg)",
    amount: 6900,
    promoAmount: "-500",
    NoOfDishes: 5,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
  {
    productName: "Big Belly C (6kg - 7kg)",
    amount: 7490,
    promoAmount: "-500",
    NoOfDishes: 6,
    dishes: [],
    freebies: ["Ribs", "Coke"],
  },
];

// convert raw → class objects
export const bellyPackageProducts = bellyPackageData.map(
  (item) =>
    new BellyPackageModel(
      item.productName,
      item.amount,
      item.promoAmount,
      item.NoOfDishes,
      item.dishes,
      item.freebies,
    ),
);

console.log("Belly Package Products:", bellyPackageProducts);
