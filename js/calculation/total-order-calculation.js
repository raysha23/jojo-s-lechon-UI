import { state } from "../state/state.js";
import { formatCurrency } from "../helper/helper.js";
import { dishProducts } from "../data/dishes-data.js";

function setAll(selector, value) {
  document.querySelectorAll(selector).forEach((el) => (el.textContent = value));
}

export function recalcTotal() {
  const type = state.currentOrderType;

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
  } else {
    document.querySelectorAll(".extra-dish select").forEach((sel) => {
      const index = Number(sel.value);
      if (!Number.isNaN(index) && dishProducts[index]) {
        additionalTotal += Number(dishProducts[index].amount);
      }
    });
  }

  const subtotalValue =
    type === "dishes" ? dishTotal : packagePrice + dishTotal + additionalTotal;

  const final = subtotalValue + discount + additionalCharges;

  // ─── DOM UPDATES ──────────────────────────────────────────
  setAll(".dishesTotal", formatCurrency(dishTotal));
  setAll(".Additional-dishTotal", formatCurrency(additionalTotal));
  setAll(".discountTotal", formatCurrency(discount));
  setAll(".subTotal", formatCurrency(subtotalValue));
  setAll(".totalAmount", formatCurrency(final));

  // ─── COUNTS ───────────────────────────────────────────────
  const requiredDishes = document.querySelectorAll(".required-dish").length;
  const extraDishes = document.querySelectorAll(".extra-dish").length;

  setAll(
    ".noOfDishes",
    type === "dishes"
      ? document.querySelectorAll("#dishList select").length
      : requiredDishes + extraDishes,
  );

  setAll(".noOfFreebies", state.selectedPackage?.freebies?.length || 0);
  setAll(".noOfPackage", state.selectedPackage ? 1 : 0);
}
