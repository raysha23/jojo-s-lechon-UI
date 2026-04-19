// =============================
// STEP 2 - Customer Info
// =============================


const contactList = document.getElementById("contactList");
const addContactBtn = document.getElementById("addContactBtn");
const contactError = document.getElementById("contactError");
const customerName = document.getElementById("customerName");
const nameError = document.getElementById("nameError");
const facebookProfile = document.getElementById("facebookProfile");
const fbError = document.getElementById("fbError");

const MAX_CONTACTS = 2;

// ─── CUSTOMER NAME ───────────────────────────────────────────
customerName.addEventListener("input", () => {
  customerName.value = customerName.value.replace(/[^a-zA-Z\s]/g, "");
});

// blur: validate
customerName.addEventListener("blur", () => {
  const valid = /^[a-zA-Z\s]+$/.test(customerName.value.trim());
  const empty = customerName.value.trim() === "";

  if (!empty && !valid) {
    nameError.classList.remove("hidden");
    customerName.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    nameError.classList.add("hidden");
    customerName.classList.remove("border-red-400", "ring-1", "ring-red-400");
  }
});

// ─── CONTACT VALIDATION HELPER ───────────────────────────────
function attachContactValidation(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });

  input.addEventListener("blur", () => {
    const valid = /^\d{7,11}$/.test(input.value.trim());
    const empty = input.value.trim() === "";

    if (!empty && !valid) {
      contactError.classList.remove("hidden");
      input.classList.add("border-red-400", "ring-1", "ring-red-400");
    } else {
      contactError.classList.add("hidden");
      input.classList.remove("border-red-400", "ring-1", "ring-red-400");
    }
  });
}

// ─── UPDATE PLACEHOLDERS ─────────────────────────────────────
function updatePlaceholders() {
  contactList.querySelectorAll(".contact-input").forEach((input, index) => {
    input.placeholder = `Contact number ${index + 1}`;
  });
}

// attach validation to the first input on load
attachContactValidation(document.querySelector(".contact-input"));

// ─── ADD CONTACT ─────────────────────────────────────────────
addContactBtn.addEventListener("click", () => {
  const items = contactList.querySelectorAll(".contact-item");

  if (items.length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
    return;
  }

  const index = items.length + 1;
  const div = document.createElement("div");
  div.className = "flex items-center gap-2 contact-item";
  div.innerHTML = `
    <input
      type="text"
      placeholder="Contact number ${index}"
      maxlength="11"
      class="contact-input w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-600 italic"
    />
    <button type="button" class="remove-contact flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600 transition flex-shrink-0">✕</button>
  `;

  div.querySelector(".remove-contact").addEventListener("click", () => {
    div.remove();
    updatePlaceholders();
    addContactBtn.disabled = false;
    addContactBtn.classList.remove("opacity-40", "cursor-not-allowed");
  });

  attachContactValidation(div.querySelector(".contact-input"));
  contactList.appendChild(div);

  if (contactList.querySelectorAll(".contact-item").length >= MAX_CONTACTS) {
    addContactBtn.disabled = true;
    addContactBtn.classList.add("opacity-40", "cursor-not-allowed");
  }
});

// ─── FACEBOOK PROFILE ────────────────────────────────────────
facebookProfile.addEventListener("blur", () => {
  const value = facebookProfile.value.trim();

  if (value === "") {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove(
      "border-red-400",
      "ring-1",
      "ring-red-400",
    );
    return;
  }

  const valid = /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(
    value,
  );

  if (!valid) {
    fbError.classList.remove("hidden");
    facebookProfile.classList.add("border-red-400", "ring-1", "ring-red-400");
  } else {
    fbError.classList.add("hidden");
    facebookProfile.classList.remove(
      "border-red-400",
      "ring-1",
      "ring-red-400",
    );
  }
});

// ─── STEP 2 VALIDATION GATE ───────────────────────────────────
function validateStep2() {
  const name = customerName.value.trim();
  const contacts = [...document.querySelectorAll(".contact-input")].map((i) =>
    i.value.trim(),
  );
  const fb = facebookProfile.value.trim();

  const nameOk = /^[a-zA-Z\s.'-]+$/.test(name);
  const contactOk =
    contacts.every((c) => /^\d{7,11}$/.test(c)) && contacts[0] !== "";
  const fbOk =
    fb === "" ||
    /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\/.+/i.test(fb);

  return nameOk && contactOk && fbOk;
}
