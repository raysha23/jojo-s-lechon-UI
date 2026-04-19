import { lechonProducts } from "./data/lechon-data.js";
import { bellyProducts } from "./data/belly-data.js";
import { bellyPackageProducts } from "./data/belly-package-data.js";
import { lechonPackageProducts } from "./data/lechon-package-data.js";
import { dishProducts } from "./data/dishes-data.js";

import { getOrderTypeConfig } from "./logics/order-type-logic.js";
import { getProductSource } from "./logics/product-source-logic.js";
import { resetState } from "./logics/reset-logic.js";

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
const state = {
  selectedPackage: null,
  currentOrderType: null,
};

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
const packageSection = document.getElementById("packageSection");
const packageSelect = document.getElementById("packageSelect");
const packageAmountInput = document.querySelectorAll(".packageAmount");

const dishSection = document.getElementById("dishSection");
const dishList = document.getElementById("dishList");
const dishTotalInput = document.getElementById("dishTotal");

const discountTotal = document.getElementById("discountTotal");
const totalAmountInput = document.getElementById("totalAmount");

const freebieList = document.getElementById("freebieList");

const dishesTotalInput = document.getElementById("dishesTotal");
const additionalDishTotalInput = document.getElementById(
  "Additional-dishTotal",
);

const dishOnlyTotalSection = document.getElementById("dishOnlyTotalSection");

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function show(el) {
  if (el) el.style.display = "block";
}

function hide(el) {
  if (el) el.style.display = "none";
}

