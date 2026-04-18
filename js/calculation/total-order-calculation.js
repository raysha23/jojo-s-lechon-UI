
// Compute total for extra dishes
export function calculateExtraDishTotal(extraDishIndexes, dishProducts) {
  let total = 0;

  extraDishIndexes.forEach((index) => {
    const dish = dishProducts[index];
    if (dish) total += dish.amount;
  });

  return total;
}

// Compute overall total
export function calculateOverallTotal(packagePrice, extraDishTotal) {
  return packagePrice + extraDishTotal;
}