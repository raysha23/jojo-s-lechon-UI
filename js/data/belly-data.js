import { BellyModel } from "./models.js";
const bellyData = [
  {
    productName: "Belly",
    amount: 3000,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 3400,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 3700,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 4000,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 4300,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 4700,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 5000,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 5300,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
  {
    productName: "Belly ",
    amount: 5500,
    promoAmount: "-500",
    freebies: ["Coke"],
  },
];

// convert raw → class objects
export const bellyProducts = bellyData.map(
  item =>
    new BellyModel(
        item.productName,
        item.amount,
        item.promoAmount,
        item.freebies
    )
);  