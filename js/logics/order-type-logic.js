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