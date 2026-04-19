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
  const type = e.target.value;

  if (!type) {
    hide(packageSection);
    hide(dishSection);

    state.selectedPackage = null;

    NumberOfPackage.textContent = 0;
    NumberOfFreebies.textContent = 0;

    freebieList.innerHTML = "";

    packageAmountInput.forEach((el) => (el.textContent = formatCurrency(0)));

    recalcTotal();

    return;
  }

  state.selectedPackage = null;
  applyOrderType(type);

  if (type === "dishes") {
    hide(packageSection);
  } else {
    show(packageSection);
  }
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

  state.selectedPackage = pkg;
  NumberOfPackage.textContent = state.selectedPackage ? 1 : 0;

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
  minDate: "today", // no past dates
  allowInput: false,
  disableMobile: true, // 🔥 ensures Flatpickr shows even on mobile
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
const defaultType = productTypeSelect.value;

if (defaultType) {
  applyOrderType(defaultType);
} else {
  hide(packageSection);
  hide(dishSection);
}

// 🔥 ADD THIS — force-render all currency fields on startup
if (discountTotal) discountTotal.textContent = formatCurrency(0);
if (additionalDishTotalInput)
  additionalDishTotalInput.textContent = formatCurrency(0);
if (dishesTotalInput) dishesTotalInput.textContent = formatCurrency(0);
if (totalAmountInput) totalAmountInput.textContent = formatCurrency(0);
if (subtotal) subtotal.textContent = formatCurrency(0);
if (additionalChargeTotal)
  additionalChargeTotal.textContent = formatCurrency(0);

// 🔥 Initialize count fields on startup
if (NumberOfFreebies) NumberOfFreebies.textContent = 0;
if (NumberOfPackage) NumberOfPackage.textContent = 0;
if (NumberOfDishes) NumberOfDishes.textContent = 0;

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



// =============================
// STEP 2 - Customer Info
// =============================

const contactList = document.getElementById("contactList");
const addContactBtn = document.getElementById("addContactBtn");
const contactError = document.getElementById("contactError");
const customerName = document.getElementById("customerName");
const nameError = document.getElementById("nameError");
const facebookProfile = document.getElementById("facebookProfile");
const fbError = document.getElementById("fbError");

const MAX_CONTACTS = 2;

// ─── CUSTOMER NAME ───────────────────────────────────────────
customerName.addEventListener("input", () => {
  customerName.value = customerName.value.replace(/[^a-zA-Z\s]/g, "");
});

// blur: validate
customerName.addEventListener("blur", () => {
  const valid = /^[a-zA-Z\s]+$/.test(customerName.value.trim());
  const empty = customerName.value.trim() === "";

  if (!empty && !valid) {
    nameError.classList.remove("hidden");
    customerName.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    nameError.classList.add("hidden");
    customerName.classList.remove("border-red-400", "ring-1", "ring-red-400");
  }
});

// ─── CONTACT VALIDATION HELPER ───────────────────────────────
function attachContactValidation(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });

  input.addEventListener("blur", () => {
    const valid = /^\d{7,11}$/.test(input.value.trim());
    const empty = input.value.trim() === "";

    if (!empty && !valid) {
      contactError.classList.remove("hidden");
      input.classList.add("border-red-400", "ring-1", "ring-red-400");
    } else {
      contactError.classList.add("hidden");
      input.classList.remove("border-red-400", "ring-1", "ring-red-400");
    }
  });
}

// ─── UPDATE PLACEHOLDERS ─────────────────────────────────────
function updatePlaceholders() {
  contactList.querySelectorAll(".contact-input").forEach((input, index) => {
    input.placeholder = `Contact number ${index + 1}`;
  });
}

// attach validation to the first input on load
attachContactValidation(document.querySelector(".contact-input"));

// ─── ADD CONTACT ─────────────────────────────────────────────
addContactBtn.addEventListener("click", () => {
  const items = contactList.querySelectorAll(".contact-item");

  if (items.length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
    return;
  }

  const index = items.length + 1;
  const div = document.createElement("div");
  div.className = "flex items-center gap-2 contact-item";
  div.innerHTML = `
    <input
      type="text"
      placeholder="Contact number ${index}"
      maxlength="11"
      class="contact-input w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-600 italic"
    />
    <button type="button" class="remove-contact flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600 transition flex-shrink-0">✕</button>
  `;

  div.querySelector(".remove-contact").addEventListener("click", () => {
    div.remove();
    updatePlaceholders();
    addContactBtn.disabled = false;
    addContactBtn.classList.remove("opacity-40", "cursor-not-allowed");
  });

  attachContactValidation(div.querySelector(".contact-input"));
  contactList.appendChild(div);

  if (contactList.querySelectorAll(".contact-item").length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
  }
});

// ─── FACEBOOK PROFILE ────────────────────────────────────────
facebookProfile.addEventListener("blur", () => {
  const value = facebookProfile.value.trim();

  if (value === "") {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove("border-red-400", "ring-1", "ring-red-400");
    return;
  }

  const valid = /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(value);

  if (!valid) {
    fbError.classList.remove("hidden");
    facebookProfile.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove("border-red-400", "ring-1", "ring-red-400");
  }
});

// ─── STEP 2 VALIDATION GATE ───────────────────────────────────
function validateStep2() {
  const name = customerName.value.trim();
  const contacts = [...document.querySelectorAll(".contact-input")].map(i => i.value.trim());
  const fb = facebookProfile.value.trim();

  const nameOk = /^[a-zA-Z\s.'-]+$/.test(name);
  const contactOk = contacts.every(c => /^\d{7,11}$/.test(c)) && contacts[0] !== "";
  const fbOk = fb === "" || /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(fb);

  return nameOk && contactOk && fbOk;
}