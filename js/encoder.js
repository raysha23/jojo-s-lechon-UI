import { lechonProducts } from "./data/lechon-data.js";
import { bellyProducts } from "./data/belly-data.js";
import { bellyPackageProducts } from "./data/belly-package-data.js";
import { lechonPackageProducts } from "./data/lechon-package-data.js";
import { dishProducts } from "./data/dishes-data.js";

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
} from "./state/elements.js";
import { formatCurrency, show, hide } from "./helper/helper.js";
import { state } from "./state/state.js";
import { setFreebies } from "./ui/freebies-ui.js";
import { resetDishes } from "./ui/dishes-ui.js";
import { recalcTotal } from "./calculation/total-order-calculation.js";
import { addExtraDish } from "./ui/dishes-ui.js";

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
// const state = {
//   selectedPackage: null,
//   currentOrderType: null,
// };

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────
// const user = JSON.parse(localStorage.getItem("loggedUser") || "null");

// if (!user || user.role !== "Encoder") {
//   window.location.href = "index.html";
// }

// document.getElementById("userName").textContent = user?.username || "";

// ─────────────────────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────────────────────
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.removeItem("loggedUser");
//   window.location.href = "index.html";
// });

// ─────────────────────────────────────────────────────────────
// ELEMENTS
// ─────────────────────────────────────────────────────────────
// const packageSection = document.getElementById("packageSection");
// const packageSelect = document.getElementById("packageSelect");
// const packageAmountInput = document.querySelectorAll(".packageAmount");

// //New
// const orderType = document.getElementById("orderType");
// const deliveryFields = document.getElementById("deliveryFields");
// const timeFields = document.getElementById("timeFields");
// const productTypeSelect = document.getElementById("productTypeSelect");

// const dishSection = document.getElementById("dishSection");
// const dishList = document.getElementById("dishList");
// const dishTotalInput = document.getElementById("dishTotal");

// const additionalChargeTotal = document.getElementById("additionalCharge");
// const subtotal = document.getElementById("subTotal");
// const discountTotal = document.getElementById("discountTotal");
// const totalAmountInput = document.getElementById("totalAmount");

// const freebieList = document.getElementById("freebieList");

// const dishesTotalInput = document.getElementById("dishesTotal");
// const additionalDishTotalInput = document.getElementById(
//   "Additional-dishTotal",
// );

// const dishOnlyTotalSection = document.getElementById("dishOnlyTotalSection");

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
// function show(el) {
//   if (el) el.style.display = "block";
// }

// function hide(el) {
//   if (el) el.style.display = "none";
// }

// function formatCurrency(value = 0) {
//   return (
//     "₱" +
//     Number(value).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })
//   );
// }

// ─────────────────────────────────────────────────────────────
// RESET SYSTEM CONNECTOR
// ─────────────────────────────────────────────────────────────
// function runReset(options = {}) {
//   resetState({
//     state,
//     elements: {
//       packageSelect,
//       packageAmountInput,
//       dishTotalInput,
//       totalAmountInput,
//       dishList,
//       setFreebies,
//       dishesTotalInput,
//       additionalDishTotal: additionalDishTotalInput,
//       discountTotal,
//     },
//     options,
//   });
// }
// ─────────────────────────────────────────────────────────────
// APPLY ORDER TYPE
// ─────────────────────────────────────────────────────────────
// function applyOrderType(type) {
//   state.currentOrderType = type;

//   const config = getOrderTypeConfig(type, !!state.selectedPackage);
//   if (!config) return;

//   runReset({
//     resetPackage: true,
//     resetDishes: false,
//     resetTotals: true,
//     resetFreebies: true,
//   });

//   hide(packageSection);
//   hide(dishSection);
//   hide(dishOnlyTotalSection);

//   if (config.showPackage) show(packageSection);
//   if (config.showDish) show(dishSection);
//   if (config.showDishOnlyTotal) show(dishOnlyTotalSection);

//   populatePackageDropdown(config.dataSource);

//   // 🔥 ONLY HERE we control dish mode properly
//   if (type === "dishes") {
//     resetDishes(0);
//   }
// }
// ─────────────────────────────────────────────────────────────
// TOTAL
// ─────────────────────────────────────────────────────────────
// function recalcTotal() {
//   const type = state.currentOrderType;

//   const packagePrice = Number(state.packagePrice || 0);
//   const discount = Number(state.discount || 0); // store as negative e.g. -500
//   const additionalCharges = Number(state.additionalCharges || 0); // e.g. 200

//   let dishTotal = 0;
//   let additionalTotal = 0;

