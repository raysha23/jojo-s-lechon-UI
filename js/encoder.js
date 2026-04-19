import { lechonProducts } from "./data/lechon-data.js";
import { bellyProducts } from "./data/belly-data.js";
import { bellyPackageProducts } from "./data/belly-package-data.js";
import { lechonPackageProducts } from "./data/lechon-package-data.js";
import { dishProducts } from "./data/dishes-data.js";
import { deliveryChargeList } from "./data/deliveryfee-data.js";

import { getOrderTypeConfig } from "./logics/order-type-logic.js";
import { getProductSource } from "./logics/product-source-logic.js";
import { resetState } from "./logics/reset-logic.js";

import { applyOrderType } from "./logics/order-type-logic.js";
import {
  packageAmountInput,
  additionalDishTotalInput,
  dishesTotalInput,
  totalAmountInput,
  subtotal,
  additionalChargeTotal,
  NumberOfDishes,
  NumberOfFreebies,
  NumberOfPackage,
  ZoneSelect,
} from "./state/elements.js";
import { formatCurrency, show, hide } from "./helper/helper.js";
import { state } from "./state/state.js";
import { setFreebies } from "./ui/freebies-ui.js";
import { resetDishes } from "./ui/dishes-ui.js";
import { recalcTotal } from "./calculation/total-order-calculation.js";
import { addExtraDish } from "./ui/dishes-ui.js";

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
  packageAmountInput.forEach((el) => {
    el.textContent = formatCurrency(0);
  });
  state.selectedPackage = null;
}

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────
document.getElementById("productTypeSelect").addEventListener("change", (e) => {
  state.selectedPackage = null;
  applyOrderType(e.target.value);
});

// 🔥 Add event listener for addDish button
document.getElementById("addDish").addEventListener("click", () => {
  console.log("🔥 [DEBUG] Add Dish button clicked");
  addExtraDish();
});
packageSelect.addEventListener("change", () => {
  const type = state.currentOrderType;
  const idx = parseInt(packageSelect.value, 10);

  if (isNaN(idx)) return;

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

  NumberOfPackage.textContent = state.selectedPackage ? 1 : 0;
  state.selectedPackage = pkg;

  state.packagePrice = pkg.amount;
  state.discount = Number(pkg.promoAmount || 0);
  // store RAW number for calculations

  // display formatted
  // packageAmountInput.textContent = formatCurrency(pkg.amount); // not .value
  packageAmountInput.forEach((el) => {
    el.textContent = formatCurrency(pkg.amount);
  });

  // ✔ freebies display
  setFreebies(pkg.freebies);

  // ✔ dishes
  resetDishes(pkg.NoOfDishes || 0);

  // ✔ total
  recalcTotal();

  // 🔥 FIX: Re-evaluate and show dishSection for package types if a package is selected
  if (
    (type === "lechon_package" || type === "belly_package") &&
    state.selectedPackage
  ) {
    show(dishSection);
  }
});

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
const dateInput = document.getElementById("deliveryDate");

flatpickr(dateInput, {
  dateFormat: "m/d/Y", // MM/DD/YYYY
  minDate: "today", // prevent past dates
  allowInput: true, // user can type
});


productTypeSelect.addEventListener("change", (e) => {
  const type = e.target.value;

  applyOrderType(type);

  if (type === "dishes") {
    hide(packageSection);
  } else {
    show(packageSection);
  }
});



orderType.addEventListener("change", (e) => {
  const type = e.target.value;

  if (type === "pickup") {
    show(timeFields);
    hide(deliveryFields);
  }

  if (type === "delivery") {
    show(timeFields);
    show(deliveryFields);
  }
});

// 🔥 FORCE INITIAL ORDER TYPE UI
const initialOrderType = orderType.value;

if (initialOrderType === "delivery") {
  show(timeFields);
  show(deliveryFields);
} else {
  show(timeFields);
  hide(deliveryFields);
}
const defaultType = productTypeSelect.value; // reads whatever is selected in HTML (e.g. "dishes")

applyOrderType(defaultType);

// 🔥 ADD THIS — force-render all currency fields on startup
if (discountTotal) discountTotal.textContent = formatCurrency(0);
if (additionalDishTotalInput)
  additionalDishTotalInput.textContent = formatCurrency(0);
if (dishesTotalInput) dishesTotalInput.textContent = formatCurrency(0);
if (totalAmountInput) totalAmountInput.textContent = formatCurrency(0);
if (subtotal) subtotal.textContent = formatCurrency(0);
if (additionalChargeTotal)
  additionalChargeTotal.textContent = formatCurrency(0);

function populateZones() {
  zoneSelect.innerHTML = '<option value="">— Select Zone —</option>';

  deliveryChargeList.forEach((zoneObj, index) => {
    zoneObj.zones.forEach((zoneName) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = zoneName;
      zoneSelect.appendChild(opt);
    });
  });
}
populateZones();

zoneSelect.addEventListener("change", () => {
  const idx = parseInt(zoneSelect.value, 10);

  if (isNaN(idx)) {
    state.additionalCharges = 0;
  } else {
    const zone = deliveryChargeList[idx];

    // ✅ use correct property
    const charge = Number(zone.minAmount || 0);

    // ✅ use correct state variable
    state.additionalCharges = charge;

    // ✅ update UI immediately
    additionalChargeTotal.textContent = formatCurrency(charge);
  }

  recalcTotal();
});
