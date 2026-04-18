//File Path: js/logics/product-source-logic.js
export function getProductSource(type, {
  lechonProducts,
  bellyProducts,
  lechonPackageProducts,
  bellyPackageProducts,
  dishProducts
}) {
  switch (type) {
    case "lechon":
      return lechonProducts;

    case "lechon_package":
      return lechonPackageProducts;

    case "belly":
      return bellyProducts;

    case "belly_package":
      return bellyPackageProducts;

    case "dishes":
      return dishProducts;

    default:
      return [];
  }
}