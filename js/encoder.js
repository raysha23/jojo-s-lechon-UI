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
  NumberOfDishes,
  NumberOfFreebies,
  NumberOfPackage,
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
