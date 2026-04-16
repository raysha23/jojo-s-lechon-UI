//File Path: js/admin.js
function seedMockOrders() {
  const existing = JSON.parse(localStorage.getItem("lechon_orders") || "null");

  // only seed if empty (prevents duplication)
  if (existing && existing.length > 0) return;

  const mockOrders = [
    // ===== 04/16/2026 =====
    {
      name: "Juan Dela Cruz",
      amount: 3500,
      location: "Dumaguete City",
      date: "2026-04-16",
      time: "08:00",
      contacts: ["09123456789"],
      dishes: ["Lechon Belly", "Lumpia", "Pancit"],
    },
    {
      name: "Maria Santos",
      amount: 4200,
      location: "Valencia",
      date: "2026-04-16",
      time: "09:30",
      contacts: ["09223334444", "09112223333"],
      dishes: ["Lechon Whole", "Spaghetti", "Rice"],
    },
    {
      name: "Pedro Reyes",
      amount: 2800,
      location: "Bacong",
      date: "2026-04-16",
      time: "11:00",
      contacts: ["09334445555"],
      dishes: ["Lechon Belly", "Kare-Kare"],
    },
    {
      name: "Ana Lopez",
      amount: 5000,
      location: "Dauin",
      date: "2026-04-16",
      time: "13:00",
      contacts: ["09125556666"],
      dishes: ["Lechon Whole", "Lumpia", "Spaghetti", "Pancit"],
    },
    {
      name: "Carlos Mendoza",
      amount: 3100,
      location: "Sibulan",
      date: "2026-04-16",
      time: "15:00",
      contacts: ["09098887777"],
      dishes: ["Lechon Belly", "Rice", "Sauce Set"],
    },
    {
      name: "Liza Garcia",
      amount: 3900,
      location: "Tanjay",
      date: "2026-04-16",
      time: "16:30",
      contacts: ["09118889999"],
      dishes: ["Lechon Whole", "Lumpia"],
    },
    {
      name: "Mark Villanueva",
      amount: 2600,
      location: "Amlan",
      date: "2026-04-16",
      time: "17:00",
      contacts: ["09219990000"],
      dishes: ["Lechon Belly"],
    },
    {
      name: "Grace Lim",
      amount: 4500,
      location: "Dumaguete City",
      date: "2026-04-16",
      time: "18:00",
      contacts: ["09127778888"],
      dishes: ["Lechon Whole", "Pancit", "Lumpia"],
    },
    {
      name: "Benito Cruz",
      amount: 3000,
      location: "Zamboanguita",
      date: "2026-04-16",
      time: "19:00",
      contacts: ["09338889900"],
      dishes: ["Lechon Belly", "Rice"],
    },
    {
      name: "Sarah Ong",
      amount: 5200,
      location: "Dumaguete City",
      date: "2026-04-16",
      time: "20:00",
      contacts: ["09129998888"],
      dishes: ["Lechon Whole", "Spaghetti", "Pancit", "Lumpia"],
    },

    // ===== 04/17/2026 =====
    {
      name: "Jose Ramos",
      amount: 4000,
      location: "Bacong",
      date: "2026-04-17",
      time: "09:00",
      contacts: ["09111111111"],
      dishes: ["Lechon Belly", "Kare-Kare", "Rice"],
    },
    {
      name: "Elena Dizon",
      amount: 4800,
      location: "Valencia",
      date: "2026-04-17",
      time: "10:30",
      contacts: ["09222222222"],
      dishes: ["Lechon Whole", "Lumpia"],
    },
    {
      name: "Ryan Bautista",
      amount: 2900,
      location: "Sibulan",
      date: "2026-04-17",
      time: "12:00",
      contacts: ["09333333333"],
      dishes: ["Lechon Belly"],
    },
    {
      name: "Nicole Tan",
      amount: 3500,
      location: "Dumaguete City",
      date: "2026-04-17",
      time: "13:30",
      contacts: ["09144444444"],
      dishes: ["Lechon Belly", "Pancit"],
    },
    {
      name: "Arthur Lim",
      amount: 6000,
      location: "Dauin",
      date: "2026-04-17",
      time: "15:00",
      contacts: ["09255555555"],
      dishes: ["Lechon Whole", "Spaghetti", "Lumpia"],
    },
    {
      name: "Jessa Flores",
      amount: 3100,
      location: "Amlan",
      date: "2026-04-17",
      time: "16:00",
      contacts: ["09366666666"],
      dishes: ["Lechon Belly", "Rice"],
    },
    {
      name: "Kevin Yu",
      amount: 2700,
      location: "Tanjay",
      date: "2026-04-17",
      time: "17:00",
      contacts: ["09177777777"],
      dishes: ["Lechon Belly"],
    },
    {
      name: "Monica Reyes",
      amount: 4200,
      location: "Zamboanguita",
      date: "2026-04-17",
      time: "18:30",
      contacts: ["09288888888"],
      dishes: ["Lechon Whole", "Lumpia"],
    },
    {
      name: "David Cruz",
      amount: 3300,
      location: "Bacong",
      date: "2026-04-17",
      time: "19:30",
      contacts: ["09399999999"],
      dishes: ["Lechon Belly", "Pancit"],
    },
    {
      name: "Angelica Sy",
      amount: 5000,
      location: "Dumaguete City",
      date: "2026-04-17",
      time: "20:30",
      contacts: ["09100000000"],
      dishes: ["Lechon Whole", "Spaghetti", "Rice"],
    },

    // ===== 04/18/2026 =====
    {
      name: "Mark Lee",
      amount: 3700,
      location: "Dauin",
      date: "2026-04-18",
      time: "10:00",
      contacts: ["09111122222"],
      dishes: ["Lechon Belly", "Lumpia"],
    },
    {
      name: "Hannah Gomez",
      amount: 5100,
      location: "Valencia",
      date: "2026-04-18",
      time: "11:30",
      contacts: ["09222233333"],
      dishes: ["Lechon Whole", "Pancit", "Rice"],
    },
    {
      name: "Ramon Dela Peña",
      amount: 2900,
      location: "Bacong",
      date: "2026-04-18",
      time: "13:00",
      contacts: ["09333344444"],
      dishes: ["Lechon Belly"],
    },
    {
      name: "Ella Cruz",
      amount: 4600,
      location: "Sibulan",
      date: "2026-04-18",
      time: "15:00",
      contacts: ["09144455555"],
      dishes: ["Lechon Whole", "Spaghetti"],
    },
    {
      name: "Victor Reyes",
      amount: 3200,
      location: "Amlan",
      date: "2026-04-18",
      time: "16:30",
      contacts: ["09255566666"],
      dishes: ["Lechon Belly", "Rice"],
    },
    {
      name: "Sofia Lim",
      amount: 4800,
      location: "Tanjay",
      date: "2026-04-18",
      time: "18:00",
      contacts: ["09366677777"],
      dishes: ["Lechon Whole", "Lumpia"],
    },
    {
      name: "Daniel Ong",
      amount: 2800,
      location: "Zamboanguita",
      date: "2026-04-18",
      time: "19:00",
      contacts: ["09177788888"],
      dishes: ["Lechon Belly"],
    },
    {
      name: "Kim Santos",
      amount: 5300,
      location: "Dumaguete City",
      date: "2026-04-18",
      time: "20:00",
      contacts: ["09288899999"],
      dishes: ["Lechon Whole", "Pancit", "Spaghetti"],
    },
    {
      name: "Leo Ramos",
      amount: 3400,
      location: "Bacong",
      date: "2026-04-18",
      time: "21:00",
      contacts: ["09399900000"],
      dishes: ["Lechon Belly", "Rice"],
    },
    {
      name: "Mia Flores",
      amount: 6000,
      location: "Dauin",
      date: "2026-04-18",
      time: "22:00",
      contacts: ["09100011111"],
      dishes: ["Lechon Whole", "Lumpia", "Pancit"],
    },
  ];

  localStorage.setItem("lechon_orders", JSON.stringify(mockOrders));
}

