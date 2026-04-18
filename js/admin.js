// =====================================
// STATIC LECHON BOOKING ADMIN SYSTEM
// =====================================

// ------------------------------
// STATIC ORDERS (ENCODER FORMAT READY)
// ------------------------------
const mockOrders = [
  {
    name: "Juan Dela Cruz",
    amount: 3500,
    location: "Dumaguete City",
    facebook: "https://facebook.com/juan",
    paymentMethod: "Cash on Delivery",
    date: "2026-04-16",
    time: "08:00",
    contacts: ["09123456789"],
    orderType: "Lechon Package",
    packageDetails: "Lechon Belly Medium (10–14 kg)",
    dishes: ["Lumpia", "Pancit"],
    freebies: ["1 Rice (50 pax)", "Sarsa"],
  },
  {
    name: "Maria Santos",
    amount: 4200,
    location: "Valencia",
    facebook: "",
    paymentMethod: "GCash",
    date: "2026-04-16",
    time: "09:30",
    contacts: ["09223334444", "09112223333"],
    orderType: "Dishes Only",
    packageDetails: null,
    dishes: ["Spaghetti", "Rice", "Kare-Kare"],
    freebies: [],
  },
  {
    name: "Pedro Reyes",
    amount: 2800,
    location: "Bacong",
    facebook: "https://facebook.com/pedro",
    paymentMethod: "Cash on Delivery",
    date: "2026-04-16",
    time: "11:00",
    contacts: ["09334445555"],
    orderType: "Belly Package",
    packageDetails: "Belly Large (3 kg)",
    dishes: [],
    freebies: ["Sarsa"],
  },
  {
    name: "Pedro Reyes",
    amount: 2800,
    location: "Bacong",
    facebook: "https://facebook.com/pedro",
    paymentMethod: "Cash on Delivery",
    date: "2026-04-16",
    time: "11:00",
    contacts: ["09334445555"],
    orderType: "Belly Only",
    packageDetails: "Belly Large (3 kg)",
    dishes: [],
    freebies: ["Sarsa"],
  },
  {
    name: "Pedro Reyes",
    amount: 2800,
    location: "Bacong",
    facebook: "https://facebook.com/pedro",
    paymentMethod: "Cash on Delivery",
    date: "2026-04-16",
    time: "11:00",
    contacts: ["09334445555"],
    orderType: "Lechon Only",
    packageDetails: "Lechon Large (3 kg)",
    dishes: [],
    freebies: ["Sarsa"],
  },
];

// ------------------------------
// TIME FORMAT (12-hour)
// ------------------------------
function to12Hour(time24) {
  if (!time24) return "-";

  let [hour, minute] = time24.split(":");
  hour = parseInt(hour);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${ampm}`;
}

// ------------------------------
// COMPUTE PROCESS TIME (5 HOURS BEFORE DELIVERY)
// ------------------------------
function computeProcessTime(time24) {
  if (!time24) return "-";

  const [h, m] = time24.split(":").map(Number);
  let date = new Date();
  date.setHours(h);
  date.setMinutes(m);

  // subtract 5 hours
  date.setHours(date.getHours() - 5);

  let hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${ampm}`;
}

// ------------------------------
// AUTH GUARD
// ------------------------------
const user = JSON.parse(localStorage.getItem("loggedUser") || "null");

if (!user || user.role !== "Admin") {
  window.location.href = "index.html";
}

// ------------------------------
// LOGOUT
// ------------------------------
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
});

// ------------------------------
// TAB SWITCH
// ------------------------------
function switchTab(tab) {
  document.querySelectorAll(".tab-content").forEach((t) => {
    t.classList.remove("active");
  });

  document.getElementById("tab-" + tab).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.remove("active");
  });

  event.currentTarget.classList.add("active");
}

// ------------------------------
// GET ORDERS
// ------------------------------
function getOrders() {
  return mockOrders;
}

// ------------------------------
// FILTER DATE
// ------------------------------
const filterDate = document.getElementById("filterDate");

if (filterDate) {
  filterDate.value = "2026-04-16";
  filterDate.addEventListener("change", renderOrders);
}

// ------------------------------
// DELETE (STATIC)
// ------------------------------
window.deleteOrder = function (index) {
  alert("Static demo only — delete not connected.");
};

// ------------------------------
// EDIT (STATIC PLACEHOLDER)
// ------------------------------
window.editOrder = function (index) {
  alert("Edit feature placeholder — connect encoder system next.");
};

// ------------------------------
// RENDER ORDERS
// ------------------------------
function renderOrders() {
  const orders = getOrders();
  const date = filterDate ? filterDate.value : null;

  const filtered = date ? orders.filter((o) => o.date === date) : orders;

  const tbody = document.getElementById("ordersTableBody");
  if (!tbody) return;

  let total = 0;

  tbody.innerHTML = filtered
    .map((o, index) => {
      total += parseFloat(o.amount) || 0;

      return `
<tr class="border border-gray-300">
  <td class="p-2 border border-gray-300">${to12Hour(o.time)}</td>
  <td class="p-2 border border-gray-300">${o.name}</td>
  <td class="p-2 border border-gray-300">${o.orderType || "N/A"}</td>

  <!-- ORDER DETAILS -->
  <td class="p-2 border border-gray-300">
    <b>Package:</b> ${o.packageDetails || "None"} <br>
    <b>Dishes:</b> ${(o.dishes || []).join(", ") || "None"} <br>
    <b>Freebies:</b> ${(o.freebies || []).join(", ") || "None"}
  </td>

  <td class="p-2 border border-gray-300">₱${parseFloat(o.amount).toFixed(2)}</td>

  <td class="p-2 border border-gray-300">${computeProcessTime(o.time)}</td>

  <td class="p-2 border border-gray-300">${o.location}</td>

  <td class="p-2 border border-gray-300">
    ${
      o.facebook
        ? `<a href="${o.facebook}" alt="Facebook Account" target="_blank" class="text-blue-600 underline hover:text-blue-800">
          View
        </a>`
        : "-"
    }
  </td>
  <td class="p-2 border border-gray-300">${(o.contacts || []).join(", ")}</td>

  <td class="p-2 border border-gray-300">${o.paymentMethod || "COD"}</td>

  <td class="p-2 border border-gray-300">

    <!-- EDIT (GREEN) -->
    <button onclick="editOrder(${index})" class="p-1 text-green-500 hover:text-green-600 hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
      </svg>
    </button>

    <!-- DELETE (RED) -->
    <button onclick="deleteOrder(${index})" class="p-1 text-red-500 hover:text-red-600 hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
      </svg>
    </button>

  </td>
</tr>
`;
    })
    .join("");

  document.getElementById("orderSummary").textContent =
    `Total Orders: ${filtered.length} | Total Amount: ₱${total.toFixed(2)}`;
}

// ------------------------------
// PRINT
// ------------------------------
function printOrders() {
  const date = filterDate.value;

  const filtered = mockOrders.filter((o) => o.date === date);

  localStorage.setItem("print_orders", JSON.stringify(filtered));
  localStorage.setItem("print_date", date);

  window.open("print.html", "_blank");
}

// ------------------------------
// INIT
// ------------------------------
renderOrders();
