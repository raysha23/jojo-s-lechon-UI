//File Path: js/encoder.js
// Auth guard
const user = JSON.parse(localStorage.getItem("loggedUser") || "null");
if (!user || user.role !== "Encoder") {
  window.location.href = "lechon-login.html";
}
document.getElementById("userName").textContent = user ? user.username : "";

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
});

// Dynamic contacts
let contactCount = 1;
document.getElementById("addContact").addEventListener("click", () => {
  contactCount++;
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML =
    '<input class="form-input" style="margin-bottom:0" type="tel" placeholder="Enter contact number">' +
    '<button type="button" class="remove-btn" onclick="this.parentElement.remove()">✕</button>';
  document.getElementById("contactList").appendChild(div);
});

// Dynamic dishes
let dishCount = 2;
document.getElementById("addDish").addEventListener("click", () => {
  dishCount++;
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML =
    '<input class="form-input" style="margin-bottom:0" type="text" placeholder="Dish ' +
    dishCount +
    '">' +
    '<button type="button" class="remove-btn" onclick="this.parentElement.remove()">✕</button>';
  document.getElementById("dishList").appendChild(div);
});

// Submit
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("successMsg");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
  e.target.reset();
});