//12 hour format helper
function to12Hour(time24) {
  if (!time24) return "-";

  let [hour, minute] = time24.split(":");
  hour = parseInt(hour);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${ampm}`;
}

// Auth guard
const user = JSON.parse(localStorage.getItem("loggedUser") || "null");
if (!user || user.role !== "Admin") {
  window.location.href = "lechon-login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "lechon-login.html";
});

// Tab switching
function switchTab(tab) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById("tab-" + tab).classList.add("active");
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

// --- Orders ---
function getOrders() {
  return JSON.parse(localStorage.getItem("lechon_orders") || "[]");
}
function saveOrders(o) {
  localStorage.setItem("lechon_orders", JSON.stringify(o));
}

const filterDate = document.getElementById("filterDate");
filterDate.value = new Date().toISOString().split("T")[0];
filterDate.addEventListener("change", renderOrders);

function renderOrders() {
  const orders = getOrders();
  const date = filterDate.value;
  const filtered = date ? orders.filter((o) => o.date === date) : orders;
  const tbody = document.getElementById("ordersTableBody");
  let total = 0;
  tbody.innerHTML = filtered
    .map((o, i) => {
      total += parseFloat(o.amount) || 0;
      return `<tr>
        <td>${to12Hour(o.time)}</td>
        <td>${o.name}</td>
        <td>₱${parseFloat(o.amount).toFixed(2)}</td>
        <td>${o.location}</td>
        <td>${(o.contacts || []).join(", ")}</td>
        <td><ul class="dish-list">${(o.dishes || []).map((d) => "<li>" + d + "</li>").join("")}</ul></td>
        <td><button class="delete-btn" onclick="deleteOrder(${orders.indexOf(o)})">🗑</button></td>
      </tr>`;
    })
    .join("");
  document.getElementById("orderSummary").textContent =
    `Total Orders: ${filtered.length} | Total Amount: ₱${total.toFixed(2)}`;
}
window.deleteOrder = function (idx) {
  if (!confirm("Delete this order?")) return;
  const orders = getOrders();
  orders.splice(idx, 1);
  saveOrders(orders);
  renderOrders();
};
renderOrders();

// --- Encoder Management ---
function getEncoders() {
  const def = [
    {
      username: "encoder",
      name: "Default Encoder",
      password: "encoder123",
    },
  ];
  return JSON.parse(
    localStorage.getItem("lechon_encoders") || JSON.stringify(def),
  );
}
function saveEncoders(e) {
  localStorage.setItem("lechon_encoders", JSON.stringify(e));
}

function renderEncoders() {
  const encoders = getEncoders();
  document.getElementById("encoderTableBody").innerHTML = encoders
    .map(
      (e, i) =>
        `<tr>
        <td>${e.username}</td>
        <td>${e.name}</td>
        <td><span class="status-active">Active</span></td>
        <td>${e.username === "encoder" ? "-" : '<button class="delete-btn" onclick="deleteEncoder(' + i + ')">🗑</button>'}</td>
      </tr>`,
    )
    .join("");
}

document.getElementById("addEncoderBtn").addEventListener("click", () => {
  const u = document.getElementById("newEncoderUser").value.trim();
  const p = document.getElementById("newEncoderPass").value;
  const n = document.getElementById("newEncoderName").value.trim();
  const msg = document.getElementById("encoderMsg");
  if (!u || !p || !n) {
    msg.textContent = "All fields are required";
    msg.className = "msg error";
    msg.style.display = "block";
    return;
  }
  const encoders = getEncoders();
  if (encoders.find((e) => e.username === u)) {
    msg.textContent = "Username already exists";
    msg.className = "msg error";
    msg.style.display = "block";
    return;
  }
  encoders.push({ username: u, password: p, name: n });
  saveEncoders(encoders);
  // Also update login users
  msg.textContent = 'Encoder "' + u + '" added successfully!';
  msg.className = "msg success";
  msg.style.display = "block";
  document.getElementById("newEncoderUser").value = "";
  document.getElementById("newEncoderPass").value = "";
  document.getElementById("newEncoderName").value = "";
  renderEncoders();
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
});

window.deleteEncoder = function (idx) {
  if (!confirm("Remove this encoder?")) return;
  const encoders = getEncoders();
  encoders.splice(idx, 1);
  saveEncoders(encoders);
  renderEncoders();
};
renderEncoders();

seedMockOrders();
