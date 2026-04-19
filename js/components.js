// File Path: js/components.js

export function renderStepBar(currentStep) {
  const steps = [
    { label: "Order Details", icon: "package" },
    { label: "Customer Info", icon: "user" },
    { label: "Order Summary", icon: "document" },
  ];

  return `
    <div class="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-10 mb-8">
      <div class="flex items-center justify-between w-full">
        ${steps.map((step, i) => renderStepNode(step, i + 1, currentStep)).join("")}
      </div>
    </div>
  `;
}

function renderStepNode(step, stepNum, currentStep) {
  const done = stepNum < currentStep;
  const active = stepNum === currentStep;
  const circleClass =
    done || active ? "bg-red-600 shadow-lg shadow-red-200" : "bg-gray-200";
  const labelClass =
    done || active ? "font-bold text-gray-800" : "font-semibold text-gray-400";

  const icon = done
    ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>`
    : getStepIcon(stepNum);

  const connector =
    stepNum < 3
      ? `<div class="flex-1 h-0.5 ${stepNum < currentStep ? "bg-red-600" : "bg-gray-200"} -mt-6 md:-mt-8 mx-2"></div>`
      : "";

  return `
    <div class="flex flex-col items-center flex-1">
      <div class="w-10 h-10 md:w-16 md:h-16 ${circleClass} rounded-full flex items-center justify-center z-10">
        <svg class="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icon}
        </svg>
      </div>
      <span class="mt-2 text-[10px] md:text-sm ${labelClass} text-center leading-tight">
        ${step.label.replace(" ", "<br class='md:hidden'/> ")}
      </span>
    </div>
    ${connector}
  `;
}

function getStepIcon(stepNum) {
  const icons = {
    1: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>`,
    2: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`,
    3: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
  };
  return icons[stepNum];
}

export function renderOrderSummary() {
  return `
    <div class="bg-[#0d0d0d] text-white rounded-3xl p-8 shadow-2xl">
      <h2 class="text-2xl font-black mb-1">Order Summary</h2>
      <div class="w-12 h-1 bg-red-600 mb-8"></div>

      <div class="space-y-5">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-sm tracking-tight">Package total</p>
            <p class="text-[10px] text-gray-500 font-medium">Premium package (delivery)</p>
          </div>
          <p class="packageAmount font-bold text-lg">₱0.00</p>
        </div>

        <div class="flex justify-between items-start border-t border-gray-800 pt-4">
          <div>
            <p class="font-bold text-sm tracking-tight">Dishes total</p>
            <p class="dishesCount text-[10px] text-gray-500 font-medium">0 items</p>
          </div>
          <p class="dishesTotal font-bold text-lg">₱0</p>
        </div>

        <div class="flex justify-between items-start border-t border-gray-800 pt-4">
          <div>
            <p class="font-bold text-sm tracking-tight">Additional dishes total</p>
            <p class="additionalCount text-[10px] text-gray-500 font-medium">0 items</p>
          </div>
          <p class="additionalTotal font-bold text-lg">₱0.00</p>
        </div>

        <div class="flex justify-between items-start border-t border-gray-800 pt-4">
          <div>
            <p class="font-bold text-sm tracking-tight text-emerald-500">Discount</p>
            <p class="text-[10px] text-gray-500 font-medium">Premium package bonus</p>
          </div>
          <p class="discount font-bold text-lg text-emerald-500">₱0.00</p>
        </div>

        <div class="flex justify-between items-start border-t border-gray-800 pt-4">
          <div>
            <p class="font-bold text-sm tracking-tight">Additional charges</p>
            <p class="text-[10px] text-gray-500 font-medium">Delivery fee</p>
          </div>
          <p class="deliveryFee font-bold text-lg">₱0</p>
        </div>

        <div class="flex justify-between items-center border-t border-gray-800 pt-5">
          <p class="text-gray-500 font-bold uppercase text-[10px] tracking-widest">SUBTOTAL</p>
          <p class="subtotal text-xl font-bold tracking-tight">₱0.00</p>
        </div>

        <div class="bg-red-600 rounded-2xl p-5 flex justify-between items-center mt-6">
          <div>
            <p class="text-[10px] font-bold uppercase opacity-90 leading-none mb-1">TOTAL AMOUNT</p>
            <p class="text-[11px] font-medium opacity-80">With delivery</p>
          </div>
          <p class="totalAmount text-2xl sm:text-3xl font-black">₱0.00</p>
        </div>

        <div class="grid grid-cols-3 pt-6 border-t border-gray-800">
          <div class="text-center">
            <p class="noOfDishes text-red-500 text-2xl font-bold leading-none mb-1">0</p>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-wider">DISHES</p>
          </div>
          <div class="text-center border-x border-gray-800">
            <p class="noOfFreebies text-emerald-500 text-2xl font-bold leading-none mb-1">0</p>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-wider">FREEBIES</p>
          </div>
          <div class="text-center">
            <p class="noOfPackage text-blue-400 text-2xl font-bold leading-none mb-1">0</p>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-wider">PACKAGE</p>
          </div>
        </div>
      </div>
    </div>
  `;
}


export function renderNavButtons(currentStep) {
  const backBtn =
    currentStep > 1
      ? `
      <button class="backBtn bg-white text-gray-700 pr-8 p-3 rounded-full font-bold flex items-center space-x-6 shadow-md border border-gray-100 hover:bg-gray-50 transition-all group">
        <div class="bg-gray-100 p-2 rounded-full group-hover:-translate-x-1 transition-transform">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/>
          </svg>
        </div>
        <span class="text-lg">Previous</span>
      </button>
    `
      : `<div></div>`; // empty div keeps flex spacing

  const nextLabel = currentStep === 3 ? "Finish" : "Next";

  const nextBtn = `
    <button class="nextBtn bg-red-600 text-white pl-8 pr-3 py-3 rounded-full font-bold flex items-center space-x-6 shadow-lg hover:bg-red-700 transition-all group">
      <span class="nextBtnText text-lg">${nextLabel}</span>
      <div class="bg-red-500 p-2 rounded-full group-hover:translate-x-1 transition-transform">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </button>
  `;

  return `
    <div class="mt-8 flex justify-between items-center">
      ${backBtn}
      ${nextBtn}
    </div>
  `;
}
