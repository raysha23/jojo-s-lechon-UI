import { state } from "../state/state.js";
import {
  dishesTotalInput,
  additionalDishTotalInput,
  discountTotal,
  subtotal,
  totalAmountInput,
} from "../state/elements.js";

import { formatCurrency } from "../helper/helper.js";
import { dishProducts } from "../data/dishes-data.js";

export function recalcTotal() {
  const type = state.currentOrderType;

  const packagePrice = Number(state.packagePrice || 0);
  const discount = Number(state.discount || 0); // store as negative e.g. -500
  const additionalCharges = Number(state.additionalCharges || 0); // e.g. 200

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

  // ── Subtotal = items only, before discount/charges ──
  const subtotalValue =
    type === "dishes" ? dishTotal : packagePrice + dishTotal + additionalTotal;

  // ── Final = subtotal + discount (negative) + charges ──
  const final = subtotalValue + discount + additionalCharges;

  // ── DOM updates ──
  if (dishesTotalInput)
    dishesTotalInput.textContent = formatCurrency(dishTotal);
  if (additionalDishTotalInput)
    additionalDishTotalInput.textContent = formatCurrency(additionalTotal);
  if (discountTotal) discountTotal.textContent = formatCurrency(discount);
  if (subtotal) subtotal.textContent = formatCurrency(subtotalValue); // 🔥 was missing
  if (totalAmountInput) totalAmountInput.textContent = formatCurrency(final);
}
