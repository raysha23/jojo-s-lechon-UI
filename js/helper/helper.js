export function show(el) {
  if (el) el.style.display = "block";
}

export function hide(el) {
  if (el) el.style.display = "none";
}

export function formatCurrency(value = 0) {
  return (
    "₱" +
    Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}