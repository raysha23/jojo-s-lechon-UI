import { recalcTotal } from "../calculation/total-order-calculation.js";
import { dishProducts } from "../data/dishes-data.js";
import { addDishButton } from "../state/elements.js";

export function resetDishes(count = 1) {
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

    dishProducts.forEach((dish, index) => {
      const opt = document.createElement("option");
      opt.value = index;

      // ✅ FIX: remove price display
      opt.textContent = dish.productName;

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
export function addExtraDish() {
  console.log("➕ [DEBUG] Creating new extra dish row");

  const div = document.createElement("div");
  div.className = "flex gap-2 extra-dish";

  div.innerHTML = `
    <select class="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none">
      <option value="">— Select Dish —</option>
    </select>
    <button type="button" class="remove-dish mt-1 bg-red-500 text-white px-3 py-2 h-10 align-middle rounded-lg hover:bg-red-600 transition" > ✕ </button>
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


if (addDishButton) {
  addDishButton.addEventListener("click", () => {
    console.log("➕ Add Dish clicked");
    addExtraDish();
  });
}