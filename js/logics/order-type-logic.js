import { state } from "../state/state.js";
import { runReset } from "./reset-logic.js";
import { hide, show } from "../helper/helper.js";
import { dishOnlyTotalSection } from "../state/elements.js";
import { populatePackageDropdown } from "../encoder.js";
import { resetState } from "./reset-logic.js";
import { resetDishes } from "../ui/dishes-ui.js";
import { recalcTotal } from "../calculation/total-order-calculation.js";

export function getOrderTypeConfig(type, hasSelectedPackage = false) {
  switch (type) {
    case "lechon":
      return {
        showPackage: true,
        showDish: false,
        showDishOnlyTotal: false,
        dataSource: "lechon",
        requiredDishes: 1,
      };

    case "belly":
      return {
        showPackage: true,
        showDish: false,
        showDishOnlyTotal: false,
        dataSource: "belly",
        requiredDishes: 1,
      };

    case "lechon_package":
      return {
        showPackage: true,
        showDish: hasSelectedPackage, // 👈 dynamic
        showDishOnlyTotal: false,
        dataSource: "lechon_package",
        requiredDishes: 1,
      };

    case "belly_package":
      return {
        showPackage: true,
        showDish: hasSelectedPackage, // 👈 same logic
        showDishOnlyTotal: false,
        dataSource: "belly_package",
        requiredDishes: 1,
      };

    case "dishes":
      return {
        showPackage: false,
        showDish: true,
        showDishOnlyTotal: true,
        dataSource: "dishes",
        requiredDishes: 1,
      };

    default:
      return null;
  }
}

export function applyOrderType(type) {
  if (!type) return;
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
    resetDishes(0);
  }
}
