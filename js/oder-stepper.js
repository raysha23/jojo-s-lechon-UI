let currentStep = 1;

const steps = {
  1: document.getElementById("step-1"),
  2: document.getElementById("step-2"),
  3: document.getElementById("step-3"),
};

const nextBtns = document.querySelectorAll(".nextBtn");
const backBtns = document.querySelectorAll(".backBtn"); // FIXED

const nextText = document.getElementById("nextText");

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

function updateButtons() {
  backBtns.forEach((btn) => {
    btn.classList.toggle("hidden", currentStep === 1);
  });

  if (nextText) {
    nextText.innerText = currentStep === 3 ? "Finish" : "Next";
  }
}

function goToStep(step) {
  Object.values(steps).forEach((el) => el.classList.add("hidden"));

  if (steps[step]) {
    steps[step].classList.remove("hidden");
  }

  currentStep = step;

  updateButtons();
  updateStepperUI(step);
}

// NEXT BUTTON
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < 3) {
      goToStep(currentStep + 1);
    } else {
      alert("Order Completed!");
    }
  });
});

// BACK BUTTON
backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });
});

// INIT
goToStep(1);