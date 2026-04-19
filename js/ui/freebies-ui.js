import { NumberOfFreebies } from "../state/elements.js";

export function setFreebies(freebies = []) {
  freebieList.innerHTML = "";

  NumberOfFreebies.textContent = freebies.length;

  // No freebies case
  if (!freebies.length) {
    freebieList.innerHTML = `
      <div class="col-span-full text-center text-gray-400 italic text-sm">
        No freebies available
      </div>
    `;
    return;
  }

  // Generate each freebie card
  freebies.forEach((f) => {
    const div = document.createElement("div");

    div.className =
      "flex items-center space-x-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl";

    div.innerHTML = `
      <div class="bg-emerald-500 rounded-full p-0.5">
        <svg
          class="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <span class="text-sm font-medium text-emerald-800">
        ${f}
      </span>
    `;

    freebieList.appendChild(div);
  });
}
