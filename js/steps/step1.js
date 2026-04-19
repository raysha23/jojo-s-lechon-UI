import { lechonProducts } from "../data/lechon-data.js";
import { bellyProducts } from "../data/belly-data.js";
import { bellyPackageProducts } from "../data/belly-package-data.js";
import { lechonPackageProducts } from "../data/lechon-package-data.js";
import { dishProducts } from "../data/dishes-data.js";
import { deliveryChargeList } from "../data/deliveryfee-data.js";

import { getProductSource } from "../logics/product-source-logic.js";
import { applyOrderType } from "../logics/order-type-logic.js";

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
  document.querySelectorAll(selector).forEach((el) => (el.textContent = value));
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

  // No selection — hide everything
  if (!type) {
    hide(packageSection);
    hide(dishSection);
    hide(freebiesSection);

    state.selectedPackage = null;
    NumberOfPackage.forEach((el) => (el.textContent = 0));
    NumberOfFreebies.forEach((el) => (el.textContent = 0));
    freebieList.innerHTML = "";
    packageAmountInput.forEach((el) => (el.textContent = formatCurrency(0)));

    recalcTotal();
    return;
  }

  state.selectedPackage = null;
  applyOrderType(type);

  console.log("currentOrderType after apply:", state.currentOrderType); // ← check this

  // Dishes only — hide package selector, hide dish/freebie until package picked
  if (type === "dishes") {
    hide(packageSection);
    show(dishSection);
    hide(freebiesSection);
  } else {
    show(packageSection);
    hide(dishSection); // hide until a package is selected
    hide(freebiesSection); // hide until a package is selected
  }
}

// ─────────────────────────────────────────────────────────────
// PACKAGE SELECT CHANGE
// ─────────────────────────────────────────────────────────────
export function onPackageSelectChange() {
  const type = state.currentOrderType;
  const idx = parseInt(packageSelect.value, 10);

  if (isNaN(idx)) return;

  // ✅ Pass the actual product sources, not state
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

  state.selectedPackage = pkg;
  state.packagePrice = pkg.amount;
  state.discount = Number(pkg.promoAmount || 0);

  setAll(".noOfPackage", 1);
  setAll(".packageAmount", formatCurrency(pkg.amount));

  setFreebies(pkg.freebies);
  resetDishes(pkg.NoOfDishes || 0);
  recalcTotal();

  show(freebiesSection);

  if (type === "lechon_package" || type === "belly_package") {
    show(dishSection);
  } else {
    hide(dishSection);
  }
}
// ─────────────────────────────────────────────────────────────
// ZONE SELECT CHANGE
// ─────────────────────────────────────────────────────────────
export function onZoneSelectChange() {
  const idx = parseInt(ZoneSelect.value, 10);

  if (isNaN(idx)) {
    state.additionalCharges = 0;
  } else {
    const zone = deliveryChargeList[idx];
    const charge = Number(zone.minAmount || 0);
    state.additionalCharges = charge;
    setAll(".additionalCharge", formatCurrency(charge));
  }

  recalcTotal();
}

export function onOrderTypeChange(e) {
  if (e.target.value === "delivery") {
    show(deliveryFields);
  } else {
    hide(deliveryFields);
  }
}

export function populateZoneDropdown() {
  ZoneSelect.innerHTML = '<option value="">Select Zone</option>';

  deliveryChargeList.forEach((zone, i) => {
    const opt = document.createElement("option");
    opt.value = i;

    // zones is an array, join them if multiple
    const label = zone.zones.join(", ");
    const fee = zone.minAmount;
      

    opt.textContent = `${label} — ${fee}`;
    ZoneSelect.appendChild(opt);
  });
}
// ─────────────────────────────────────────────────────────────
// REGISTER LISTENERS
// ─────────────────────────────────────────────────────────────
export function initStep1Listeners() {
  show(deliveryFields);
  populateZoneDropdown();
  document
    .getElementById("orderType")
    .addEventListener("change", onOrderTypeChange);

  document
    .getElementById("productTypeSelect")
    .addEventListener("change", onProductTypeChange);

  packageSelect.addEventListener("change", onPackageSelectChange);
  ZoneSelect.addEventListener("change", onZoneSelectChange);
}
