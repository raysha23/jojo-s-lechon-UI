import {
  renderStepBar,
  renderOrderSummary,
  renderNavButtons,
} from "./components.js";

let currentStep = 1;

const steps = {
  1: document.getElementById("step-1"),
  2: document.getElementById("step-2"),
  3: document.getElementById("step-3"),
};

// ─── STEP BAR ─────────────────────────────────────────────────
function updateStepBars(step) {
  document.querySelectorAll(".stepbar-placeholder").forEach((el) => {
    el.innerHTML = renderStepBar(step);
  });
}

// ─── ORDER SUMMARY ────────────────────────────────────────────
function updateOrderSummaries() {
  document.querySelectorAll(".ordersummary-placeholder").forEach((el) => {
    el.innerHTML = renderOrderSummary();
  });
}

// ─── NAV BUTTONS ──────────────────────────────────────────────
function updateNavButtons(step) {
  document.querySelectorAll(".navbuttons-placeholder").forEach((el) => {
    el.innerHTML = renderNavButtons(step);
  });
  bindNavButtons();
}

function bindNavButtons() {
  document.querySelectorAll(".nextBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < 3) {
        goToStep(currentStep + 1);
      } else {
        alert("Order Completed!");
      }
    });
  });

  document.querySelectorAll(".backBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  });
}

// ─── GO TO STEP ───────────────────────────────────────────────
function goToStep(step) {
  Object.values(steps).forEach((el) => el.classList.add("hidden"));
  if (steps[step]) steps[step].classList.remove("hidden");

  currentStep = step;

  updateStepBars(step);
  updateOrderSummaries();
  updateNavButtons(step);
}

// ─── INIT ─────────────────────────────────────────────────────
goToStep(1);