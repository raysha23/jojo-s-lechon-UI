// FILE: js/order-stepper.js

let currentStep = 1;

const steps = {
  1: document.getElementById("step-1"),
  2: document.getElementById("step-2"),
  3: document.getElementById("step-3"),
};

const nextBtns = document.querySelectorAll(".nextBtn");
const backBtn = document.getElementById("backBtn");
function updateStepperUI(step) {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`step-circle-${i}`);

    if (!el) continue;

    if (i <= step) {
      el.classList.add("bg-red-600");
      el.classList.remove("bg-gray-200");
    } else {
      el.classList.add("bg-gray-200");
      el.classList.remove("bg-red-600");
    }
  }
}
// =============================
// SHOW STEP FUNCTION
// =============================
function goToStep(step) {
  Object.values(steps).forEach((el) => el.classList.add("hidden"));
  steps[step].classList.remove("hidden");

  currentStep = step;

  updateButtons();
  updateStepperUI(step);
}

// =============================
// BUTTON STATE
// =============================
const nextText = document.getElementById("nextText");

function updateButtons() {
  if (backBtn) {
    backBtn.classList.toggle("hidden", currentStep === 1);
  }

  if (nextText) {
    nextText.innerText = currentStep === 3 ? "Finish" : "Next";
  }
}

// =============================
// STEP NAVIGATION
// =============================
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < 3) {
      goToStep(currentStep + 1);
    } else {
      alert("Order Completed!");
    }
  });
});

// =============================
// STEP INITIALIZATION
// =============================
goToStep(1);
