// File Path: js/logics/reset-logic.js
import { state } from "../state/state.js";
import { packageAmountInput ,dishTotalInput,totalAmountInput,dishesTotalInput,additionalDishTotalInput } from "../state/elements.js";
import { setFreebies } from "../ui/freebies-ui.js";

export function resetState({ state, elements, options = {} }) {
  const {
    resetPackage = true,
    resetFreebies = true,
    resetDishes = true,
    resetTotals = true,
  } = options;

  const {
    packageSelect,
    packageAmountInput,
    dishTotalInput,
    totalAmountInput,
    dishList,
    setFreebies,
    dishesTotalInput, // ➕ add
    additionalDishTotal, // ➕ add
    discountTotal, // ➕ add
  } = elements;

  // ─────────────────────────────
  // RESET STATE
  // ─────────────────────────────
  if (resetPackage) {
    state.selectedPackage = null;
    if (packageSelect) packageSelect.value = "";
  }

  // ─────────────────────────────
  // FREEBIES RESET
  // ─────────────────────────────
  if (resetFreebies && setFreebies) {
    setFreebies([]);
  }

  // ─────────────────────────────
  // PACKAGE AMOUNT RESET
  // ─────────────────────────────
  if (packageAmountInput) {
    packageAmountInput.textContent = "0.00"; // ✅ was .value = ""
  }

  // ─────────────────────────────
  // TOTAL RESET
  // ─────────────────────────────
  if (resetTotals) {
    if (dishTotalInput) dishTotalInput.textContent = "0.00";
    if (totalAmountInput) totalAmountInput.textContent = "0.00";
    if (dishesTotalInput) dishesTotalInput.textContent = "0.00"; // ➕
    if (additionalDishTotal) additionalDishTotal.textContent = "0.00"; // ➕
    if (discountTotal) discountTotal.textContent = "0.00"; // ➕
  }

  // ─────────────────────────────
  // DISHES RESET
  // ─────────────────────────────
  if (resetDishes && dishList) {
    dishList.innerHTML = "";
  }
}


export function runReset(options = {}) {
  resetState({
    state,
    elements: {
      packageSelect,
      packageAmountInput,
      dishTotalInput,
      totalAmountInput,
      dishList,
      setFreebies,
      dishesTotalInput,
      additionalDishTotal: additionalDishTotalInput,
      discountTotal,
    },
    options,
  });
}