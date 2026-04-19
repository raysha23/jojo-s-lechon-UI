import { lechonProducts } from "../data/lechon-data.js";
import { bellyProducts } from "../data/belly-data.js";
import { bellyPackageProducts } from "../data/belly-package-data.js";
import { lechonPackageProducts } from "../data/lechon-package-data.js";
import { dishProducts } from "../data/dishes-data.js";
import { deliveryChargeList } from "../data/deliveryfee-data.js";

import { getProductSource } from "../logics/step1-logics/product-source-logic.js";
import { applyOrderType } from "../logics/step1-logics/order-type-logic.js";

import {
  packageAmountInput,
  NumberOfPackage,
  NumberOfFreebies,
  packageSelect,
  ZoneSelect,
  packageSection,
  dishSection,
  freebieList,
  freebiesSection,
  deliveryFields,
  additionalChargeTotal,
  orderType,
  productTypeSelect,
} from "../state/elements.js";

import { formatCurrency, show, hide } from "../helper/helper.js";
import { state } from "../state/state.js";
import { setFreebies } from "../ui/freebies-ui.js";
import { resetDishes } from "../ui/dishes-ui.js";
import { recalcTotal } from "../calculation/total-order-calculation.js";

// ─────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────
export function setAll(selector, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
}

// ─────────────────────────────────────────────────────────────
// PACKAGE DROPDOWN
// ─────────────────────────────────────────────────────────────
export function populatePackageDropdown(type) {
  packageSelect.innerHTML = '<option value="">— Select a product —</option>';

  const source = getProductSource(type, {
    lechonProducts,
    bellyProducts,
    lechonPackageProducts,
    bellyPackageProducts,
    dishProducts,
  });

  const isDish = type === "dishes";

  source.forEach((item, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = isDish
      ? item.productName
      : `${item.productName} — ₱${item.amount}`;
    packageSelect.appendChild(opt);
  });

  packageAmountInput.forEach((el) => (el.textContent = formatCurrency(0)));
  state.selectedPackage = null;
}

// ─────────────────────────────────────────────────────────────
// PRODUCT TYPE CHANGE
// ─────────────────────────────────────────────────────────────
export function onProductTypeChange(e) {
  const type = e.target.value;

  if (!type) {
    hide(packageSection);
    hide(dishSection);
    hide(freebiesSection);

    // ✅ RESET STATE
    state.currentProductType = null;
    state.selectedPackage = null;
    state.packagePrice = 0;
    state.discount = 0;
    state.additionalCharges = 0;

    // ✅ RESET SELECTS
    packageSelect.value = "";
    ZoneSelect.value = "";

    // ✅ RESET DISHES (CRITICAL)
    resetDishes(0);

    // ✅ RESET FREEBIES
    freebieList.innerHTML = "";

    // ✅ RESET COUNTS
    NumberOfPackage.forEach((el) => (el.textContent = 0));
    NumberOfFreebies.forEach((el) => (el.textContent = 0));

    // ✅ RESET UI VALUES
    setAll(".packageAmount", formatCurrency(0));
    setAll(".dishesTotal", formatCurrency(0));
    setAll(".additionalTotal", formatCurrency(0));
    setAll(".discount", formatCurrency(0));
    setAll(".subtotal", formatCurrency(0));
    setAll(".totalAmount", formatCurrency(0));
    setAll(".noOfDishes", 0);

    // ✅ FINAL RECALC
    recalcTotal();

    return;
  }

  state.currentProductType = type;
  state.selectedPackage = null;

  applyOrderType(type);

  if (type === "dishes") {
    hide(packageSection);
    show(dishSection);
    hide(freebiesSection);
  } else {
    show(packageSection);
    hide(dishSection);
    hide(freebiesSection);
  }

  // ✅ RESET VALUES WHEN SWITCHING
  state.packagePrice = 0;
  state.discount = 0;

  recalcTotal();
}
// ─────────────────────────────────────────────────────────────
// PACKAGE SELECT CHANGE
// ─────────────────────────────────────────────────────────────
export function onPackageSelectChange() {
  const type = state.currentProductType;
  const idx = parseInt(packageSelect.value, 10);

  // 🔥 EMPTY SELECT → RESET PACKAGE ONLY
  if (isNaN(idx)) {
    hide(dishSection);
    hide(freebiesSection);

    // ✅ RESET STATE (PACKAGE ONLY)
    state.selectedPackage = null;
    state.packagePrice = 0;
    state.discount = 0;

    // ✅ RESET UI
    freebieList.innerHTML = "";
    resetDishes(0);

    setAll(".noOfPackage", 0);
    setAll(".packageAmount", formatCurrency(0));
    setAll(".dishesTotal", formatCurrency(0));
    setAll(".additionalTotal", formatCurrency(0));
    setAll(".discount", formatCurrency(0));
    setAll(".subtotal", formatCurrency(0));
    setAll(".totalAmount", formatCurrency(0));
    setAll(".noOfDishes", 0);
    setAll(".noOfFreebies", 0);

    // ❗ DO NOT reset delivery here

    recalcTotal();
    return;
  }

  // 🔥 VALID PACKAGE SELECTED
  const source = getProductSource(type, {
    lechonProducts,
    bellyProducts,
    lechonPackageProducts,
    bellyPackageProducts,
    dishProducts,
    deliveryChargeList,
  });

  const pkg = source.at(idx);
  if (!pkg) return;

  // ✅ SET STATE
  state.selectedPackage = pkg;
  state.packagePrice = pkg.amount;
  state.discount = Number(pkg.promoAmount || 0);

  // ✅ UPDATE UI
  setAll(".noOfPackage", 1);
  setAll(".packageAmount", formatCurrency(pkg.amount));

  // ✅ LOAD DATA
  setFreebies(pkg.freebies);
  resetDishes(pkg.NoOfDishes || 0);

  show(freebiesSection);

  if (type === "lechon_package" || type === "belly_package") {
    show(dishSection);
  } else {
    hide(dishSection);
  }

  recalcTotal();
}