function formatCurrency(value = 0) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─────────────────────────────────────────────────────────────
// RESET SYSTEM CONNECTOR
// ─────────────────────────────────────────────────────────────
function runReset(options = {}) {
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
// ─────────────────────────────────────────────────────────────
// APPLY ORDER TYPE
// ─────────────────────────────────────────────────────────────
function applyOrderType(type) {
  state.currentOrderType = type;

  const config = getOrderTypeConfig(type, !!state.selectedPackage);
  if (!config) return;

  runReset({
    resetPackage: true,
    resetDishes: false,
    resetTotals: true,
    resetFreebies: true,
  });

  hide(packageSection);
  hide(dishSection);
  hide(dishOnlyTotalSection);

  if (config.showPackage) show(packageSection);
  if (config.showDish) show(dishSection);
  if (config.showDishOnlyTotal) show(dishOnlyTotalSection);

  populatePackageDropdown(config.dataSource);

  // 🔥 ONLY HERE we control dish mode properly
  if (type === "dishes") {
    resetDishes(1);
  }
}
// ─────────────────────────────────────────────────────────────
// TOTAL
// ─────────────────────────────────────────────────────────────
function recalcTotal() {
  const type = state.currentOrderType;

  const packagePrice = Number(state.packagePrice || 0);
  const discount = Number(state.discount || 0); // 🔥 promo here

  let dishTotal = 0;
  let additionalTotal = 0;

  console.log("📊 recalculating... TYPE:", type);

  if (type === "dishes") {
    document.querySelectorAll("#dishList select").forEach((sel) => {
      const index = Number(sel.value);

      if (!Number.isNaN(index) && dishProducts[index]) {
        const dish = dishProducts[index];
        dishTotal += Number(dish.amount);
      }
    });
  } else {
    document.querySelectorAll(".extra-dish select").forEach((sel) => {
      const index = Number(sel.value);

      if (!Number.isNaN(index) && dishProducts[index]) {
        const dish = dishProducts[index];
        additionalTotal += Number(dish.amount);
      }
    });
  }

  const subtotal =
    type === "dishes" ? dishTotal : packagePrice + dishTotal + additionalTotal;

  const final = subtotal + discount;
  // discount is negative (-500), so it subtracts automatically

  console.log("💰 package:", packagePrice);
  console.log("💸 discount:", discount);
  console.log("🧮 subtotal:", subtotal);
  console.log("💵 final:", final);

  if (discountTotal) discountTotal.textContent = formatCurrency(discount);

  if (dishesTotalInput)
    dishesTotalInput.textContent = formatCurrency(dishTotal);
  if (additionalDishTotalInput)
    additionalDishTotalInput.textContent = formatCurrency(additionalTotal);
  if (totalAmountInput) totalAmountInput.textContent = formatCurrency(final);
}
// ─────────────────────────────────────────────────────────────
// PACKAGE DROPDOWN
// ─────────────────────────────────────────────────────────────
function populatePackageDropdown(type) {
  packageSelect.innerHTML = '<option value="">— Select a product —</option>';

  const source = getProductSource(type, {
    lechonProducts,
    bellyProducts,
    lechonPackageProducts,
    bellyPackageProducts,
    dishProducts,
  });

  source.forEach((item, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${item.productName} — ₱${item.amount}`;
    packageSelect.appendChild(opt);
  });

  packageAmountInput.value = "0.00";
  totalAmountInput.value = "0.00";
  state.selectedPackage = null;
}

// ─────────────────────────────────────────────────────────────
// FREEBIES
// ─────────────────────────────────────────────────────────────
function setFreebies(freebies = []) {
  freebieList.innerHTML = "";

  // No freebies case
  if (!freebies.length) {
    freebieList.innerHTML = `
      <div class="col-span-full text-center text-gray-400 italic text-sm">
        No freebies available
      </div>
    `;
    return;
  }

  // Generate each freebie card
  freebies.forEach((f) => {
    const div = document.createElement("div");

    div.className =
      "flex items-center space-x-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl";

    div.innerHTML = `
      <div class="bg-emerald-500 rounded-full p-0.5">
        <svg
          class="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <span class="text-sm font-medium text-emerald-800">
        ${f}
      </span>
    `;

    freebieList.appendChild(div);
  });
}

// ─────────────────────────────────────────────────────────────
// DISHES
// ─────────────────────────────────────────────────────────────
function resetDishes(count = 1) {
  console.log("🔄 [DEBUG] resetDishes called with count:", count);

  dishList.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "flex gap-2 required-dish";

    div.innerHTML = `
      <select class="flex-1 p-3 bg-gray-100 border rounded-xl">
        <option value="">— Select Dish —</option>
      </select>
    `;

    dishList.appendChild(div);

    const select = div.querySelector("select");

    dishProducts.forEach((dish, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${dish.productName} — ₱${dish.amount}`;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      console.log("🍛 [DEBUG] Required dish changed:", select.value);
      recalcTotal();
    });
  }

  recalcTotal();
}
// 🔥 Add function to add extra dishes
function addExtraDish() {
  console.log("➕ [DEBUG] Creating new extra dish row");

  const div = document.createElement("div");
  div.className = "flex gap-2 extra-dish";

  div.innerHTML = `
    <select class="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none">
      <option value="">— Select Dish —</option>
    </select>
    <button type="button" class="text-red-400 hover:text-red-600 px-2 remove-dish">✕</button>
  `;

  dishList.appendChild(div);

  const select = div.querySelector("select");

  dishProducts.forEach((dish, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${dish.productName} — ₱${dish.amount}`;
    select.appendChild(opt);
  });

  select.addEventListener("change", () => {
    console.log("🍽️ [DEBUG] Dish selected:", select.value);
    recalcTotal();
  });

  div.querySelector(".remove-dish").addEventListener("click", () => {
    console.log("❌ [DEBUG] Extra dish removed");
    div.remove();
    recalcTotal();
  });

  recalcTotal();
}

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────
document.querySelectorAll('input[name="orderType"]').forEach((r) => {
  r.addEventListener("change", (e) => {
    state.selectedPackage = null;
    applyOrderType(e.target.value);
  });
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
    el.textContent = `₱${formatCurrency(pkg.amount)}`;
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
const defaultType = "lechon_package";

const radio = document.querySelector(
  `input[name="orderType"][value="${defaultType}"]`,
);

if (radio) radio.checked = true;

applyOrderType(defaultType);
