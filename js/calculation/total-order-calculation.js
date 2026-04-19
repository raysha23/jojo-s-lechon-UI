import { state } from "../state/state.js";
import { formatCurrency } from "../helper/helper.js";
import { dishProducts } from "../data/dishes-data.js";

function setAll(selector, value) {
  document.querySelectorAll(selector).forEach((el) => (el.textContent = value));
}

export function recalcTotal() {
  const type = state.currentProductType;

  const packagePrice = Number(state.packagePrice || 0);
  const discount = Number(state.discount || 0);
  const additionalCharges = Number(state.additionalCharges || 0);

  let dishTotal = 0;
  let additionalTotal = 0;

  if (type === "dishes") {
    document.querySelectorAll("#dishList select").forEach((sel) => {
      const index = Number(sel.value);
      if (!Number.isNaN(index) && dishProducts[index]) {
        dishTotal += Number(dishProducts[index].amount);
      }
    });

    const subtotalValue = dishTotal;
    const final = subtotalValue + additionalCharges - discount;

    console.group("🍽️ DISHES CALCULATION");
    console.log("Dish Total:          ", dishTotal);
    console.log("Additional Charges:  ", additionalCharges);
    console.log("Discount:            ", discount);
    console.log("─────────────────────────────");
    console.log("Subtotal (dishTotal):", subtotalValue);
    console.log("Final (sub + charges - disc):", final);
    console.groupEnd();

    setAll(".dishesTotal, #dishesTotal", formatCurrency(dishTotal));
    setAll(
      ".Additional-dishTotal, .additionalTotal, #Additional-dishTotal",
      formatCurrency(0),
    );
    setAll(
      ".discount, .discountTotal, #discountTotal",
      formatCurrency(discount),
    );
    setAll(".subTotal, .subtotal, #subtotal", formatCurrency(subtotalValue));
    setAll(
      ".additionalCharge, #additionalCharge",
      formatCurrency(additionalCharges),
    );
    setAll(".totalAmount, #totalAmount", formatCurrency(final));
  } else {
    document.querySelectorAll(".extra-dish select").forEach((sel) => {
      const index = Number(sel.value);
      if (!Number.isNaN(index) && dishProducts[index]) {
        additionalTotal += Number(dishProducts[index].amount);
      }
    });

    const subtotal = packagePrice + additionalTotal + additionalCharges;
    const total = subtotal + discount;

    console.group("🐷 PACKAGE CALCULATION");
    console.log("Package Price:       ", packagePrice);
    console.log("Additional Dishes:   ", additionalTotal);
    console.log("Additional Charges:  ", additionalCharges);
    console.log("Discount:            ", discount);
    console.log("─────────────────────────────");
    console.log("Subtotal (pkg + dishes + charges):", subtotal);
    console.log("Total    (subtotal - discount):   ", total);
    console.groupEnd();

    setAll(".dishesTotal, #dishesTotal", formatCurrency(0));
    setAll(
      ".Additional-dishTotal, .additionalTotal, #Additional-dishTotal",
      formatCurrency(additionalTotal),
    );
    setAll(
      ".discount, .discountTotal, #discountTotal",
      formatCurrency(discount),
    );
    setAll(
      ".additionalCharge, #additionalCharge",
      formatCurrency(additionalCharges),
    );
    setAll(".subTotal, .subtotal, #subtotal", formatCurrency(subtotal));
    setAll(".totalAmount, #totalAmount", formatCurrency(total));
  }

  // ─── COUNTS ───────────────────────────────────────────────
  const requiredDishes = document.querySelectorAll(".required-dish").length;
  const extraDishes = document.querySelectorAll(".extra-dish").length;

  const noOfDishes =
    type === "dishes"
      ? document.querySelectorAll("#dishList select").length
      : requiredDishes + extraDishes;

  console.log(
    "📊 COUNTS — requiredDishes:",
    requiredDishes,
    "| extraDishes:",
    extraDishes,
    "| noOfDishes:",
    noOfDishes,
  );

  setAll(".noOfDishes", noOfDishes);
  setAll(".noOfFreebies", state.selectedPackage?.freebies?.length || 0);
  setAll(".noOfPackage", state.selectedPackage ? 1 : 0);
}
