// File Path: js/logics/reset-logic.js

import { state } from "../state/state.js";
import {
  packageSelect,
  packageAmountInput,
  dishTotalInput,
  totalAmountInput,
  dishList,
  dishesTotalInput,
  additionalDishTotalInput,
  discountTotal,
  NumberOfPackage,
  NumberOfFreebies,
  additionalChargeTotal,
} from "../state/elements.js";

import { setFreebies } from "../ui/freebies-ui.js";
import { formatCurrency } from "../helper/helper.js";
import { recalcTotal } from "../calculation/total-order-calculation.js";

// ─────────────────────────────────────────────
// GENERIC RESET FUNCTION
// ─────────────────────────────────────────────
export function resetState(options = {}) {
  const {
    resetPackage = true,
    resetFreebies = true,
    resetDishes = true,
    resetTotals = true,
    resetDeliveryCharges = false,
  } = options;

  // ─────────────────────────────
  // RESET STATE (VERY IMPORTANT)
  // ─────────────────────────────
  if (resetPackage) {
    state.selectedPackage = null;
    state.packagePrice = 0;     // 🔥 required
    state.discount = 0;         // 🔥 required

    if (packageSelect) packageSelect.value = "";

    if (NumberOfPackage) {
      NumberOfPackage.forEach((el) => (el.textContent = 0));
    }
  }

  // ─────────────────────────────
  // RESET DELIVERY FEE (IMPORTANT)
  // ─────────────────────────────
  if (resetDeliveryCharges) {
    state.additionalCharges = 0;

    if (additionalChargeTotal) {
      additionalChargeTotal.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }
  }

  // ─────────────────────────────
  // RESET FREEBIES
  // ─────────────────────────────
  if (resetFreebies) {
    setFreebies([]);

    if (NumberOfFreebies) {
      NumberOfFreebies.forEach((el) => (el.textContent = 0));
    }
  }

  // ─────────────────────────────
  // RESET PACKAGE AMOUNT
  // ─────────────────────────────
  if (packageAmountInput) {
    packageAmountInput.forEach((el) => {
      el.textContent = formatCurrency(0);
    });
  }

  // ─────────────────────────────
  // RESET DISHES
  // ─────────────────────────────
  if (resetDishes && dishList) {
    dishList.innerHTML = "";
  }

  // ─────────────────────────────
  // RESET TOTALS (UI)
  // ─────────────────────────────
  if (resetTotals) {
    if (dishTotalInput) {
      dishTotalInput.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }

    if (dishesTotalInput) {
      dishesTotalInput.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }

    if (additionalDishTotalInput) {
      additionalDishTotalInput.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }

    if (discountTotal) {
      discountTotal.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }

    if (totalAmountInput) {
      totalAmountInput.forEach((el) => {
        el.textContent = formatCurrency(0);
      });
    }
  }

  // ─────────────────────────────
  // FINAL RECALCULATION (CRITICAL)
  // ─────────────────────────────
  recalcTotal();
}

// ─────────────────────────────────────────────
// EASY CALL FUNCTION
// ─────────────────────────────────────────────
export function runReset(options = {}) {
  resetState(options);
}