//   if (type === "dishes") {
//     document.querySelectorAll("#dishList select").forEach((sel) => {
//       const index = Number(sel.value);
//       if (!Number.isNaN(index) && dishProducts[index]) {
//         dishTotal += Number(dishProducts[index].amount);
//       }
//     });
//   } else {
//     document.querySelectorAll(".extra-dish select").forEach((sel) => {
//       const index = Number(sel.value);
//       if (!Number.isNaN(index) && dishProducts[index]) {
//         additionalTotal += Number(dishProducts[index].amount);
//       }
//     });
//   }

//   // ── Subtotal = items only, before discount/charges ──
//   const subtotalValue =
//     type === "dishes" ? dishTotal : packagePrice + dishTotal + additionalTotal;

//   // ── Final = subtotal + discount (negative) + charges ──
//   const final = subtotalValue + discount + additionalCharges;

//   // ── DOM updates ──
//   if (dishesTotalInput)
//     dishesTotalInput.textContent = formatCurrency(dishTotal);
//   if (additionalDishTotalInput)
//     additionalDishTotalInput.textContent = formatCurrency(additionalTotal);
//   if (discountTotal) discountTotal.textContent = formatCurrency(discount);
//   if (subtotal) subtotal.textContent = formatCurrency(subtotalValue); // 🔥 was missing
//   if (totalAmountInput) totalAmountInput.textContent = formatCurrency(final);
// }
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
// FREEBIES
// ─────────────────────────────────────────────────────────────
// function setFreebies(freebies = []) {
//   freebieList.innerHTML = "";

//   // No freebies case
//   if (!freebies.length) {
//     freebieList.innerHTML = `
//       <div class="col-span-full text-center text-gray-400 italic text-sm">
//         No freebies available
//       </div>
//     `;
//     return;
//   }

//   // Generate each freebie card
//   freebies.forEach((f) => {
//     const div = document.createElement("div");

//     div.className =
//       "flex items-center space-x-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl";

//     div.innerHTML = `
//       <div class="bg-emerald-500 rounded-full p-0.5">
//         <svg
//           class="w-3 h-3 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="3"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//       </div>

//       <span class="text-sm font-medium text-emerald-800">
//         ${f}
//       </span>
//     `;

//     freebieList.appendChild(div);
//   });
// }

// ─────────────────────────────────────────────────────────────
// DISHES
// ─────────────────────────────────────────────────────────────
// function resetDishes(count = 1) {
//   console.log("🔄 [DEBUG] resetDishes called with count:", count);

//   dishList.innerHTML = "";

//   for (let i = 0; i < count; i++) {
//     const div = document.createElement("div");
//     div.className = "flex gap-2 required-dish";

//     div.innerHTML = `
//       <select class="flex-1 p-3 bg-gray-100 border rounded-xl">
//         <option value="">— Select Dish —</option>
//       </select>
//     `;

//     dishList.appendChild(div);

//     const select = div.querySelector("select");

//     dishProducts.forEach((dish, index) => {
//       const opt = document.createElement("option");
//       opt.value = index;

//       // ✅ FIX: remove price display
//       opt.textContent = dish.productName;

//       select.appendChild(opt);
//     });

//     select.addEventListener("change", () => {
//       console.log("🍛 [DEBUG] Required dish changed:", select.value);
//       recalcTotal();
//     });
//   }

//   recalcTotal();
// }
// // 🔥 Add function to add extra dishes
// function addExtraDish() {
//   console.log("➕ [DEBUG] Creating new extra dish row");

//   const div = document.createElement("div");
//   div.className = "flex gap-2 extra-dish";

//   div.innerHTML = `
//     <select class="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none">
//       <option value="">— Select Dish —</option>
//     </select>
//     <button type="button" class="text-red-400 hover:text-red-600 px-2 remove-dish">✕</button>
//   `;

//   dishList.appendChild(div);

//   const select = div.querySelector("select");

//   dishProducts.forEach((dish, i) => {
//     const opt = document.createElement("option");
//     opt.value = i;
//     opt.textContent = `${dish.productName} — ₱${dish.amount}`;
//     select.appendChild(opt);
//   });

//   select.addEventListener("change", () => {
//     console.log("🍽️ [DEBUG] Dish selected:", select.value);
//     recalcTotal();
//   });

//   div.querySelector(".remove-dish").addEventListener("click", () => {
//     console.log("❌ [DEBUG] Extra dish removed");
//     div.remove();
//     recalcTotal();
//   });

//   recalcTotal();
// }

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
  });

  const pkg = source.at(idx);
  if (!pkg) return;

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

//Date
const dateInput = document.getElementById("deliveryDate");

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

dateInput.addEventListener("change", () => {
  const date = new Date(dateInput.value);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  const formatted = `${mm}/${dd}/${yyyy}`;

  console.log("MM/DD/YYYY:", formatted);
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
