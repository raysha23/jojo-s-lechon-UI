// main.js
import { setAll } from "./steps/step1.js";
import { initStep1Listeners } from "./steps/step1.js";
import { formatCurrency } from "./helper/helper.js";


document.addEventListener("DOMContentLoaded", () => {
  setAll(".discountTotal", formatCurrency(0));
  setAll(".Additional-dishTotal", formatCurrency(0));
  setAll(".dishesTotal", formatCurrency(0));
  setAll(".totalAmount", formatCurrency(0));
  setAll(".subTotal", formatCurrency(0));
  setAll(".additionalCharge", formatCurrency(0));
  setAll(".noOfFreebies", 0);
  setAll(".noOfPackage", 0);
  setAll(".noOfDishes", 0);
  setAll(".packageAmount", formatCurrency(0));

  initStep1Listeners();
});