// ─────────────────────────────────────────────────────────────
// ZONE SELECT CHANGE (FIXED)
// ─────────────────────────────────────────────────────────────
export function onZoneSelectChange() {
  const idx = parseInt(ZoneSelect.value, 10);

  // PICKUP or invalid zone → no fee
  if (state.currentDeliveryType !== "delivery" || isNaN(idx)) {
    state.additionalCharges = 0;

    updateDeliveryUI(0);
    recalcTotal();
    return;
  }

  const zone = deliveryChargeList[idx];
  const charge = Number(zone?.minAmount || 0);

  state.additionalCharges = charge;
  additionalChargeTotal.forEach(
    (el) => (el.textContent = formatCurrency(charge)),
  );

  updateDeliveryUI(charge);
  recalcTotal();
}

// ─────────────────────────────────────────────────────────────
// DELIVERY UI SYNC (IMPORTANT FIX)
// ─────────────────────────────────────────────────────────────
function updateDeliveryUI(amount) {
  const formatted = formatCurrency(amount);
  setAll(".additionalCharge", formatted);
}

// ─────────────────────────────────────────────────────────────
// DELIVERY DROPDOWN
// ─────────────────────────────────────────────────────────────
export function populateZoneDropdown() {
  ZoneSelect.innerHTML = '<option value="">Select Zone</option>';

  deliveryChargeList.forEach((zone, i) => {
    const opt = document.createElement("option");
    opt.value = i;

    const label = zone.zones.join(", ");
    opt.textContent = `${label} — ₱${zone.minAmount}`;

    ZoneSelect.appendChild(opt);
  });
}

// ─────────────────────────────────────────────────────────────
// ORDER TYPE CHANGE (FIXED)
// ─────────────────────────────────────────────────────────────
export function onOrderTypeChange(e) {
  const type = e.target.value;
  state.currentDeliveryType = type;

  if (type === "delivery") {
    show(deliveryFields);

    const idx = parseInt(ZoneSelect.value, 10);

    if (!isNaN(idx)) {
      const zone = deliveryChargeList[idx];
      state.additionalCharges = Number(zone?.minAmount || 0);
    } else {
      state.additionalCharges = 0;
    }
  } else {
    hide(deliveryFields);
    state.additionalCharges = 0;
  }

  updateDeliveryUI(state.additionalCharges);
  recalcTotal();
}

// ─────────────────────────────────────────────────────────────
// INIT LISTENERS
// ─────────────────────────────────────────────────────────────
export function initStep1Listeners() {
  populateZoneDropdown();

  const orderTypeSelect = orderType;
  state.currentDeliveryType = orderTypeSelect?.value || null;

  if (state.currentDeliveryType === "delivery") {
    show(deliveryFields);
  } else {
    hide(deliveryFields);
  }

  // 🔥 HIDE PRODUCT UI UNTIL A PRODUCT TYPE IS SELECTED
  hide(packageSection);
  hide(dishSection);
  hide(freebiesSection);

  orderTypeSelect?.addEventListener("change", onOrderTypeChange);
  productTypeSelect?.addEventListener("change", onProductTypeChange);

  packageSelect.addEventListener("change", onPackageSelectChange);

  // ✅ IMPORTANT: must be enabled
  ZoneSelect.addEventListener("change", onZoneSelectChange);
}
